'use server';

// import { createClient } from '@/lib/supabase/server';
import type { NoDataActionResponse } from '@/types/action-response';

import { ResetPasswordFormSchema } from './reset-password.schema';
import type { ResetPasswordForm } from './reset-password.schema';

export default async function resetPassword(formData: ResetPasswordForm): Promise<NoDataActionResponse> {
  const parsed = ResetPasswordFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false };
  }

  //   const supabase = await createClient();

  //   const { data, error } = await supabase.auth.updateUser({
  //     password: formData.password,
  //   });

  //   if (error   ) {
  //     return { success: false, message: error.message };
  //   }

  //   if (!data.user   ) {
  //     return { success: false };
  //   }

  return { success: true };
}
