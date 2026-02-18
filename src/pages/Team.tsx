import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useTeamProfiles, useBoardMembers, useStartupAdvisors } from '@/hooks/useProfiles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BoardMember, StartupAdvisor } from '@/lib/types';

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

export default function Team() {
  const { data: profiles, isLoading: profilesLoading } = useTeamProfiles();
  const { data: boardMembers, isLoading: boardLoading } = useBoardMembers();
  const { data: advisors, isLoading: advisorsLoading } = useStartupAdvisors();

  return (
    <Layout>
      <PageHeader title="Our Leadership Team" />
      <div className="container py-10">

        {/* Board of Directors */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Board of Directors</h2>
            <p className="text-sm text-muted-foreground mt-1">Leadership and governance of the JITSIE Foundation.</p>
          </div>
          {boardLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-4"><SkeletonCard /></div>
              ))}
            </div>
          ) : boardMembers && boardMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {boardMembers.map((m) => (
                <PersonCard key={m.id} name={m.full_name} avatar={m.avatar_url} designation={m.designation} organization={m.organization} linkedinUrl={m.linkedin_url} bio={m.bio} />
              ))}
            </div>
          ) : (
            <div className="border border-border/50 rounded-xl p-12 text-center">
              <p className="text-muted-foreground text-sm">No board members listed yet.</p>
            </div>
          )}
        </section>

        {/* Advisors & Mentors */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Advisors & Mentors</h2>
            <p className="text-sm text-muted-foreground mt-1">Industry experts guiding our startups to success.</p>
          </div>
          {advisorsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-4"><SkeletonCard /></div>
              ))}
            </div>
          ) : advisors && advisors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {advisors.map((a) => (
                <PersonCard key={a.id} name={a.full_name} avatar={a.avatar_url} designation={a.designation} organization={a.organization} linkedinUrl={a.linkedin_url} bio={a.bio} expertise={a.expertise} />
              ))}
            </div>
          ) : (
            <div className="border border-border/50 rounded-xl p-12 text-center">
              <p className="text-muted-foreground text-sm">No advisors listed yet.</p>
            </div>
          )}
        </section>

        {/* Core Team */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Core Team</h2>
            <p className="text-sm text-muted-foreground mt-1">The team behind day-to-day operations.</p>
          </div>
          {profilesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-4"><SkeletonCard /></div>
              ))}
            </div>
          ) : profiles && profiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {profiles.map((p) => (
                <PersonCard key={p.id} name={p.full_name || 'Team Member'} avatar={p.avatar_url} />
              ))}
            </div>
          ) : (
            <div className="border border-border/50 rounded-xl p-16 text-center">
              <User className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-sm">No team members listed yet.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
