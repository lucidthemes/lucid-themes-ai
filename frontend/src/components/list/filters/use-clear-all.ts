import { useRouter, useSearchParams } from 'next/navigation';

export default function useListFilterClearAll() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFiltersRemove = () => {
    const params = new URLSearchParams(searchParams.toString());

    const keysToDelete = [];

    for (const key of params.keys()) {
      if (key.startsWith('filter_')) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => params.delete(key));

    router.push(`?${params.toString()}`);
  };

  return handleFiltersRemove;
}
