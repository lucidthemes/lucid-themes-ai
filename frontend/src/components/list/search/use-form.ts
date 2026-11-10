'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { ListSearchFormSchema } from '@/components/list/search/list-search-form.schema';
import type { ListSearchForm } from '@/components/list/search/list-search-form.schema';

export default function useListSearchForm(search_query?: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ListSearchForm>({
    defaultValues: {
      search_query: search_query ?? '',
    },
    resolver: zodResolver(ListSearchFormSchema),
  });

  useEffect(() => {
    form.reset({
      search_query: search_query ?? '',
    });
  }, [search_query, form]);

  const onSubmit = async (data: ListSearchForm) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search_query', data.search_query);
    router.push(`?${params.toString()}`);
  };

  return { form, onSubmit };
}
