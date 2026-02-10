import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useJobs } from '@/hooks/useJobs';
import { SkeletonRow } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Building2, MapPin } from 'lucide-react';

const CATEGORIES = ['All', 'Engineering', 'Sales', 'Marketing', 'Design', 'Operations'];
const TYPES = ['All', 'full_time', 'intern'];

export default function Jobs() {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const { data: jobs, isLoading } = useJobs({
    category: category || undefined,
    type: type || undefined,
  });

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Careers</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Jobs Board</h1>
          <p className="text-muted-foreground mt-2">
            {jobs ? `${jobs.length} open positions` : 'Loading...'} across JITSIE portfolio companies.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground mr-2">Category</span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c === 'All' ? '' : c)}
              className={`px-2.5 py-1 text-xs transition-colors ${
                (c === 'All' && !category) || c === category
                  ? 'bg-foreground text-background'
                  : 'border border-foreground/20 hover:border-foreground/40'
              }`}
            >
              {c}
            </button>
          ))}
          <div className="h-4 w-px bg-foreground/20 mx-2" />
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground mr-2">Type</span>
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t === 'All' ? '' : t)}
              className={`px-2.5 py-1 text-xs transition-colors ${
                (t === 'All' && !type) || t === type
                  ? 'bg-foreground text-background'
                  : 'border border-foreground/20 hover:border-foreground/40'
              }`}
            >
              {t === 'full_time' ? 'Full-Time' : t === 'intern' ? 'Intern' : t}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-foreground/10">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="border-b border-foreground/10 bg-secondary/30">
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-widest text-muted-foreground font-medium">Company</th>
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-widest text-muted-foreground font-medium">Position</th>
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-widest text-muted-foreground font-medium">Location / Pay</th>
                <th className="py-2.5 px-4 text-[11px] uppercase tracking-widest text-muted-foreground font-medium text-right">Apply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-4"><SkeletonRow /></td>
                  </tr>
                ))
              ) : jobs && jobs.length > 0 ? (
                jobs.map((job) => {
                  const company = job.companies as any;
                  return (
                    <tr key={job.id} className="hover:bg-secondary/30 transition-colors group">
                      <td className="py-3.5 px-4">
                        <Link to={`/companies/${company?.slug || ''}`} className="flex items-center gap-2.5 hover:text-accent">
                          <div className="h-7 w-7 border border-foreground/10 flex items-center justify-center bg-secondary/50 shrink-0">
                            {company?.logo_url ? (
                              <img src={company.logo_url} alt="" className="h-5 w-5 object-contain" />
                            ) : (
                              <Building2 className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                          <span className="text-sm font-medium">{company?.name || '—'}</span>
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-serif font-semibold text-sm">{job.title}</span>
                        {job.type === 'intern' && (
                          <span className="ml-2 text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 font-medium">
                            INTERN
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {job.location && (
                            <>
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span>{job.location}</span>
                            </>
                          )}
                          {job.salary_range && (
                            <>
                              <span className="mx-1">·</span>
                              <span>{job.salary_range}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {job.apply_link ? (
                          <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="h-7 px-3 text-xs bg-foreground text-background hover:bg-foreground/90">
                              Apply <ArrowUpRight className="h-3 w-3 ml-0.5" />
                            </Button>
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-muted-foreground text-sm">
                    No jobs match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
