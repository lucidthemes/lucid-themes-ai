import { Spinner } from './ui/spinner';

function LoadingSpinner() {
  return (
    <div className="flex w-full justify-center py-10">
      <Spinner className="size-8" />
    </div>
  );
}

export { LoadingSpinner };
