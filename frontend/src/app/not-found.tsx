import Link from 'next/link';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';

export default function NotFoundPage() {
  return (
    <Empty className="h-screen">
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>The page you&apos;re looking for doesn&apos;t exist.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          Need help? <Link href="/">Contact support</Link>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
