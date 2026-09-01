import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useInitiativeDetail } from '@/hooks/useInitiativeDetail';
import { usePartners } from '@/hooks/usePartners';
import { RiArrowLeftLine, RiCheckLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Partner } from '@/lib/types';
import InitiativeFacts from '@/components/InitiativeFacts';

/** Partner names are stored as a '·'-separated line; pair each with its logo when we have one. */
function matchLogo(name: string, partners: Partner[] | undefined) {
  const n = name.toLowerCase();
  return partners?.find((p) => {
    const pn = p.name.toLowerCase();
    return pn.includes(n) || n.includes(pn.split(' (')[0]);
  })?.logo_url ?? null;
}

export default function InitiativeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: initiative, isLoading } = useInitiativeDetail(id);
  const { data: partners } = usePartners();

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10 space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-56 w-80 rounded-lg" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Layout>
    );
  }

  if (!initiative) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p className="text-muted-foreground mb-4">Initiative not found.</p>
          <Link to="/initiatives">
            <Button variant="outline" className="gap-2">
              <RiArrowLeftLine className="h-4 w-4" /> Back to Initiatives
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const outcomes = (initiative.outcomes ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
  const partnerNames = (initiative.partners ?? '').split('·').map((p) => p.trim()).filter(Boolean);

  return (
    <Layout>
      <div className="container py-10">
        <Link
          to="/initiatives"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <RiArrowLeftLine className="h-4 w-4" /> Back to Initiatives
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-8">{initiative.title}</h1>

        <article>
          {/* Floated so the copy runs alongside the image and then continues beneath it.
              No fixed aspect box — the image keeps its own proportions. */}
          {initiative.image_url && (
            <img
              src={initiative.image_url}
              alt={initiative.title}
              className="w-full sm:float-left sm:mr-8 sm:w-96 mb-6 h-auto rounded-2xl border border-foreground/10"
            />
          )}

          {initiative.overview && (
            <p className="text-lg leading-relaxed mb-6">{initiative.overview}</p>
          )}

          <InitiativeFacts initiative={initiative} />

          {initiative.description && (
            <>
              <h2 className="text-2xl font-semibold mb-4">How it runs</h2>
              <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line mb-8">
                {initiative.description}
              </p>
            </>
          )}

          {outcomes.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 clear-both">What came out of it</h2>
              <ul className="mb-10 grid gap-x-10 gap-y-2 lg:grid-cols-2">
                {outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-base leading-relaxed">
                    <RiCheckLine className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {partnerNames.length > 0 && (
            <div className="clear-both">
              <h2 className="text-2xl font-semibold mb-6">Partners</h2>
              <div className="flex flex-wrap gap-x-12 gap-y-7">
                {partnerNames.map((name) => {
                  const logo = matchLogo(name, partners);
                  return (
                    <div key={name} className="flex items-center gap-3">
                      {logo && (
                        <img src={logo} alt="" className="h-11 w-11 shrink-0 object-contain" />
                      )}
                      <span className="text-sm font-medium leading-snug">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </div>
    </Layout>
  );
}
