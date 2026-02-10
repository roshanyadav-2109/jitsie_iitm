import { useState } from 'react';
import Layout from '@/components/Layout';
import { usePartners } from '@/hooks/usePartners';
import { SkeletonCard } from '@/components/SkeletonCard';
import { ArrowUpRight, Building2 } from 'lucide-react';

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'vc', label: 'VC Partners' },
  { value: 'corporate', label: 'Corporate Partners' },
];

export default function Partners() {
  const [category, setCategory] = useState('');
  const { data: partners, isLoading } = usePartners(category || undefined);

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Ecosystem</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Partners</h1>
          <p className="text-muted-foreground mt-2">
            {partners ? `${partners.length} partners` : 'Loading...'} powering the JITSIE ecosystem.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground mr-2">Category</span>
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-2.5 py-1 text-xs transition-colors ${
                category === c.value
                  ? 'bg-foreground text-background'
                  : 'border border-foreground/20 hover:border-foreground/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : partners && partners.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="border border-foreground/10 p-6 flex flex-col items-center text-center hover:border-foreground/30 transition-colors group"
              >
                <div className="h-16 w-16 border border-foreground/10 flex items-center justify-center bg-secondary/50 mb-4">
                  {partner.logo_url ? (
                    <img src={partner.logo_url} alt={partner.name} className="h-12 w-12 object-contain" />
                  ) : (
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-serif font-semibold text-sm">{partner.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                  {partner.category === 'vc' ? 'VC Partner' : 'Corporate Partner'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground text-sm border border-foreground/10">
            No partners found.
          </div>
        )}
      </div>
    </Layout>
  );
}
