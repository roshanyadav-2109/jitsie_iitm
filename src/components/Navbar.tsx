import { Link, useLocation } from 'react-router-dom';
import { RiMenuLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

const MEMBERSHIP_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSe5e8p_TDfsQYURdayTOqX3WUpxa8BkFcIL3J4r1nHVjbxhjQ/viewform';

const navLinks = [
  { to: '/companies', label: 'Startup Directory' },
  { to: '/initiatives', label: 'Initiatives' },
  { to: '/openings', label: 'Openings' },
  { to: '/speakers', label: 'Past Speakers' },
  { to: '/events', label: 'Events' },
  { to: '/leadership', label: 'Leadership' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3, 6);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="relative z-40 bg-background border-b border-foreground/5">
      <div className="container relative flex h-20 items-center justify-center md:h-24">
        
        {/* Mobile Menu Trigger */}
        <div className="absolute left-4 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <RiMenuLine className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetTitle className="mb-6">
                <Logo />
              </SheetTitle>
              <nav className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={cn(
                      "text-sm font-medium py-3 px-4 rounded-md transition-colors",
                      isActive(l.to) 
                        ? "text-foreground font-semibold underline decoration-2 decoration-accent underline-offset-[6px]" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-4" />
                <a
                  href={MEMBERSHIP_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <Button className="w-full" size="sm">
                    Join Membership
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <nav className="flex items-center gap-7">
            {leftLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "text-[15px] font-medium transition-colors tracking-wide",
                  isActive(l.to)
                    ? "text-foreground font-semibold underline decoration-2 decoration-accent underline-offset-[10px]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="flex items-center justify-center shrink-0 mx-4 group">
<Logo className="scale-110 transition-transform group-hover:scale-[1.15]" />
          </Link>

          <nav className="flex items-center gap-7">
            {rightLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "text-[15px] font-medium transition-colors tracking-wide",
                  isActive(l.to)
                    ? "text-foreground font-semibold underline decoration-2 decoration-accent underline-offset-[10px]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Logo */}
        <Link to="/" className="flex md:hidden items-center">
          <Logo />
        </Link>

        {/* Membership CTA */}
        <div className="absolute right-4 md:right-8 flex items-center">
          <a href={MEMBERSHIP_FORM} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="h-10 px-6 text-[13px] font-medium rounded-full">
              Join Membership
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
