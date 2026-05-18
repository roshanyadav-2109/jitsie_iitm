import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { usePastSpeakers } from '@/hooks/usePastSpeakers';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User, Linkedin } from 'lucide-react';
import type { PastSpeaker } from '@/lib/types';

function SpeakerCard({ speaker }: { speaker: PastSpeaker }) {
  return (
    <div className="group bg-background flex flex-col">
      <div className="aspect-[3/4] bg-secondary relative overflow-hidden">
        {speaker.avatar_url ? (
          <img
            src={speaker.avatar_url}
            alt={speaker.full_name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.2} />
          </div>
        )}
        {speaker.linkedin_url && (
          <a
            href={speaker.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${speaker.full_name} on LinkedIn`}
            className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center bg-background/90 backdrop-blur border border-foreground/10 opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div className="pt-5 pb-7">
        <h3 className="font-serif text-lg font-bold leading-tight">{speaker.full_name}</h3>
        {speaker.designation && (
          <p className="text-sm text-muted-foreground mt-1">{speaker.designation}</p>
        )}
        {speaker.organization && (
          <p className="text-xs text-muted-foreground/70 mt-0.5">{speaker.organization}</p>
        )}
        {speaker.topic && (
          <p className="font-serif text-sm italic text-accent mt-3 leading-relaxed">
            "{speaker.topic}"
          </p>
        )}
      </div>
    </div>
  );
}

export default function PastSpeakers() {
  const { data: speakers, isLoading } = usePastSpeakers();

  return (
    <Layout>
      <PageHeader
        title="Voices in Residence."
        description="Founders, investors, scientists, and statesmen who have addressed the JITSIE community."
        eyebrow="05 · The Stage"
      />
      <div className="container py-16 md:py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : speakers && speakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
            {speakers.map((s) => (
              <SpeakerCard key={s.id} speaker={s} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-foreground/15 p-20 text-center">
            <p className="text-muted-foreground text-sm">No past speakers listed yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
