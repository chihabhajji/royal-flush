import { json, urlencoded } from 'body-parser';
import express from 'express';
import strongErrorHandler from 'strong-error-handler';
import passport from 'passport';
import { userRouterFactory } from './routes/user.routes';
import {JWT_STRATEGY} from './util/jwt.utils'
import { dashboardRouterFactory } from './routes/dashboard.routes';

export const server = express();
server.use(passport.initialize());
server.use(json());
server.use(urlencoded({ extended: false }));
server.use(strongErrorHandler({debug: true,defaultType: 'json', rootProperty: 'error'}));

server.use(userRouterFactory());
server.use(dashboardRouterFactory(), passport.authenticate(JWT_STRATEGY.name, {session: false}));