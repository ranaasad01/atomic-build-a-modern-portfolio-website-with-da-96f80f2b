"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, ExternalLink, Code2 as Github, ArrowRight, Star, Tag } from 'lucide-react';
import Link from "next/link";
import { projects, type Project } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ─── Filter categories ────────────────────────────────────────────────────────
const CATEGORIES = ["All", "SaaS", "Productivity", "Open Source", "Finance", "AI"];

// ─── Modal overlay variants ───────────────────────────────────────────────────
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 16,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Inline extended project data ─────────────────────────────────────────────
interface ExtendedProject extends Project {
  year: string;
  role: string;
  highlights: string[];
}

const extendedProjects: ExtendedProject[] = [
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
    year: "2024",
    role: "Lead Engineer",
    highlights: [
      "Reduced reporting time by 70% for 40+ e-commerce clients",
      "WebSocket pipeline handling 50k events per minute",
      "Custom Recharts visualizations with drill-down capability",
    ],
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
    imageUrl: "https://orbitspaces.co.uk/wp-content/uploads/2026/04/OrbitSpaces-ThePoint-Event.webp",
    liveUrl: "https://orbit.demo",
    repoUrl: "https://github.com/alexrivera/orbit",
    featured: true,
    category: "Productivity",
    year: "2023",
    role: "Full-Stack Developer",
    highlights: [
      "1,200 beta users onboarded in the first 6 weeks",
      "Real-time collaborative editing with conflict resolution",
      "Slack and GitHub integrations out of the box",
    ],
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
    year: "2023",
    role: "Creator & Maintainer",
    highlights: [
      "900+ GitHub stars with active community contributions",
      "Supports CSS, JSON, Swift, and Kotlin output formats",
      "Used by 3 Fortune 500 design systems teams",
    ],
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
    imageUrl: "https://huntervault.app/assets/blogpage/hunter-vault-gamified-budgeting-app.jpg",
    liveUrl: "https://vaulted.demo",
    repoUrl: "https://github.com/alexrivera/vaulted",
    featured: false,
    category: "Finance",
    year: "2024",
    role: "Solo Developer",
    highlights: [
      "Local-first architecture with zero telemetry",
      "Optional E2E encrypted sync via self-hosted server",
      "Automated categorization with 94% accuracy",
    ],
  },
  {
    id: "beacon",
    title: "Beacon",
    subtitle: "AI Content Brief Generator",
    description:
      "Generates SEO-optimized content briefs from a single keyword. Cuts research time from hours to minutes.",
    longDescription:
      "Beacon uses GPT-4 and a custom SERP analysis pipeline to generate structured content briefs that outrank competitors. It analyzes top-ranking pages, extracts semantic clusters, and produces a ready-to-write outline with word count targets and internal linking suggestions.",
    tags: ["Next.js", "OpenAI API", "Python", "FastAPI", "Redis"],
    imageUrl: "https://www.seoreviewtools.com/wp-content/uploads/Content-Brief-Creator.png",
    liveUrl: "https://beacon.demo",
    repoUrl: "https://github.com/alexrivera/beacon",
    featured: false,
    category: "AI",
    year: "2024",
    role: "Full-Stack Developer",
    highlights: [
      "Reduces content research from 3 hours to under 10 minutes",
      "SERP analysis pipeline covering 20+ ranking signals",
      "Integrated with Notion and Google Docs for export",
    ],
  },
  {
    id: "fieldnotes",
    title: "Fieldnotes",
    subtitle: "Developer Knowledge Base",
    description:
      "A self-hosted, markdown-powered knowledge base built for developers who think in code.",
    longDescription:
      "Fieldnotes is a lightweight, self-hosted knowledge base that treats markdown as a first-class citizen. It supports code syntax highlighting, bidirectional linking, and a graph view for exploring connections between notes — all without a database.",
    tags: ["Next.js", "MDX", "TypeScript", "Tailwind CSS"],
    imageUrl: "https://miro.medium.com/1*8DjRoS33DLXIeEK_RzcJjQ.png",
    repoUrl: "https://github.com/alexrivera/fieldnotes",
    featured: false,
    category: "Open Source",
    year: "2022",
    role: "Creator",
    highlights: [
      "Zero-database architecture using flat MDX files",
      "Bidirectional linking with automatic backlink detection",
      "Graph view for visualizing note relationships",
    ],
  },
];

