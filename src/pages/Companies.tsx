import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCompanies } from '@/hooks/useCompanies';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, ArrowUpRight } from 'lucide-react';

const INDUSTRIES = ['All', 'AI/ML', 'Fintech', 'Healthcare', 'EdTech', 'SaaS', 'DeepTech', 'CleanTech', 'Other'];

export default function Companies() {
  const [batch, setBatch] = useState('');
  const [industry, setIndustry] = useState('');
  const filters = { batch: batch || undefined, industry: industry || undefined };
  const { data: companies, isLoading } = useCompanies(filters);

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Startup Directory</h1>
          <p className="text-muted-foreground mt-2 max-w-lg">
            {companies ? `${companies.length} companies` : 'Loading...'} building the future from IIT Madras.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full md:w-48 shrink-0 space-y-5">
            <div>
              <label className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2 block">
                Batch
              </label>
              <Input
                placeholder="e.g. W24"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="border-foreground/20 focus:border-foreground h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2 block">
                Industry
              </label>
              <Select value={industry || 'All'} onValueChange={(v) => setIndustry(v === 'All' ? '' : v)}>
                <SelectTrigger className="border-foreground/20 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(batch || industry) && (
              <button
                onClick={() => { setBatch(''); setIndustry(''); }}
                className="text-xs text-accent hover:underline"
              >
                Clear filters
              </button>
            )}
          </aside>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-background p-6">
                    <SkeletonCard />
                  </div>
                ))
              : companies && companies.length > 0
              ? companies.map((c) => (
                  <Link
                    key={c.id}
                    to={`/companies/${c.slug}`}
                    className="bg-background p-6 hover:bg-secondary/50 transition-colors group block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-10 w-10 border border-foreground/10 flex items-center justify-center bg-secondary/50">
                        {c.logo_url ? (
                          <img src={c.logo_url} alt={c.name} className="h-8 w-8 object-contain" />
                        ) : (
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-serif font-semibold text-base">{c.name}</h3>
                    {c.one_liner && (
                      <p className="text-[13px] text-muted-foreground mt-1 leading-snug line-clamp-2">{c.one_liner}</p>
                    )}
                    <div className="flex items-center gap-2 mt-4">
                      {c.batch && (
                        <span className="text-[11px] font-mono bg-foreground text-background px-1.5 py-0.5">
                          {c.batch}
                        </span>
                      )}
                      {c.industry && (
                        <span className="text-[11px] text-muted-foreground">{c.industry}</span>
                      )}
                      {c.status === 'acquired' && (
                        <span className="text-[11px] text-accent font-medium ml-auto">Acquired</span>
                      )}
                    </div>
                  </Link>
                ))
              : (
                <div className="bg-background p-12 col-span-full text-center text-muted-foreground">
                  No companies match your filters.
                </div>
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
