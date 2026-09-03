import Layout from '@/components/Layout';
import { usePastSpeakers } from '@/hooks/usePastSpeakers';
import { SkeletonCard } from '@/components/SkeletonCard';
import LinkedInIcon from '@/components/LinkedInIcon';
import PersonAvatar from '@/components/PersonAvatar';
import LogoMarquee from '@/components/LogoMarquee';
import { usePartners } from '@/hooks/usePartners';
import { findLogos } from '@/lib/companyLogo';
import { useSpeakerCompanies } from '@/hooks/useSpeakerCompanies';
import type { PastSpeaker } from '@/lib/types';
import { usePageTitle } from "@/hooks/usePageTitle";

function SpeakerCard({ speaker, logos }: { speaker: PastSpeaker; logos: { name: string; url: string }[] }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-foreground/10">
      <div className="p-3 pb-0">
        <div className="aspect-square overflow-hidden rounded-xl">
          <PersonAvatar
            name={speaker.full_name}
            src={speaker.avatar_url}
            position={speaker.avatar_position}
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-base">{speaker.full_name}</h3>
            {speaker.designation && (
              <p className="text-sm text-muted-foreground mt-0.5">{speaker.designation}</p>
            )}
            {logos.length > 0 ? (
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                {logos.map((c) => (
                  <img
                    key={c.name}
                    src={c.url}
                    alt={c.name}
                    title={c.name}
                    className="h-6 w-auto max-w-20 object-contain object-left"
                  />
                ))}
              </div>
            ) : (
              speaker.organization && (
                <p className="text-sm text-muted-foreground">{speaker.organization}</p>
              )
            )}
          </div>
          {speaker.linkedin_url && (
            <a
              href={speaker.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-0.5 opacity-90 hover:opacity-100 transition-opacity"
            >
              <LinkedInIcon className="h-5 w-5" />
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
  usePageTitle("Past Speakers");
  const { data: speakers, isLoading } = usePastSpeakers();
  const { data: companies } = useSpeakerCompanies();
  const { data: partners } = usePartners();

  return (
    <Layout>
      <div className="container py-10">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Past Speakers</h1>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-4"><SkeletonCard /></div>
            ))}
          </div>
        ) : speakers && speakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {speakers.map((s) => (
              <SpeakerCard key={s.id} speaker={s} logos={findLogos(s.companies, companies, partners)} />
            ))}
          </div>
        ) : (
          <div className="border border-border/50 rounded-xl p-16 text-center">
            <p className="text-muted-foreground text-sm">No past speakers listed yet.</p>
          </div>
        )}

        {companies && companies.length > 0 && (
          <div className="mt-14 pt-10 border-t border-border/50">
            <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-6">
              Where our speakers come from
            </p>
            <LogoMarquee companies={companies} />
          </div>
        )}
      </div>
    </Layout>
  );
}