// ─── Tech badge ───────────────────────────────────────────────────────────────
function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
      <Tag size={10} />
      {label}
    </span>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: ExtendedProject;
  onOpen: (p: ExtendedProject) => void;
  index: number;
}) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      onClick={() => onOpen(project)}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.18)] hover:shadow-[0_4px_32px_-4px_rgba(168,85,247,0.18)] hover:border-[var(--primary)]/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[var(--border)]">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium flex items-center gap-1.5">
            View details <ArrowRight size={14} />
          </span>
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--primary)]/90 text-white text-xs font-semibold backdrop-blur-sm">
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        )}
        {/* Category pill */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/50 text-white/90 text-xs font-medium backdrop-blur-sm">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-xs text-[var(--muted)] font-medium mb-1">{project.year} · {project.role}</p>
          <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--primary)] font-medium mt-0.5">{project.subtitle}</p>
        </div>
        <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(project.tags ?? []).slice(0, 3).map((tag) => (
            <TechBadge key={tag} label={tag} />
          ))}
          {(project.tags ?? []).length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--border)] text-[var(--muted)]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Project detail modal ─────────────────────────────────────────────────────
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: ExtendedProject;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/20 transition-colors duration-200"
          >
            <X size={16} />
          </button>

          {/* Hero image */}
          <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl bg-[var(--border)]">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
            {project.featured && (
              <div className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--primary)]/90 text-white text-xs font-semibold">
                <Star size={10} fill="currentColor" />
                Featured Project
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  {project.category}
                </span>
                <span className="text-[var(--border)]">·</span>
                <span className="text-xs text-[var(--muted)]">{project.year}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                {project.title}
              </h2>
              <p className="text-[var(--primary)] font-medium mt-1">{project.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-[var(--muted)] leading-relaxed">{project.longDescription}</p>

            {/* Highlights */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)] mb-3">
                Key Highlights
              </h3>
              <ul className="space-y-2">
                {(project.highlights ?? []).map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted)] mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.tags ?? []).map((tag) => (
                  <TechBadge key={tag} label={tag} />
                ))}
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--foreground)]">My role:</span>
              {project.role}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary)]/90 transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_28px_rgba(168,85,247,0.5)]"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-all duration-200"
                >
                  <Github size={14} />
                  View Source
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function ProjectsCtaBanner({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/10 via-[var(--surface)] to-[var(--surface)] p-10 md:p-14 text-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[var(--primary)]/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">
          {t("projects.cta.eyebrow")}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight mb-4 text-balance">
          {t("projects.cta.title")}
        </h2>
        <p className="text-[var(--muted)] max-w-md mx-auto mb-8 leading-relaxed">
          {t("projects.cta.body")}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary)]/90 transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]"
        >
          {t("projects.cta.button")}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ExtendedProject | null>(null);

  const filtered =
    activeCategory === "All"
      ? extendedProjects
      : extendedProjects.filter((p) => p.category === activeCategory);

  const handleOpen = useCallback((p: ExtendedProject) => {
    setSelectedProject(p);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page header */}
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">
            {t("projects.header.eyebrow")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight text-balance mb-4">
            {t("projects.header.title")}
          </h1>
          <p className="text-[var(--muted)] max-w-xl mx-auto leading-relaxed text-pretty">
            {t("projects.header.subtitle")}
          </p>
        </Reveal>

        {/* Filter tabs */}
        <Reveal className="mb-10" delay={0.08}>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-[0_0_16px_rgba(168,85,247,0.3)]"
                    : "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/30"
                }`}
              >
                {t(`projects.filter.${cat.toLowerCase().replace(/\s/g, "_")}`)}
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={handleOpen}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-[var(--muted)]">
            <p className="text-lg font-medium">{t("projects.empty.title")}</p>
            <p className="text-sm mt-2">{t("projects.empty.body")}</p>
          </div>
        )}

        {/* CTA banner */}
        <Reveal delay={0.1}>
          <ProjectsCtaBanner t={t} />
        </Reveal>
      </div>

      {/* Detail modal */}
      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={handleClose} />
      )}
    </main>
  );
}