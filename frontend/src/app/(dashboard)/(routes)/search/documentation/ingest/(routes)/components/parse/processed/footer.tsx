'use client';

import { useState } from 'react';
import { SquareText, Settings } from 'lucide-react';

import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import DocumentationIngestJobParseProcessedFooterSettings from './footer-settings';

export default function DocumentationIngestJobParseProcessedFooter() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <CardFooter className="flex-col items-end gap-5">
      {settingsOpen && <DocumentationIngestJobParseProcessedFooterSettings />}
      <div className="flex justify-end gap-5">
        <Button
          variant={settingsOpen ? 'secondary' : 'outline'}
          size="icon"
          className="cursor-pointer"
          onClick={() => setSettingsOpen((settingsOpen) => !settingsOpen)}
        >
          <Settings />
        </Button>
        <Button className="cursor-pointer">
          <Spinner />
          Create chunks
          <SquareText />
        </Button>
      </div>
    </CardFooter>
  );
}
