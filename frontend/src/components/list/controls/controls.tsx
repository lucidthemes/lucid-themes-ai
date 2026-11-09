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
    <div className="flex w-full flex-col items-center gap-y-2.5 self-center xl:flex-row xl:justify-between">
      <ListControlResultsCount page={page} limit={limit} totalCount={totalCount} />
      <ListControlPagination
        currentPage={page}
        totalPages={totalPages}
        className="justify-self-center sm:justify-self-start lg:col-start-2 lg:justify-self-center"
      />
      <ListControlLimit currentValue={limit} limitOptions={limitOptions} className="justify-self-end lg:col-start-3" />
    </div>
  );
}
