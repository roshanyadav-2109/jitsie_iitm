import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useInitiatives } from '@/hooks/useInitiatives';
import { SkeletonCard } from '@/components/SkeletonCard';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function Initiatives() {
  const { data: initiatives, isLoading } = useInitiatives();

  return (
    <Layout>
      <PageHeader
        title="Programs & Initiatives."
        description="Structured cohorts, residencies, and mentorship circles empowering the next generation of founders."
        eyebrow="02 · Programs"
      />
      <div className="container py-16 md:py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-background p-8">
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : initiatives && initiatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
            {initiatives.map((item, i) => (
              <Link
                to={`/initiatives/${item.id}`}
                key={item.id}
                className="group bg-background overflow-hidden hover:bg-card transition-colors flex flex-col"
              >
                {item.image_url ? (
                  <div className="aspect-[4/3] bg-muted overflow-hidden border-b border-foreground/5">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-primary relative overflow-hidden border-b border-foreground/5">
                    <div className="absolute inset-0 grid-pattern opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-accent" strokeWidth={1.2} />
                    </div>
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                    Programme · 0{i + 1}
                  </p>
                  <h3 className="font-serif text-2xl font-bold leading-tight mb-3 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-primary group-hover:text-accent transition-colors">
                    Learn more
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-foreground/15 p-20 text-center">
            <Sparkles className="h-6 w-6 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">No initiatives published yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
