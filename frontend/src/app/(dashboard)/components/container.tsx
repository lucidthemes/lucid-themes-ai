import { cn } from 'cn';

export default function DashboardLayoutContainer({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('container mx-auto', className)} {...props}>
      {children}
    </div>
  );
}
