import { json, urlencoded } from 'body-parser';
import express from 'express';
import strongErrorHandler from 'strong-error-handler';
import passport from 'passport';
import { userRouterFactory } from './routes/user.routes';
import {JWT_STRATEGY} from './util/jwt.utils'
import { dashboardRouterFactory } from './routes/dashboard.routes';
import { eventsRouterFactory } from './routes/event.routes';

export const server = express();
server.use(passport.initialize());
server.use(json());
server.use(urlencoded({ extended: false }));
// server.use(strongErrorHandler({debug: true,defaultType: 'json', rootProperty: 'error'}));

server.use('/home',userRouterFactory());
server.use('/events', eventsRouterFactory());
server.use('/dashboard', passport.authenticate(JWT_STRATEGY.name, {session : false}) ,dashboardRouterFactory());
