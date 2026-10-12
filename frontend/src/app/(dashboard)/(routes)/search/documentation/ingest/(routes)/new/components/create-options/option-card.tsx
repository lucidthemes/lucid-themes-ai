import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DocumentationIngestNewCreateOptionCard({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <Card className="relative mx-auto w-full cursor-pointer pt-0 hover:bg-muted">
      <div className="relative inset-0 z-30 aspect-video bg-sidebar">
        {badge && (
          <CardAction className="absolute top-5 right-5">
            <Badge variant="secondary">{badge}</Badge>
          </CardAction>
        )}
      </div>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {/* <CardFooter>
        <Button className="w-full cursor-pointer">Create job</Button>
      </CardFooter> */}
    </Card>
  );
}
