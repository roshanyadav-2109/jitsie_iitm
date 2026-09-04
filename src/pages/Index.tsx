import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useCompanies } from '@/hooks/useCompanies';
import { usePartners } from '@/hooks/usePartners';
import { usePastSpeakers } from '@/hooks/usePastSpeakers';
import { useSpeakerCompanies } from '@/hooks/useSpeakerCompanies';
import LogoMarquee from '@/components/LogoMarquee';
import { Skeleton } from '@/components/ui/skeleton';
import { RiArrowRightLine, RiMicLine, RiSeedlingLine, RiTeamLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Index() {
  usePageTitle("Home");
  const { data: gallery, isLoading: galleryLoading } = useGalleryImages();
  const { data: companies } = useCompanies();
  const { data: allPartners } = usePartners();
  const partners = allPartners?.filter((p) => p.show_on_home);
  const { data: speakers } = usePastSpeakers();
  const { data: speakerCompanies } = useSpeakerCompanies();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);

  return (
    <Layout>
      {/* Section 1 — Hero */}
      <section className="relative overflow-hidden">
        <div className="container py-16 md:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Two lines, so the type builds a block that can hold its own against the
                  artwork instead of one long thin line. */}
              <h1 className="font-serif text-[3.5rem] font-bold leading-[0.88] tracking-tight sm:text-7xl lg:text-[5.75rem]">
                <span className="block">From campus</span>
                <span className="block">to company</span>
              </h1>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <Link to="/companies" className="w-full sm:w-auto">
                  <Button className="group w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-7 h-12 text-sm">
                    Explore Startups
                    <RiArrowRightLine className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link
                  to="/initiatives"
                  className="inline-flex items-center text-sm font-medium text-foreground"
                >
                  View Initiatives
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:col-span-5 animate-in fade-in duration-1000">
              {/* Wavy gel wash. The bottom is flush with the artwork's own bottom edge so
                  the two end on the same line — otherwise the cut-out reads as chopped off
                  above the wash. Sides bleed wider than the image so it is not a frame. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -right-10 bottom-0 h-[58%]"
              >
                <svg
                  viewBox="0 0 640 340"
                  preserveAspectRatio="none"
                  className="h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="heroGel" x1="0" y1="0" x2="0.2" y2="1">
                      <stop offset="0%" stopColor="hsl(150 70% 60%)" stopOpacity="0.35" />
                      <stop offset="55%" stopColor="hsl(168 72% 50%)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(186 78% 44%)" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="heroGelSoft" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="9" />
                    </filter>
                  </defs>

                  {/* Wavy crest, sides drawn in, bottom running out to the artwork's baseline */}
                  <path
                    filter="url(#heroGelSoft)"
                    fill="url(#heroGel)"
                    d="M28,166 C104,66 204,192 326,128 C440,68 542,148 610,96 C630,164 638,268 628,340 L14,340 C2,276 6,214 28,166 Z"
                  />
                  {/* Highlight ripple, for the wet look */}
                  <path
                    fill="#ffffff"
                    fillOpacity="0.22"
                    d="M54,204 C152,140 252,240 368,190 C470,146 548,204 606,174 C562,220 472,186 368,232 C246,286 140,216 54,204 Z"
                  />
                </svg>
              </div>

              {/* Cut-out artwork, no frame or crop. f_auto,q_auto lets Cloudinary ship
                  WebP/AVIF instead of the 2 MB source PNG. */}
              <img
                src="https://res.cloudinary.com/dkywjijpv/image/upload/f_auto,q_auto,w_1200/v1788278687/ac1cd6b7-1aae-40cd-9302-ddcc6dffc0c9_uxohgu.png"
                alt=""
                aria-hidden
                width={1371}
                height={1148}
                className="relative z-10 block h-auto w-full max-w-[560px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Stats: icon, figure, label, in a tinted block inset from the page edges */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-lg bg-secondary/60 px-6 py-12 md:px-8 md:py-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {[
              { label: 'Past speakers', value: '20+', Icon: RiMicLine },
              { label: 'Startups mentored', value: '200+', Icon: RiSeedlingLine },
              { label: 'Startup founders', value: '3000+', Icon: RiTeamLine },
            ].map(({ label, value, Icon }) => (
              <div key={label}>
                <Icon className="h-6 w-6 text-foreground" aria-hidden />
                <div className="mt-5 font-sans font-bold tabular-nums leading-none tracking-tight text-4xl md:text-5xl">
                  {value}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Partners Marquee */}
      {partners && partners.length > 0 && (
        <section className="py-20 md:py-24 overflow-hidden">
          <div className="container mb-14 text-center">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Together with our partners,<br />
              we build what's next.
            </h2>
          </div>
          <div className="relative">
            <div className="marquee-track flex items-center gap-10 sm:gap-16 md:gap-24">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className="flex w-40 shrink-0 flex-col items-center justify-end gap-3 transition-transform duration-300 hover:scale-105 sm:w-52 sm:gap-4 md:w-64"
                >
                  {p.logo_url && (
                    <div className="flex h-14 items-center justify-center sm:h-20 md:h-24">
                      <img src={p.logo_url} alt="" className="max-h-14 max-w-full object-contain sm:max-h-20 md:max-h-24" />
                    </div>
                  )}
                  <span className="text-center text-sm font-semibold leading-snug text-muted-foreground sm:text-base">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4 — Initiatives CTA, inset from the page edges like the stats block */}
      <section className="py-6 md:py-10">
        <div className="container">
          <div className="relative overflow-hidden rounded-lg bg-accent text-accent-foreground">
            {/* Decorative geometric patterns */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="0" x2="30%" y2="100%" stroke="currentColor" strokeWidth="1" />
              <line x1="70%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" />
              <line x1="50%" y1="0" x2="20%" y2="100%" stroke="currentColor" strokeWidth="1" />
              <circle cx="80%" cy="30%" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="15%" cy="70%" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="relative px-6 py-16 md:px-12 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Looking for our cohorts?</h2>
              <p className="text-base md:text-lg opacity-90 max-w-xl mx-auto mb-8">
                We offer mentorships to emerging startups at every stage of innovation.
              </p>
              <Link to="/initiatives">
                <Button className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 h-11 text-sm font-medium">
                  Explore Initiatives
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Past Speakers Marquee */}
      {speakers && speakers.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="container mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-normal">Our Past Speakers</h2>
          </div>
          <div className="relative overflow-hidden">
            <div className="marquee-track flex items-center gap-8">
              {[...speakers, ...speakers].map((s, i) => (
                <div
                  key={`${s.id}-${i}`}
                  className="shrink-0 relative w-72 h-96 rounded-[5px] overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredSpeaker(`${s.id}-${i}`)}
                  onMouseLeave={() => setHoveredSpeaker(null)}
                >
                  {s.avatar_url ? (
                    <img
                      src={s.avatar_url}
                      alt={s.full_name}
                      loading="lazy"
                      style={s.avatar_position ? { objectPosition: s.avatar_position } : undefined}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif text-5xl font-semibold text-muted-foreground/30">{s.full_name[0]}</span>
                    </div>
                  )}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/35 to-transparent rounded-[5px] flex flex-col justify-end p-6 transition-opacity duration-300 ${
                      hoveredSpeaker === `${s.id}-${i}` ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-background font-serif font-semibold text-lg leading-tight">{s.full_name}</p>
                    {s.designation && <p className="text-background/80 text-sm mt-1.5">{s.designation}</p>}
                    {s.organization && <p className="text-background/70 text-sm">{s.organization}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {speakerCompanies && speakerCompanies.length > 0 && (
            <div className="container mt-14">
              <LogoMarquee companies={speakerCompanies} />
            </div>
          )}
        </section>
      )}

      {/* Section 6 — Gallery */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Emerging from India, directing the world
            </h2>
          </div>

          {galleryLoading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[16/9]', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[3/4]'].map((a, i) => (
                <Skeleton key={i} className={`${a} w-full mb-4`} />
              ))}
            </div>
          ) : gallery && gallery.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {gallery.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden border border-foreground/10 bg-card mb-4 break-inside-avoid"
                  onMouseEnter={() => setHoveredId(img.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.title || 'Gallery image'}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-foreground/60 flex flex-col justify-end p-5 transition-opacity duration-300 ${
                      hoveredId === img.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {img.title && <h3 className="text-background font-bold text-lg leading-tight">{img.title}</h3>}
                    {img.caption && <p className="text-background/70 text-sm mt-1 leading-relaxed">{img.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-8 text-center">No gallery images yet.</p>
          )}
        </div>
      </section>

    </Layout>
  );
}
