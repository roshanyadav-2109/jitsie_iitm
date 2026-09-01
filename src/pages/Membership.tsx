import Layout from '@/components/Layout';

/**
 * Membership sign-up. The form itself lives in Google Forms — embedding it keeps
 * responses flowing to the sheet the team already works from, rather than
 * building a second intake path that has to be reconciled later.
 */
const FORM_SRC =
  'https://docs.google.com/forms/d/e/1FAIpQLSe5e8p_TDfsQYURdayTOqX3WUpxa8BkFcIL3J4r1nHVjbxhjQ/viewform?embedded=true';

const FORM_LINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSe5e8p_TDfsQYURdayTOqX3WUpxa8BkFcIL3J4r1nHVjbxhjQ/viewform';

export default function Membership() {
  return (
    <Layout>
      <section className="container py-10 md:py-14">
        <header className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Entrepreneur Membership
          </h1>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Join the JITSIE entrepreneur community at IIT Madras. Fill in the form below and the
            team will be in touch.
          </p>
        </header>

        <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
          <iframe
            src={FORM_SRC}
            title="Entrepreneur Membership form"
            className="h-[1400px] w-full"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>

        {/* Some browsers block third-party frames outright, so always offer the direct link. */}
        <p className="mt-4 text-sm text-muted-foreground">
          Trouble loading the form?{' '}
          <a
            href={FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Open it in a new tab
          </a>
          .
        </p>
      </section>
    </Layout>
  );
}
