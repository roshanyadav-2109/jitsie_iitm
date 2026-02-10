import Layout from '@/components/Layout';
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
      <div className="container py-10 max-w-3xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Community</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Events</h1>
          <p className="text-muted-foreground mt-2">Workshops, demo days, and networking — on campus and online.</p>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : events && events.length > 0 ? (
          <div className="border-t border-foreground">
            {events.map((e) => {
              const past = isPast(new Date(e.date_time));
              return (
                <div
                  key={e.id}
                  className={`py-6 border-b border-foreground/10 ${past ? 'opacity-50' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-mono bg-foreground text-background px-1.5 py-0.5">
                          {format(new Date(e.date_time), 'MMM d')}
                        </span>
                        {past && (
                          <span className="text-[11px] text-muted-foreground">PAST</span>
                        )}
                      </div>
                      <h2 className="font-serif text-lg font-semibold">{e.title}</h2>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(e.date_time), 'h:mm a')}
                        </span>
                        {e.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {e.location}
                          </span>
                        )}
                      </div>
                    </div>
                    {!past && (
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2.5 text-xs border-foreground/20"
                          onClick={() => downloadICS(e)}
                        >
                          <CalendarPlus className="h-3 w-3 mr-1" />
                          .ics
                        </Button>
                        {e.registration_link && (
                          <a href={e.registration_link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="h-7 px-3 text-xs bg-foreground text-background hover:bg-foreground/90">
                              Register <ArrowUpRight className="h-3 w-3 ml-0.5" />
                            </Button>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No upcoming events.</p>
        )}
      </div>
    </Layout>
  );
}
