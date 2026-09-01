import { RiArrowRightLine } from 'react-icons/ri';

const APPLY_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc1JwkeReLKI49yLfQLjCFfNI-ZWWNsqTOyWO1vvPcgb69OTQ/viewform';

/**
 * Standing notice under the navbar. Opens the mentorship application in a new tab
 * rather than embedding it, so the reader never loses their place on the site.
 */
export default function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-50 bg-foreground text-background">
      <div className="container flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2.5 text-center text-xs md:text-[13px]">
        <span className="font-semibold">JITSIE is expanding</span>
        <span aria-hidden className="opacity-40">—</span>
        <span className="opacity-80">
          applications are open for mentorship, idea nurture, incubation and grant support
        </span>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group ml-1 inline-flex items-center gap-1 font-semibold text-accent underline-offset-4 hover:underline"
        >
          Apply now
          <RiArrowRightLine className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
