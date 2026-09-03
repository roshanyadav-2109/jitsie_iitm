import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useInitiatives } from '@/hooks/useInitiatives';
import { SkeletonCard } from '@/components/SkeletonCard';
import { RiArrowRightLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Initiatives() {
  usePageTitle("Initiatives");
  const { data: initiatives, isLoading } = useInitiatives();

  return (
    <Layout>
      <div className="container py-10">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Initiatives</h1>
          <p className="mt-2 text-muted-foreground">
            Programs and cohorts empowering the next generation of founders.
          </p>
        </header>

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
                className="border border-foreground/10 rounded-2xl overflow-hidden bg-card hover:shadow-md transition-shadow"
              >
                {item.image_url && (
                  <div className="p-3 pb-0">
                    <div className="aspect-video bg-muted overflow-hidden rounded-xl">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  {(item.overview || item.description) && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {item.overview || item.description}
                    </p>
                  )}
                  <Link to={`/initiatives/${item.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      Learn More <RiArrowRightLine className="h-3 w-3" />
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
