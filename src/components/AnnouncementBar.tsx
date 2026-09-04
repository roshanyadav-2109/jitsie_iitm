import { RiArrowRightLine } from 'react-icons/ri';

const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc1JwkeReLKI49yLfQLjCFfNI-ZWWNsqTOyWO1vvPcgb69OTQ/viewform';

function Message({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
      <span className="font-semibold">JITSIE is expanding</span>
      <span className="opacity-40">—</span>
      <span className="opacity-80">
        applications are open for mentorship, idea nurture, incubation and grant support
      </span>
    </div>
  );
}

/**
 * Standing notice under the navbar. Opens the mentorship application in a new tab
 * rather than embedding it, so the reader never loses their place on the site.
 *
 * The message scrolls as a single-line marquee (never wraps, so the bar stays
 * one row tall on any screen) while "Apply now" stays fixed on the right.
 */
export default function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-50 bg-foreground text-background">
      <div className="container flex items-center gap-3 py-2.5 text-xs md:text-[13px]">
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track flex items-center gap-16">
            <Message />
            <Message hidden />
          </div>
        </div>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex shrink-0 items-center gap-1 font-semibold text-accent underline-offset-4 hover:underline"
        >
          Apply now
          <RiArrowRightLine className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
