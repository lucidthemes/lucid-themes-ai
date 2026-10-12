import type { Dispatch, SetStateAction } from 'react';

import { Maximize2, Minimize2, ChevronsLeftRightEllipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocumentationIngestChunksHeader({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <CardHeader>
      <CardTitle>Document chunks</CardTitle>
      <CardDescription>A practical talk on component APIs, accessibility, and shipping faster.</CardDescription>
      <CardAction className="flex gap-5 self-center">
        <Button className="cursor-pointer" variant="secondary" onClick={() => setExpanded((expanded) => !expanded)}>
          {!expanded && (
            <>
              Expand <Maximize2 />
            </>
          )}
          {expanded && (
            <>
              Minimize <Minimize2 />
            </>
          )}
        </Button>

        <Button className="cursor-pointer">
          Generate embeddings <ChevronsLeftRightEllipsis />
        </Button>
      </CardAction>
    </CardHeader>
  );
}
