import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/companies', label: 'Startup Directory' },
  { to: '/initiatives', label: 'Initiatives' },
  { to: '/openings', label: 'Openings' },
  { to: '/speakers', label: 'Past Speakers' },
  { to: '/events', label: 'Events' },
  { to: '/leadership', label: 'Leadership' },
];

export default function Footer() {
  return (
    <footer className="bg-[hsl(193,100%,15%)] text-white/90">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 w-5 bg-accent flex items-center justify-center rounded-sm">
                <span className="text-accent-foreground text-[10px] font-bold">J</span>
              </div>
              <span className="text-sm font-bold">JITSIE</span>
            </div>
            <p className="text-xs text-white/50 max-w-xs leading-relaxed">
              The startup ecosystem hub of IIT Madras. Backing deep-tech founders building for India and the world.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-xs text-white/50 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-[11px] text-white/40">
          © {new Date().getFullYear()} JITSIE, IIT Madras. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
