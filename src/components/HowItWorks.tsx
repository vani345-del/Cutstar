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
    videoSrc: '/videos/firtcard.mp4',
  },
  {
    number: '02',
    title: 'We handle the rest',
    description:
      'Our engine syncs every cut to the beat, pulls in outside clips where needed, and builds out a full batch across multiple styles.',
    videoSrc: '/videos/secondcard.mp4',
  },
  {
    number: '03',
    title: 'Post',
    description:
      'Receive ready-to-post content and start flooding the For You Page.',
    videoSrc: '/videos/thirdcard.mp4',
  },
] as const;

/* ── Per-card gradient & waveform variations ── */
const cardStyles = [
  {
    gradient: 'linear-gradient(135deg, #1A1A24 0%, #221F33 60%, #1E1B2E 100%)',
    waveColor: 'rgba(124,92,252,0.08)',
    accentGlow: 'rgba(124,92,252,0.06)',
  },
  {
    gradient: 'linear-gradient(160deg, #1A1A24 0%, #1F1D2F 50%, #231E30 100%)',
    waveColor: 'rgba(124,92,252,0.06)',
    accentGlow: 'rgba(140,110,255,0.05)',
  },
  {
    gradient: 'linear-gradient(120deg, #1C1A28 0%, #1A1A24 40%, #201D2E 100%)',
    waveColor: 'rgba(124,92,252,0.07)',
    accentGlow: 'rgba(124,92,252,0.04)',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Audio waveform SVG (abstract visual texture)                       */
/* ------------------------------------------------------------------ */

function WaveformTexture({ color, seed }: { color: string; seed: number }) {
  // Generate deterministic bar heights based on seed
  const bars = 40;
  const heights: number[] = [];
  for (let i = 0; i < bars; i++) {
    const t = i / bars;
    // Create a waveform-like envelope: rises, peaks, falls
    const envelope = Math.sin(t * Math.PI) * 0.8 + 0.2;
    // Add variation using seed
    const variation = Math.sin(i * 7.3 + seed * 13.7) * 0.3 + 0.7;
    heights.push(envelope * variation);
  }

  return (
    <svg
      className="absolute bottom-0 left-0 right-0 h-[40%] w-full"
      viewBox={`0 0 ${bars * 6} 100`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 6 + 1}
          y={100 - h * 80}
          width="3"
          rx="1.5"
          height={h * 80}
          fill={color}
        />
      ))}
    </svg>
  );
}


/* ------------------------------------------------------------------ */
/*  Step card with text                                                */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  index,
  className,
}: {
  step: (typeof steps)[number];
  index: number;
  className?: string;
}) {
  const style = cardStyles[index];

  return (
    <motion.div className={className} variants={cardVariants}>
      {/* Video placeholder */}
      <div
        className="group relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40 transition-transform duration-300 hover:scale-[1.02]"
        style={{ background: style.gradient }}
      >
        {/* Abstract blurred color blocks suggesting motion */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 25% 40%, ${style.accentGlow}, transparent),
              radial-gradient(ellipse 40% 60% at 75% 60%, ${style.accentGlow}, transparent)
            `,
          }}
        />

        {/* Video Player */}
        {step.videoSrc && (
          <video
            className="absolute inset-0 z-[1] h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
            src={step.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        )}

        {/* Waveform texture */}
        <div className="pointer-events-none absolute inset-0 z-[2] opacity-60">
          <WaveformTexture color={style.waveColor} seed={index + 1} />
        </div>

        {/* Scan line effect */}
        <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.02]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }} />

        {/* Top gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-black/30" />

        {/* Hover glow brightening */}
        <div
          className="pointer-events-none absolute inset-0 z-[4] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, rgba(124,92,252,0.06) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Step text */}
      <div className="mt-6">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-5xl font-bold leading-none text-[#7C5CFC]/20 select-none">
            {step.number}
          </span>
          <h3 className="text-xl font-semibold text-white">
            {step.title}
          </h3>
        </div>
        <p className="mt-2 max-w-md text-base leading-relaxed text-[#8A8A99]">
          {step.description}
        </p>
      </div>
    </motion.div>
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
      {/* Background accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-[#7C5CFC]/[0.03] blur-[120px]" />
      </div>

      {/* Heading */}
      <motion.div
        className="mb-24"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#7C5CFC] mb-4">
          How it works
        </p>
        <h2
          id="how-it-works-heading"
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Three steps to<br />
          <span className="text-[#8A8A99]">unlimited content.</span>
        </h2>
      </motion.div>

      {/* Asymmetric card grid */}
      <motion.div
        className="relative mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Card 1 — large, left-aligned */}
        <StepCard
          step={steps[0]}
          index={0}
          className="relative w-full sm:w-[65%]"
        />

        {/* Card 2 — medium, pushed right */}
        <StepCard
          step={steps[1]}
          index={1}
          className="relative mt-16 ml-auto w-full sm:mt-20 sm:w-[55%]"
        />

        {/* Card 3 — offset left */}
        <StepCard
          step={steps[2]}
          index={2}
          className="relative mt-16 w-full sm:mt-20 sm:ml-[10%] sm:w-[50%]"
        />

        {/* Decorative connection line */}
        <div className="pointer-events-none absolute left-[31%] top-0 hidden h-full w-px sm:block">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-[#7C5CFC]/10 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
