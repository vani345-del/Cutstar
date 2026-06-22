'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormSection from './FormSection';

/* ── Types ──────────────────────────────────────────── */
type PathChoice = 'artist' | 'agency' | null;

/* ── Card Data ──────────────────────────────────────── */
const cards = [
  {
    id: 'artist' as const,
    heading: "I'm an artist or creator",
    subtext: 'Claim your free edit + get notified when unlimited drops.',
    cta: 'Get My Free Edit',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#7C5CFC]">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: 'agency' as const,
    heading: 'I represent a label, agency, or management',
    subtext: 'See what we can do for your roster.',
    cta: 'Apply for a Demo',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#7C5CFC]">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
] as const;

/* ── Animation Variants ─────────────────────────────── */
const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ── Component ──────────────────────────────────────── */
export default function ChoosePath() {
  const [selectedPath, setSelectedPath] = useState<PathChoice>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#7C5CFC]/[0.04] blur-[140px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section header */}
        <AnimatePresence mode="wait">
          {selectedPath === null && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#7C5CFC] mb-4">
                Get started
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Choose your path.
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {selectedPath === null ? (
            /* ── Path Cards ────────────────────────────── */
            <motion.div
              key="cards"
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  variants={cardVariants}
                  onClick={() => setSelectedPath(card.id)}
                  tabIndex={0}
                  className={[
                    'group relative bg-[#1A1A24] rounded-2xl p-8 md:p-10',
                    'border border-white/[0.08]',
                    'text-left cursor-pointer',
                    'hover:border-[#7C5CFC]/30',
                    'focus-visible:ring-2 focus-visible:ring-[#7C5CFC]/50 focus-visible:outline-none',
                    'transition-all duration-500',
                    'flex flex-col',
                    'overflow-hidden',
                  ].join(' ')}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7C5CFC]/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Top glow on hover */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-[#7C5CFC]/20 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C5CFC]/10 border border-[#7C5CFC]/20">
                      {card.icon}
                    </div>

                    <h3 className="text-2xl font-semibold text-white leading-tight">
                      {card.heading}
                    </h3>
                    <p className="text-[#8A8A99] mt-3 leading-relaxed">{card.subtext}</p>

                    {/* CTA pill */}
                    <span
                      aria-hidden="true"
                      className="mt-8 inline-flex items-center gap-2 bg-[#7C5CFC] text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 group-hover:bg-[#6B4CE0] group-hover:shadow-lg group-hover:shadow-[#7C5CFC]/20"
                    >
                      {card.cta}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* ── Selected Form ─────────────────────────── */
            <motion.div
              key="form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FormSection
                formType={selectedPath}
                onBack={() => setSelectedPath(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
