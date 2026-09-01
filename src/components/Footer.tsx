import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { RiArrowRightUpLine, RiMailLine } from 'react-icons/ri';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa6';

const MEMBERSHIP_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSe5e8p_TDfsQYURdayTOqX3WUpxa8BkFcIL3J4r1nHVjbxhjQ/viewform';

const SUPPORT_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSc1JwkeReLKI49yLfQLjCFfNI-ZWWNsqTOyWO1vvPcgb69OTQ/viewform';

const CONTACT = 'jitsie@study.iitm.ac.in';

/** Brand marks kept monochrome, so the footer stays black-and-white on the dark ground. */
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/tata-society-entrepreneurship-jitsie-iit-madras',
    Icon: FaLinkedin,
  },
  { label: 'Instagram', href: 'https://www.instagram.com/jitsie_iitm/', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@JITSIEIITM', Icon: FaYoutube },
];

const EXPLORE = [
  { to: '/companies', label: 'Startup Directory' },
  { to: '/openings', label: 'Openings' },
  { to: '/initiatives', label: 'Initiatives' },
];

const COMMUNITY = [
  { to: '/speakers', label: 'Past Speakers' },
  { to: '/events', label: 'Events' },
  { to: '/leadership', label: 'Leadership' },
];

export default function Footer() {
  return (
    <footer className="bg-[hsl(193,100%,13%)] text-white">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Identity */}
          <div className="md:col-span-4">
            <Logo variant="plain" className="text-white" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white">
              The Jamsetji Tata Society for Innovation and Entrepreneurship — the startup
              ecosystem of IIT Madras, backing deep-tech founders building for India and the
              world.
            </p>
            <a
              href={`mailto:${CONTACT}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              <RiMailLine className="h-4 w-4" />
              {CONTACT}
            </a>

            <ul className="mt-6 flex items-center gap-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="inline-flex text-white transition-opacity hover:opacity-70"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <FooterHeading>Community</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {COMMUNITY.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <FooterHeading>Get involved</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              <li>
                <FooterExternal href={MEMBERSHIP_FORM}>Join membership</FooterExternal>
              </li>
              <li>
                <FooterExternal href={SUPPORT_FORM}>Apply for support</FooterExternal>
              </li>
              <li>
                <FooterLink to="/post-opening">Post an opening</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/25 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white">
            © {new Date().getFullYear()} JITSIE, IIT Madras. All rights reserved.
          </p>
          <p className="text-white">Chennai, India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">{children}</h2>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-sm text-white underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

function FooterExternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-sm text-white underline-offset-4 hover:underline"
    >
      {children}
      <RiArrowRightUpLine className="h-3.5 w-3.5" />
    </a>
  );
}
