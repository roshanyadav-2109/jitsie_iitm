import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { to: '/companies', label: 'Directory' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/library', label: 'Library' },
  { to: '/events', label: 'Events' },
  { to: '/team', label: 'Team' },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground bg-background">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold tracking-tight">
          JITSIE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
          {user ? (
            <Button variant="outline" size="sm" onClick={signOut} className="border-foreground">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-foreground">Login</Button>
            </Link>
          )}
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetTitle className="font-serif text-lg">Menu</SheetTitle>
            <nav className="flex flex-col gap-4 mt-6">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="text-lg font-medium" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ))}
              {user ? (
                <Button variant="outline" onClick={() => { signOut(); setOpen(false); }} className="border-foreground">
                  Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full border-foreground">Login</Button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
