import { useRouter, useSearchParams } from 'next/navigation';

export default function useListFilter(type: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onFilterValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter_' + type, value);
    router.push(`?${params.toString()}`);
  };

  return onFilterValueChange;
}
