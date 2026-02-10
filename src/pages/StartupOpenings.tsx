import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { useStartupOpenings } from '@/hooks/useStartupOpenings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/SkeletonCard';
import { MapPin, Banknote, Rocket, ExternalLink } from 'lucide-react';
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
      <section className="container py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Ecosystem Careers</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Startup Openings
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            {openings ? `${openings.length} active openings` : 'Loading...'} across JITSIE ecosystem startups — from deep-tech labs to fintech unicorns.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          <FilterRow label="Sector" options={SECTORS} value={sector} onChange={setSector} />
          <FilterRow label="Type" options={TYPES} value={type} onChange={setType} labelMap={typeLabels} />
          <FilterRow label="Stage" options={STAGES} value={stage} onChange={setStage} />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-background p-6">
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : openings && openings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
            {openings.map((o) => (
              <div key={o.id} className="bg-background p-5 flex flex-col gap-3 hover:bg-secondary/30 transition-colors">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">
                      {o.startup_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{o.startup_name}</p>
                      {o.sector && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 mt-0.5">
                          {o.sector}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {o.stage && (
                    <span className="text-[10px] tracking-wider uppercase text-muted-foreground whitespace-nowrap">
                      {o.stage}
                    </span>
                  )}
                </div>

                {/* Role */}
                <h3 className="font-serif text-base font-bold leading-tight">{o.role_title}</h3>

                {o.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{o.description}</p>
                )}

                {/* Meta */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {o.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {o.location}
                    </span>
                  )}
                  {o.stipend_salary && (
                    <span className="flex items-center gap-1">
                      <Banknote className="h-3 w-3" /> {o.stipend_salary}
                    </span>
                  )}
                  {o.type && (
                    <span className="flex items-center gap-1">
                      <Rocket className="h-3 w-3" /> {typeLabels[o.type] || o.type}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-foreground/5">
                  <span className="text-[10px] text-muted-foreground">
                    {formatDistanceToNow(new Date(o.posted_at), { addSuffix: true })}
                  </span>
                  {o.apply_link ? (
                    <a href={o.apply_link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="h-7 px-3 text-xs bg-foreground text-background hover:bg-foreground/90 gap-1">
                        Apply <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  ) : (
                    <Button size="sm" disabled className="h-7 px-3 text-xs">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-foreground/10">
            <p className="text-muted-foreground text-sm">No openings match your filters.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}

function FilterRow({
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
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <span className="text-[10px] tracking-wider uppercase text-muted-foreground shrink-0 w-12">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`text-xs px-2.5 py-1 border transition-colors whitespace-nowrap ${
            value === opt
              ? 'bg-foreground text-background border-foreground'
              : 'border-foreground/20 text-muted-foreground hover:border-foreground/40'
          }`}
        >
          {labelMap?.[opt] || opt}
        </button>
      ))}
    </div>
  );
}
