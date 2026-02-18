import { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { usePartners, usePartnerCategories } from '@/hooks/usePartners';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Building2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mapping for cleaner display labels
const categoryLabels: Record<string, string> = {
  vc: 'VC Partners',
  corporate: 'Corporate Partners',
  All: 'All Partners'
};

export default function Partners() {
  const [category, setCategory] = useState('All');
  
  // 1. Fetch dynamic categories from backend
  const { data: categories, isLoading: isLoadingCategories } = usePartnerCategories();
  
  // 2. Fetch partners based on selection
  const { data: partners, isLoading: isLoadingPartners } = usePartners(category);

  return (
    <Layout>
      <PageHeader title="Partners" />
      <div className="container py-10">

        {/* Dynamic Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground mr-2">Category</span>
          
          {isLoadingCategories ? (
             <div className="flex gap-2">
               <Skeleton className="h-8 w-20" />
               <Skeleton className="h-8 w-24" />
             </div>
          ) : (
            categories?.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
                  category === c
                    ? 'bg-foreground text-background shadow-sm'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {categoryLabels[c] || c.toUpperCase()}
              </button>
            ))
          )}
        </div>

        {/* Grid */}
        {isLoadingPartners ? (
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
                className="group relative bg-background border border-border p-6 flex flex-col items-center text-center rounded-lg hover:border-foreground/30 hover:shadow-sm transition-all"
              >
                <div className="h-20 w-20 rounded-full border border-border flex items-center justify-center bg-secondary/30 mb-4 group-hover:scale-105 transition-transform duration-300">
                  {partner.logo_url ? (
                    <img src={partner.logo_url} alt={partner.name} className="h-12 w-12 object-contain" />
                  ) : (
                    <Building2 className="h-8 w-8 text-muted-foreground/50" />
                  )}
                </div>
                <h3 className="font-serif font-bold text-base mb-1">{partner.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  {categoryLabels[partner.category] || partner.category}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-muted rounded-lg">
            <p className="text-muted-foreground">No partners found in this category.</p>
            <button 
              onClick={() => setCategory('All')}
              className="text-xs text-primary underline mt-2"
            >
              View all partners
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
