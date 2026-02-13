import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { useStartupOpenings } from '@/hooks/useStartupOpenings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Separator } from '@/components/ui/separator';
import { MapPin, Banknote, Rocket, ExternalLink, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const SECTORS = ['All', 'AI/ML', 'FinTech', 'EdTech', 'DeepTech', 'BioTech', 'SpaceTech', 'CleanTech', 'HealthTech', 'SaaS/ERP', 'FoodTech', 'AgriTech', 'Sustainability', 'Consulting', 'InsurTech', 'LegalTech', 'Tourism'];
const TYPES = ['All', 'intern', 'full_time', 'co_founder'];
const STAGES = ['All', 'Pre-Seed', 'Seed', 'Series A'];

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

  // Sync filters with backend query
  const filters = useMemo(() => ({
    ...(sector !== 'All' && { sector }),
    ...(type !== 'All' && { type }),
    ...(stage !== 'All' && { stage }),
  }), [sector, type, stage]);

  const { data: openings, isLoading } = useStartupOpenings(
    Object.keys(filters).length > 0 ? filters : undefined
  );

  return (
    <Layout>
      <section className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Ecosystem Careers</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-3">
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
              <div className="flex items-center gap-2 font-medium text-lg mb-4">
                <Filter className="w-4 h-4" /> Filters
              </div>
              
              <div className="space-y-6">
                <FilterSection 
                  label="Sector" 
                  options={SECTORS} 
                  value={sector} 
                  onChange={setSector} 
                />
                <Separator />
                <FilterSection 
                  label="Type" 
                  options={TYPES} 
                  value={type} 
                  onChange={setType} 
                  labelMap={typeLabels} 
                />
                <Separator />
                <FilterSection 
                  label="Stage" 
                  options={STAGES} 
                  value={stage} 
                  onChange={setStage} 
                />
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: Content Grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-background border p-6 rounded-lg">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : openings && openings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {openings.map((o) => (
                  <div 
                    key={o.id} 
                    className="group relative bg-background border border-border p-5 rounded-lg hover:border-foreground/30 transition-all hover:shadow-sm flex flex-col gap-4"
                  >
                    {/* Header: Logo & Badge */}
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 bg-secondary text-secondary-foreground rounded-md flex items-center justify-center text-sm font-bold shrink-0 uppercase">
                          {o.startup_name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground truncate">
                            {o.startup_name}
                          </p>
                          {o.sector && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 mt-1 font-normal">
                              {o.sector}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {o.stage && (
                        <span className="text-[10px] bg-secondary/50 px-2 py-1 rounded text-muted-foreground font-medium uppercase tracking-wider whitespace-nowrap">
                          {o.stage}
                        </span>
                      )}
                    </div>

                    {/* Role Title */}
                    <div>
                      <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                        {o.role_title}
                      </h3>
                    </div>

                    {/* Description */}
                    {o.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {o.description}
                      </p>
                    )}

                    {/* Details Tags */}
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto pt-2">
                      {o.location && (
                        <div className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                          <MapPin className="h-3 w-3" /> {o.location}
                        </div>
                      )}
                      {o.stipend_salary && (
                        <div className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                          <Banknote className="h-3 w-3" /> {o.stipend_salary}
                        </div>
                      )}
                      {o.type && (
                        <div className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                          <Rocket className="h-3 w-3" /> {typeLabels[o.type] || o.type}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 mt-2 border-t flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        Posted {formatDistanceToNow(new Date(o.posted_at), { addSuffix: true })}
                      </span>
                      {o.apply_link ? (
                        <a href={o.apply_link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                           <Button size="sm" className="w-full h-8 text-xs gap-1.5">
                            Apply Now <ExternalLink className="h-3 w-3" />
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" disabled variant="secondary" className="h-8 text-xs opacity-70">
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
                <h3 className="font-serif text-lg font-medium mb-1">No openings found</h3>
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

// Sidebar Filter Component
function FilterSection({
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
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/70">
        {label}
      </h3>
      <div className="flex flex-col gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`text-sm text-left px-3 py-2 rounded-md transition-all ${
              value === opt
                ? 'bg-foreground text-background font-medium shadow-sm'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            {labelMap?.[opt] || opt}
          </button>
        ))}
      </div>
    </div>
  );
}
