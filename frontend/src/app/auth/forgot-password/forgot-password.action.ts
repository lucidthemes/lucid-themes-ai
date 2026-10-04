'use server';

import { createClient } from '@/lib/supabase/server';
import type { NoDataActionResponse } from '@/types/action-response';

import { ForgotPasswordFormSchema } from './forgot-password.schema';
import type { ForgotPasswordForm } from './forgot-password.schema';

export default async function forgotPassword(formData: ForgotPasswordForm): Promise<NoDataActionResponse> {
  const parsed = ForgotPasswordFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formData.email);

  if (error) {
    return { success: false };
  }

  return { success: true };
}
