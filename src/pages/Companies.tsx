import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCompanies, useCompanyFilters } from '@/hooks/useCompanies';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RiBuilding2Line, RiArrowRightUpLine, RiFilter3Line } from 'react-icons/ri';
import EmptyState from '@/components/EmptyState';
import { Badge } from '@/components/ui/badge';
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from '@/lib/utils';
import StickyMobileCta from '@/components/StickyMobileCta';

/** These brands only ship a white-on-transparent mark; give their tile a dark backing so it reads. */
const DARK_TILE_LOGO_SLUGS = new Set(['astranex-defence']);

/** Mentorship, incubation, idea nurture and grants all run through one application. */
const SUPPORT_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSc1JwkeReLKI49yLfQLjCFfNI-ZWWNsqTOyWO1vvPcgb69OTQ/viewform';

export default function Companies() {
  usePageTitle("Startups");
  const [batch, setBatch] = useState('All');
  const [industry, setIndustry] = useState('All');
  
  // Fetch dynamic filters
  const { data: filterOptions, isLoading: isLoadingFilters } = useCompanyFilters();

  const filters = { 
    batch: batch !== 'All' ? batch : undefined, 
    industry: industry !== 'All' ? industry : undefined 
  };
  
  const { data: companies, isLoading: isLoadingCompanies } = useCompanies(filters);

  return (
    <Layout>
      <div className="container pb-24 pt-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Startup Directory</h1>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* SIDEBAR: Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div className="sticky top-16">
              <div className="flex items-center gap-2 font-medium text-lg mb-6">
                <RiFilter3Line className="w-4 h-4" /> Filters
              </div>

              <div className="space-y-6">
                {isLoadingFilters ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <>
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

                    {(batch !== 'All' || industry !== 'All') && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-dashed text-muted-foreground hover:text-foreground"
                        onClick={() => { setBatch('All'); setIndustry('All'); }}
                      >
                        Reset Filters
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* Support routes, under the filters: the same application the
                  announcement bar points at. On mobile this becomes a fixed
                  bottom bar instead (see StickyMobileCta below), since the
                  sidebar stacks above the results and would otherwise bury it. */}
              <div className="mt-10 hidden rounded-lg bg-secondary/60 p-5 md:block">
                <h2 className="text-base font-semibold leading-tight">Apply for support</h2>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li>Incubation support</li>
                  <li>Idea nurture support</li>
                  <li>Grants support</li>
                </ul>
                <a href={SUPPORT_FORM} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block">
                  <Button size="sm" className="h-9 px-4 text-xs">
                    Apply now
                  </Button>
                </a>
              </div>
            </div>
          </aside>

          {/* GRID: Companies */}
          <div className="flex-1 min-w-0">
            {isLoadingCompanies ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-background border p-6 rounded-lg">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : companies && companies.length > 0 ? (
              <div className="space-y-4">
                {companies.map((c) => (
                  <Link
                    key={c.id}
                    to={`/companies/${c.slug}`}
                    className="group relative bg-background border border-border p-5 rounded-lg transition-all flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div
                      className={cn(
                        'h-16 w-16 border border-border rounded-md flex items-center justify-center shrink-0 overflow-hidden p-1',
                        DARK_TILE_LOGO_SLUGS.has(c.slug) ? 'bg-black' : 'bg-secondary/30'
                      )}
                    >
                      {c.logo_url ? (
                        <img src={c.logo_url} alt={c.name} className="h-full w-full object-contain" />
                      ) : (
                        <RiBuilding2Line className="h-6 w-6 text-muted-foreground/70" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {c.name}
                      </h3>
                      {c.one_liner && (
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                          {c.one_liner}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2 flex-wrap">
                      {c.batch && (
                        <Badge variant="secondary" className="font-mono text-[10px] px-1.5 py-0 h-5">
                          {c.batch}
                        </Badge>
                      )}
                      {c.industry && (
                        <span className="text-[11px] text-muted-foreground border px-1.5 py-0.5 rounded-sm">
                          {c.industry}
                        </span>
                      )}
                      {c.status === 'acquired' && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-green-600/80">
                          Acquired
                        </span>
                      )}
                      <RiArrowRightUpLine className="h-4 w-4 text-muted-foreground/50 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No companies match those filters"
                description="Nothing in the directory fits this combination yet. Drop a filter to widen the search."
                emptyTitle="The directory is empty"
                emptyDescription="No companies have been added yet. Once they are, they'll show up here."
                filters={[
                  { label: 'Batch', value: batch, onClear: () => setBatch('All') },
                  { label: 'Industry', value: industry, onClear: () => setIndustry('All') },
                ]}
                onClearAll={() => { setBatch('All'); setIndustry('All'); }}
              />
            )}
          </div>
        </div>
      </div>

      <StickyMobileCta
        title="Apply for support"
        description="Incubation, idea nurture and grants"
        buttonLabel="Apply now"
        href={SUPPORT_FORM}
        external
      />
    </Layout>
  );
}

// Reusable Filter Component
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
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background border-input">
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
