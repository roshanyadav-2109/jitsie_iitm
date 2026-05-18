import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useCompanies } from '@/hooks/useCompanies';
import { usePartners } from '@/hooks/usePartners';
import { usePastSpeakers } from '@/hooks/usePastSpeakers';
import { useEvents } from '@/hooks/useEvents';
import { useInitiatives } from '@/hooks/useInitiatives';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Users,
  Mic,
  Compass,
  Sparkles,
  Layers,
  HandshakeIcon,
  Globe2,
  Quote,
  Calendar,
  MapPin,
  Linkedin,
} from 'lucide-react';
import { useState } from 'react';
import { format, isFuture } from 'date-fns';

const pillars = [
  {
    Icon: Compass,
    title: 'Discover',
    body: 'Connect with India\'s most ambitious deep-tech founders before the rest of the world hears about them.',
  },
  {
    Icon: Layers,
    title: 'Build',
    body: 'Structured programs, hands-on mentorship, and capital pathways for founders at every stage.',
  },
  {
    Icon: HandshakeIcon,
    title: 'Partner',
    body: 'A trusted bridge between IIT Madras research, industry, and the global venture community.',
  },
  {
    Icon: Globe2,
    title: 'Scale',
    body: 'From a Chennai dorm room to listings, acquisitions, and category-defining companies.',
  },
];

const testimonials = [
  {
    quote:
      'JITSIE was the first room where being a founder from IIT Madras felt less like a leap and more like a calling. The people you meet here change the trajectory of your company.',
    name: 'Aravind R.',
    role: 'Co-founder, Climate-tech',
    batch: 'Batch \'22',
  },
  {
    quote:
      'Few institutions in the country understand deep-tech founders as instinctively as JITSIE. The mentorship is sharp, the network is real, and the standards are unforgiving — in the best way.',
    name: 'Nidhi S.',
    role: 'Founder & CEO, AI Infrastructure',
    batch: 'Batch \'21',
  },
  {
    quote:
      'I came in with a research paper. I left with a company, a board, and a conviction that India\'s next decade belongs to founders trained here.',
    name: 'Karthik V.',
    role: 'Co-founder, Robotics',
    batch: 'Batch \'23',
  },
];

