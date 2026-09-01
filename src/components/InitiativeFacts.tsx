import {
  RiRoadMapFill,
  RiLoopRightFill,
  RiCalendarEventFill,
  RiEarthFill,
  RiTeamFill,
} from 'react-icons/ri';
import type { IconType } from 'react-icons';
import type { Initiative } from '@/lib/types';

/**
 * Spec strip for an initiative — a ruled band divided into cells, in the manner of
 * a printed index plate rather than a row of tinted cards. One consistent icon
 * style throughout; each cell differs only by its ink colour.
 */
const FACTS: { label: string; key: keyof Initiative; Icon: IconType; ink: string }[] = [
  { label: 'Format', key: 'format', Icon: RiRoadMapFill, ink: 'hsl(193 100% 32%)' },
  { label: 'Cadence', key: 'cadence', Icon: RiLoopRightFill, ink: 'hsl(35 78% 42%)' },
  { label: 'Held', key: 'held', Icon: RiCalendarEventFill, ink: 'hsl(210 26% 28%)' },
  { label: 'Mode', key: 'mode', Icon: RiEarthFill, ink: 'hsl(155 46% 32%)' },
  { label: 'Who can join', key: 'eligibility', Icon: RiTeamFill, ink: 'hsl(6 54% 46%)' },
];

export default function InitiativeFacts({ initiative }: { initiative: Initiative }) {
  const facts = FACTS.filter((f) => initiative[f.key]);
  if (facts.length === 0) return null;

  return (
    <dl className="clear-both mb-14 grid gap-px bg-border border-y border-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {facts.map(({ label, key, Icon, ink }) => (
        <div
          key={label}
          style={{ color: ink }}
          className="group relative overflow-hidden bg-background px-5 py-6"
        >
          {/* colour rule, drawn in on hover */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100"
          />

          <Icon className="h-8 w-8" />

          <dt className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-current">
            {label}
          </dt>
          <dd className="mt-1.5 font-serif text-[15px] leading-snug text-foreground">
            {initiative[key] as string}
          </dd>
        </div>
      ))}
    </dl>
  );
}
