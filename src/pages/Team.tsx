import Layout from '@/components/Layout';
import { useBoardMembers, useStartupAdvisors, useExecutiveBoard } from '@/hooks/useProfiles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { RiUser3Line } from 'react-icons/ri';
import LinkedInIcon from '@/components/LinkedInIcon';
import PersonAvatar from '@/components/PersonAvatar';
import { Badge } from '@/components/ui/badge';

function PersonCard({ name, avatar, avatarPosition, designation, organization, linkedinUrl, bio, expertise, tag }: {
  name: string;
  avatar: string | null;
  avatarPosition?: string | null;
  designation?: string | null;
  organization?: string | null;
  linkedinUrl?: string | null;
  bio?: string | null;
  expertise?: string | null;
  tag?: string;
}) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-foreground/10">
      <div className="p-3 pb-0">
        <div className="aspect-square overflow-hidden rounded-xl">
          <PersonAvatar name={name} src={avatar} position={avatarPosition} />
        </div>
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
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 mt-0.5 opacity-90 hover:opacity-100 transition-opacity">
              <LinkedInIcon className="h-5 w-5" />
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
  const { data: boardMembers, isLoading: boardLoading } = useBoardMembers();
  const { data: advisors, isLoading: advisorsLoading } = useStartupAdvisors();
  const { data: execMembers, isLoading: execLoading } = useExecutiveBoard();

  const isLoading = boardLoading || advisorsLoading || execLoading;

  // one grid, with each person's board carried as a tag on their own card
  const members = [
    ...(boardMembers || []).map((m) => ({
      ...m, tag: 'Directors Board', name: m.full_name, avatar: m.avatar_url,
      avatarPosition: m.avatar_position, linkedinUrl: m.linkedin_url, expertise: null as string | null,
    })),
    ...(advisors || []).map((a) => ({
      ...a, tag: 'Advisory Board', name: a.full_name, avatar: a.avatar_url,
      avatarPosition: null as string | null, linkedinUrl: a.linkedin_url,
    })),
    ...(execMembers || []).map((e) => ({
      ...e, tag: 'Executive Board', name: e.full_name, avatar: e.avatar_url,
      avatarPosition: null as string | null, linkedinUrl: e.linkedin_url, expertise: null as string | null,
    })),
  ];

  return (
    <Layout>
      <div className="container py-10">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Our Leadership Team</h1>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-4"><SkeletonCard /></div>
            ))}
          </div>
        ) : members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {members.map((m) => (
              <PersonCard
                key={m.id + m.tag}
                name={m.name}
                avatar={m.avatar}
                avatarPosition={m.avatarPosition}
                designation={m.designation}
                organization={m.organization}
                linkedinUrl={m.linkedinUrl}
                bio={m.bio}
                expertise={m.expertise}
                tag={m.tag}
              />
            ))}
          </div>
        ) : (
          <div className="border border-foreground/10 rounded-2xl p-16 text-center">
            <RiUser3Line className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">No members listed yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