export default function Index() {
  const { data: gallery, isLoading: galleryLoading } = useGalleryImages();
  const { data: companies } = useCompanies();
  const { data: partners } = usePartners();
  const { data: speakers } = usePastSpeakers();
  const { data: events } = useEvents();
  const { data: initiatives } = useInitiatives();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);

  const upcomingEvents = (events ?? []).filter((e) => isFuture(new Date(e.date_time))).slice(0, 3);
  const featuredCompanies = (companies ?? []).slice(0, 6);

  return (
    <Layout>
      {/* ───────────────────── Hero ───────────────────── */}
      <section className="relative overflow-hidden noise">
        <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="container relative pt-24 pb-28 md:pt-32 md:pb-40">
          <div className="max-w-5xl mx-auto text-center animate-fade-up">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-accent" />
              IIT Madras · Society for Innovation & Entrepreneurship
              <span className="h-px w-12 bg-accent" />
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight text-balance">
              Where India's most ambitious
              <span className="block italic font-light text-accent mt-2">founders take shape.</span>
            </h1>
            <p className="mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              JITSIE is the institutional society of IIT Madras advancing
              entrepreneurship, deep-tech research, and the founders building
              what comes next.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/companies">
                <Button className="h-12 px-7 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none text-[12px] uppercase tracking-[0.2em] font-medium group">
                  Explore the Portfolio
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/initiatives">
                <Button
                  variant="outline"
                  className="h-12 px-7 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none text-[12px] uppercase tracking-[0.2em] font-medium"
                >
                  Our Programs
                </Button>
              </Link>
            </div>

            {/* Hairline credentials */}
            <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground/80">
              <span>Est. 2010</span>
              <span className="text-accent">◆</span>
              <span>200+ Ventures</span>
              <span className="text-accent">◆</span>
              <span>800+ Founders</span>
              <span className="text-accent">◆</span>
              <span>$1B+ Raised</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Stats Strip ───────────────────── */}
      <section className="bg-primary text-primary-foreground border-y border-primary-foreground/10">
        <div className="container grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/10">
          {[
            { Icon: Mic, label: 'Eminent Speakers', value: '20+' },
            { Icon: Building2, label: 'Startups Mentored', value: '200+' },
            { Icon: Users, label: 'Founders in the Network', value: '800+' },
            { Icon: Sparkles, label: 'Capital Mobilised', value: '$1B+' },
          ].map((s, i) => (
            <div key={s.label} className={`py-12 px-6 ${i >= 2 ? 'border-t md:border-t-0 border-primary-foreground/10' : ''}`}>
              <s.Icon className="h-4 w-4 text-accent mb-4" />
              <div className="font-serif text-4xl md:text-5xl font-bold leading-none">{s.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] mt-3 text-primary-foreground/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────── Pillars ───────────────────── */}
      <section className="py-24 md:py-32 border-b border-foreground/10">
        <div className="container">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
                01 · The Mandate
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
                A society, not a startup club.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex items-end">
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                JITSIE convenes the founders, faculty, capital, and conviction
                that turn research into category-defining companies. We
                operate on a generational time horizon.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
            {pillars.map(({ Icon, title, body }, i) => (
              <div
                key={title}
                className="bg-background p-8 group hover:bg-card transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── Featured Ventures ───────────────────── */}
      {featuredCompanies.length > 0 && (
        <section className="py-24 md:py-32 bg-card border-b border-foreground/10">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
                  02 · Portfolio
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
                  Companies built in our orbit.
                </h2>
              </div>
              <Link
                to="/companies"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-medium text-primary hover:text-accent transition-colors group"
              >
                View the full directory
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
              {featuredCompanies.map((c) => (
                <Link
                  key={c.id}
                  to={`/companies/${c.slug}`}
                  className="group relative bg-background p-7 flex flex-col h-full hover:bg-card transition-colors"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-14 w-14 border border-foreground/10 rounded-sm flex items-center justify-center bg-secondary/40">
                      {c.logo_url ? (
                        <img src={c.logo_url} alt={c.name} className="h-9 w-9 object-contain" />
                      ) : (
                        <Building2 className="h-5 w-5 text-muted-foreground/70" />
                      )}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                    {c.name}
                  </h3>
                  {c.one_liner && (
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {c.one_liner}
                    </p>
                  )}
                  <div className="mt-auto pt-6 flex items-center gap-2 flex-wrap text-[10px] font-mono uppercase tracking-widest">
                    {c.batch && (
                      <span className="bg-primary text-primary-foreground px-2 py-1">{c.batch}</span>
                    )}
                    {c.industry && (
                      <span className="border border-foreground/15 px-2 py-1 text-muted-foreground">
                        {c.industry}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────── Programs Editorial ───────────────────── */}
      <section className="py-24 md:py-32 border-b border-foreground/10">
        <div className="container">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 relative">
              <div className="aspect-[4/5] bg-primary relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
                {initiatives?.[0]?.image_url ? (
                  <img
                    src={initiatives[0].image_url}
                    alt={initiatives[0].title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-70"
                  />
                ) : null}
                <div className="absolute bottom-8 left-8 right-8 text-primary-foreground">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
                    Current Cohort
                  </p>
                  <p className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                    {initiatives?.[0]?.title ?? 'Flagship Founder Programme'}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-6 md:pl-8">
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
                03 · Programs
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance mb-6">
                Built for founders. Run by founders.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
                From the earliest spark of an idea through Series A and beyond,
                our programs are structured cohorts of select founders backed
                by a curated faculty of operators, investors, and IIT Madras
                researchers.
              </p>
              <ul className="space-y-4 mb-10">
                {['Pre-incubation residencies', 'Founder mentorship circles', 'Capital introductions', 'Industry partnerships'].map((it) => (
                  <li key={it} className="flex items-center gap-3 text-sm">
                    <span className="h-px w-6 bg-accent" />
                    <span className="text-foreground">{it}</span>
                  </li>
                ))}
              </ul>
              <Link to="/initiatives">
                <Button className="h-11 px-6 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[12px] uppercase tracking-[0.2em] font-medium group">
                  Explore programs
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Partners Marquee ───────────────────── */}
      {partners && partners.length > 0 && (
        <section className="py-20 border-b border-foreground/10 overflow-hidden bg-card">
          <div className="container mb-12 text-center">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
              In Confidence With
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight max-w-2xl mx-auto text-balance">
              Capital, corporate, and institutional partners we build alongside.
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
            <div className="marquee-track flex items-center gap-20">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className="shrink-0 flex items-center justify-center h-16 w-36 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100"
                >
                  {p.logo_url ? (
                    <img src={p.logo_url} alt={p.name} className="max-h-12 max-w-full object-contain" />
                  ) : (
                    <span className="font-serif text-base font-bold text-muted-foreground">{p.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────── Testimonials ───────────────────── */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative container">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
              04 · In Their Words
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
              The founders we've backed.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-primary-foreground/10 border border-primary-foreground/10">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-primary p-8 md:p-10 flex flex-col">
                <Quote className="h-7 w-7 text-accent mb-6" strokeWidth={1.5} />
                <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-primary-foreground/90 flex-1 text-pretty">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-primary-foreground/10">
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-primary-foreground/55 mt-1">
                    {t.role} · {t.batch}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── Upcoming Events ───────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="py-24 md:py-32 border-b border-foreground/10">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
                  05 · The Calendar
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
                  What's coming up.
                </h2>
              </div>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-medium text-primary hover:text-accent transition-colors group"
              >
                Full calendar
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            <div className="border-t border-foreground/10">
              {upcomingEvents.map((e) => {
                const d = new Date(e.date_time);
                return (
                  <div
                    key={e.id}
                    className="group grid grid-cols-12 gap-6 py-7 border-b border-foreground/10 items-center hover:bg-card transition-colors"
                  >
                    <div className="col-span-12 md:col-span-2">
                      <div className="font-serif text-3xl md:text-4xl font-bold leading-none text-primary">
                        {format(d, 'dd')}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                        {format(d, 'MMM yyyy')}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight group-hover:text-accent transition-colors">
                        {e.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {format(d, 'h:mm a')}
                        </span>
                        {e.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" />
                            {e.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-3 flex md:justify-end">
                      {e.registration_link ? (
                        <a href={e.registration_link} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            className="h-10 px-5 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[11px] uppercase tracking-[0.2em] font-medium"
                          >
                            Register <ArrowUpRight className="h-3 w-3 ml-1.5" />
                          </Button>
                        </a>
                      ) : (
                        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          By invitation
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────── Past Speakers ───────────────────── */}
      {speakers && speakers.length > 0 && (
        <section className="py-24 md:py-32 bg-card border-b border-foreground/10 overflow-hidden">
          <div className="container mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
                  06 · The Stage
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
                  Voices in residence.
                </h2>
              </div>
              <Link
                to="/speakers"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-medium text-primary hover:text-accent transition-colors group"
              >
                See all speakers
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
            <div className="marquee-slow flex items-center gap-6">
              {[...speakers, ...speakers].map((s, i) => (
                <div
                  key={`${s.id}-${i}`}
                  className="shrink-0 relative w-56 h-72 overflow-hidden bg-secondary cursor-pointer group"
                  onMouseEnter={() => setHoveredSpeaker(`${s.id}-${i}`)}
                  onMouseLeave={() => setHoveredSpeaker(null)}
                >
                  {s.avatar_url ? (
                    <img
                      src={s.avatar_url}
                      alt={s.full_name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <span className="font-serif text-4xl font-bold text-muted-foreground/30">
                        {s.full_name[0]}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/80 to-transparent p-5 text-primary-foreground">
                    <p className="font-serif font-bold text-base leading-tight">{s.full_name}</p>
                    {s.designation && (
                      <p className="text-[11px] text-primary-foreground/70 mt-1">{s.designation}</p>
                    )}
                    {s.organization && (
                      <p className="text-[11px] text-primary-foreground/55">{s.organization}</p>
                    )}
                    {s.linkedin_url && (
                      <a
                        href={s.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute top-3 right-3 h-8 w-8 flex items-center justify-center bg-background/10 backdrop-blur border border-primary-foreground/20 hover:bg-accent hover:text-accent-foreground transition-all ${
                          hoveredSpeaker === `${s.id}-${i}` ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────── Gallery ───────────────────── */}
      <section className="py-24 md:py-32 border-b border-foreground/10">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
              07 · The Ecosystem
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-balance">
              Emerging from India,<br />directing the world.
            </h2>
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
                  className="group relative overflow-hidden bg-card border border-foreground/5"
                  onMouseEnter={() => setHoveredId(img.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.title || 'Gallery image'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 ${
                      hoveredId === img.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {img.title && (
                      <h3 className="font-serif text-primary-foreground font-bold text-xl leading-tight">
                        {img.title}
                      </h3>
                    )}
                    {img.caption && (
                      <p className="text-primary-foreground/75 text-sm mt-2 leading-relaxed">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-8 text-center">No gallery images yet.</p>
          )}
        </div>
      </section>

      {/* ───────────────────── Final CTA ───────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-accent/10 blur-3xl" />

        <div className="relative container py-28 md:py-36 text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-6">
            Open Applications
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl mx-auto text-balance">
            If you're building something that should exist,<br />
            <span className="italic font-light text-accent">we want to know.</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed text-pretty">
            Membership in the JITSIE network is by application. We accept new
            founders, advisors, and partners on a rolling basis.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup">
              <Button className="h-12 px-7 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none text-[12px] uppercase tracking-[0.2em] font-medium group">
                Apply to join
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/openings">
              <Button
                variant="outline"
                className="h-12 px-7 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none text-[12px] uppercase tracking-[0.2em] font-medium"
              >
                Browse roles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
