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

  let headingSizeClass = 'text-3xl';

  switch (level) {
    case 1:
      headingSizeClass = 'text-3xl';
      break;
    case 2:
      headingSizeClass = 'text-2xl';
      break;
    case 3:
      headingSizeClass = 'text-xl';
      break;
    case 4:
      headingSizeClass = 'text-lg';
      break;
    case 5:
      headingSizeClass = 'text-base';
      break;
    case 6:
      headingSizeClass = 'text-sm';
      break;
  }

  return (
    <div className="mb-10 flex items-center justify-between font-medium">
      <HeadingTag className={headingSizeClass}>{heading}</HeadingTag>
      {buttonUrl && (
        <Link href={buttonUrl}>
          <Button className="cursor-pointer">
            <Plus /> {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
}
