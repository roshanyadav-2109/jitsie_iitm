interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative w-full bg-accent overflow-hidden">
      {/* Decorative geometric shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-16 w-32 h-32 border-[3px] border-white/40 rounded-full translate-y-1/2" />
        <div className="absolute top-0 right-1/4 w-full h-full">
          <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMaxYMid slice">
            <line x1="0" y1="0" x2="400" y2="0" stroke="white" strokeWidth="2" />
            <line x1="50" y1="0" x2="350" y2="200" stroke="white" strokeWidth="1.5" />
            <line x1="100" y1="0" x2="400" y2="200" stroke="white" strokeWidth="1.5" />
            <line x1="150" y1="0" x2="450" y2="200" stroke="white" strokeWidth="1.5" />
            <line x1="200" y1="0" x2="500" y2="200" stroke="white" strokeWidth="1.5" />
            <line x1="250" y1="0" x2="550" y2="200" stroke="white" strokeWidth="1.5" />
            <line x1="300" y1="0" x2="600" y2="200" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="container relative py-14 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base md:text-lg text-white/70 max-w-xl">{description}</p>
        )}
      </div>
    </div>
  );
}
