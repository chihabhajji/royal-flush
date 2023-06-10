import { PaginationSchemaType } from '@royal/shared';
import { EVENT_ATTENDANCES_REPOSITORY } from '../services/event-attendances.service';
import { EVENT_REPOSITORY } from '../services/events.service';

export const getUpcomingDashboardEvents = async (req, res) => {
  const { limit, offset } = req.query as PaginationSchemaType;
  const result = await EVENT_ATTENDANCES_REPOSITORY.findAndCountAll({
    limit,
    offset,
    order: [['creationDate', 'DESC']],
  });
  return res.json(result);
};

export const getUpcomingEvents = async (req, res) => {
  const { limit, offset } = req.query as PaginationSchemaType;
  const result = await EVENT_REPOSITORY.findAndCountAll({
    limit,
    offset,
    order: [['date', 'DESC']],
  });
  return res.json(result);
};
