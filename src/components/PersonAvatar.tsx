import { useState } from 'react';

function initials(name: string) {
  return name
    .replace(/\b(Prof\.|Dr\.|CA|Mr\.|Ms\.|Mrs\.)\s*/gi, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

/**
 * Square person image with an initials fallback — used when a photo is missing
 * or the remote image fails to load. `position` overrides the object-cover crop
 * for subjects who sit off-centre in the source photo.
 */
export default function PersonAvatar({ name, src, position }: { name: string; src?: string | null; position?: string | null }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => setFailed(true)}
        style={position ? { objectPosition: position } : undefined}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-accent/10">
      <span className="text-3xl font-semibold tracking-wide text-accent/70">{initials(name)}</span>
    </div>
  );
}
