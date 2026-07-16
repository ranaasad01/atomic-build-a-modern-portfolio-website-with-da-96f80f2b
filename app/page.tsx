"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, Check, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, ArrowUpRight, Code2, Layers, Zap, Users } from 'lucide-react';
import { BRAND, projects, skillGroups } from "@/lib/data";
import { fadeInUp, staggerContainer, heroTextVariant, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const statsData = [
  { value: "5+", label: "Years building products" },
  { value: "30+", label: "Projects shipped" },
  { value: "12", label: "Happy clients" },
  { value: "900+", label: "GitHub stars" },
];

const valueProps = [
  {
    icon: Code2,
    title: "Clean, Scalable Code",
    description:
      "Every line is written with maintainability in mind. TypeScript-first, well-tested, and documented so future-you (and your team) can move fast.",
  },
  {
    icon: Layers,
    title: "Full-Stack Fluency",
    description:
      "From database schema to pixel-perfect UI, I own the entire stack. No handoff friction, no context switching — just end-to-end ownership.",
  },
  {
    icon: Zap,
    title: "Shipped, Not Stalled",
    description:
      "I bias toward delivery. Iterative releases, tight feedback loops, and a pragmatic approach to scope mean your product reaches users faster.",
  },
  {
    icon: Users,
    title: "Collaborative by Default",
    description:
      "I work best as a true partner — joining standups, writing specs, and communicating proactively so there are never any surprises.",
  },
];

const testimonials = [
  {
    quote:
      "Alex took our vague idea and turned it into a product our users love. The code quality was exceptional and delivery was ahead of schedule.",
    author: "Priya Nair",
    role: "Co-founder, Luminary",
    avatar: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202507/who-is-priya-nair-112640446-3x4.jpg?VersionId=iE2V_zrRVJ4aqpH_Tc9viogx8LICksaF",
  },
  {
    quote:
      "Working with Alex felt like having a senior engineer and a product manager in one. He asked the right questions before writing a single line.",
    author: "Marcus Webb",
    role: "CTO, Orbit",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQHiO__VqpQUdw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1678486481013?e=2147483647&v=beta&t=QG1Jt2LVkSGbO12WKv9Iz5RNGPdtnNqloYSNBmEqdNk",
  },
  {
    quote:
      "Prism saved our design-to-dev handoff. Alex built something the open-source community genuinely needed, and the adoption speaks for itself.",
    author: "Soo-Jin Park",
    role: "Design Systems Lead, Figma Community",
    avatar: "https://media.licdn.com/dms/image/v2/C4E03AQFR-EbEZ1eRPA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516445546003?e=2147483647&v=beta&t=Vf19rrrwTOs5us0dBsFfi7hPeYTpNB0bmiXrSD3-dP8",
  },
];

const floatingBadgeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 1.0 },
  },
};

