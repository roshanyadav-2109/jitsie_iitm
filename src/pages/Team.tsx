import Layout from '@/components/Layout';
import { useTeamProfiles } from '@/hooks/useProfiles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User } from 'lucide-react';

export default function Team() {
  const { data: profiles, isLoading } = useTeamProfiles();

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-10 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">People</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Board & Team</h1>
          <p className="text-muted-foreground mt-2">
            The people building and guiding the JITSIE ecosystem.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-background p-6">
                <SkeletonCard />
              </div>
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
      </div>
    </Layout>
  );
}
