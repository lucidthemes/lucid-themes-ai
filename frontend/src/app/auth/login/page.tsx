import type { Metadata } from 'next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldDescription } from '@/components/ui/field';

import LoginPageForm from './form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to the dashboard',
};

export default function LoginPage() {
  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Log in with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginPageForm />
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By continuing, you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.
      </FieldDescription>
    </>
  );
}
