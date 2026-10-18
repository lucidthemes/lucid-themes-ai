import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useIngestJobNewStore } from '../store/ingest-job-new.store';

export default function DocumentationIngestJobNewBackButton() {
  const resetIngestJobOption = useIngestJobNewStore((state) => state.resetIngestJobOption);

  return (
    <Button variant="ghost" className="cursor-pointer" onClick={resetIngestJobOption}>
      <ArrowLeft /> Back
    </Button>
  );
}
