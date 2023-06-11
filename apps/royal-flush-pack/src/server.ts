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

server.use('/api/home',userRouterFactory());
server.use('/api/events', eventsRouterFactory());
server.use('/api/dashboard', passport.authenticate(JWT_STRATEGY.name, {session : false}) ,dashboardRouterFactory());

server.use(strongErrorHandler({
    debug: process.env.NODE_ENV !== 'production',
    defaultType: 'json',
    rootProperty: 'error',
    negotiateContentType: false,
    log: process.env.NODE_ENV === 'production',
    safeFields: ['name', 'message', 'stack', 'status'],
}))