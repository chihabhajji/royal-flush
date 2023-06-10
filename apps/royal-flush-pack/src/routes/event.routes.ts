import {
    PaginationSchema,
    PaginationSchemaType
} from '@royal/shared';
import { Router } from 'express';
import passport from 'passport';
import { processRequestQuery } from 'zod-express-middleware';
import { EVENT_ATTENDANCES_REPOSITORY } from '../services/event-attendances.service';
import { EVENT_REPOSITORY } from '../services/events.service';
import { JWT_STRATEGY } from '../util/jwt.utils';

const eventsDashboardRouter = () => Router().get('/upcoming', processRequestQuery(PaginationSchema),
async (req, res) => {
  const { limit, offset} = req.query;
  const result = await EVENT_ATTENDANCES_REPOSITORY.findAndCountAll({
      limit,
      offset,
      order: [['creationDate', 'DESC']]
  })
  return res.json(result);
});

export const eventsRouterFactory = () =>
  Router()
    .get(
      '/upcoming',
      processRequestQuery(PaginationSchema),
      async (req, res) => {
        const { limit, offset} = req.query;
        const result = await EVENT_REPOSITORY.findAndCountAll({
            limit,
            offset,
            order: [['date', 'DESC']]
        })
        return res.json(result);
      }
    ).use('/dashboard', passport.authenticate(JWT_STRATEGY.name, {session: false}),eventsDashboardRouter());
