import Layout from '@/components/Layout';
import { useNewsUpdates } from '@/hooks/useNewsUpdates';
import { SkeletonRow } from '@/components/SkeletonCard';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';

export default function Index() {
  const { data: news, isLoading } = useNewsUpdates();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 text-center border-b border-foreground">
        <div className="container max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">
            Build the future.
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-serif italic text-muted-foreground">
            "The best way to predict the future is to create it."
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-foreground">
        <div className="container flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-foreground">
          {[
            { label: 'Total Valuation', value: '$2.4B+' },
            { label: 'Startups Funded', value: '120+' },
            { label: 'Active Founders', value: '350+' },
          ].map((s) => (
            <div key={s.label} className="py-6 px-12 text-center">
              <div className="text-3xl font-serif font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* News Feed */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-serif font-bold mb-6 border-b border-foreground pb-2">
            Latest Updates
          </h2>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : news && news.length > 0 ? (
            <ol className="space-y-0">
              {news.map((item, i) => (
                <li key={item.id} className="flex items-start gap-3 py-3 border-b border-foreground/10">
                  <span className="text-muted-foreground text-sm font-mono w-6 shrink-0">{i + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm leading-snug">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent inline-flex items-center gap-1">
                          {item.text}
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        item.text
                      )}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-muted-foreground text-sm">No updates yet.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
