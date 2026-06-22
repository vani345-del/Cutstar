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
  },
  {
    id: 'agency' as const,
    heading: 'I represent a label, agency, or management',
    subtext: 'See what we can do for your roster.',
    cta: 'Apply for a Demo',
  },
] as const;

/* ── Animation Variants ─────────────────────────────── */
const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
  exit: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
    <section className="py-32 max-w-5xl mx-auto px-6">
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {cards.map((card) => (
              <motion.button
                key={card.id}
                variants={cardVariants}
                onClick={() => setSelectedPath(card.id)}
                tabIndex={0}
                className={[
                  'bg-[#1A1A24] border border-white/10 rounded-2xl p-8 md:p-10',
                  'text-left cursor-pointer',
                  'hover:border-[#7C5CFC]/40 hover:shadow-lg hover:shadow-[#7C5CFC]/5',
                  'focus-visible:ring-2 focus-visible:ring-[#7C5CFC]/50 focus-visible:outline-none',
                  'transition-all duration-300',
                  'flex flex-col',
                ].join(' ')}
              >
                <h3 className="text-2xl font-semibold text-white">
                  {card.heading}
                </h3>
                <p className="text-[#8A8A99] mt-3">{card.subtext}</p>

                {/* Visual-only CTA pill */}
                <span
                  aria-hidden="true"
                  className="bg-[#7C5CFC] text-white font-semibold py-2.5 px-6 rounded-lg mt-6 inline-block self-start"
                >
                  {card.cta}
                </span>
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
    </section>
  );
}
