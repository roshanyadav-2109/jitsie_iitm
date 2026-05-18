import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Youtube, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const navColumns = [
  {
    title: 'Programs',
    links: [
      { to: '/initiatives', label: 'Initiatives' },
      { to: '/events', label: 'Events' },
      { to: '/speakers', label: 'Past Speakers' },
    ],
  },
  {
    title: 'Network',
    links: [
      { to: '/companies', label: 'Venture Directory' },
      { to: '/openings', label: 'Careers' },
      { to: '/leadership', label: 'Leadership' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { to: '/login', label: 'Member Login' },
      { to: '/signup', label: 'Join the Society' },
      { to: '/initiatives', label: 'Partner with Us' },
    ],
  },
];

const socials = [
  { href: 'https://www.linkedin.com/company/jitsie-iitm', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://twitter.com/jitsie_iitm', label: 'Twitter', Icon: Twitter },
  { href: 'https://www.instagram.com/jitsie_iitm', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.youtube.com/@jitsie', label: 'YouTube', Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Newsletter band */}
      <div className="relative border-b border-primary-foreground/10">
        <div className="container py-16">
          <div className="grid md:grid-cols-2 gap-10 items-end">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-4">
                The JITSIE Dispatch
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold leading-[1.05] text-balance">
                A monthly letter on India's<br className="hidden md:block" /> deep-tech founders.
              </h2>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 border-b border-primary-foreground/30 pb-3"
            >
              <Mail className="h-4 w-4 text-primary-foreground/50 shrink-0" />
              <Input
                type="email"
                placeholder="founder@youremail.com"
                className="flex-1 bg-transparent border-0 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-0 px-2"
              />
              <Button
                type="submit"
                className="h-9 px-5 bg-accent text-accent-foreground hover:bg-accent/90 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative container py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-11 w-11 bg-primary-foreground text-primary flex items-center justify-center rounded-sm">
                <span className="font-serif text-xl font-bold leading-none">J</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-bold tracking-tight">JITSIE</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/60 mt-1">
                  IIT Madras
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/65 max-w-sm">
              The institutional society of IIT Madras advancing innovation,
              entrepreneurship, and the founders building what comes next — from India,
              for the world.
            </p>

            <div className="mt-6 space-y-2 text-sm text-primary-foreground/70">
              <a
                href="mailto:contact@jitsie.in"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@jitsie.in
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  IC&SR Building, IIT Madras<br />
                  Chennai, Tamil Nadu 600036
                </span>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-5">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1 text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-5">
              Follow
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 flex items-center justify-center border border-primary-foreground/20 hover:border-accent hover:bg-accent hover:text-accent-foreground text-primary-foreground/80 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-primary-foreground/50 tracking-wide">
            © {new Date().getFullYear()} JITSIE, IIT Madras. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-primary-foreground/50 uppercase tracking-[0.18em]">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
