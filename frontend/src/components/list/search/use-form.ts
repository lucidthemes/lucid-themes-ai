'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { ListSearchFormSchema } from '@/components/list/search/list-search-form.schema';
import type { ListSearchForm } from '@/components/list/search/list-search-form.schema';

export default function useListSearchForm(search?: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ListSearchForm>({
    defaultValues: {
      search: search ?? '',
    },
    resolver: zodResolver(ListSearchFormSchema),
  });

  useEffect(() => {
    form.reset({
      search: search ?? '',
    });
  }, [search, form]);

  const onSubmit = async (data: ListSearchForm) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', data.search);
    router.push(`?${params.toString()}`);
  };

  return { form, onSubmit };
}
