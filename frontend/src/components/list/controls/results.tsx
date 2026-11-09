export default function ListControlResultsCount({
  page,
  limit,
  totalCount,
}: {
  page: number;
  limit: number;
  totalCount: number;
}) {
  const currentResultsLower = page > 1 ? page * limit - (limit - 1) : 1;
  const currentResultsUpper = page * limit <= totalCount ? page * limit : totalCount;

  return (
    <div className="flex gap-x-1 text-sm">
      <span className="font-medium">Results:</span>
      {totalCount > 0 ? (
        <span>
          {currentResultsLower} - {currentResultsUpper} of {totalCount}
        </span>
      ) : (
        <span>{totalCount}</span>
      )}
    </div>
  );
}
