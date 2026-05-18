import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useEvents } from '@/hooks/useEvents';
import { SkeletonRow } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { downloadICS } from '@/lib/calendar';
import { format, isPast } from 'date-fns';
import { CalendarPlus, ArrowUpRight, MapPin, Clock } from 'lucide-react';

export default function Events() {
  const { data: events, isLoading } = useEvents();

  return (
    <Layout>
      <PageHeader
        title="Events & Convenings."
        description="Lectures, residencies, demo days, and intimate convenings hosted by JITSIE at IIT Madras."
        eyebrow="04 · The Calendar"
      />
      <div className="container py-16 md:py-20 max-w-4xl">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <div className="border-t border-foreground/15">
            {events.map((e) => {
              const d = new Date(e.date_time);
              const past = isPast(d);
              return (
                <div
                  key={e.id}
                  className={`group grid grid-cols-12 gap-6 py-8 border-b border-foreground/10 items-center transition-colors hover:bg-card ${
                    past ? 'opacity-55' : ''
                  }`}
                >
                  <div className="col-span-12 md:col-span-2">
                    <div className="font-serif text-4xl md:text-5xl font-bold leading-none text-primary">
                      {format(d, 'dd')}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                      {format(d, 'MMM yyyy')}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-7">
                    <div className="flex items-center gap-3 mb-2">
                      {past && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          Past
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl font-bold leading-tight group-hover:text-accent transition-colors">
                      {e.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {format(d, 'h:mm a')}
                      </span>
                      {e.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {e.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-3 flex md:justify-end items-center gap-2">
                    {!past && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 text-[11px] uppercase tracking-[0.18em] rounded-none text-muted-foreground hover:text-foreground"
                          onClick={() => downloadICS(e)}
                        >
                          <CalendarPlus className="h-3.5 w-3.5 mr-1.5" />
                          Add to Calendar
                        </Button>
                        {e.registration_link && (
                          <a href={e.registration_link} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              className="h-9 px-4 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[11px] uppercase tracking-[0.2em] font-medium"
                            >
                              RSVP <ArrowUpRight className="h-3 w-3 ml-1.5" />
                            </Button>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground py-20 text-center">No upcoming events.</p>
        )}
      </div>
    </Layout>
  );
}
