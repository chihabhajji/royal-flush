import {z} from 'zod';
import { PasswordSchema } from './password.schema';

export const LoginSchema = z.object({
  email: z.string()
  .min(1, "Email is required")
  .max(100, "Email is too long")
  .email("Invalid email"),
}).and(PasswordSchema);

export type LoginSchemaType = z.infer<typeof LoginSchema>;