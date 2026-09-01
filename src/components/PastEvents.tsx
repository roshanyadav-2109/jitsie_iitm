import { format } from 'date-fns';
import { RiMapPin2Line } from 'react-icons/ri';
import type { Event } from '@/lib/types';

/** Past events, most recent first, with the account of JITSIE's role in each. */
export default function PastEvents({ events }: { events: Event[] }) {
  if (events.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-xl font-semibold">Where we&rsquo;ve been</h2>

      <div className="divide-y divide-border/60">
        {events.map((e) => {
          const when = new Date(e.date_time);
          return (
            <article key={e.id} className="py-6 first:pt-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                {format(when, 'MMMM d, yyyy')}
              </p>

              <h3 className="mt-1.5 text-lg font-semibold leading-snug">{e.title}</h3>

              {e.summary && (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {e.summary}
                </p>
              )}

              {e.location && (
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <RiMapPin2Line className="h-3.5 w-3.5" />
                  {e.location}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
