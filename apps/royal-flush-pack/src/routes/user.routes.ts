import {
  LoginSchema,
  RegisterSchema
} from '@royal/shared';
import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import * as AuthController from '../controllers/auth.controller';

export const userRouterFactory = () =>
  Router()
  .post('/register', processRequestBody(RegisterSchema), AuthController.registerUser)
  .post('/login', processRequestBody(LoginSchema), AuthController.loginUser);
