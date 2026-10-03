import type { Metadata } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { ForgotPasswordForm } from './form';

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Reset your forgotten password',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>Enter your email to receive a link to reset it</CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </>
  );
}
