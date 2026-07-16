export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter";
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  category: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const BRAND = {
  name: "Alex Rivera",
  role: "Full-Stack Developer",
  email: "hello@alexrivera.dev",
  tagline: "Crafting digital experiences that leave a mark.",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Projects", href: "/projects", type: "route" },
  { label: "About", href: "/about", type: "route" },
  { label: "Contact", href: "/contact", type: "route" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/alexrivera", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/alexrivera", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/alexrivera_dev", icon: "twitter" },
];

export const projects: Project[] = [
  {
    id: "luminary",
    title: "Luminary",
    subtitle: "SaaS Analytics Dashboard",
    description:
      "A real-time analytics platform for e-commerce brands. Reduced client reporting time by 70%.",
    longDescription:
      "Built with Next.js 14, Recharts, and a WebSocket-powered data pipeline. Luminary gives e-commerce brands a live view of their most important metrics — from conversion funnels to cohort retention — without the complexity of enterprise BI tools.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    imageUrl: "https://cdn.dribbble.com/userupload/45207211/file/09bc9045511873b4c08b642b7cbfeff5.png?resize=2048x1536&vertical=center",
    liveUrl: "https://luminary.demo",
    repoUrl: "https://github.com/alexrivera/luminary",
    featured: true,
    category: "SaaS",
  },
  {
    id: "orbit",
    title: "Orbit",
    subtitle: "Team Collaboration Tool",
    description:
      "A Notion-meets-Linear workspace for async-first remote teams. Launched to 1,200 beta users in 6 weeks.",
    longDescription:
      "Features rich-text editing, kanban boards, and Slack integration. Orbit was built to solve the async communication problem for distributed teams — giving them a single source of truth without the meeting overhead.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Framer Motion"],
    imageUrl: "https://cdn.britannica.com/78/149178-050-F2421B64/light-prism-color-angle-colors-wavelength-wavelengths.jpg",
    liveUrl: "https://orbit.demo",
    repoUrl: "https://github.com/alexrivera/orbit",
    featured: true,
    category: "Productivity",
  },
  {
    id: "prism",
    title: "Prism",
    subtitle: "Open-Source Design Token CLI",
    description:
      "Converts Figma variables into multi-platform design tokens. 900+ GitHub stars and counting.",
    longDescription:
      "A command-line tool that converts Figma variables into CSS, JSON, Swift, and Kotlin design tokens. Prism bridges the gap between design and engineering, ensuring a single source of truth for every color, spacing value, and typography decision.",
    tags: ["TypeScript", "Node.js", "Figma REST API"],
    imageUrl: "https://www.bram.us/wordpress/wp-content/uploads/2022/07/design-tokens.json_-1568x1328.png",
    repoUrl: "https://github.com/alexrivera/prism",
    featured: true,
    category: "Open Source",
  },
  {
    id: "vaulted",
    title: "Vaulted",
    subtitle: "Personal Finance App",
    description:
      "A privacy-first budgeting app with local-first data storage and optional encrypted cloud sync.",
    longDescription:
      "No ads, no tracking — just clarity over your money. Vaulted stores all data locally by default, with an optional end-to-end encrypted sync layer for users who want cross-device access without sacrificing privacy.",
    tags: ["Next.js", "SQLite", "Drizzle ORM", "Tailwind CSS"],
    imageUrl: "https://aliweissjewelry.com/cdn/shop/files/0A7262D4-4066-4868-A8F2-E0845DEAD32F_1_201_a.jpg?v=1758135479&width=1200",
    liveUrl: "https://vaulted.demo",
    repoUrl: "https://github.com/alexrivera/vaulted",
    featured: false,
    category: "Productivity",
  },
  {
    id: "helix",
    title: "Helix",
    subtitle: "AI Writing Assistant",
    description:
      "A GPT-4-powered writing companion. Won Best Developer Tool at a 48-hour hackathon.",
    longDescription:
      "Custom prompt templates, tone controls, and export to Notion or Markdown. Helix was built in 48 hours and won Best Developer Tool — proving that focused, well-scoped AI tooling beats bloated feature sets every time.",
    tags: ["Next.js", "OpenAI API", "Vercel AI SDK", "Radix UI"],
    imageUrl: "https://folio.org/wp-content/uploads/2023/08/folio-site-general-Illustration-social-image-1200.jpg",
    liveUrl: "https://helix.demo",
    repoUrl: "https://github.com/alexrivera/helix",
    featured: false,
    category: "AI",
  },
  {
    id: "folio",
    title: "Folio",
    subtitle: "This Portfolio",
    description:
      "Designed and built from scratch with Next.js 14, Framer Motion, and a dark-first design system.",
    longDescription:
      "You're looking at it. Every animation, layout decision, and typographic choice was deliberate. Built to demonstrate what a senior developer considers production-quality front-end work.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: "https://cdn.dribbble.com/userupload/26554286/file/original-56f52c6d373c22141b8b1d665069b007.jpg?resize=400x0",
    repoUrl: "https://github.com/alexrivera/folio",
    featured: false,
    category: "Open Source",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript (ES2024+)", "Python", "SQL"],
  },
  {
    category: "Frameworks",
    skills: ["Next.js", "React", "Node.js", "Express", "Fastify"],
  },
  {
    category: "Styling",
    skills: ["Tailwind CSS", "CSS Modules", "Framer Motion", "Radix UI"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    category: "ORMs",
    skills: ["Prisma", "Drizzle ORM", "Kysely"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Vercel", "AWS", "Docker", "GitHub Actions"],
  },
  {
    category: "Testing",
    skills: ["Vitest", "Playwright", "React Testing Library"],
  },
  {
    category: "Design",
    skills: ["Figma", "Design Tokens", "Component Architecture"],
  },
];

export const projectCategories = ["All", "SaaS", "Productivity", "Open Source", "AI"];