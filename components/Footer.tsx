"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter } from 'lucide-react';
import { navLinks, socialLinks, BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    type: "route" | "anchor"
  ) => {
    if (type === "anchor" && href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getHref = (href: string, type: "route" | "anchor") => {
    if (type === "anchor" && href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-bold text-xl text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 block mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {BRAND.name}
            </Link>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
              {t("footer.navigation")}
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getHref(link.href, link.type)}
                    onClick={(e) => handleNavClick(e, link.href, link.type)}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {t(`nav.${link.label.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-4">
              {t("footer.connect")}
            </p>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors duration-200"
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
            <a
              href={`mailto:${BRAND.email}`}
              className="text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
            >
              {BRAND.email}
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            {t("footer.copyright", { year: 2024, name: BRAND.name })}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}