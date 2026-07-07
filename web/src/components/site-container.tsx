import { cn } from '@/lib/utils';

type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function SiteContainer({ children, className }: SiteContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24',
        className,
      )}
    >
      {children}
    </div>
  );
}
