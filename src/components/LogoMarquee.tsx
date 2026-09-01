import type { SpeakerCompany } from '@/lib/types';

/**
 * Continuously scrolling strip of company logos, each paired with its name. The
 * track holds two copies of the list and slides one full copy's width, so the
 * loop is seamless.
 */
export default function LogoMarquee({ companies }: { companies: SpeakerCompany[] }) {
  if (companies.length === 0) return null;

  const track = [...companies, ...companies];

  return (
    <div className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max items-center gap-10 animate-marquee-ltr group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((c, i) => (
          <div
            key={`${c.id}-${i}`}
            className="shrink-0 flex items-center gap-3 pr-10 border-r border-border/40"
            aria-hidden={i >= companies.length}
          >
            <div className="h-12 shrink-0 flex items-center justify-center">
              <img
                src={c.logo_url}
                alt={i < companies.length ? c.name : ''}
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
