import { useState } from 'react';
import Layout from '@/components/Layout';
import { useJobs } from '@/hooks/useJobs';
import { SkeletonRow } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';

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
        <h1 className="text-4xl font-serif font-bold mb-6">Jobs Board</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c === 'All' ? '' : c)}
              className={`px-3 py-1 text-sm border border-foreground transition-colors ${
                (c === 'All' && !category) || c === category
                  ? 'bg-foreground text-background'
                  : 'hover:bg-secondary'
              }`}
            >
              {c}
            </button>
          ))}
          <span className="border-l border-foreground mx-2" />
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t === 'All' ? '' : t)}
              className={`px-3 py-1 text-sm border border-foreground transition-colors ${
                (t === 'All' && !type) || t === type
                  ? 'bg-foreground text-background'
                  : 'hover:bg-secondary'
              }`}
            >
              {t === 'full_time' ? 'Full-Time' : t === 'intern' ? 'Intern' : t}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-foreground text-xs uppercase text-muted-foreground">
                <th className="py-3 pr-4">Company</th>
                <th className="py-3 pr-4">Position</th>
                <th className="py-3 pr-4">Details</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4}><SkeletonRow /></td>
                  </tr>
                ))
              ) : jobs && jobs.length > 0 ? (
                jobs.map((job) => {
                  const company = job.companies as any;
                  return (
                    <tr key={job.id} className="border-b border-foreground/10 hover:bg-secondary/50">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          {company?.logo_url && (
                            <img src={company.logo_url} alt="" className="h-6 w-6 object-contain" />
                          )}
                          <span className="text-sm font-medium">{company?.name || '—'}</span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="font-serif font-semibold">{job.title}</span>
                      </td>
                      <td className="py-4 pr-4 text-sm text-muted-foreground whitespace-nowrap">
                        {[job.location, job.salary_range].filter(Boolean).join(' · ')}
                      </td>
                      <td className="py-4 text-right">
                        {job.apply_link ? (
                          <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                              Apply
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
                  <td colSpan={4} className="py-8 text-center text-muted-foreground">No jobs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
