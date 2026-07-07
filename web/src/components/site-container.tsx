import { cn } from '@/lib/utils';

type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function SiteContainer({ children, className }: SiteContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-20',
        className,
      )}
    >
      {children}
    </div>
  );
}
