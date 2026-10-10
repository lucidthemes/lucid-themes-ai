import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { isDevelopmentModeClient } from '@/lib/development-mode';

import { ResetPasswordFormSchema } from './reset-password.schema';
import type { ResetPasswordForm } from './reset-password.schema';
import resetPassword from './reset-password.action';

export default function useResetPasswordForm() {
  const form = useForm<ResetPasswordForm>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const resetPasswordFormMutation = useMutation({
    mutationFn: resetPassword,
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    // development mode - disable
    if (isDevelopmentModeClient) return;

    // submit reset password request
    resetPasswordFormMutation.mutate(data);
  };

  return { form, onSubmit, isPending: resetPasswordFormMutation.isPending, data: resetPasswordFormMutation.data };
}
