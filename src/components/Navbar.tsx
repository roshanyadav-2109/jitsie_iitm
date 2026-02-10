import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { to: '/companies', label: 'Directory' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/openings', label: 'Openings' },
  { to: '/library', label: 'Library' },
  { to: '/events', label: 'Events' },
  { to: '/team', label: 'Team' },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10">
      <div className="container flex h-12 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6 bg-accent flex items-center justify-center">
            <span className="text-accent-foreground text-xs font-bold">J</span>
          </div>
          <span className="font-serif text-lg font-bold tracking-tight">JITSIE</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[13px] font-medium px-3 py-1.5 hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="h-4 w-px bg-foreground/20 mx-2" />
          {user ? (
            <button
              onClick={signOut}
              className="text-[13px] font-medium px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <Button size="sm" className="h-7 px-3 text-xs bg-foreground text-background hover:bg-foreground/90">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background w-64">
            <SheetTitle className="font-serif text-lg">Menu</SheetTitle>
            <nav className="flex flex-col gap-1 mt-6">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm font-medium py-2 px-3 hover:bg-secondary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="h-px bg-foreground/10 my-2" />
              {user ? (
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="text-sm font-medium py-2 px-3 text-left text-muted-foreground hover:text-foreground"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90">
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
