import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCompanyBySlug } from '@/hooks/useCompanies';
import { useJobsByCompany } from '@/hooks/useJobs';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, ArrowUpRight, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompanyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: company, isLoading } = useCompanyBySlug(slug || '');
  const { data: jobs } = useJobsByCompany(company?.id || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10 max-w-3xl space-y-4">
          <Skeleton className="h-8 w-32 bg-muted" />
          <Skeleton className="h-12 w-2/3 bg-muted" />
          <Skeleton className="h-6 w-3/4 bg-muted" />
          <Skeleton className="h-40 w-full bg-muted mt-8" />
        </div>
      </Layout>
    );
  }

  if (!company) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <Building2 className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-serif font-bold">Company not found</h1>
          <Link to="/companies" className="text-accent text-sm hover:underline mt-3 inline-block">
            ← Back to directory
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <Link
          to="/companies"
          className="text-xs text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Directory
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <div className="h-14 w-14 border border-foreground/10 flex items-center justify-center bg-secondary/50 shrink-0">
            {company.logo_url ? (
              <img src={company.logo_url} alt={company.name} className="h-10 w-10 object-contain" />
            ) : (
              <Building2 className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">{company.name}</h1>
            {company.one_liner && <p className="text-muted-foreground mt-1">{company.one_liner}</p>}
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-8">
          {company.batch && (
            <span className="text-[11px] font-mono bg-foreground text-background px-2 py-1">{company.batch}</span>
          )}
          {company.industry && (
            <span className="text-[11px] border border-foreground/20 px-2 py-1">{company.industry}</span>
          )}
          <span className="text-[11px] border border-foreground/20 px-2 py-1 capitalize">{company.status}</span>
          {company.website_url && (
            <a
              href={company.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] border border-foreground/20 px-2 py-1 inline-flex items-center gap-1 hover:bg-secondary transition-colors"
            >
              Website <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </div>

        {/* Description */}
        {company.description && (
          <div className="font-serif text-base leading-[1.8] mb-12 whitespace-pre-wrap border-t border-foreground/10 pt-8">
            {company.description}
          </div>
        )}

        {/* Related Jobs */}
        {jobs && jobs.length > 0 && (
          <div className="border-t border-foreground pt-8">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Open Positions ({jobs.length})
            </h2>
            <div className="divide-y divide-foreground/10 border border-foreground/10">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                  <div>
                    <div className="font-serif font-semibold text-sm">{job.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {[job.location, job.salary_range].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                  {job.apply_link && (
                    <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="h-7 px-3 text-xs bg-foreground text-background hover:bg-foreground/90">
                        Apply <ArrowUpRight className="h-3 w-3 ml-0.5" />
                      </Button>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
