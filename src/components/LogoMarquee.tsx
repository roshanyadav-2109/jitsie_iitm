import { cn } from '@/lib/utils';
import type { SpeakerCompany } from '@/lib/types';

/**
 * Continuously scrolling strip of company logos, each paired with its name. The
 * track holds two copies of the list and slides one full copy's width, so the
 * loop is seamless. `reverse` runs the same keyframe backwards, for a second
 * row that drifts the opposite way.
 */
function Track({ items, reverse }: { items: SpeakerCompany[]; reverse?: boolean }) {
  const track = [...items, ...items];

  return (
    <div className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn(
          'flex w-max items-center gap-10 animate-marquee-ltr group-hover:[animation-play-state:paused] motion-reduce:animate-none',
          reverse && '[animation-direction:reverse]'
        )}
      >
        {track.map((c, i) => (
          <div
            key={`${c.id}-${i}`}
            className="shrink-0 flex items-center gap-3 pr-10 border-r border-border/40"
            aria-hidden={i >= items.length}
          >
            <div className="h-12 shrink-0 flex items-center justify-center">
              <img
                src={c.logo_url}
                alt={i < items.length ? c.name : ''}
                loading="lazy"
                className="h-12 w-auto max-w-40 object-contain"
              />
            </div>
            {c.show_name && (
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
                {c.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee({ companies }: { companies: SpeakerCompany[] }) {
  if (companies.length === 0) return null;

  // Small screens get two shorter rows drifting opposite ways — one long row
  // would need more logos in view at once than a narrow viewport can show.
  const mid = Math.ceil(companies.length / 2);
  const firstHalf = companies.slice(0, mid);
  const secondHalf = companies.slice(mid).length > 0 ? companies.slice(mid) : companies;

  return (
    <>
      <div className="flex flex-col gap-1 sm:hidden">
        <Track items={firstHalf} />
        <Track items={secondHalf} reverse />
      </div>
      <div className="hidden sm:block">
        <Track items={companies} />
      </div>
    </>
  );
}
