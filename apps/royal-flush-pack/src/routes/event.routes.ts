import {
  PaginationSchema
} from '@royal/shared';
import { Router } from 'express';
import passport from 'passport';
import { processRequestQuery } from 'zod-express-middleware';
import * as EventController from '../controllers/event.controller';
import { JWT_STRATEGY } from '../util/jwt.utils';

export const eventsRouterFactory = () =>
  Router()
    .get('/upcoming', processRequestQuery(PaginationSchema), EventController.getUpcomingEvents)
    .use('/dashboard', passport.authenticate(JWT_STRATEGY.name, { session: false }), Router().get('/upcoming', processRequestQuery(PaginationSchema), EventController.getUpcomingDashboardEvents));
