import { ChevronsLeftRightEllipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

export default function DocumentationIngestChunksFooter() {
  return (
    <CardFooter className="justify-end">
      <Button className="cursor-pointer">
        Generate embeddings <ChevronsLeftRightEllipsis />
      </Button>
    </CardFooter>
  );
}
