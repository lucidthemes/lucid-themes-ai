'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { ErrorAlert } from '@/components/alerts';

import useLoginForm from './use-form';

export default function LoginPageForm() {
  const { form, onSubmit, isPending, data } = useLoginForm();

  const [passwordShow, setPasswordShow] = useState(false);

  const handlePasswordShow = () => {
    setPasswordShow((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-y-4">
      {data && !data.success && <ErrorAlert alertTitle="Invalid login credentials" alertDescription={data.message} />}

      <form onSubmit={form.handleSubmit(onSubmit)} className="'flex gap-6' flex-col">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="password"
                    type={!passwordShow ? 'password' : 'text'}
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label={!passwordShow ? 'Show password' : 'Hide password'}
                      title={!passwordShow ? 'Show password' : 'Hide password'}
                      size="icon-sm"
                      className="cursor-pointer"
                      onClick={handlePasswordShow}
                    >
                      {!passwordShow ? <Eye /> : <EyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Field>
            <Button type="submit" className="cursor-pointer" disabled={isPending}>
              {isPending && <Spinner data-icon="inline-start" />}
              Login
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
