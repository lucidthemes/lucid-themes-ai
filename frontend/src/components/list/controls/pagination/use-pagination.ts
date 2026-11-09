import { useRouter, useSearchParams } from 'next/navigation';

export default function useListControlPagination(currentPage: number) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    router.push(`?${params.toString()}`);
  };

  const handlePreviousPage = () => {
    const updatedPage = Number(currentPage) - 1;
    handlePageChange(updatedPage);
  };

  const handleNextPage = () => {
    const updatedPage = Number(currentPage) + 1;
    handlePageChange(updatedPage);
  };

  return { handlePageChange, handlePreviousPage, handleNextPage };
}
