import type { Dispatch, SetStateAction } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function DocumentationIngestParseProcessedViewContentButton({
  viewContentOpen,
  setViewContentOpen,
}: {
  viewContentOpen: boolean;
  setViewContentOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => setViewContentOpen((viewContentOpen) => !viewContentOpen)}
      className="cursor-pointer"
      title="View content"
    >
      {!viewContentOpen && <Eye />}
      {viewContentOpen && <EyeOff />}
    </Button>
  );
}
