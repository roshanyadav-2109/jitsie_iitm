import { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useTeamProfiles, useBoardMembers, useStartupAdvisors } from '@/hooks/useProfiles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type FilterTab = 'all' | 'directors' | 'advisors' | 'executive';

function PersonCard({ name, avatar, designation, organization, linkedinUrl, bio, expertise }: {
  name: string;
  avatar: string | null;
  designation?: string | null;
  organization?: string | null;
  linkedinUrl?: string | null;
  bio?: string | null;
  expertise?: string | null;
}) {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border/50">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="h-16 w-16 text-muted-foreground/40" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-base">{name}</h3>
            {designation && <p className="text-sm text-muted-foreground mt-0.5">{designation}</p>}
            {organization && <p className="text-sm text-muted-foreground">{organization}</p>}
          </div>
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors shrink-0 mt-1">
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
        {expertise && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs font-normal">{expertise}</Badge>
          </div>
        )}
        {bio && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{bio}</p>}
      </div>
    </div>
  );
}

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'directors', label: 'Directors Board' },
  { key: 'advisors', label: 'Advisory Team' },
  { key: 'executive', label: 'Executive Board' },
];

export default function Team() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const { data: profiles, isLoading: profilesLoading } = useTeamProfiles();
  const { data: boardMembers, isLoading: boardLoading } = useBoardMembers();
  const { data: advisors, isLoading: advisorsLoading } = useStartupAdvisors();

  const isLoading = profilesLoading || boardLoading || advisorsLoading;

  const showDirectors = activeTab === 'all' || activeTab === 'directors';
  const showAdvisors = activeTab === 'all' || activeTab === 'advisors';
  const showExecutive = activeTab === 'all' || activeTab === 'executive';

  return (
    <Layout>
      <PageHeader title="Our Leadership Team" />
      <div className="container py-10">

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeTab === tab.key
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'bg-transparent text-muted-foreground border-border hover:border-accent/30 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-4"><SkeletonCard /></div>
            ))}
          </div>
        ) : (
          <>
            {/* Board of Directors */}
            {showDirectors && boardMembers && boardMembers.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-1">Directors Board</h2>
                <p className="text-sm text-muted-foreground mb-6">Leadership and governance of the JITSIE Foundation.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {boardMembers.map((m) => (
                    <PersonCard key={m.id} name={m.full_name} avatar={m.avatar_url} designation={m.designation} organization={m.organization} linkedinUrl={m.linkedin_url} bio={m.bio} />
                  ))}
                </div>
              </section>
            )}

            {/* Advisors */}
            {showAdvisors && advisors && advisors.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-1">Advisory Team</h2>
                <p className="text-sm text-muted-foreground mb-6">Industry experts guiding our startups to success.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {advisors.map((a) => (
                    <PersonCard key={a.id} name={a.full_name} avatar={a.avatar_url} designation={a.designation} organization={a.organization} linkedinUrl={a.linkedin_url} bio={a.bio} expertise={a.expertise} />
                  ))}
                </div>
              </section>
            )}

            {/* Core Team */}
            {showExecutive && profiles && profiles.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-1">Executive Board</h2>
                <p className="text-sm text-muted-foreground mb-6">The team behind day-to-day operations.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {profiles.map((p) => (
                    <PersonCard key={p.id} name={p.full_name || 'Team Member'} avatar={p.avatar_url} />
                  ))}
                </div>
              </section>
            )}

            {/* Empty state when filtered and nothing found */}
            {((activeTab === 'directors' && (!boardMembers || boardMembers.length === 0)) ||
              (activeTab === 'advisors' && (!advisors || advisors.length === 0)) ||
              (activeTab === 'executive' && (!profiles || profiles.length === 0))) && (
              <div className="border border-border/50 rounded-xl p-16 text-center">
                <User className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm">No members listed yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
