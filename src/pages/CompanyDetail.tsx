import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCompanyBySlug } from '@/hooks/useCompanies';
import { useJobsByCompany } from '@/hooks/useJobs';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompanyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: company, isLoading } = useCompanyBySlug(slug || '');
  const { data: jobs } = useJobsByCompany(company?.id || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10 max-w-3xl space-y-4">
          <Skeleton className="h-12 w-1/2 bg-muted" />
          <Skeleton className="h-6 w-3/4 bg-muted" />
          <Skeleton className="h-40 w-full bg-muted" />
        </div>
      </Layout>
    );
  }

  if (!company) {
    return (
      <Layout>
        <div className="container py-10 text-center">
          <h1 className="text-2xl font-serif">Company not found</h1>
          <Link to="/companies" className="text-accent underline mt-2 inline-block">Back to directory</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <Link to="/companies" className="text-sm text-muted-foreground hover:text-accent mb-4 inline-block">
          ← Back to Directory
        </Link>
        <div className="flex items-start gap-4 mb-6">
          {company.logo_url && (
            <img src={company.logo_url} alt={company.name} className="h-16 w-16 object-contain border border-foreground p-1" />
          )}
          <div>
            <h1 className="text-3xl font-serif font-bold">{company.name}</h1>
            {company.one_liner && <p className="text-muted-foreground mt-1">{company.one_liner}</p>}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 text-sm">
          {company.batch && <span className="border border-foreground px-2 py-1">Batch: {company.batch}</span>}
          {company.industry && <span className="border border-foreground px-2 py-1">{company.industry}</span>}
          <span className="border border-foreground px-2 py-1 capitalize">{company.status}</span>
          {company.website_url && (
            <a href={company.website_url} target="_blank" rel="noopener noreferrer" className="border border-foreground px-2 py-1 inline-flex items-center gap-1 hover:bg-secondary">
              Website <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {company.description && (
          <div className="prose prose-sm max-w-none font-serif leading-relaxed mb-10 whitespace-pre-wrap">
            {company.description}
          </div>
        )}

        {/* Related Jobs */}
        {jobs && jobs.length > 0 && (
          <div>
            <h2 className="text-xl font-serif font-bold border-b border-foreground pb-2 mb-4">Open Positions</h2>
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between border border-foreground p-4">
                  <div>
                    <div className="font-serif font-semibold">{job.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {[job.location, job.salary_range].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                  {job.apply_link && (
                    <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">Apply</Button>
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
