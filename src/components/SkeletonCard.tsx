import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <div className="border border-foreground p-6 space-y-3">
      <Skeleton className="h-10 w-10 bg-muted" />
      <Skeleton className="h-5 w-3/4 bg-muted" />
      <Skeleton className="h-4 w-full bg-muted" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 border-b border-foreground/20 py-4">
      <Skeleton className="h-8 w-8 bg-muted" />
      <Skeleton className="h-4 w-1/3 bg-muted" />
      <Skeleton className="h-4 w-1/4 bg-muted ml-auto" />
    </div>
  );
}
