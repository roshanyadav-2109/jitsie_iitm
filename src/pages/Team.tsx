import { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useBoardMembers, useStartupAdvisors, useExecutiveBoard } from '@/hooks/useProfiles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User, Linkedin } from 'lucide-react';

type FilterTab = 'directors' | 'advisors' | 'executive';

function PersonCard({
  name,
  avatar,
  designation,
  organization,
  linkedinUrl,
  bio,
  expertise,
}: {
  name: string;
  avatar: string | null;
  designation?: string | null;
  organization?: string | null;
  linkedinUrl?: string | null;
  bio?: string | null;
  expertise?: string | null;
}) {
  return (
    <div className="group bg-background flex flex-col">
      <div className="aspect-[3/4] bg-secondary relative overflow-hidden">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.2} />
          </div>
        )}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center bg-background/90 backdrop-blur border border-foreground/10 opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div className="pt-5 pb-7">
        <h3 className="font-serif text-lg font-bold leading-tight">{name}</h3>
        {designation && (
          <p className="text-sm text-muted-foreground mt-1">{designation}</p>
        )}
        {organization && (
          <p className="text-xs text-muted-foreground/70 mt-0.5">{organization}</p>
        )}
        {expertise && (
          <p className="mt-3 inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-accent border-b border-accent/30 pb-0.5">
            {expertise}
          </p>
        )}
        {bio && (
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed line-clamp-3">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}

const tabs: { key: FilterTab; label: string; tag: string }[] = [
  { key: 'directors', label: 'Directors', tag: '01' },
  { key: 'advisors', label: 'Advisory', tag: '02' },
  { key: 'executive', label: 'Executive', tag: '03' },
];

export default function Team() {
  const [activeTab, setActiveTab] = useState<FilterTab>('directors');
  const { data: boardMembers, isLoading: boardLoading } = useBoardMembers();
  const { data: advisors, isLoading: advisorsLoading } = useStartupAdvisors();
  const { data: execMembers, isLoading: execLoading } = useExecutiveBoard();

  const isLoading = boardLoading || advisorsLoading || execLoading;

  const allMembers = [
    ...(boardMembers || []).map((m) => ({
      ...m,
      category: 'directors' as const,
      name: m.full_name,
      avatar: m.avatar_url,
      linkedinUrl: m.linkedin_url,
      expertise: null as string | null,
    })),
    ...(advisors || []).map((a) => ({
      ...a,
      category: 'advisors' as const,
      name: a.full_name,
      avatar: a.avatar_url,
      linkedinUrl: a.linkedin_url,
    })),
    ...(execMembers || []).map((e) => ({
      ...e,
      category: 'executive' as const,
      name: e.full_name,
      avatar: e.avatar_url,
      linkedinUrl: e.linkedin_url,
      expertise: null as string | null,
    })),
  ];

  const filteredMembers = allMembers.filter((m) => m.category === activeTab);

  return (
    <Layout>
      <PageHeader
        title="Leadership."
        description="The directors, advisors, and operators who shape the institution and its founders."
        eyebrow="03 · The Society"
      />
      <div className="container py-16 md:py-20">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 mb-14 border-b border-foreground/10 pb-1">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="group relative pb-3 -mb-px"
              >
                <span className="flex items-baseline gap-2">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                      active ? 'text-accent' : 'text-muted-foreground'
                    }`}
                  >
                    {tab.tag}
                  </span>
                  <span
                    className={`font-serif text-xl ${
                      active ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </span>
                </span>
                {active && <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
            {filteredMembers.map((m) => (
              <PersonCard
                key={m.id + m.category}
                name={m.name}
                avatar={m.avatar}
                designation={m.designation}
                organization={m.organization}
                linkedinUrl={m.linkedinUrl}
                bio={m.bio}
                expertise={m.expertise}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-foreground/15 p-20 text-center">
            <User className="h-6 w-6 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">No members listed yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