const glowPulse: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function HomePage() {
  const t = useTranslations();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        {/* Background glow */}
        <motion.div
          variants={glowPulse}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/10 blur-[120px]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Eyebrow pill */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-8"
          >
            <Sparkles size={14} />
            <span>{t("hero.eyebrow")}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroTextVariant}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-balance mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {t("hero.headline1")}
            <br />
            <span className="text-[var(--primary)]">{t("hero.headline2")}</span>
            <br />
            {t("hero.headline3")}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto mb-10 text-pretty"
          >
            {t("hero.subtext")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] hover:bg-[var(--primary)]/90 transition-all duration-300"
            >
              {t("hero.cta_primary")}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-all duration-300"
            >
              {t("hero.cta_secondary")}
            </Link>
          </motion.div>

          {/* Floating availability badge */}
          <motion.div
            variants={floatingBadgeVariant}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mt-12 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--muted)]"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            {t("hero.availability")}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-[var(--border)] flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[var(--muted)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <Reveal>
        <section className="py-16 border-y border-[var(--border)] bg-[var(--surface)]/40">
          <div className="max-w-6xl mx-auto px-6">
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {statsData.map((stat) => (
                <motion.li
                  key={stat.label}
                  variants={scaleIn}
                  className="flex flex-col items-center text-center gap-1"
                >
                  <span
                    className="text-4xl md:text-5xl font-bold text-[var(--primary)] tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm text-[var(--muted)]">{stat.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      </Reveal>

      {/* ── FEATURED PROJECTS ── */}
      <Reveal>
        <section id="projects" className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">
                  {t("projects.eyebrow")}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-bold tracking-tight text-balance"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {t("projects.heading")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200 shrink-0"
              >
                {t("projects.view_all")}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Bento-style project grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large featured card */}
              {featuredProjects[0] && (
                <Reveal delay={0} className="md:row-span-2">
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group relative h-full min-h-[420px] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-[var(--primary)]/40 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-8px_rgba(168,85,247,0.15)] transition-all duration-300"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={featuredProjects[0].imageUrl}
                        alt={featuredProjects[0].title}
                        className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/80 to-transparent" />
                    </div>
                    <div className="relative z-10 flex flex-col justify-end h-full p-8">
                      <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold mb-4 w-fit">
                        {featuredProjects[0].category}
                      </span>
                      <h3
                        className="text-3xl font-bold mb-2 tracking-tight"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {featuredProjects[0].title}
                      </h3>
                      <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed">
                        {featuredProjects[0].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredProjects[0].tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-[var(--border)] text-[var(--muted)] text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        {featuredProjects[0].liveUrl && (
                          <a
                            href={featuredProjects[0].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline"
                          >
                            {t("projects.live_demo")} <ArrowUpRight size={14} />
                          </a>
                        )}
                        {featuredProjects[0].repoUrl && (
                          <a
                            href={featuredProjects[0].repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                          >
                            <Github size={14} /> {t("projects.source")}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              )}

              {/* Two smaller cards stacked */}
              <div className="flex flex-col gap-6">
                {featuredProjects.slice(1, 3).map((project, i) => (
                  <Reveal key={project.id} delay={i * 0.1}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-[var(--primary)]/40 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-8px_rgba(168,85,247,0.15)] transition-all duration-300 p-6 flex gap-5"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[var(--border)]">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-between min-w-0">
                        <div>
                          <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wide">
                            {project.category}
                          </span>
                          <h3
                            className="text-lg font-bold mt-0.5 mb-1 tracking-tight truncate"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {project.title}
                          </h3>
                          <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--primary)] hover:underline"
                            >
                              {t("projects.live_demo")} <ArrowUpRight size={12} />
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                            >
                              <Github size={12} /> {t("projects.source")}
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── VALUE PROPS ── */}
      <Reveal>
        <section id="about" className="py-24 md:py-32 px-6 bg-[var(--surface)]/40 border-y border-[var(--border)]">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">
                {t("values.eyebrow")}
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight text-balance"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {t("values.heading")}
              </h2>
              <p className="mt-4 text-[var(--muted)] leading-relaxed text-pretty">
                {t("values.subtext")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {valueProps.map((vp, i) => {
                const Icon = vp.icon;
                return (
                  <motion.div
                    key={vp.title}
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-[var(--primary)]/30 transition-all duration-300 ${
                      i === 0 ? "sm:col-span-2 md:col-span-1" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-[var(--primary)]" />
                    </div>
                    <h3
                      className="text-lg font-bold mb-2 tracking-tight"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {vp.title}
                    </h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">{vp.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── SKILLS STRIP ── */}
      <Reveal>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-10 text-center">
              {t("skills.eyebrow")}
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              {skillGroups.map((group) => (
                <motion.div key={group.category} variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] w-28 shrink-0">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--foreground)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── TESTIMONIALS ── */}
      <Reveal>
        <section className="py-24 md:py-32 px-6 bg-[var(--surface)]/40 border-y border-[var(--border)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-3">
                {t("testimonials.eyebrow")}
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight text-balance"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {t("testimonials.heading")}
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((t_item, i) => (
                <motion.figure
                  key={t_item.author}
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:border-[var(--primary)]/30 transition-all duration-300 flex flex-col ${
                    i === 1 ? "md:translate-y-4" : ""
                  }`}
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={14} className="fill-[var(--primary)] text-[var(--primary)]" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-[var(--foreground)] flex-1 mb-6">
                    {t_item.quote}
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border)] shrink-0">
                      <img
                        src={t_item.avatar}
                        alt={t_item.author}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{t_item.author}</p>
                      <p className="text-xs text-[var(--muted)]">{t_item.role}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA BANNER ── */}
      <Reveal>
        <section id="contact" className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden border border-[var(--primary)]/30 bg-[var(--surface)] p-12 md:p-16 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_64px_-16px_rgba(168,85,247,0.2)]"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[var(--primary)]/15 blur-[80px] rounded-full" />
              </div>

              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-4">
                  {t("cta.eyebrow")}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-balance"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {t("cta.heading")}
                </h2>
                <p className="text-[var(--muted)] text-lg leading-relaxed max-w-xl mx-auto mb-10 text-pretty">
                  {t("cta.subtext")}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] text-white font-semibold shadow-[0_0_28px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:bg-[var(--primary)]/90 transition-all duration-300"
                  >
                    {t("cta.button")}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {BRAND.email}
                  </a>
                </div>

                <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-[var(--muted)]">
                  {[t("cta.check1"), t("cta.check2"), t("cta.check3")].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check size={14} className="text-[var(--primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}