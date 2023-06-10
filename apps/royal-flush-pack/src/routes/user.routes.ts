import {
  LoginSchema,
  RegisterSchema
} from '@royal/shared';
import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import * as AuthController from '../controllers/auth.controller';
import { JWT_STRATEGY } from '../util/jwt.utils';
import passport from 'passport';

export const userRouterFactory = () =>
  Router()
  .post('/register', processRequestBody(RegisterSchema), AuthController.registerUser)
  .post('/login', processRequestBody(LoginSchema), AuthController.loginUser)
  .get('/me', passport.authenticate(JWT_STRATEGY.name, {session : false}),AuthController.currentUser);
