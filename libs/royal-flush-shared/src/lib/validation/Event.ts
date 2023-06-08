import { z } from 'zod'

export const EventSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(100),
  date: z.date(),
  location: z.string().min(1).max(100),
  attendees: z.array(z.string()),
  isPublic: z.boolean(),
});
