'use server';

import type { JwtPayload } from '@supabase/supabase-js';

import { isDevelopmentEnvironment } from '../project-environment';

import { createClient } from './server';

export async function getAuthClaims(): Promise<JwtPayload | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (!data?.claims || error) {
    return null;
  }

  return data.claims;
}

export async function getAuthAccessToken(): Promise<string | null> {
  // development env - return dummy token
  if (isDevelopmentEnvironment) return 'development-env-token';

  // not development env - get auth access token
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (!data.session || error) {
    return null;
  }

  return data.session.access_token;
}
