import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useIngestJobNewStore } from '../store/ingest-job-new.store';

export default function DocumentationIngestJobNewBackButton() {
  const resetJobOption = useIngestJobNewStore((state) => state.resetJobOption);

  return (
    <Button variant="ghost" className="cursor-pointer" onClick={resetJobOption}>
      <ArrowLeft /> Back
    </Button>
  );
}
