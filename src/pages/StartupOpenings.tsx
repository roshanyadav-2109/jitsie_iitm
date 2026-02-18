import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { useStartupOpenings, useStartupFilters } from '@/hooks/useStartupOpenings';
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
import { MapPin, Banknote, Rocket, ExternalLink, Filter } from 'lucide-react';
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

  return (
    <Layout>
      <section className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Startup Openings
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Explore opportunities across the JITSIE ecosystem.
            {openings ? ` Found ${openings.length} active openings.` : ' Loading opportunities...'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* LEFT SIDEBAR: Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-8">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 font-medium text-lg mb-6">
                <Filter className="w-4 h-4" /> Filters
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
                    className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-accent/40 transition-colors"
                  >
                    {/* Left: Logo */}
                    <div className="h-12 w-12 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center text-lg font-bold shrink-0 uppercase">
                      {o.startup_name.charAt(0)}
                    </div>

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
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {o.location}</span>
                        )}
                        {o.stipend_salary && (
                          <span className="flex items-center gap-1"><Banknote className="h-3 w-3" /> {o.stipend_salary}</span>
                        )}
                        {o.sector && (
                          <span className="flex items-center gap-1"><Rocket className="h-3 w-3" /> {o.sector}</span>
                        )}
                        <span>Posted {formatDistanceToNow(new Date(o.posted_at), { addSuffix: true })}</span>
                      </div>
                    </div>

                    {/* Right: Action */}
                    <div className="shrink-0">
                      {o.apply_link ? (
                        <a href={o.apply_link} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="h-9 text-xs gap-1.5 rounded-lg">
                            Apply <ExternalLink className="h-3 w-3" />
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
              <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-muted rounded-lg bg-muted/5">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Filter className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No openings found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results.</p>
                <Button 
                  variant="link" 
                  onClick={() => { setSector('All'); setType('All'); setStage('All'); }}
                  className="mt-2 text-primary"
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

function FilterSelect({ label, options, value, onChange, labelMap }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  labelMap?: Record<string, string>;
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
              {labelMap?.[opt] || opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
