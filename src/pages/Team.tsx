import { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useBoardMembers, useStartupAdvisors, useExecutiveBoard } from '@/hooks/useProfiles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type FilterTab = 'directors' | 'advisors' | 'executive';

function PersonCard({ name, avatar, designation, organization, linkedinUrl, bio, expertise, tag }: {
  name: string;
  avatar: string | null;
  designation?: string | null;
  organization?: string | null;
  linkedinUrl?: string | null;
  bio?: string | null;
  expertise?: string | null;
  tag?: string;
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
        {tag && (
          <Badge variant="secondary" className="text-[10px] font-medium mb-2">{tag}</Badge>
        )}
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
  { key: 'directors', label: 'Directors Board' },
  { key: 'advisors', label: 'Advisory Team' },
  { key: 'executive', label: 'Executive Board' },
];

export default function Team() {
  const [activeTab, setActiveTab] = useState<FilterTab>('directors');
  const { data: boardMembers, isLoading: boardLoading } = useBoardMembers();
  const { data: advisors, isLoading: advisorsLoading } = useStartupAdvisors();
  const { data: execMembers, isLoading: execLoading } = useExecutiveBoard();

  const isLoading = boardLoading || advisorsLoading || execLoading;

  const allMembers = [
    ...(boardMembers || []).map((m) => ({ ...m, category: 'Directors Board' as const, name: m.full_name, avatar: m.avatar_url, linkedinUrl: m.linkedin_url, expertise: null as string | null })),
    ...(advisors || []).map((a) => ({ ...a, category: 'Advisory Board' as const, name: a.full_name, avatar: a.avatar_url, linkedinUrl: a.linkedin_url })),
    ...(execMembers || []).map((e) => ({ ...e, category: 'Exe. Board' as const, name: e.full_name, avatar: e.avatar_url, linkedinUrl: e.linkedin_url, expertise: null as string | null })),
  ];

  const filteredMembers = activeTab === 'directors' ? allMembers.filter(m => m.category === 'Directors Board')
    : activeTab === 'advisors' ? allMembers.filter(m => m.category === 'Advisory Board')
    : allMembers.filter(m => m.category === 'Exe. Board');

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
        ) : filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMembers.map((m) => (
              <PersonCard key={m.id + m.category} name={m.name} avatar={m.avatar} designation={m.designation} organization={m.organization} linkedinUrl={m.linkedinUrl} bio={m.bio} expertise={m.expertise} />
            ))}
          </div>
        ) : (
          <div className="border border-border/50 rounded-xl p-16 text-center">
            <User className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">No members listed yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
