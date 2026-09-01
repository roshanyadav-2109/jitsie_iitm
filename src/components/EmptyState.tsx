import { Button } from '@/components/ui/button';
import { RiCloseLine } from 'react-icons/ri';

type ActiveFilter = {
  label: string;
  value: string;
  onClear: () => void;
};

type EmptyStateProps = {
  /** Shown when at least one filter is narrowing the list. */
  title: string;
  description: string;
  /** Shown when the list is empty on its own, with no filters applied. */
  emptyTitle?: string;
  emptyDescription?: string;
  filters?: ActiveFilter[];
  onClearAll?: () => void;
};

/**
 * Shown when a filtered list comes back empty. The illustration is drawn inline
 * rather than pulled from an icon set so it can carry the same hairline weight
 * as the rest of the page.
 */
export default function EmptyState({
  title,
  description,
  emptyTitle,
  emptyDescription,
  filters = [],
  onClearAll,
}: EmptyStateProps) {
  const active = filters.filter((f) => f.value && f.value !== 'All');
  const heading = active.length === 0 ? emptyTitle ?? title : title;
  const body = active.length === 0 ? emptyDescription ?? description : description;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <svg
        width="132"
        height="96"
        viewBox="0 0 132 96"
        fill="none"
        aria-hidden="true"
        className="text-foreground"
      >
        {/* three result cards — the last one empty, dashed, unfilled */}
        <rect x="1" y="13" width="36" height="52" stroke="currentColor" strokeOpacity="0.18" />
        <rect x="45" y="13" width="36" height="52" stroke="currentColor" strokeOpacity="0.18" />
        <rect
          x="89"
          y="13"
          width="36"
          height="52"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeDasharray="4 4"
        />
        {/* content rules inside the two filled cards */}
        <line x1="8" y1="26" x2="24" y2="26" stroke="currentColor" strokeOpacity="0.18" />
        <line x1="8" y1="34" x2="30" y2="34" stroke="currentColor" strokeOpacity="0.12" />
        <line x1="8" y1="42" x2="20" y2="42" stroke="currentColor" strokeOpacity="0.12" />
        <line x1="52" y1="26" x2="68" y2="26" stroke="currentColor" strokeOpacity="0.18" />
        <line x1="52" y1="34" x2="74" y2="34" stroke="currentColor" strokeOpacity="0.12" />
        <line x1="52" y1="42" x2="64" y2="42" stroke="currentColor" strokeOpacity="0.12" />
        {/* magnifier over the empty slot, in the accent */}
        <circle cx="107" cy="39" r="13" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" />
        <line
          x1="116.5"
          y1="48.5"
          x2="125"
          y2="57"
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <h3 className="mt-8 font-serif text-2xl font-semibold tracking-tight">{heading}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{body}</p>

      {active.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {active.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={f.onClear}
              className="group inline-flex items-center gap-1.5 border border-foreground/15 px-3 py-1.5 text-xs transition-colors"
            >
              <span className="uppercase tracking-[0.14em] text-muted-foreground">{f.label}</span>
              <span className="font-medium">{f.value}</span>
              <RiCloseLine className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
            </button>
          ))}
        </div>
      )}

      {onClearAll && active.length > 0 && (
        <Button
          variant="outline"
          onClick={onClearAll}
          className="mt-6 h-10 border-foreground px-6 text-sm"
        >
          Clear all filters
        </Button>
      )}
    </div>
  );
}
