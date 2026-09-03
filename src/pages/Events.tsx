import Layout from '@/components/Layout';
import { useEvents } from '@/hooks/useEvents';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { downloadICS } from '@/lib/calendar';
import { format, isPast } from 'date-fns';
import { RiCalendarEventLine, RiArrowRightUpLine, RiMapPin2Line, RiTimeLine } from 'react-icons/ri';
import type { Event } from '@/lib/types';
import EmptyEvents from '@/components/EmptyEvents';
import PastEvents from '@/components/PastEvents';
import { usePageTitle } from "@/hooks/usePageTitle";

function EventRow({ event }: { event: Event }) {
  const when = new Date(event.date_time);

  return (
    <div className="flex flex-col gap-4 py-6 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-4">
        <div className="w-14 shrink-0 rounded-lg bg-accent/10 px-2 py-2 text-center">
          <div className="text-lg font-semibold leading-none text-accent">
            {format(when, 'd')}
          </div>
          <div className="mt-1 text-[11px] uppercase text-accent/80">{format(when, 'MMM')}</div>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-snug md:text-lg">{event.title}</h2>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <RiTimeLine className="h-3.5 w-3.5" />
              {format(when, 'h:mm a, yyyy')}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <RiMapPin2Line className="h-3.5 w-3.5" />
                {event.location}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 pl-[4.5rem] md:pl-0">
        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => downloadICS(event)}>
          <RiCalendarEventLine className="mr-1.5 h-3.5 w-3.5" />
          Add to calendar
        </Button>
        {event.registration_link && (
          <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="h-8 text-xs">
              Register <RiArrowRightUpLine className="ml-1 h-3.5 w-3.5" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  usePageTitle("Events");
  const { data: events, isLoading } = useEvents();

  const upcoming = events?.filter((e) => !isPast(new Date(e.date_time))) ?? [];
  const past = [...(events?.filter((e) => isPast(new Date(e.date_time))) ?? [])].reverse();

  return (
    <Layout>
      <div className="container py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Events</h1>
        </header>

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-14 w-14 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {upcoming.length > 0 ? (
              <div className="divide-y divide-border/60">
                {upcoming.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </div>
            ) : (
              <EmptyEvents />
            )}

            <PastEvents events={past} />
          </>
        )}
      </div>
    </Layout>
  );
}
