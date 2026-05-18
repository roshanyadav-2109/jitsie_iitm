import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/companies', label: 'Ventures' },
  { to: '/initiatives', label: 'Programs' },
  { to: '/openings', label: 'Careers' },
  { to: '/speakers', label: 'Speakers' },
  { to: '/events', label: 'Events' },
  { to: '/leadership', label: 'Leadership' },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-foreground/10'
          : 'bg-background/60 backdrop-blur-md border-b border-transparent'
      )}
    >
      {/* Top thin announcement bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container flex h-8 items-center justify-between text-[11px] tracking-[0.18em] uppercase">
          <span className="opacity-80">Indian Institute of Technology · Madras</span>
          <span className="flex items-center gap-5 opacity-80">
            <a href="mailto:contact@jitsie.in" className="hover:text-accent transition-colors">
              contact@jitsie.in
            </a>
            <span className="text-accent">•</span>
            <span>Est. 2010</span>
          </span>
        </div>
      </div>

      <div className="container flex h-20 items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative">
            <div className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center rounded-sm transition-all group-hover:scale-105">
              <span className="font-serif text-lg font-bold leading-none">J</span>
            </div>
            <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl font-bold tracking-tight">JITSIE</span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
              IIT Madras
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                'relative text-[12px] uppercase tracking-[0.16em] font-medium transition-colors py-1',
                isActive(l.to)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {l.label}
              {isActive(l.to) && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right action / mobile menu */}
        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={signOut}
              className="hidden md:inline text-[12px] uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hidden md:inline-block">
              <Button
                size="sm"
                className="h-9 px-5 text-[11px] uppercase tracking-[0.2em] font-medium rounded-none bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Member Login
              </Button>
            </Link>
          )}

          {/* Mobile trigger */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background border-l border-foreground/10 p-0">
                <div className="flex items-center justify-between p-6 border-b border-foreground/10">
                  <SheetTitle className="font-serif text-2xl font-bold tracking-tight">JITSIE</SheetTitle>
                  <button onClick={() => setOpen(false)} className="text-muted-foreground">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex flex-col p-4">
                  {navLinks.map((l, i) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'group flex items-center justify-between py-4 px-3 border-b border-foreground/5 transition-colors',
                        isActive(l.to) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <span className="font-serif text-lg">{l.label}</span>
                      <span className="font-mono text-[10px] tracking-wider opacity-50">
                        0{i + 1}
                      </span>
                    </Link>
                  ))}
                </nav>
                <div className="p-6">
                  {user ? (
                    <Button
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                        Member Login
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
