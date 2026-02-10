import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useArticleBySlug } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useArticleBySlug(slug || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10 max-w-2xl space-y-4">
          <Skeleton className="h-10 w-3/4 bg-muted" />
          <Skeleton className="h-4 w-1/3 bg-muted" />
          <Skeleton className="h-64 w-full bg-muted" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-10 text-center">
          <h1 className="text-2xl font-serif">Article not found</h1>
          <Link to="/library" className="text-accent underline mt-2 inline-block">Back to Library</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container py-10 max-w-2xl">
        <Link to="/library" className="text-sm text-muted-foreground hover:text-accent mb-4 inline-block">
          ← Back to Library
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-3">{article.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          {article.author && <span>{article.author}</span>}
          {article.published_at && (
            <>
              <span>·</span>
              <span>{format(new Date(article.published_at), 'MMMM d, yyyy')}</span>
            </>
          )}
        </div>
        {article.cover_image && (
          <img src={article.cover_image} alt={article.title} className="w-full mb-8 border border-foreground" />
        )}
        <div className="font-serif text-lg leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      </article>
    </Layout>
  );
}
