import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { isDevelopmentEnvironment } from '@/lib/project-environment';

import { LoginFormSchema } from './login.schema';
import type { LoginForm } from './login.schema';
import signIn from './sign-in.action';

export default function useLoginForm() {
  const router = useRouter();

  const form = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const loginFormMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (result) => {
      if (result.success) {
        router.push('/');
      }
    },
  });

  const onSubmit = async (data: LoginForm) => {
    // development env - skip login auth
    if (isDevelopmentEnvironment) return router.push('/');

    // require login auth
    loginFormMutation.mutate(data);
  };

  return { form, onSubmit, isPending: loginFormMutation.isPending, data: loginFormMutation.data };
}
