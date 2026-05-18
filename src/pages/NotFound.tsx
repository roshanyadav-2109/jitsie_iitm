import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container py-32 md:py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-6">
            Error · 404
          </p>
          <h1 className="font-serif text-7xl md:text-9xl font-bold leading-none">
            Not Found.
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-md mx-auto">
            The page you were looking for has moved, retired, or never existed.
          </p>
          <Link to="/" className="inline-block mt-10">
            <Button className="h-12 px-7 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[12px] uppercase tracking-[0.2em] font-medium group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
