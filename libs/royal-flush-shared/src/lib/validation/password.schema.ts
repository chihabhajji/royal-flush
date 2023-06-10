import { z } from 'zod';
export const PasswordSchema = z.object({
  password: z
    .string()
    .transform((val) => val.trim())
    .superRefine((val, ctx) => {
      const fieldValidationResult = z
        .string()
        .min(1, 'Password is required')
        .min(8, { message: 'Too short' })
        .safeParse(val);

      const includesLowerCase = /[a-z]/.test(val);
      const includesUpperCase = /[A-Z]/.test(val);
      const includesDigit = /[\d]/.test(val);
      const includesSpecialChar = /[^\d\w\s]/.test(val);

      if (!includesLowerCase) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must include a lowercase letter',
        });
      }
      if (!includesUpperCase) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must include an uppercase letter',
        });
      }
      if (!includesDigit) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must include a digit',
        });
      }
      if (!includesSpecialChar) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password must include a special character',
        });
      }
      if (fieldValidationResult.success === false) {
        ctx.addIssue(fieldValidationResult.error.issues[0]);
      }
    }),
});
