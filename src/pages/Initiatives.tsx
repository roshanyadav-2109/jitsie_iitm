import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useInitiatives } from '@/hooks/useInitiatives';
import { SkeletonCard } from '@/components/SkeletonCard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Initiatives() {
  const { data: initiatives, isLoading } = useInitiatives();

  return (
    <Layout>
      <PageHeader title="Initiatives" description="Programs and cohorts empowering the next generation of founders." />
      <div className="container py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : initiatives && initiatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow"
              >
                {item.image_url && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  )}
                  <Link to={`/initiatives/${item.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      Learn More <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-20">No initiatives yet.</p>
        )}
      </div>
    </Layout>
  );
}
