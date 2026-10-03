import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { isDevelopmentEnvironment } from '@/lib/project-environment';

import { ForgotPasswordFormSchema } from './forgot-password.schema';
import type { ForgotPasswordForm } from './forgot-password.schema';
import forgotPassword from './forgot-password.action';

export default function useForgotPasswordForm() {
  const form = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const forgotPasswordFormMutation = useMutation({
    mutationFn: forgotPassword,
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    // development env - disable
    if (isDevelopmentEnvironment) return;

    // submit forgot password request
    forgotPasswordFormMutation.mutate(data);
  };

  return { form, onSubmit, isPending: forgotPasswordFormMutation.isPending, data: forgotPasswordFormMutation.data };
}
