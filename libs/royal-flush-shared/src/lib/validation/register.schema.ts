import { z } from 'zod';
import { PasswordSchema } from './password.schema';

export const RegisterSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100).transform(v => v.trim().toLocaleLowerCase()),
  lastName: z.string().min(1).max(100).transform(v => v.trim().toLocaleLowerCase()),
}).and(PasswordSchema);

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;