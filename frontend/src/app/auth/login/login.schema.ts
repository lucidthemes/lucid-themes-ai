import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter a password'),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
