'use server';

import { createClient } from '@/lib/supabase/server';
import type { NoDataActionResponse } from '@/types/action-response';

import { LoginFormSchema } from './login.schema';
import type { LoginForm } from './login.schema';

export default async function signIn(formData: LoginForm): Promise<NoDataActionResponse> {
  const parsed = LoginFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (!data.user || error) {
    return { success: false };
  }

  return { success: true };
}
