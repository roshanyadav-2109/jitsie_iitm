import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/companies', label: 'Directory' },
  { to: '/partners', label: 'Partners' },
  { to: '/openings', label: 'Openings' },
  { to: '/speakers', label: 'Past Speakers' },
  { to: '/events', label: 'Events' },
  { to: '/leadership', label: 'Leadership' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsla(193, 100%, 39%, 0.06) 30%, hsla(193, 100%, 39%, 0.15) 100%)',
        }}
      />
      <div className="relative border-t border-accent/20">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-5 bg-accent flex items-center justify-center rounded-sm">
                  <span className="text-accent-foreground text-[10px] font-bold">J</span>
                </div>
                <span className="text-sm font-bold">JITSIE</span>
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
          <div className="mt-10 pt-6 border-t border-accent/10 text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} JITSIE, IIT Madras. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
