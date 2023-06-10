import { Router } from 'express';
import { processRequestBody, processRequestQuery } from 'zod-express-middleware';
import * as UserController from '../controllers/user.controller';
import { PaginationSchema, RegisterSchema } from '@royal/shared';

export const dashboardRouterFactory = () => 
  Router()
  .get('/paginate', processRequestQuery(PaginationSchema), UserController.getUsers)
  .get('/find/:email', UserController.findUser)
  .post('/create/', processRequestBody(RegisterSchema), UserController.createUser)
  .patch('/update/:id', processRequestBody(RegisterSchema), UserController.updateUser)
  .delete('/delete/:id', UserController.deleteUser);
