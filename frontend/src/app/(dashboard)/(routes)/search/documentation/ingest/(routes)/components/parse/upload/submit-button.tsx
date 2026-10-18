import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export default function DocumentationIngestJobParseUploadFormSubmitButton() {
  return (
    <CardFooter className="justify-end">
      <Button type="submit" className="cursor-pointer">
        <Spinner />
        Send to LlamaParse
        <Send />
      </Button>
    </CardFooter>
  );
}
