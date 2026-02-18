// Manual type definitions matching the database schema

export type AppRole = 'admin' | 'founder' | 'user';
export type CompanyStatus = 'active' | 'acquired';
export type JobType = 'intern' | 'full_time';
export type PartnerCategory = 'vc' | 'corporate';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  one_liner: string | null;
  description: string | null;
  logo_url: string | null;
  batch: string | null;
  industry: string | null;
  status: CompanyStatus;
  founder_id: string | null;
  website_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  location: string | null;
  salary_range: string | null;
  type: JobType;
  category: string | null;
  apply_link: string | null;
  created_at: string;
  updated_at: string;
  companies?: Company;
}

export interface Event {
  id: string;
  title: string;
  date_time: string;
  location: string | null;
  registration_link: string | null;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  category: PartnerCategory;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  author: string | null;
  published_at: string | null;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsUpdate {
  id: string;
  text: string;
  link: string | null;
  created_at: string;
}

export interface BoardMember {
  id: string;
  full_name: string;
  designation: string | null;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  organization: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StartupAdvisor {
  id: string;
  full_name: string;
  designation: string | null;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  organization: string | null;
  expertise: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StartupOpening {
  id: string;
  startup_name: string;
  startup_slug: string | null;
  role_title: string;
  description: string | null;
  sector: string | null;
  stage: string | null;
  location: string | null;
  stipend_salary: string | null;
  type: string;
  apply_link: string | null;
  is_active: boolean;
  posted_at: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string | null;
  caption: string | null;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PastSpeaker {
  id: string;
  full_name: string;
  designation: string | null;
  organization: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  topic: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Initiative {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
