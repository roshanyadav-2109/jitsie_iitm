import Layout from '@/components/Layout';
import { useTeamProfiles, useBoardMembers, useStartupAdvisors } from '@/hooks/useProfiles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BoardMember, StartupAdvisor } from '@/lib/types';

function BoardMemberCard({ member }: { member: BoardMember }) {
  return (
    <div className="bg-background border border-foreground/10 p-6 group hover:border-foreground/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        {member.avatar_url ? (
          <img
            src={member.avatar_url}
            alt={member.full_name}
            className="h-20 w-20 object-cover grayscale group-hover:grayscale-0 transition-all"
          />
        ) : (
          <div className="h-20 w-20 bg-secondary flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
      <h3 className="font-serif font-bold text-base">{member.full_name}</h3>
      {member.designation && (
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">{member.designation}</p>
      )}
      {member.organization && (
        <p className="text-sm text-muted-foreground mt-1">{member.organization}</p>
      )}
      {member.bio && (
        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{member.bio}</p>
      )}
    </div>
  );
}

function AdvisorCard({ advisor }: { advisor: StartupAdvisor }) {
  return (
    <div className="bg-background border border-foreground/10 p-5 group hover:border-foreground/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        {advisor.avatar_url ? (
          <img
            src={advisor.avatar_url}
            alt={advisor.full_name}
            className="h-16 w-16 object-cover grayscale group-hover:grayscale-0 transition-all"
          />
        ) : (
          <div className="h-16 w-16 bg-secondary flex items-center justify-center">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        {advisor.linkedin_url && (
          <a
            href={advisor.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
      <h3 className="font-serif font-bold text-sm">{advisor.full_name}</h3>
      {advisor.designation && (
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">{advisor.designation}</p>
      )}
      {advisor.organization && (
        <p className="text-sm text-muted-foreground mt-1">{advisor.organization}</p>
      )}
      {advisor.expertise && (
        <div className="mt-2">
          <Badge variant="outline" className="text-xs font-normal">{advisor.expertise}</Badge>
        </div>
      )}
      {advisor.bio && (
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{advisor.bio}</p>
      )}
    </div>
  );
}

export default function Team() {
  const { data: profiles, isLoading: profilesLoading } = useTeamProfiles();
  const { data: boardMembers, isLoading: boardLoading } = useBoardMembers();
  const { data: advisors, isLoading: advisorsLoading } = useStartupAdvisors();

  return (
    <Layout>
      <div className="container py-10">
        {/* Page Header */}
        <div className="mb-12 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">People</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Board & Team</h1>
          <p className="text-muted-foreground mt-2">
            The people building and guiding the JITSIE ecosystem.
          </p>
        </div>

        {/* Board of Directors */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold">Board of Directors</h2>
            <p className="text-sm text-muted-foreground mt-1">Leadership and governance of the JITSIE Foundation.</p>
          </div>
          {boardLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-foreground/10 p-6"><SkeletonCard /></div>
              ))}
            </div>
          ) : boardMembers && boardMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {boardMembers.map((m) => <BoardMemberCard key={m.id} member={m} />)}
            </div>
          ) : (
            <div className="border border-foreground/10 p-12 text-center">
              <p className="text-muted-foreground text-sm">No board members listed yet.</p>
            </div>
          )}
        </section>

        {/* Advisors & Mentors */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold">Advisors & Mentors</h2>
            <p className="text-sm text-muted-foreground mt-1">Industry experts guiding our startups to success.</p>
          </div>
          {advisorsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border border-foreground/10 p-5"><SkeletonCard /></div>
              ))}
            </div>
          ) : advisors && advisors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {advisors.map((a) => <AdvisorCard key={a.id} advisor={a} />)}
            </div>
          ) : (
            <div className="border border-foreground/10 p-12 text-center">
              <p className="text-muted-foreground text-sm">No advisors listed yet.</p>
            </div>
          )}
        </section>

        {/* Core Team */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold">Core Team</h2>
            <p className="text-sm text-muted-foreground mt-1">The team behind day-to-day operations.</p>
          </div>
          {profilesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-background p-6"><SkeletonCard /></div>
              ))}
            </div>
          ) : profiles && profiles.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
              {profiles.map((p) => (
                <div key={p.id} className="bg-background p-6 text-center group">
                  {p.avatar_url ? (
                    <img
                      src={p.avatar_url}
                      alt={p.full_name || ''}
                      className="h-20 w-20 object-cover mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <div className="h-20 w-20 mx-auto mb-4 bg-secondary flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <h3 className="font-serif font-semibold text-sm">{p.full_name || 'Team Member'}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-foreground/10 p-16 text-center">
              <User className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-sm">No team members listed yet.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
