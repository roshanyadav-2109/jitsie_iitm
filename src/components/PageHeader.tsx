interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <div className="relative w-full bg-primary text-primary-foreground overflow-hidden noise">
      {/* Decorative grid */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      {/* Accent orb */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container relative py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            {eyebrow || 'JITSIE · IIT Madras'}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-base md:text-lg text-primary-foreground/70 max-w-xl leading-relaxed text-pretty">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
