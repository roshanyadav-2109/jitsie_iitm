import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useCompanies, useCompanyFilters } from '@/hooks/useCompanies';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, ArrowUpRight, SlidersHorizontal } from 'lucide-react';

export default function Companies() {
  const [batch, setBatch] = useState('All');
  const [industry, setIndustry] = useState('All');

  const { data: filterOptions, isLoading: isLoadingFilters } = useCompanyFilters();

  const filters = {
    batch: batch !== 'All' ? batch : undefined,
    industry: industry !== 'All' ? industry : undefined,
  };

  const { data: companies, isLoading: isLoadingCompanies } = useCompanies(filters);
  const hasFilters = batch !== 'All' || industry !== 'All';

  return (
    <Layout>
      <PageHeader
        title="The Venture Directory."
        description="A curated record of companies built within the JITSIE network — from earliest cohorts to publicly listed."
        eyebrow="01 · Portfolio"
      />
      <div className="container py-16 md:py-20">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          {/* Sidebar */}
          <aside className="w-full md:w-60 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-accent" />
                <p className="font-mono text-[11px] uppercase tracking-[0.25em]">Refine</p>
              </div>

              {isLoadingFilters ? (
                <div className="space-y-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <div className="space-y-7">
                  <FilterSelect
                    label="Batch"
                    options={filterOptions?.batches || ['All']}
                    value={batch}
                    onChange={setBatch}
                  />
                  <FilterSelect
                    label="Industry"
                    options={filterOptions?.industries || ['All']}
                    value={industry}
                    onChange={setIndustry}
                  />
                  {hasFilters && (
                    <button
                      onClick={() => {
                        setBatch('All');
                        setIndustry('All');
                      }}
                      className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-foreground/10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isLoadingCompanies ? '—' : `${companies?.length ?? 0} ventures`}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Sorted: Most recent
              </p>
            </div>

            {isLoadingCompanies ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-background p-7">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : companies && companies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
                {companies.map((c) => (
                  <Link
                    key={c.id}
                    to={`/companies/${c.slug}`}
                    className="group relative bg-background p-7 flex flex-col h-full hover:bg-card transition-colors"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="h-14 w-14 border border-foreground/10 rounded-sm flex items-center justify-center bg-secondary/40">
                        {c.logo_url ? (
                          <img src={c.logo_url} alt={c.name} className="h-9 w-9 object-contain" />
                        ) : (
                          <Building2 className="h-5 w-5 text-muted-foreground/70" />
                        )}
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </div>
                    <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                      {c.name}
                    </h3>
                    {c.one_liner && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                        {c.one_liner}
                      </p>
                    )}
                    <div className="mt-auto pt-6 flex items-center gap-2 flex-wrap text-[10px] font-mono uppercase tracking-widest">
                      {c.batch && (
                        <span className="bg-primary text-primary-foreground px-2 py-1">{c.batch}</span>
                      )}
                      {c.industry && (
                        <span className="border border-foreground/15 px-2 py-1 text-muted-foreground">
                          {c.industry}
                        </span>
                      )}
                      {c.status === 'acquired' && (
                        <span className="ml-auto text-accent">Acquired</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-foreground/15">
                <Building2 className="h-6 w-6 text-muted-foreground mb-4" />
                <h3 className="font-serif text-xl font-bold mb-1">No ventures found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setBatch('All');
                    setIndustry('All');
                  }}
                  className="mt-2 text-accent"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-transparent border-0 border-b border-foreground/20 rounded-none h-10 px-0 hover:border-accent transition-colors focus:ring-0">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt} className="text-sm cursor-pointer">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
