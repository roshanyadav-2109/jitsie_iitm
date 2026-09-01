import { cn } from '@/lib/utils';

/**
 * The JITSIE lockup: the hexagon mark paired with live type.
 *
 * The wordmark is set in the site's own faces rather than baked into the image —
 * the only artwork we have is a 200px raster, and its text goes soft at any size
 * the header actually uses.
 *
 * `tile` reproduces the logo's black card (white mark, white type) for light
 * surfaces; `plain` drops the card and inherits the current text colour, for
 * grounds that are already dark.
 */
export default function Logo({
  variant = 'tile',
  className,
}: {
  variant?: 'tile' | 'plain';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2',
        variant === 'tile' && 'bg-foreground text-background rounded-sm px-2.5 py-1.5',
        className
      )}
    >
      <img src="/jitsie-mark.png" alt="" className="h-7 w-auto shrink-0" />
      <span className="border-l border-white/30 pl-2 leading-none">
        <span className="block font-serif font-semibold text-[13px] tracking-[0.08em]">JITSIE</span>
        <span className="block font-serif font-semibold text-[13px] tracking-[0.08em] mt-0.5">IITM</span>
      </span>
      <span className="sr-only">JITSIE IIT Madras</span>
    </span>
  );
}
