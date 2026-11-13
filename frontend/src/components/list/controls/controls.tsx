import ListControlResultsCount from './results';
import ListControlPagination from './pagination';
import ListControlLimit from './limit';

interface LogsListControlsProps {
  page: number;
  limit: number;
  totalCount: number;
  limitOptions?: number[];
}

export default function ListControls({ page, limit, totalCount, limitOptions }: LogsListControlsProps) {
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="flex w-full items-center justify-between gap-5 self-center">
      <ListControlResultsCount page={page} limit={limit} totalCount={totalCount} />
      <ListControlPagination currentPage={page} totalPages={totalPages} />
      <ListControlLimit currentValue={limit} limitOptions={limitOptions} className="justify-self-end lg:col-start-3" />
    </div>
  );
}
