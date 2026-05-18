import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useInitiativeDetail } from '@/hooks/useInitiativeDetail';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function InitiativeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: initiative, isLoading } = useInitiativeDetail(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 max-w-4xl space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-14 w-2/3" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Layout>
    );
  }

  if (!initiative) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <Sparkles className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-serif text-3xl font-bold">Initiative not found</h1>
          <Link to="/initiatives" className="text-accent text-sm hover:underline mt-4 inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to Initiatives
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground relative overflow-hidden noise">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="container relative py-16 md:py-24">
          <Link
            to="/initiatives"
            className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 hover:text-accent mb-8 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Programs
          </Link>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
            JITSIE · Programme
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight max-w-4xl">
            {initiative.title}
          </h1>
        </div>
      </div>

      <div className="container py-16 md:py-20 max-w-4xl">
        {initiative.image_url && (
          <div className="overflow-hidden bg-muted mb-12 border border-foreground/10">
            <img
              src={initiative.image_url}
              alt={initiative.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        )}

        {initiative.description && (
          <div className="prose prose-neutral max-w-none">
            <p className="font-serif text-lg md:text-xl leading-[1.85] whitespace-pre-line text-pretty">
              {initiative.description}
            </p>
          </div>
        )}

        {initiative.link && (
          <div className="mt-12 pt-8 border-t border-foreground/10">
            <a href={initiative.link} target="_blank" rel="noopener noreferrer">
              <Button className="h-12 px-7 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[12px] uppercase tracking-[0.2em] font-medium group">
                Visit Programme
                <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
