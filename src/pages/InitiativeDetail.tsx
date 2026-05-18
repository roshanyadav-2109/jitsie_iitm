import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useInitiativeDetail } from '@/hooks/useInitiativeDetail';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function InitiativeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: initiative, isLoading } = useInitiativeDetail(id);

  if (isLoading) {
    return (
      <Layout>
        <PageHeader title="Initiative" />
        <div className="container py-10 space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Layout>
    );
  }

  if (!initiative) {
    return (
      <Layout>
        <PageHeader title="Not Found" />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground mb-4">Initiative not found.</p>
          <Link to="/initiatives">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Initiatives
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title={initiative.title} />
      <div className="container py-10">
        <Link to="/initiatives" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Initiatives
        </Link>

        {initiative.image_url && (
          <div className="rounded-xl overflow-hidden bg-muted mb-8">
            <img
              src={initiative.image_url}
              alt={initiative.title}
              className="w-full max-h-[400px] object-cover"
            />
          </div>
        )}

        {initiative.description && (
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {initiative.description}
            </p>
          </div>
        )}

        {initiative.link && (
          <div className="mt-8">
            <a href={initiative.link} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                Visit Initiative <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
