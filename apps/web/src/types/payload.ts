// Types mirroring Payload CMS collection schemas.
// These are maintained manually to match apps/cms/src/collections/*.ts

export interface Media {
  id: string;
  alt: string;
  caption?: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: { url: string; width: number; height: number };
    card?: { url: string; width: number; height: number };
    hero?: { url: string; width: number; height: number };
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: unknown; // Rich text (Lexical JSON)
  author: string;
  category: Category;
  featuredImage: Media;
  status: 'draft' | 'published';
  publishedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: Media;
  };
  createdAt: string;
  updatedAt: string;
}

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: unknown;
  requirements: unknown;
  benefits?: unknown;
  isActive: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photo?: Media;
  linkedinUrl?: string;
  order: number;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  logo?: Media;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  trustBar?: {
    stats?: Array<{ label: string; value: string }>;
    clientLogos?: Array<{ name: string; logo: Media; url?: string }>;
  };
  defaultSeo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: Media;
  };
}

export interface NavigationItem {
  label: string;
  url?: string;
  children?: Array<{ label: string; url: string }>;
}

export interface Navigation {
  items: NavigationItem[];
  ctaButton: { label: string; url: string };
}

export interface FooterColumn {
  title: string;
  links: Array<{ label: string; url: string }>;
}

export interface Footer {
  columns: FooterColumn[];
  copyright: string;
}
