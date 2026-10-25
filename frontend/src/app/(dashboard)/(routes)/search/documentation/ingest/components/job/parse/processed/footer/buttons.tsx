import type { Dispatch, SetStateAction } from 'react';
import { SquareText, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function DocumentationIngestJobParseProcessedFooterButtons({
  settingsOpen,
  setSettingsOpen,
  isPending,
}: {
  settingsOpen: boolean;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
}) {
  return (
    <div className="flex justify-end gap-5">
      <Button
        variant={settingsOpen ? 'secondary' : 'outline'}
        size="icon"
        className="cursor-pointer"
        onClick={() => setSettingsOpen((settingsOpen) => !settingsOpen)}
      >
        <Settings />
      </Button>
      <Button type="submit" className="cursor-pointer">
        {isPending && <Spinner />}
        Create chunks
        <SquareText />
      </Button>
    </div>
  );
}
