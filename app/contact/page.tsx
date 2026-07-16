"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Send, CheckCircle, AlertCircle, User, AtSign, MessageSquare, FileText } from 'lucide-react';
import { BRAND, socialLinks } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ---------------------------------------------------------------------------
// Motion variants
// ---------------------------------------------------------------------------
const toastVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const staggerForm: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) {
    errors.name = "Your name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) {
    errors.subject = "A subject helps me understand your message.";
  } else if (values.subject.trim().length < 4) {
    errors.subject = "Subject must be at least 4 characters.";
  }
  if (!values.message.trim()) {
    errors.message = "A message is required.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Please write at least 20 characters so I can help you better.";
  }
  return errors;
}

// ---------------------------------------------------------------------------
// FormField
// ---------------------------------------------------------------------------
interface FormFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}

function FormField({ id, label, icon, error, children }: FormFieldProps) {
  return (
    <motion.div variants={fieldVariants} className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]"
      >
        <span className="text-[var(--primary)] opacity-80">{icon}</span>
        {label}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-orange-400 mt-0.5"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Input / Textarea shared classes
// ---------------------------------------------------------------------------
const inputBase =
  "w-full rounded-xl border border-[#1F1F1F] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-all duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/25 hover:border-[var(--border)]";

// ---------------------------------------------------------------------------
// ContactForm
// ---------------------------------------------------------------------------
function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations();
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(values);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      onSuccess();
      setValues({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={staggerForm}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5"
      noValidate
    >
      <FormField
        id="name"
        label={t("contact.form.nameLabel")}
        icon={<User size={14} />}
        error={errors.name}
      >
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t("contact.form.namePlaceholder")}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputBase}
        />
      </FormField>

      <FormField
        id="email"
        label={t("contact.form.emailLabel")}
        icon={<AtSign size={14} />}
        error={errors.email}
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("contact.form.emailPlaceholder")}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputBase}
        />
      </FormField>

      <FormField
        id="subject"
        label={t("contact.form.subjectLabel")}
        icon={<FileText size={14} />}
        error={errors.subject}
      >
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder={t("contact.form.subjectPlaceholder")}
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputBase}
        />
      </FormField>

      <FormField
        id="message"
        label={t("contact.form.messageLabel")}
        icon={<MessageSquare size={14} />}
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={t("contact.form.messagePlaceholder")}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputBase} resize-none`}
        />
      </FormField>

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-xl px-4 py-3"
        >
          <AlertCircle size={16} />
          {t("contact.form.errorMessage")}
        </motion.p>
      )}

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {status === "loading" ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
            />
            {t("contact.form.sending")}
          </>
        ) : (
          <>
            <Send size={16} />
            {t("contact.form.submit")}
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

// ---------------------------------------------------------------------------
// ContactInfoBlock
// ---------------------------------------------------------------------------
const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

const socialColors: Record<string, string> = {
  github: "hover:text-white hover:bg-white/10",
  linkedin: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
  twitter: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10",
};

function ContactInfoBlock() {
  const t = useTranslations();

  const infoItems = [
    {
      icon: <Mail size={18} />,
      label: t("contact.info.emailLabel"),
      value: BRAND.email,
      href: `mailto:${BRAND.email}`,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[var(--muted)] leading-relaxed text-sm">
          {t("contact.info.description")}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          {t("contact.info.directContact")}
        </p>
        {infoItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 group"
          >
            <span className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors duration-200">
              {item.icon}
            </span>
            <div>
              <p className="text-xs text-[var(--muted)]">{item.label}</p>
              <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-200">
                {item.value}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          {t("contact.info.findMeOn")}
        </p>
        <div className="flex flex-col gap-3">
          {socialLinks.map((social) => {
            const Icon = socialIconMap[social.icon];
            const colorClass = socialColors[social.icon] ?? "hover:text-[var(--primary)] hover:bg-[var(--primary)]/10";
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-3 group w-fit`}
              >
                <span
                  className={`w-10 h-10 rounded-xl bg-[var(--border)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] transition-all duration-200 ${colorClass}`}
                >
                  <Icon size={18} />
                </span>
                <span className="text-sm font-medium text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors duration-200">
                  {social.label}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-3">
          {t("contact.info.availability")}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          <span className="text-sm font-medium text-[var(--foreground)]">
            {t("contact.info.availableStatus")}
          </span>
        </div>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          {t("contact.info.availabilityNote")}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SuccessToast
// ---------------------------------------------------------------------------
function SuccessToast({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  const t = useTranslations();
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="success-toast"
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[var(--surface)] border border-rose-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(52,211,153,0.15)] rounded-2xl px-6 py-4 min-w-[320px] max-w-sm"
        >
          <span className="w-9 h-9 rounded-xl bg-rose-400/10 flex items-center justify-center text-rose-400 flex-shrink-0">
            <CheckCircle size={20} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {t("contact.toast.title")}
            </p>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              {t("contact.toast.body")}
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 ml-2 text-lg leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ContactPage() {
  const t = useTranslations();
  const [toastVisible, setToastVisible] = useState(false);

  const handleSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  return (
    <main className="min-h-screen pt-24 pb-24">
      {/* Page Header */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-4"
            >
              <span className="w-4 h-px bg-[var(--primary)]" />
              {t("contact.eyebrow")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] text-balance leading-[1.1] mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {t("contact.heading")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="text-[var(--muted)] text-lg leading-relaxed text-pretty"
            >
              {t("contact.subheading")}
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* Two-column layout */}
      <Reveal delay={0.1}>
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_32px_-8px_rgba(0,0,0,0.24)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-6">
                  {t("contact.form.sectionLabel")}
                </p>
                <ContactForm onSuccess={handleSuccess} />
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-2">
              <ContactInfoBlock />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Success Toast */}
      <SuccessToast visible={toastVisible} onDismiss={() => setToastVisible(false)} />
    </main>
  );
}