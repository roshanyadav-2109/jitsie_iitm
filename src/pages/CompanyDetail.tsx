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
        <div className="container py-16 max-w-3xl space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-14 w-2/3" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-40 w-full mt-8" />
        </div>
      </Layout>
    );
  }

  if (!company) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <Building2 className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-serif text-3xl font-bold">Company not found</h1>
          <Link
            to="/companies"
            className="text-accent text-sm hover:underline mt-4 inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" /> Back to directory
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero band */}
      <div className="bg-primary text-primary-foreground relative overflow-hidden noise">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="container relative py-16 md:py-24">
          <Link
            to="/companies"
            className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60 hover:text-accent mb-8 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Directory
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8 max-w-4xl">
            <div className="h-20 w-20 border border-primary-foreground/20 flex items-center justify-center bg-primary-foreground/5 shrink-0">
              {company.logo_url ? (
                <img src={company.logo_url} alt={company.name} className="h-14 w-14 object-contain" />
              ) : (
                <Building2 className="h-8 w-8 text-primary-foreground/50" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
                {company.name}
              </h1>
              {company.one_liner && (
                <p className="text-lg md:text-xl text-primary-foreground/70 mt-4 max-w-2xl leading-relaxed">
                  {company.one_liner}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-8 text-[10px] font-mono uppercase tracking-widest">
                {company.batch && (
                  <span className="bg-accent text-accent-foreground px-2.5 py-1.5">{company.batch}</span>
                )}
                {company.industry && (
                  <span className="border border-primary-foreground/20 px-2.5 py-1.5 text-primary-foreground/80">
                    {company.industry}
                  </span>
                )}
                <span className="border border-primary-foreground/20 px-2.5 py-1.5 text-primary-foreground/80">
                  {company.status}
                </span>
                {company.website_url && (
                  <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-primary-foreground/20 px-2.5 py-1.5 text-primary-foreground/80 inline-flex items-center gap-1.5 hover:bg-primary-foreground hover:text-primary transition-colors"
                  >
                    Visit Website <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20 max-w-3xl">
        {/* Description */}
        {company.description && (
          <div className="font-serif text-lg leading-[1.85] whitespace-pre-wrap text-pretty">
            {company.description}
          </div>
        )}

        {/* Jobs */}
        {jobs && jobs.length > 0 && (
          <div className="mt-20 pt-12 border-t border-foreground/10">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent mb-6">
              Open Roles · {jobs.length}
            </p>
            <h2 className="font-serif text-3xl font-bold mb-10">Join the team.</h2>
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between py-5 px-1 hover:bg-card transition-colors group"
                >
                  <div>
                    <div className="font-serif font-bold text-base group-hover:text-accent transition-colors">
                      {job.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {[job.location, job.salary_range].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                  {job.apply_link && (
                    <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        className="h-9 px-4 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[11px] uppercase tracking-[0.2em] font-medium"
                      >
                        Apply <ArrowUpRight className="h-3 w-3 ml-1.5" />
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
