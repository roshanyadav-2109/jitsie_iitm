import Layout from '@/components/Layout';
import { usePastSpeakers } from '@/hooks/usePastSpeakers';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User, Linkedin } from 'lucide-react';
import type { PastSpeaker } from '@/lib/types';

function SpeakerCard({ speaker }: { speaker: PastSpeaker }) {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border/50">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {speaker.avatar_url ? (
          <img
            src={speaker.avatar_url}
            alt={speaker.full_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="h-16 w-16 text-muted-foreground/40" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-base">{speaker.full_name}</h3>
            {speaker.designation && (
              <p className="text-sm text-muted-foreground mt-0.5">{speaker.designation}</p>
            )}
            {speaker.organization && (
              <p className="text-sm text-muted-foreground">{speaker.organization}</p>
            )}
          </div>
          {speaker.linkedin_url && (
            <a
              href={speaker.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors shrink-0 mt-1"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
        {speaker.topic && (
          <p className="text-xs text-accent mt-2 font-medium">"{speaker.topic}"</p>
        )}
      </div>
    </div>
  );
}

export default function PastSpeakers() {
  const { data: speakers, isLoading } = usePastSpeakers();

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-12 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Community</p>
          <h1 className="text-4xl md:text-5xl font-bold">Past Speakers</h1>
          <p className="text-muted-foreground mt-2">
            Industry leaders and experts who have shared their insights with the JITSIE community.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-4"><SkeletonCard /></div>
            ))}
          </div>
        ) : speakers && speakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {speakers.map((s) => <SpeakerCard key={s.id} speaker={s} />)}
          </div>
        ) : (
          <div className="border border-border/50 rounded-xl p-16 text-center">
            <p className="text-muted-foreground text-sm">No past speakers listed yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
