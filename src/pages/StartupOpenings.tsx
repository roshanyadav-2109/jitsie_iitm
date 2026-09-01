import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useStartupOpenings, useStartupFilters } from '@/hooks/useStartupOpenings';
import { useCompanies } from '@/hooks/useCompanies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/SkeletonCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RiMapPin2Line, RiMoneyRupeeCircleLine, RiRocket2Line, RiExternalLinkLine, RiFilter3Line } from 'react-icons/ri';
import EmptyState from '@/components/EmptyState';
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

  const filters = useMemo(() => ({
    ...(sector !== 'All' && { sector }),
    ...(type !== 'All' && { type }),
    ...(stage !== 'All' && { stage }),
  }), [sector, type, stage]);

  const { data: openings, isLoading: isLoadingOpenings } = useStartupOpenings(
    Object.keys(filters).length > 0 ? filters : undefined
  );

  // Every opening belongs to a startup in the directory, so its logo lives on the
  // companies record. Index by slug first, falling back to name for rows posted
  // before a slug was set.
  const { data: companies } = useCompanies();
  const logos = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of companies ?? []) {
      if (!c.logo_url) continue;
      if (c.slug) map.set(c.slug.toLowerCase(), c.logo_url);
      if (c.name) map.set(c.name.toLowerCase(), c.logo_url);
    }
    return map;
  }, [companies]);

  return (
    <Layout>
      <section className="container py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Startup Openings</h1>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* LEFT SIDEBAR: Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div className="sticky top-16">
              <div className="flex items-center gap-2 font-medium text-lg mb-6">
                <RiFilter3Line className="w-4 h-4" /> Filters
              </div>
              
              <div className="space-y-6">
                {isLoadingFilters ? (
                  <div className="space-y-6">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : (
                  <>
                    <FilterSelect label="Sector" options={filterOptions?.sectors || ['All']} value={sector} onChange={setSector} />
                    <FilterSelect label="Type" options={filterOptions?.types || ['All']} value={type} onChange={setType} labelMap={typeLabels} />
                    <FilterSelect label="Stage" options={filterOptions?.stages || ['All']} value={stage} onChange={setStage} />

                    {(sector !== 'All' || type !== 'All' || stage !== 'All') && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-dashed text-muted-foreground hover:text-foreground"
                        onClick={() => { setSector('All'); setType('All'); setStage('All'); }}
                      >
                        Reset Filters
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* The other side of this page's market, under the filters */}
              <div className="mt-10 rounded-lg bg-secondary/60 p-5">
                <h2 className="text-base font-semibold leading-tight">A JITSIE startup?</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Hire from the community. Share the role and we will list it here.
                </p>
                <Link to="/post-opening" className="mt-5 inline-block">
                  <Button size="sm" className="h-9 px-4 text-xs">
                    Post your opening
                  </Button>
                </Link>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: Single column cards */}
          <div className="flex-1 min-w-0">
            {isLoadingOpenings ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-background border p-6 rounded-lg">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : openings && openings.length > 0 ? (
              <div className="space-y-4">
                {openings.map((o) => (
                  <div 
                    key={o.id} 
                    className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors"
                  >
                    {/* Left: Logo */}
                    <StartupLogo
                      name={o.startup_name}
                      src={
                        logos.get((o.startup_slug ?? '').toLowerCase()) ??
                        logos.get(o.startup_name.toLowerCase()) ??
                        null
                      }
                    />

                    {/* Middle: Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-base leading-tight">{o.role_title}</h3>
                        {o.type && (
                          <Badge variant="outline" className="text-[10px] font-normal">
                            {typeLabels[o.type] || o.type}
                          </Badge>
                        )}
                        {o.stage && (
                          <Badge variant="secondary" className="text-[10px] font-normal">
                            {o.stage}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{o.startup_name}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                        {o.location && (
                          <span className="flex items-center gap-1"><RiMapPin2Line className="h-3 w-3" /> {o.location}</span>
                        )}
                        {o.stipend_salary && (
                          <span className="flex items-center gap-1"><RiMoneyRupeeCircleLine className="h-3 w-3" /> {o.stipend_salary}</span>
                        )}
                        {o.sector && (
                          <span className="flex items-center gap-1"><RiRocket2Line className="h-3 w-3" /> {o.sector}</span>
                        )}
                        <span>Posted {formatDistanceToNow(new Date(o.posted_at), { addSuffix: true })}</span>
                      </div>
                    </div>

                    {/* Right: Action */}
                    <div className="shrink-0">
                      {o.apply_link ? (
                        <a href={o.apply_link} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="h-9 text-xs gap-1.5 rounded-lg">
                            Apply <RiExternalLinkLine className="h-3 w-3" />
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" disabled variant="secondary" className="h-9 text-xs opacity-70 rounded-lg">
                          Closed
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No openings match those filters"
                description="No roles fit this combination right now. Drop a filter, or check back as new openings are posted."
                emptyTitle="No open roles right now"
                emptyDescription="There are no openings posted at the moment. Check back soon — new roles go up regularly."
                filters={[
                  { label: 'Sector', value: sector, onClear: () => setSector('All') },
                  { label: 'Type', value: type, onClear: () => setType('All') },
                  { label: 'Stage', value: stage, onClear: () => setStage('All') },
                ]}
                onClearAll={() => { setSector('All'); setType('All'); setStage('All'); }}
              />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FilterSelect({ label, options, value, onChange, labelMap }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  labelMap?: Record<string, string>;
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
              {labelMap?.[opt] || opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/** Directory logo for a startup, falling back to its initial if none is on file. */
function StartupLogo({ name, src }: { name: string; src: string | null }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="h-12 w-12 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center text-lg font-bold shrink-0 uppercase overflow-hidden">
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          className="h-full w-full object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      ) : (
        name.charAt(0)
      )}
    </div>
  );
}
