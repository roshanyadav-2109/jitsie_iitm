import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ variant: 'destructive', title: 'Login failed', description: error.message });
    } else {
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="container py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto items-center">
          {/* Left: Brand */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] bg-primary relative overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-primary-foreground">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
                  Member Access
                </p>
                <h2 className="font-serif text-4xl font-bold leading-[1.05] text-balance">
                  Welcome back to the society.
                </h2>
                <p className="text-primary-foreground/65 mt-4 leading-relaxed">
                  Continue where you left off — events, applications, mentor introductions.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="max-w-md w-full mx-auto lg:mx-0">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
              Member Login
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-[1.05]">
              Sign in.
            </h1>
            <p className="text-muted-foreground mb-10">
              Don't have an account?{' '}
              <Link to="/signup" className="text-foreground underline underline-offset-4 decoration-accent hover:text-accent">
                Apply for membership
              </Link>
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[12px] uppercase tracking-[0.2em] font-medium group"
              >
                {loading ? 'Signing in…' : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
