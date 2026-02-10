import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/companies', label: 'Directory' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/library', label: 'Library' },
  { to: '/events', label: 'Events' },
  { to: '/team', label: 'Team' },
];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 w-5 bg-accent flex items-center justify-center">
                <span className="text-accent-foreground text-[10px] font-bold">J</span>
              </div>
              <span className="font-serif text-sm font-bold">JITSIE</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              The startup ecosystem hub of IIT Madras. Backing deep-tech founders building for India and the world.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-foreground/5 text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} JITSIE, IIT Madras. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
