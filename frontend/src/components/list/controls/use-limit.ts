import { useRouter, useSearchParams } from 'next/navigation';

export default function useListControlLimit() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onLimitValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', value);

    if (params.has('page')) {
      params.set('page', '1');
    }

    router.push(`?${params.toString()}`);
  };

  return onLimitValueChange;
}
