import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useArticles } from '@/hooks/useArticles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export default function Library() {
  const { data: articles, isLoading } = useArticles();

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Essays & Guides</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Knowledge Library</h1>
          <p className="text-muted-foreground mt-2">Insights from founders, investors, and the JITSIE community.</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="border-t border-foreground">
            {articles.map((a, i) => (
              <Link
                key={a.id}
                to={`/library/${a.slug}`}
                className="block py-6 border-b border-foreground/10 hover:bg-secondary/30 transition-colors -mx-4 px-4 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2">
                      <span className="font-mono">{String(i + 1).padStart(2, '0')}</span>
                      {a.published_at && (
                        <span>{format(new Date(a.published_at), 'MMM d, yyyy')}</span>
                      )}
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl font-semibold leading-tight group-hover:text-accent transition-colors">
                      {a.title}
                    </h2>
                    {a.author && (
                      <p className="text-sm text-muted-foreground mt-2">By {a.author}</p>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-6 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No articles yet.</p>
        )}
      </div>
    </Layout>
  );
}
