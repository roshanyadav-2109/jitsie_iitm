import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RiArrowLeftLine } from 'react-icons/ri';
import { usePageTitle } from "@/hooks/usePageTitle";

/** The board serves the IIT Madras ecosystem, so the requester must be reachable there. */
const IITM_EMAIL = /@([a-z0-9-]+\.)*iitm\.ac\.in$/i;

const EMPTY = {
  startup_name: '',
  website_url: '',
  role_title: '',
  type: '',
  location: '',
  stipend_salary: '',
  sector: '',
  stage: '',
  description: '',
  apply_link: '',
  contact_name: '',
  contact_role: '',
  contact_email: '',
  contact_phone: '',
};

type Form = typeof EMPTY;

export default function PostOpening() {
  usePageTitle("Request Hiring");
  const [form, setForm] = useState<Form>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const set =
    (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!IITM_EMAIL.test(form.contact_email.trim())) {
      setEmailError('Use your IIT Madras address (ending in iitm.ac.in).');
      return;
    }
    setEmailError(null);
    setSubmitting(true);

    // Record first: the request survives even if the notification email fails.
    const { error } = await supabase
      .from('opening_requests')
      .insert([{ ...form, contact_email: form.contact_email.trim().toLowerCase() }]);

    if (error) {
      setSubmitting(false);
      toast({
        title: 'Could not send the request',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    // Fire-and-forget: the row is already saved, so a delivery failure is not fatal.
    await supabase.functions.invoke('notify-opening-request', { body: form });

    setSubmitting(false);
    toast({
      title: 'Request sent',
      description: 'The JITSIE team has your request and will be in touch.',
    });
    navigate('/openings');
  }

  return (
    <Layout>
      <section className="container max-w-5xl py-8 md:py-10">
        <button
          onClick={() => navigate('/openings')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <RiArrowLeftLine className="h-4 w-4" /> Back to openings
        </button>

        <header className="mt-5">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">Request hiring</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Fill in the role and the JITSIE team will list it on the openings board. Fields marked
            with an asterisk are required.
          </p>
        </header>

        <form onSubmit={onSubmit} className="mt-8 space-y-8">
          <fieldset className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Startup name"
                required
                value={form.startup_name}
                onChange={set('startup_name')}
              />
              <Field
                label="Website"
                placeholder="https://"
                value={form.website_url}
                onChange={set('website_url')}
              />
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Role title"
                required
                value={form.role_title}
                onChange={set('role_title')}
              />
              <Field
                label="Type"
                required
                placeholder="Intern, Full-time, Co-founder, Freelance"
                value={form.type}
                onChange={set('type')}
              />
              <Field
                label="Location"
                placeholder="Chennai, India"
                value={form.location}
                onChange={set('location')}
              />
              <Field
                label="Stipend or salary"
                placeholder="40,000 per month"
                value={form.stipend_salary}
                onChange={set('stipend_salary')}
              />
              <Field
                label="Sector"
                placeholder="AI/ML, Robotics, FinTech"
                value={form.sector}
                onChange={set('sector')}
              />
              <Field
                label="Stage"
                placeholder="Early Stage, Growth Stage"
                value={form.stage}
                onChange={set('stage')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm">
                What the person will work on <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                required
                rows={4}
                value={form.description}
                onChange={set('description')}
                placeholder="Two or three lines on the work, the team and what a good candidate looks like."
              />
            </div>

            <Field
              label="Application link"
              value={form.apply_link}
              onChange={set('apply_link')}
            />
          </fieldset>

          <fieldset className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Your name"
                required
                value={form.contact_name}
                onChange={set('contact_name')}
              />
              <Field
                label="Your role"
                placeholder="Founder, Hiring lead"
                value={form.contact_role}
                onChange={set('contact_role')}
              />

              <div className="space-y-2">
                <Label htmlFor="contact_email" className="text-sm">
                  IIT Madras email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  required
                  value={form.contact_email}
                  onChange={set('contact_email')}
                  aria-invalid={Boolean(emailError)}
                  aria-describedby="contact_email_help"
                />
                <p
                  id="contact_email_help"
                  className={
                    emailError ? 'text-xs text-destructive' : 'text-xs text-muted-foreground'
                  }
                >
                  {emailError ?? 'Must be an iitm.ac.in address.'}
                </p>
              </div>

              <Field label="Phone" value={form.contact_phone} onChange={set('contact_phone')} />
            </div>
          </fieldset>

          <div className="pt-2">
            <Button type="submit" disabled={submitting} className="h-11 px-7 text-sm">
              {submitting ? 'Sending…' : 'Request hiring'}
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
}

function Field({
  label,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '_');
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
