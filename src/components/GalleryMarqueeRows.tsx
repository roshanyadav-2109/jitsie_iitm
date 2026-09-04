import { useEffect, useRef } from 'react';
import type { GalleryImage } from '@/lib/types';

const SPEED = 26; // px per second

function DriftRow({ images, direction }: { images: GalleryImage[]; direction: 1 | -1 }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  // Sole source of truth for position — never read scrollLeft back for the
  // math. At rapid sub-pixel deltas, writes to scrollLeft don't reliably
  // read back the same frame, which silently stalls a read-modify-write loop.
  const posRef = useRef(0);
  const rafRef = useRef<number>();
  const looped = [...images, ...images];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const half = el.scrollWidth / 2;
    posRef.current = half / 2;
    el.scrollLeft = posRef.current;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;

      if (dragging.current) {
        posRef.current = el.scrollLeft;
      } else {
        const h = el.scrollWidth / 2;
        let next = posRef.current + direction * SPEED * (dt / 1000);
        if (next >= h) next -= h;
        if (next < 0) next += h;
        posRef.current = next;
        el.scrollLeft = next;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [direction, images.length]);

  return (
    <div
      ref={trackRef}
      className="scrollbar-hide flex touch-pan-x gap-3 overflow-x-auto"
      onPointerDown={() => (dragging.current = true)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      {looped.map((img, i) => (
        <div
          key={`${img.id}-${i}`}
          className="aspect-[4/3] w-44 shrink-0 overflow-hidden rounded-lg border border-foreground/10 bg-card"
        >
          <img src={img.image_url} alt={img.title || 'Gallery image'} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

/**
 * Mobile gallery: three rows that drift continuously (alternating direction)
 * and can also be dragged by hand — a masonry grid doesn't fit a narrow
 * screen as legibly as a handful of moving strips.
 */
export default function GalleryMarqueeRows({ images }: { images: GalleryImage[] }) {
  const ROWS = 3;
  const rows: GalleryImage[][] = Array.from({ length: ROWS }, () => []);
  images.forEach((img, i) => rows[i % ROWS].push(img));

  return (
    <div className="flex flex-col gap-3">
      {rows.map(
        (row, i) => row.length > 0 && <DriftRow key={i} images={row} direction={i % 2 === 0 ? 1 : -1} />
      )}
    </div>
  );
}
