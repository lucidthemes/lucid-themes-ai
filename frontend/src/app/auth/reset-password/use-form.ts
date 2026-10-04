import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { isDevelopmentEnvironment } from '@/lib/project-environment';

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
    // development env - disable
    if (isDevelopmentEnvironment) return;

    // submit reset password request
    resetPasswordFormMutation.mutate(data);
  };

  return { form, onSubmit, isPending: resetPasswordFormMutation.isPending, data: resetPasswordFormMutation.data };
}
