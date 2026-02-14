import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCompanies, useCompanyFilters } from '@/hooks/useCompanies';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, ArrowUpRight, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Companies() {
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
      <div className="container py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          {/* "Portfolio" text removed */}
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-3">
            Startup Directory
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            {companies ? `${companies.length} companies` : 'Loading...'} building the future from IIT Madras.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* SIDEBAR: Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 font-medium text-lg mb-6">
                <Filter className="w-4 h-4" /> Filters
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
            </div>
          </aside>

          {/* GRID: Companies */}
          <div className="flex-1 min-w-0">
            {isLoadingCompanies ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-background border p-6 rounded-lg">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : companies && companies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map((c) => (
                  <Link
                    key={c.id}
                    to={`/companies/${c.slug}`}
                    className="group relative bg-background border border-border p-6 rounded-lg hover:border-foreground/30 hover:shadow-sm transition-all flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 border border-border rounded-md flex items-center justify-center bg-secondary/30 transition-colors group-hover:bg-secondary/50">
                        {c.logo_url ? (
                          <img src={c.logo_url} alt={c.name} className="h-8 w-8 object-contain" />
                        ) : (
                          <Building2 className="h-5 w-5 text-muted-foreground/70" />
                        )}
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    
                    <div className="mb-2">
                      <h3 className="font-serif font-bold text-lg group-hover:text-primary transition-colors">
                        {c.name}
                      </h3>
                      {c.one_liner && (
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                          {c.one_liner}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto pt-4 flex items-center gap-2 flex-wrap">
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
                        <span className="text-[10px] uppercase font-bold tracking-wider text-green-600/80 ml-auto">
                          Acquired
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-muted rounded-lg bg-muted/5">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Filter className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-1">No companies found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => { setBatch('All'); setIndustry('All'); }}
                  className="mt-2 text-primary"
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
      <label className="text-xs font-semibold tracking-wider uppercase text-foreground/70">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background border-input hover:bg-accent hover:text-accent-foreground transition-colors">
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
