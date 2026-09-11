export interface Project {
  id: string;
  demoNumber: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  fullDescription: string;
  tags: string[];
  techStack: string[];
  image: string;
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  honeypot?: string;
  captchaAnswer: string;
}
