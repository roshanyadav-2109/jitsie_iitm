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
      {/* Three-column grid: side columns share the leftover width equally and
          push their content to the outer edges, so the hamburger/nav, the
          centered logo, and the CTA can never collide regardless of viewport
          width — unlike absolute-positioned siblings over a centered flex row. */}
      <div className="mx-auto grid h-16 w-full max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:h-20 sm:px-6 md:h-24 md:px-8">
        <div className="flex min-w-max items-center justify-self-start">
          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
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

          {/* Desktop Navigation — left half */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
            {leftLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "text-[15px] font-medium transition-colors tracking-wide whitespace-nowrap",
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

        <Link to="/" className="group flex min-w-max shrink-0 items-center justify-self-center">
          <Logo className="scale-90 transition-transform group-hover:scale-[0.95] sm:scale-100 lg:scale-110 lg:group-hover:scale-[1.15]" />
        </Link>

        <div className="flex min-w-max items-center justify-self-end gap-3 sm:gap-4 xl:gap-6">
          {/* Desktop Navigation — right half */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
            {rightLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "text-[15px] font-medium transition-colors tracking-wide whitespace-nowrap",
                  isActive(l.to)
                    ? "text-foreground font-semibold underline decoration-2 decoration-accent underline-offset-[10px]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Below the full nav breakpoint there's no room for a pill button
              next to the hamburger and logo, so it collapses to a plain link. */}
          <a
            href={MEMBERSHIP_FORM}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 whitespace-nowrap text-xs font-semibold text-foreground underline underline-offset-4 lg:hidden"
          >
            Membership
          </a>
          <a href={MEMBERSHIP_FORM} target="_blank" rel="noopener noreferrer" className="hidden shrink-0 lg:block">
            <Button size="sm" className="h-10 px-6 text-[13px] font-medium rounded-full whitespace-nowrap">
              Join Membership
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
