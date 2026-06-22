'use client';

import { motion, type Variants } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: '01',
    title: 'Upload',
    description:
      'Drop in your songs and any footage you want included.',
  },
  {
    number: '02',
    title: 'We handle the rest',
    description:
      'Our engine syncs every cut to the beat, pulls in outside clips where needed, and builds out a full batch across multiple styles.',
  },
  {
    number: '03',
    title: 'Post',
    description:
      'Receive ready-to-post content and start flooding the For You Page.',
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Play‑button overlay                                                */
/* ------------------------------------------------------------------ */

function PlayOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
        <svg
          width="22"
          height="26"
          viewBox="0 0 22 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 11.268a2 2 0 0 1 0 3.464L3 24.124A2 2 0 0 1 0 22.392V3.608A2 2 0 0 1 3 1.876L21 11.268Z"
            fill="rgba(255,255,255,0.85)"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden px-6 py-36 sm:px-10 lg:px-20"
      aria-labelledby="how-it-works-heading"
    >
      {/* Heading */}
      <motion.h2
        id="how-it-works-heading"
        className="mb-20 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        How it works
      </motion.h2>

      {/* ---------------------------------------------------------- */}
      {/*  Asymmetric card grid                                       */}
      {/* ---------------------------------------------------------- */}
      <motion.div
        className="relative mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* ---------- Card 1 — large, left‑aligned ---------- */}
        <motion.div
          className="relative w-[88%] sm:w-[62%]"
          variants={cardVariants}
        >
          {/* Video placeholder */}
          <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#1A1A24] shadow-lg shadow-black/30">
            {/* Faux shimmer for visual texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
            <PlayOverlay />
          </div>

          {/* Step text */}
          <div className="mt-5 max-w-md">
            <span className="font-display text-4xl font-bold leading-none text-[#8A8A99]/40 select-none">
              {steps[0].number}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {steps[0].title}
            </h3>
            <p className="mt-1.5 text-base leading-relaxed text-[#8A8A99]">
              {steps[0].description}
            </p>
          </div>
        </motion.div>

        {/* ---------- Card 2 — medium, pushed right & down ---------- */}
        <motion.div
          className="relative mt-12 ml-auto w-[80%] sm:mt-[-4rem] sm:w-[48%]"
          variants={cardVariants}
        >
          <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#1A1A24] shadow-lg shadow-black/30">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
            <PlayOverlay />
          </div>

          <div className="mt-5 max-w-sm">
            <span className="font-display text-4xl font-bold leading-none text-[#8A8A99]/40 select-none">
              {steps[1].number}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {steps[1].title}
            </h3>
            <p className="mt-1.5 text-base leading-relaxed text-[#8A8A99]">
              {steps[1].description}
            </p>
          </div>
        </motion.div>

        {/* ---------- Card 3 — smaller, left offset & lower ---------- */}
        <motion.div
          className="relative mt-12 w-[75%] sm:mt-[-2rem] sm:ml-[8%] sm:w-[52%]"
          variants={cardVariants}
        >
          <div className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#1A1A24] shadow-lg shadow-black/30">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
            <PlayOverlay />
          </div>

          <div className="mt-5 max-w-sm">
            <span className="font-display text-4xl font-bold leading-none text-[#8A8A99]/40 select-none">
              {steps[2].number}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {steps[2].title}
            </h3>
            <p className="mt-1.5 text-base leading-relaxed text-[#8A8A99]">
              {steps[2].description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
