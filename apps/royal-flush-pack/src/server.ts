import express from 'express';
import {User} from "./models/user.model";
import {json} from 'body-parser';
import strongErrorHandler from 'strong-error-handler';
import { DatabaseDriver } from './config/database.driver';



export const server = express();
const userRepository = DatabaseDriver.getRepository(User);
server.use(json());
server.get('/', async (req, res) => {
  const users = await userRepository.findAll();
  res.json(users);
});

server.use(strongErrorHandler({
    debug: true,
  }));
