import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface StickyMobileCtaProps {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  external?: boolean;
}

/**
 * The sidebar CTA (apply for support / post an opening) sits below the fold
 * on mobile, where the filters column stacks above the results instead of
 * beside them. Pinning a compact version to the bottom of the viewport keeps
 * it reachable without scrolling, the way a mobile app's bottom bar would.
 */
export default function StickyMobileCta({ title, description, buttonLabel, href, external }: StickyMobileCtaProps) {
  const button = (
    <Button size="sm" className="h-9 shrink-0 px-4 text-xs">
      {buttonLabel}
    </Button>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{description}</p>
        </div>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="shrink-0">
            {button}
          </a>
        ) : (
          <Link to={href} className="shrink-0">
            {button}
          </Link>
        )}
      </div>
    </div>
  );
}
