import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useCompanies } from '@/hooks/useCompanies';
import { usePartners } from '@/hooks/usePartners';
import { usePastSpeakers } from '@/hooks/usePastSpeakers';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, TrendingUp, Building2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Index() {
  const { data: gallery, isLoading: galleryLoading } = useGalleryImages();
  const { data: companies } = useCompanies();
  const { data: partners } = usePartners();
  const { data: speakers } = usePastSpeakers();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);

  return (
    <Layout>
      {/* Section 1 — Hero */}
      <section className="py-20 md:py-32 text-center border-b border-foreground/10">
        <div className="container max-w-4xl">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            IIT Madras Startup Ecosystem
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
            Build the future.
          </h1>
          <p className="mt-8 text-lg md:text-xl italic text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            "The best way to predict the future is to create it. We back the founders who believe this."
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link to="/companies">
              <Button className="bg-foreground text-background hover:bg-foreground/90 px-6 h-11 text-sm">
                Explore Startups <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <Link to="/openings">
              <Button variant="outline" className="border-foreground px-6 h-11 text-sm">
                View Open Roles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2 — Stats Strip */}
      <section className="border-b border-foreground/10 bg-foreground text-background">
        <div className="container flex flex-col md:flex-row items-stretch justify-center">
          {[
            { icon: TrendingUp, label: 'Total Valuation', value: '$2.4B+' },
            { icon: Building2, label: 'Startups Funded', value: '120+' },
            { icon: Users, label: 'Active Founders', value: '350+' },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 py-8 px-8 text-center ${
                i < 2 ? 'md:border-r md:border-background/20' : ''
              } ${i > 0 ? 'border-t md:border-t-0 border-background/20' : ''}`}
            >
              <s.icon className="h-5 w-5 mx-auto mb-2 opacity-60" />
              <div className="text-3xl md:text-4xl font-bold">{s.value}</div>
              <div className="text-xs uppercase tracking-widest mt-2 opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Partners Marquee */}
      {partners && partners.length > 0 && (
        <section className="py-52 border-b border-foreground/10 overflow-hidden">
          <div className="container mb-28 text-center">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Together with our partners,<br />
              we build what's next.
            </h2>
          </div>
          <div className="relative">
            <div className="marquee-track flex items-center gap-16">
              {[...partners, ...partners].map((p, i) => (
                <div key={`${p.id}-${i}`} className="shrink-0 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                  {p.logo_url ? (
                    <img src={p.logo_url} alt={p.name} className="max-h-12 max-w-full object-contain" />
                  ) : (
                    <span className="text-sm font-bold text-muted-foreground">{p.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4 — Initiatives CTA Banner */}
      <section className="relative bg-accent text-accent-foreground overflow-hidden">
        {/* Decorative geometric patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="0" x2="30%" y2="100%" stroke="currentColor" strokeWidth="1" />
          <line x1="70%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" />
          <line x1="50%" y1="0" x2="20%" y2="100%" stroke="currentColor" strokeWidth="1" />
          <circle cx="80%" cy="30%" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="15%" cy="70%" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <div className="relative container py-20 text-center">
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
      </section>

      {/* Section 5 — Gallery */}
      <section className="py-52">
        <div className="container">
          <div className="text-center mb-28">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Emerging from India,<br />
              directing the world
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">Viewing our ecosystem</p>
          </div>

          {galleryLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] w-full" />
              ))}
            </div>
          ) : gallery && gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden border border-foreground/10 bg-card"
                  onMouseEnter={() => setHoveredId(img.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.title || 'Gallery image'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

      {/* Section 6 — Past Speakers Marquee */}
      {speakers && speakers.length > 0 && (
        <section className="py-16 bg-muted/50 border-t border-foreground/10">
          <div className="container mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Our Past Speakers</h2>
          </div>
          <div className="relative overflow-hidden">
            <div className="marquee-track flex items-center gap-6">
              {[...speakers, ...speakers].map((s, i) => (
                <div
                  key={`${s.id}-${i}`}
                  className="shrink-0 relative w-48 h-60 rounded-xl overflow-hidden bg-secondary cursor-pointer"
                  onMouseEnter={() => setHoveredSpeaker(`${s.id}-${i}`)}
                  onMouseLeave={() => setHoveredSpeaker(null)}
                >
                  {s.avatar_url ? (
                    <img src={s.avatar_url} alt={s.full_name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <span className="text-3xl font-bold text-muted-foreground/30">{s.full_name[0]}</span>
                    </div>
                  )}
                  <div
                    className={`absolute inset-0 bg-foreground/70 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                      hoveredSpeaker === `${s.id}-${i}` ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-background font-bold text-sm">{s.full_name}</p>
                    {s.designation && <p className="text-background/70 text-xs mt-0.5">{s.designation}</p>}
                    {s.organization && <p className="text-background/60 text-xs">{s.organization}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
