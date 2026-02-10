import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCompanies } from '@/hooks/useCompanies';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const INDUSTRIES = ['All', 'AI/ML', 'Fintech', 'Healthcare', 'EdTech', 'SaaS', 'DeepTech', 'CleanTech', 'Other'];

export default function Companies() {
  const [batch, setBatch] = useState('');
  const [industry, setIndustry] = useState('');
  const filters = { batch: batch || undefined, industry: industry || undefined };
  const { data: companies, isLoading } = useCompanies(filters);

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-4xl font-serif font-bold mb-8">Startup Directory</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-56 shrink-0 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Batch</label>
              <Input
                placeholder="e.g. W24"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="border-foreground"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Industry</label>
              <Select value={industry} onValueChange={(v) => setIndustry(v === 'All' ? '' : v)}>
                <SelectTrigger className="border-foreground">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : companies && companies.length > 0
              ? companies.map((c) => (
                  <Link
                    key={c.id}
                    to={`/companies/${c.slug}`}
                    className="border border-foreground p-5 hover:bg-secondary transition-colors block"
                  >
                    {c.logo_url && (
                      <img src={c.logo_url} alt={c.name} className="h-10 w-10 object-contain mb-3" />
                    )}
                    <h3 className="font-serif font-semibold text-lg">{c.name}</h3>
                    {c.one_liner && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.one_liner}</p>
                    )}
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      {c.batch && <span className="border border-foreground/30 px-1.5 py-0.5">{c.batch}</span>}
                      {c.industry && <span>{c.industry}</span>}
                    </div>
                  </Link>
                ))
              : <p className="text-muted-foreground col-span-full">No companies found.</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
