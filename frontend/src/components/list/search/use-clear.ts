import { useRouter, useSearchParams } from 'next/navigation';

export default function useListSearchClear() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchRemove = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.push(`?${params.toString()}`);
  };

  return handleSearchRemove;
}
