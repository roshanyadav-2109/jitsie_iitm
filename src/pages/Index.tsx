import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useCompanies } from '@/hooks/useCompanies';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, TrendingUp, Building2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Index() {
  const { data: gallery, isLoading: galleryLoading } = useGalleryImages();
  const { data: companies } = useCompanies();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-32 text-center border-b border-foreground/10">
        <div className="container max-w-4xl">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            IIT Madras Startup Ecosystem
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
            Build the future.
          </h1>
          <p className="mt-8 text-lg md:text-xl italic text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            "The best way to predict the future is to create it. We back the
            founders who believe this."
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

      {/* Stats Strip */}
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

      {/* Featured Companies Bar */}
      {companies && companies.length > 0 && (
        <section className="border-b border-foreground/10 py-6">
          <div className="container">
            <div className="flex items-center gap-6 overflow-x-auto">
              <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">
                Portfolio
              </span>
              <div className="h-4 w-px bg-foreground/20 shrink-0" />
              {companies.slice(0, 8).map((c) => (
                <Link
                  key={c.id}
                  to={`/companies/${c.slug}`}
                  className="text-sm font-medium whitespace-nowrap hover:text-accent transition-colors shrink-0"
                >
                  {c.name}
                </Link>
              ))}
              <Link to="/companies" className="text-sm text-accent whitespace-nowrap shrink-0 hover:underline">
                View all →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">From the Ecosystem</h2>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Gallery
            </span>
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
                    {img.title && (
                      <h3 className="text-background font-bold text-lg leading-tight">
                        {img.title}
                      </h3>
                    )}
                    {img.caption && (
                      <p className="text-background/70 text-sm mt-1 leading-relaxed">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-8 text-center">
              No gallery images yet.
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-foreground/10 py-20">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Ecosystem
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you're a founder, investor, or student — there's a place for
            you in the JITSIE community.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/signup">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 h-11">
                Apply Now
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" className="border-foreground px-8 h-11">
                Upcoming Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
