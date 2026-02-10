import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useArticleBySlug } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useArticleBySlug(slug || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10 max-w-2xl space-y-4">
          <Skeleton className="h-8 w-1/4 bg-muted" />
          <Skeleton className="h-12 w-3/4 bg-muted" />
          <Skeleton className="h-4 w-1/3 bg-muted" />
          <Skeleton className="h-64 w-full bg-muted mt-4" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-serif font-bold">Article not found</h1>
          <Link to="/library" className="text-accent text-sm hover:underline mt-3 inline-block">
            ← Back to Library
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container py-10 max-w-2xl">
        <Link
          to="/library"
          className="text-xs text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Library
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-4">
            {article.published_at && (
              <span>{format(new Date(article.published_at), 'MMMM d, yyyy')}</span>
            )}
            {article.author && (
              <>
                <span>·</span>
                <span>{article.author}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-[1.1]">
            {article.title}
          </h1>
        </header>

        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full mb-10 border border-foreground/10"
          />
        )}

        <div className="font-serif text-[17px] leading-[1.9] whitespace-pre-wrap text-foreground/90">
          {article.content}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10">
          <Link to="/library" className="text-sm text-accent hover:underline">
            ← More from the Library
          </Link>
        </div>
      </article>
    </Layout>
  );
}
