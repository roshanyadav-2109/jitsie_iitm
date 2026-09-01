import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Friendly consumer-app style empty state: a soft illustrated panel rather than a
 * line of grey text, so a quiet calendar still gives the visitor somewhere to go.
 */
export default function EmptyEvents() {
  return (
    <div className="rounded-3xl bg-accent/5 px-6 py-14 text-center sm:py-16">
      <svg
        viewBox="0 0 220 180"
        className="mx-auto h-44 w-auto animate-[float_5s_ease-in-out_infinite] motion-reduce:animate-none"
        role="img"
        aria-label="An empty calendar"
      >
        {/* soft blobs */}
        <circle cx="34" cy="44" r="10" className="fill-accent/15" />
        <circle cx="192" cy="120" r="14" className="fill-accent/10" />
        <circle cx="180" cy="36" r="5" className="fill-accent/25" />

        {/* calendar card, tilted */}
        <g transform="rotate(-6 110 96)">
          <rect x="52" y="46" width="116" height="102" rx="16" className="fill-background" />
          <rect
            x="52"
            y="46"
            width="116"
            height="102"
            rx="16"
            className="fill-none stroke-accent/30"
            strokeWidth="2.5"
          />
          <path d="M52 74h116" className="stroke-accent/30" strokeWidth="2.5" />
          <rect x="76" y="34" width="7" height="22" rx="3.5" className="fill-accent" />
          <rect x="137" y="34" width="7" height="22" rx="3.5" className="fill-accent" />

          {/* empty day cells */}
          <g className="fill-accent/15">
            <rect x="68" y="88" width="18" height="14" rx="5" />
            <rect x="96" y="88" width="18" height="14" rx="5" />
            <rect x="124" y="88" width="18" height="14" rx="5" />
            <rect x="68" y="112" width="18" height="14" rx="5" />
            <rect x="96" y="112" width="18" height="14" rx="5" />
          </g>
          <rect x="124" y="112" width="18" height="14" rx="5" className="fill-accent/40" />
        </g>

        {/* paper plane heading off */}
        <g className="fill-accent">
          <path d="M170 92l30-13-9 30-7-11-14-6z" />
        </g>
        <path
          d="M150 112c14 2 26-2 36-12"
          className="stroke-accent/40"
          strokeWidth="2.5"
          strokeDasharray="5 7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <h2 className="mt-8 text-xl font-semibold sm:text-2xl">No events right now</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        New sessions are announced here first. In the meantime, take a look at what
        JITSIE runs through the year.
      </p>

      <Link to="/initiatives">
        <Button className="mt-7 h-11 rounded-full px-7">Explore initiatives</Button>
      </Link>
    </div>
  );
}
