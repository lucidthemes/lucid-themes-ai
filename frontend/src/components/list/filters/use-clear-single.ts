import { useRouter, useSearchParams } from 'next/navigation';

export default function useListFilterClearSingle() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterRemove = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('filter_' + type);
    router.push(`?${params.toString()}`);
  };

  return handleFilterRemove;
}
