import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast({ variant: 'destructive', title: 'Signup failed', description: error.message });
    } else {
      toast({ title: 'Account created', description: 'Check your email for verification.' });
      navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="container py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto items-center">
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] bg-primary relative overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
              <div className="absolute inset-0 flex flex-col justify-end p-10 text-primary-foreground">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
                  Join the Network
                </p>
                <h2 className="font-serif text-4xl font-bold leading-[1.05] text-balance">
                  Apply for membership.
                </h2>
                <p className="text-primary-foreground/65 mt-4 leading-relaxed">
                  Membership is open to IIT Madras founders, advisors, partners, and
                  alumni building category-defining companies.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-md w-full mx-auto lg:mx-0">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent mb-5">
              Application
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-[1.05]">
              Create your account.
            </h1>
            <p className="text-muted-foreground mb-10">
              Already a member?{' '}
              <Link
                to="/login"
                className="text-foreground underline underline-offset-4 decoration-accent hover:text-accent"
              >
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
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
                  minLength={6}
                  className="h-12 rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-accent"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none text-[12px] uppercase tracking-[0.2em] font-medium group"
              >
                {loading ? 'Creating account…' : (
                  <>
                    Submit application
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
