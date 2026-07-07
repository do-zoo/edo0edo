import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-6 py-12">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <Skeleton className="h-4 w-full max-w-lg" />
      <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
