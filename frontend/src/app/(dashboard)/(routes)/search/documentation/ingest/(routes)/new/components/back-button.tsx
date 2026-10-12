import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function DocumentationIngestNewBackButton() {
  return (
    <Link href="/search/documentation/ingest">
      <Button variant="ghost" className="cursor-pointer">
        <ArrowLeft /> Back
      </Button>
    </Link>
  );
}
