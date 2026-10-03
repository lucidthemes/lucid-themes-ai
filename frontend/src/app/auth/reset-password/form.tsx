'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { SuccessAlert, ErrorAlert } from '@/components/alerts';

import useResetPasswordForm from './use-form';

export function ResetPasswordForm() {
  const { form, onSubmit, isPending, data } = useResetPasswordForm();

  const [passwordShow, setPasswordShow] = useState(false);

  const handlePasswordShow = () => {
    setPasswordShow((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-y-4">
      {data && data.success && <SuccessAlert alertTitle="Password successfully reset" />}
      {data && !data.success && (
        <ErrorAlert alertTitle="Something went wrong. Please try again" alertDescription={data.message} />
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
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
              Save new password
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
