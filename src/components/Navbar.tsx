import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/companies', label: 'Directory' },
  { to: '/partners', label: 'Partners' },
  { to: '/openings', label: 'Openings' },
  { to: '/speakers', label: 'Past Speakers' },
  { to: '/events', label: 'Events' },
  { to: '/leadership', label: 'Leadership' },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3, 6);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5">
      <div className="container relative flex h-16 items-center justify-center">
        
        {/* Mobile Menu Trigger */}
        <div className="absolute left-4 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetTitle className="text-2xl font-bold mb-6">JITSIE</SheetTitle>
              <nav className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={cn(
                      "text-sm font-medium py-3 px-4 rounded-md transition-colors",
                      isActive(l.to) 
                        ? "bg-secondary text-foreground" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-4" />
                {user ? (
                  <button
                    onClick={() => { signOut(); setOpen(false); }}
                    className="text-sm font-medium py-3 px-4 text-left text-muted-foreground hover:text-foreground"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button className="w-full" size="sm">
                      Login
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-6">
            {leftLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "text-[13px] font-medium transition-colors tracking-wide",
                  isActive(l.to) ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="flex items-center justify-center shrink-0 mx-4 group">
            <div className="h-9 w-9 bg-foreground text-background flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
              <span className="text-sm font-bold">J</span>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            {rightLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "text-[13px] font-medium transition-colors tracking-wide",
                  isActive(l.to) ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Logo */}
        <Link to="/" className="flex md:hidden items-center gap-2">
          <span className="text-xl font-bold tracking-tight">JITSIE</span>
        </Link>

        {/* Login Button */}
        <div className="absolute right-4 md:right-8 flex items-center">
          {user ? (
            <button
              onClick={signOut}
              className="text-xs md:text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <Button 
                size="sm" 
                className="h-8 px-5 text-xs font-medium rounded-full transition-all hover:scale-105"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
