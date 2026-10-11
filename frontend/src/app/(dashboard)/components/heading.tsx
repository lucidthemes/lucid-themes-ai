import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface DashboardLayoutHeadingProps {
  heading: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  buttonUrl?: string;
  buttonText?: string;
}

export default function DashboardLayoutHeading({
  heading,
  level = 1,
  buttonUrl,
  buttonText = 'Create',
}: DashboardLayoutHeadingProps) {
  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <div className="flex items-center justify-between font-medium">
      <HeadingTag>{heading}</HeadingTag>
      {buttonUrl && (
        <Link href="ingest/new">
          <Button className="cursor-pointer">
            <Plus /> {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
}
