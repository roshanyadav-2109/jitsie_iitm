import Layout from '@/components/Layout';
import { useEvents } from '@/hooks/useEvents';
import { SkeletonRow } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { downloadICS } from '@/lib/calendar';
import { format } from 'date-fns';
import { CalendarPlus, ExternalLink } from 'lucide-react';

export default function Events() {
  const { data: events, isLoading } = useEvents();

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Events</h1>

        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : events && events.length > 0 ? (
          <div className="space-y-0">
            {events.map((e) => (
              <div key={e.id} className="py-5 border-b border-foreground/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-lg font-semibold">{e.title}</h2>
                  <div className="text-sm text-muted-foreground mt-1">
                    {format(new Date(e.date_time), 'EEEE, MMMM d, yyyy · h:mm a')}
                    {e.location && ` · ${e.location}`}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-foreground"
                    onClick={() => downloadICS(e)}
                  >
                    <CalendarPlus className="h-4 w-4 mr-1" />
                    Calendar
                  </Button>
                  {e.registration_link && (
                    <a href={e.registration_link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                        Register <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No upcoming events.</p>
        )}
      </div>
    </Layout>
  );
}
