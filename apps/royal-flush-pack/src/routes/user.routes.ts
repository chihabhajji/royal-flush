import {
    LoginSchema,
    LoginSchemaType,
    RegisterSchema,
    RegisterSchemaType
} from '@royal/shared';
import { compareSync, hashSync } from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { processRequestBody } from 'zod-express-middleware';
import { USER_REPOSITORY } from '../services/user.service';
import { ERole } from '../constants/roles.enum';

export const userRouterFactory = () =>
  Router()
    .post(
      '/register',
      processRequestBody(RegisterSchema),
      async (req, res) => {
        const body = req.body;
        const exists = await USER_REPOSITORY.count({
          where: { email: body.email },
        });
        if (exists > 0) {
          return res.status(409).json({ message: 'Email already exists' });
        }
        const hashedPassword = hashSync(body.password, 12);
        delete body.password;
        return USER_REPOSITORY.create({ ...body, password: hashedPassword, role: body.email.endsWith('@royalflush.com') ? ERole.Admin : ERole.User })
        // Real world scenario, id verify email or phone number
          .then((user) => res.json({token  : jwt.sign({ email: user.email }, process.env.JWT_SECRET)}))
          .catch((e) => {
            console.error(e.message);
            res.status(500).json({ message: 'Something went wrong' });
          });
      }
    )
    .post(
      '/login',
      processRequestBody(LoginSchema),
      async (req, res) => {
        const body = req.body;
        const user = await USER_REPOSITORY.findByPk(body.email);
        if (!user) {
          return res.status(404).json({ message: 'Invalid email or password' });
        }
        const comparePasswordHash = compareSync(body.password, user.password);
        if (!comparePasswordHash) {
          return res.status(404).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
      }
    );
