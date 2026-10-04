import { z } from 'zod';

export const ForgotPasswordFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export type ForgotPasswordForm = z.infer<typeof ForgotPasswordFormSchema>;
