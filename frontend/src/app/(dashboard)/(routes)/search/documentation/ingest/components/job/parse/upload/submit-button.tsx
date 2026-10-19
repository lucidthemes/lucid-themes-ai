import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export default function DocumentationIngestJobParseUploadFormSubmitButton({ isPending }: { isPending?: boolean }) {
  return (
    <CardFooter className="justify-end p-0">
      <Button type="submit" className="cursor-pointer">
        {isPending && <Spinner />}
        Send to LlamaParse
        <Send />
      </Button>
    </CardFooter>
  );
}
