import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

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
    forgotPasswordFormMutation.mutate(data);
  };

  return { form, onSubmit, isPending: forgotPasswordFormMutation.isPending, data: forgotPasswordFormMutation.data };
}
