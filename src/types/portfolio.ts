export type Language = 'es' | 'en';
export type ThemePreference = 'system' | 'light' | 'dark';
export type ProjectCategory = 'mobile' | 'backend' | 'web' | 'enterprise';

export type LinkItem = {
  label: string;
  url: string;
};

export type Experience = {
  id: string;
  company: string;
  client?: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  current?: boolean;
  productUrl?: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  participation: string;
  categories: ProjectCategory[];
  stack: string[];
  features: string[];
  links: LinkItem[];
  featured?: boolean;
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: Array<{name: string; usedIn: string[]}>;
};

export type PortfolioContent = {
  updatedAt: string;
  experience: Record<Language, Experience[]>;
  projects: Record<Language, Project[]>;
  skills: Record<Language, SkillGroup[]>;
};
