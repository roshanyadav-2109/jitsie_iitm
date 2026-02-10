import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useArticles } from '@/hooks/useArticles';
import { SkeletonCard } from '@/components/SkeletonCard';
import { format } from 'date-fns';

export default function Library() {
  const { data: articles, isLoading } = useArticles();

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Knowledge Library</h1>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="space-y-0">
            {articles.map((a) => (
              <Link
                key={a.id}
                to={`/library/${a.slug}`}
                className="block py-5 border-b border-foreground/10 hover:bg-secondary/30 transition-colors -mx-4 px-4"
              >
                <h2 className="font-serif text-xl font-semibold">{a.title}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  {a.author && <span>{a.author}</span>}
                  {a.published_at && (
                    <>
                      <span>·</span>
                      <span>{format(new Date(a.published_at), 'MMM d, yyyy')}</span>
                    </>
                  )}
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
