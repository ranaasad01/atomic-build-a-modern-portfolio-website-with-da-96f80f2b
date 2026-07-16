"use client";

import { motion, type Variants } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND, socialLinks, skillGroups } from "@/lib/data";
import { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline skill data (augments lib/data skillGroups) ───────────────────────
const domainRows = [
  {
    domain: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Rust", "SQL"],
  },
  {
    domain: "Frameworks",
    skills: ["Next.js", "React", "Node.js", "Express", "Fastify"],
  },
  {
    domain: "Styling",
    skills: ["Tailwind CSS", "Framer Motion", "CSS Modules", "Radix UI"],
  },
  {
    domain: "Databases",
    skills: ["PostgreSQL", "MongoDB", "SQLite", "Redis", "Prisma"],
  },
  {
    domain: "Cloud & DevOps",
    skills: ["Vercel", "AWS", "Docker", "GitHub Actions", "Terraform"],
  },
  {
    domain: "Testing",
    skills: ["Vitest", "Playwright", "Testing Library", "Jest"],
  },
  {
    domain: "Currently Exploring",
    skills: ["Rust WASM", "LLM APIs", "Edge Functions", "Bun"],
  },
];

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

const socialColors: Record<string, string> = {
  github: "hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]",
  linkedin: "hover:bg-blue-500/10 hover:text-blue-400",
  twitter: "hover:bg-sky-400/10 hover:text-sky-400",
};

// ─── SkillBadge ──────────────────────────────────────────────────────────────
function SkillBadge({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.span
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay }}
      whileHover={{ scale: 1.06, y: -2 }}
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
        bg-[var(--surface)] border border-[var(--border)]
        text-[var(--muted)] hover:text-[var(--foreground)]
        hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5
        transition-colors duration-200 cursor-default
        shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
    >
      {label}
    </motion.span>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-4">
      <Sparkles size={12} />
      {children}
    </span>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section 1: Split Intro ─────────────────────────────────────── */}
        <Reveal>
          <section className="mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
              {/* Left: Editorial heading */}
              <div className="lg:col-span-3">
                <SectionLabel>{t("about.label")}</SectionLabel>
                <motion.h1
                  variants={slideInLeft}
                  initial="hidden"
                  animate="visible"
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] leading-[1.05] text-balance"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {t("about.heading.line1")}{" "}
                  <span className="text-[var(--primary)]">
                    {t("about.heading.accent")}
                  </span>
                  <br />
                  {t("about.heading.line2")}
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-lg text-[var(--muted)] leading-relaxed max-w-xl text-pretty"
                >
                  {t("about.intro")}
                </motion.p>
              </div>

              {/* Right: Avatar + one-liner */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="lg:col-span-2 flex flex-col items-center lg:items-end gap-6"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-52 h-52 rounded-2xl overflow-hidden
                    border border-[var(--border)]
                    shadow-[0_4px_24px_rgba(0,0,0,0.25),0_0_0_1px_rgba(168,85,247,0.15)]">
                    <img
                      src="https://www.essaydone.ai/images/author/dr-alex-rivera.png"
                      alt={t("about.avatarAlt")}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.background =
                            "linear-gradient(135deg, var(--surface) 0%, rgba(168,85,247,0.12) 100%)";
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl font-bold text-[var(--primary)]" style="font-family:'Syne',sans-serif">AR</div>`;
                        }
                      }}
                    />
                  </div>
                  {/* Glow ring */}
                  <div className="absolute -inset-1 rounded-2xl bg-[var(--primary)]/10 blur-xl -z-10" />
                </div>

                {/* One-liner card */}
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-5 py-4
                  shadow-[0_2px_12px_rgba(0,0,0,0.12)]
                  max-w-xs text-center lg:text-right">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {BRAND.name}
                  </p>
                  <p className="text-xs text-[var(--primary)] font-medium mt-0.5">
                    {BRAND.role}
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
                    {t("about.oneliner")}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </Reveal>

        {/* ── Section 2: Bio ────────────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <section className="mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Bio paragraphs */}
              <div className="lg:col-span-2 space-y-5">
                <SectionLabel>{t("about.bio.label")}</SectionLabel>
                <p className="text-[var(--foreground)] leading-relaxed text-base">
                  {t("about.bio.p1")}
                </p>
                <p className="text-[var(--muted)] leading-relaxed text-base">
                  {t("about.bio.p2")}
                </p>
                <p className="text-[var(--muted)] leading-relaxed text-base">
                  {t("about.bio.p3")}
                </p>
                <p className="text-[var(--muted)] leading-relaxed text-base">
                  {t("about.bio.p4")}
                </p>
              </div>

              {/* Pull-quote inset panel */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <div className="relative rounded-2xl overflow-hidden
                    bg-gradient-to-br from-[var(--primary)]/10 via-[var(--surface)] to-[var(--surface)]
                    border border-[var(--primary)]/20
                    p-8
                    shadow-[0_4px_32px_rgba(168,85,247,0.08),0_1px_2px_rgba(0,0,0,0.1)]">
                    {/* Decorative quote mark */}
                    <div className="text-7xl font-serif text-[var(--primary)]/20 leading-none select-none mb-2">
                      &ldquo;
                    </div>
                    <blockquote className="text-xl font-semibold text-[var(--foreground)] leading-snug tracking-tight text-balance"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {t("about.pullquote")}
                    </blockquote>
                    <div className="mt-6 pt-5 border-t border-[var(--border)]">
                      <p className="text-xs font-semibold text-[var(--primary)]">
                        {BRAND.name}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">
                        {t("about.pullquoteRole")}
                      </p>
                    </div>
                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-2xl -z-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── Section 3: Tech Stack ─────────────────────────────────────── */}
        <Reveal delay={0.05}>
          <section className="mb-28">
            <div className="mb-10">
              <SectionLabel>{t("about.stack.label")}</SectionLabel>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] text-balance"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {t("about.stack.heading")}
              </h2>
              <p className="mt-3 text-[var(--muted)] max-w-xl text-pretty">
                {t("about.stack.sub")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-6"
            >
              {domainRows.map((row, rowIdx) => (
                <motion.div
                  key={row.domain}
                  variants={fadeInUp}
                  className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-4 items-start
                    py-5 border-b border-[var(--border)] last:border-0"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] pt-1.5">
                    {row.domain}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {row.skills.map((skill, skillIdx) => (
                      <SkillBadge
                        key={skill}
                        label={skill}
                        delay={rowIdx * 0.04 + skillIdx * 0.03}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </Reveal>

        {/* ── Section 4: Social Links ───────────────────────────────────── */}
        <Reveal delay={0.05}>
          <section>
            <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)]
              shadow-[0_2px_24px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)]
              px-8 py-12 sm:px-12 relative overflow-hidden">

              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-[var(--primary)]/8 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[var(--primary)]/5 rounded-full blur-2xl" />
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div>
                  <SectionLabel>{t("about.social.label")}</SectionLabel>
                  <h2
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] text-balance"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {t("about.social.heading")}
                  </h2>
                  <p className="mt-2 text-[var(--muted)] text-sm max-w-sm text-pretty">
                    {t("about.social.sub")}
                  </p>
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                  {socialLinks.map((social) => {
                    const Icon = socialIconMap[social.icon] ?? Github;
                    const colorClass =
                      socialColors[social.icon] ??
                      "hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]";
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl
                          bg-[var(--background)] border border-[var(--border)]
                          text-[var(--muted)] text-sm font-medium
                          transition-all duration-200 group
                          shadow-[0_1px_4px_rgba(0,0,0,0.08)]
                          ${colorClass}`}
                      >
                        <Icon size={16} />
                        <span>{social.label}</span>
                        <ArrowRight
                          size={14}
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </motion.a>
                    );
                  })}

                  {/* Email CTA */}
                  <motion.a
                    href={`mailto:${BRAND.email}`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl
                      bg-[var(--primary)] text-white text-sm font-semibold
                      transition-all duration-200 group
                      shadow-[0_0_20px_rgba(168,85,247,0.3)]
                      hover:shadow-[0_0_28px_rgba(168,85,247,0.5)]"
                  >
                    <span>{t("about.social.emailCta")}</span>
                    <ArrowRight
                      size={14}
                      className="ml-auto group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </motion.a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

      </div>
    </main>
  );
}