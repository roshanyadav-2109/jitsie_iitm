import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useStartupOpenings, useStartupFilters } from '@/hooks/useStartupOpenings';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/SkeletonCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Banknote, Rocket, ArrowUpRight, SlidersHorizontal, Briefcase } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const typeLabels: Record<string, string> = {
  intern: 'Intern',
  full_time: 'Full-Time',
  co_founder: 'Co-Founder',
  freelance: 'Freelance',
};

export default function StartupOpenings() {
  const [sector, setSector] = useState('All');
  const [type, setType] = useState('All');
  const [stage, setStage] = useState('All');

  const { data: filterOptions, isLoading: isLoadingFilters } = useStartupFilters();

  const filters = useMemo(
    () => ({
      ...(sector !== 'All' && { sector }),
      ...(type !== 'All' && { type }),
      ...(stage !== 'All' && { stage }),
    }),
    [sector, type, stage]
  );

  const { data: openings, isLoading: isLoadingOpenings } = useStartupOpenings(
    Object.keys(filters).length > 0 ? filters : undefined
  );

  const hasFilters = sector !== 'All' || type !== 'All' || stage !== 'All';

  return (
    <Layout>
      <PageHeader
        title="Open Roles in the Network."
        description="Selected positions inside JITSIE startups — co-founder, leadership, and early-team mandates."
        eyebrow="06 · Careers"
      />
      <section className="container py-16 md:py-20">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
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
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <div className="space-y-7">
                  <FilterSelect
                    label="Sector"
                    options={filterOptions?.sectors || ['All']}
                    value={sector}
                    onChange={setSector}
                  />
                  <FilterSelect
                    label="Type"
                    options={filterOptions?.types || ['All']}
                    value={type}
                    onChange={setType}
                    labelMap={typeLabels}
                  />
                  <FilterSelect
                    label="Stage"
                    options={filterOptions?.stages || ['All']}
                    value={stage}
                    onChange={setStage}
                  />
                  {hasFilters && (
                    <button
                      onClick={() => {
                        setSector('All');
                        setType('All');
                        setStage('All');
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

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-foreground/10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isLoadingOpenings ? '—' : `${openings?.length ?? 0} roles`}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Updated continuously
              </p>
            </div>

            {isLoadingOpenings ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border border-foreground/10 p-6">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : openings && openings.length > 0 ? (
              <div className="border-t border-foreground/10">
                {openings.map((o) => (
                  <div
                    key={o.id}
                    className="group grid grid-cols-12 gap-6 py-7 border-b border-foreground/10 items-center hover:bg-card transition-colors"
                  >
                    <div className="col-span-12 md:col-span-2">
                      <div className="h-14 w-14 bg-primary text-primary-foreground flex items-center justify-center font-serif text-xl font-bold uppercase">
                        {o.startup_name.charAt(0)}
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-7">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1">
                        {o.startup_name}
                      </p>
                      <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                        {o.role_title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-3">
                        {o.type && (
                          <span className="text-[10px] font-mono uppercase tracking-widest border border-foreground/15 px-2 py-1">
                            {typeLabels[o.type] || o.type}
                          </span>
                        )}
                        {o.stage && (
                          <span className="flex items-center gap-1.5">
                            <Rocket className="h-3 w-3" /> {o.stage}
                          </span>
                        )}
                        {o.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" /> {o.location}
                          </span>
                        )}
                        {o.stipend_salary && (
                          <span className="flex items-center gap-1.5">
                            <Banknote className="h-3 w-3" /> {o.stipend_salary}
                          </span>
                        )}
                        <span>
                          Posted {formatDistanceToNow(new Date(o.posted_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-3 flex md:justify-end">
                      {o.apply_link ? (
                        <a href={o.apply_link} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            className="h-10 px-5 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[11px] uppercase tracking-[0.2em] font-medium"
                          >
                            Apply <ArrowUpRight className="h-3 w-3 ml-1.5" />
                          </Button>
                        </a>
                      ) : (
                        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          Closed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-foreground/15">
                <Briefcase className="h-6 w-6 text-muted-foreground mb-3" />
                <h3 className="font-serif text-xl font-bold mb-1">No roles found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSector('All');
                    setType('All');
                    setStage('All');
                  }}
                  className="mt-2 text-accent"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FilterSelect({
  label,
  options,
  value,
  onChange,
  labelMap,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  labelMap?: Record<string, string>;
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
              {labelMap?.[opt] || opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
