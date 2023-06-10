import { z } from 'zod';
export const PaginationSchema = z.object({
    limit: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().positive().max(20)
      ) as unknown as z.ZodNumber,
    offset: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().min(0)
      ) as unknown as z.ZodNumber,
});

export type PaginationSchemaType = z.infer<typeof PaginationSchema>;