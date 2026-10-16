import type { Dispatch, SetStateAction } from 'react';
import { Eye, EyeOff, SquareSplitHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function DocumentationIngestParseProcessedContentButtons({
  viewContentOpen,
  setViewContentOpen,
  viewContentSplit,
  setViewContentSplit,
}: {
  viewContentOpen: boolean;
  setViewContentOpen: Dispatch<SetStateAction<boolean>>;
  viewContentSplit: boolean;
  setViewContentSplit: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Button
        size="icon"
        variant={!viewContentOpen ? 'outline' : 'secondary'}
        onClick={() => setViewContentOpen((viewContentOpen) => !viewContentOpen)}
        className="cursor-pointer"
        title={!viewContentOpen ? 'View content' : 'Hide content'}
      >
        {!viewContentOpen && <Eye />}
        {viewContentOpen && <EyeOff />}
      </Button>
      {viewContentOpen && (
        <Button
          size="icon"
          variant={!viewContentSplit ? 'outline' : 'secondary'}
          onClick={() => setViewContentSplit((viewContentSplit) => !viewContentSplit)}
          className="cursor-pointer"
          title={!viewContentSplit ? 'Show split source' : 'Hide split source'}
        >
          <SquareSplitHorizontal />
        </Button>
      )}
    </div>
  );
}
