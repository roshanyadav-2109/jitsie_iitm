import Layout from '@/components/Layout';
import { useTeamProfiles } from '@/hooks/useProfiles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { User } from 'lucide-react';

export default function Team() {
  const { data: profiles, isLoading } = useTeamProfiles();

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-4xl font-serif font-bold mb-8">Board & Team</h1>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : profiles && profiles.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {profiles.map((p) => (
              <div key={p.id} className="border border-foreground p-5 text-center">
                {p.avatar_url ? (
                  <img src={p.avatar_url} alt={p.full_name || ''} className="h-20 w-20 object-cover mx-auto mb-3 border border-foreground" />
                ) : (
                  <div className="h-20 w-20 mx-auto mb-3 border border-foreground flex items-center justify-center bg-secondary">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <h3 className="font-serif font-semibold">{p.full_name || 'Team Member'}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No team members listed yet.</p>
        )}
      </div>
    </Layout>
  );
}
