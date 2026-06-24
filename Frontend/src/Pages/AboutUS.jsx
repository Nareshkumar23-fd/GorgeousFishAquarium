import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ----------------------------------------------------------------
   ABOUT US — with Framer Motion animations
   Cleaned up and optimized for performance
------------------------------------------------------------------ */

/* ── DATA ── */

const values = [
  {
    icon: "ethics",
    label: "Ethical Sourcing",
    body: "Every species we carry is bred in-captivity or responsibly wild-collected. We won't stock a fish we can't trace.",
  },
  {
    icon: "survival",
    label: "98.6% Survival",
    body: "Not a marketing number — it's our shipping SLA. If an animal doesn't arrive alive, we make it right the same day.",
  },
  {
    icon: "knowledge",
    label: "Keeper Knowledge",
    body: "Our team keeps real tanks at home. Advice here comes from experience, not a product sheet.",
  },
  {
    icon: "range",
    label: "Full Spectrum",
    body: "From a child's first goldfish bowl to a 1000-litre SPS reef — we stock and support the whole journey.",
  },
];

const timeline = [
  { year: "2012", event: "First stall", detail: "Weekend aquarist market, Madurai. One table, 30 species, a hand-drawn sign." },
  { year: "2015", event: "First warehouse", detail: "Moved to a dedicated facility with quarantine bays and live-food cultures." },
  { year: "2018", event: "Online store", detail: "Nationwide shipping launched. Live arrival guarantee written into checkout." },
  { year: "2021", event: "Planted division", detail: "Full aquascaping range added — rare flora, hardscape, ADA-grade substrates." },
  { year: "2024", event: "Today", detail: "12,400+ animals shipped. 98.6% arrive alive. The obsession hasn't changed." },
];

const team = [
  { name: "Raj Subramaniam", role: "Founder · Marine keeper 14 yrs", depth: "Reef specialist" },
  { name: "Deepa Nair", role: "Head of Livestock", depth: "Planted & discus" },
  { name: "Arjun Mehta", role: "Aquarist & Support", depth: "Nano & shrimp tanks" },
];

const milestones = [
  { value: "12,400+", label: "Animals shipped" },
  { value: "98.6%", label: "Live arrival rate" },
  { value: "340+", label: "Species in stock" },
  { value: "12 yrs", label: "In the hobby" },
];

/* ── ICONS ── */

const Icon = ({ name, className = "" }) => {
  const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "ethics")
    return <svg {...base} className={className}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>;
  if (name === "survival")
    return <svg {...base} className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
  if (name === "knowledge")
    return <svg {...base} className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
  if (name === "range")
    return <svg {...base} className={className}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
  if (name === "chevron")
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 6l6 6-6 6" /></svg>;
  return null;
};

/* ── WAVE DIVIDER ── */
const WaveDivider = () => (
  <svg className="ab-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" style={{ fill: "var(--zbg)" }} />
  </svg>
);

/* ── SCROLL REVEAL with Framer Motion ── */
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  const variants = {
    hidden: { 
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      transition: { 
        duration: 0.7, 
        delay: delay / 1000,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── COMPONENT ── */

const AboutUS = () => {
  // Generate bubble data
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: (i * 9.3 + 4) % 100,
    size: 4 + (i % 4) * 3,
    duration: 8 + (i % 5) * 2,
    delay: i * 0.7,
  }));

  const plankton = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: (i * 8.3 + 3) % 100,
    top: (i * 17 + 10) % 90,
    size: 2 + (i % 3),
    duration: 3 + (i % 4),
    delay: i * 0.4,
  }));

  // Tank fish data
  const tankFish = [
    { top: "32%", scale: 0.9, dur: "9s", delay: "0s", fill: "#ff8b5e" },
    { top: "52%", scale: 0.6, dur: "13s", delay: "3.5s", fill: "#4fd8c4" },
    { top: "22%", scale: 0.7, dur: "16s", delay: "7s", fill: "#f1c47b" },
  ];

  return (
    <div className="ab-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,650;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .ab-root {
          --abyss: #07151d;
          --twilight: #0c2630;
          --reef: #161229;
          --midnight: #050709;
          --ink: #0b2027;
          --foam: #eaf6f6;
          --foam-dim: rgba(234,246,246,0.66);
          --aqua: #4fd8c4;
          --aqua-deep: #0e8c7f;
          --coral: #ff8b5e;
          --sun: #f1faf8;
          --current-bg: #edf4fa;
          --surface: #e9f1ee;
          --ledger-line: rgba(11,32,39,0.09);

          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--abyss);
          color: var(--foam);
          overflow-x: hidden;
        }
        .ab-root .fd { font-family: 'Fraunces', serif; }
        .ab-root .fm { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }

        /* ── ZONE SYSTEM ── */
        .ab-zone-dark {
          --zbg: var(--twilight);
          --ztext: var(--foam);
          --ztext-dim: var(--foam-dim);
          --zaccent: var(--aqua);
          --zborder: rgba(234,246,246,0.12);
          --zcard-bg: linear-gradient(160deg,rgba(79,216,196,0.08),rgba(234,246,246,0.02));
          --zicon-bg: rgba(79,216,196,0.14);
          --zpanel-bg: rgba(234,246,246,0.03);
        }
        .ab-zone-light {
          --zbg: var(--sun);
          --ztext: var(--ink);
          --ztext-dim: rgba(11,32,39,0.62);
          --zaccent: var(--aqua-deep);
          --zborder: rgba(11,32,39,0.12);
          --zcard-bg: #ffffff;
          --zicon-bg: rgba(14,140,127,0.10);
          --zpanel-bg: rgba(255,255,255,0.55);
        }
        .ab-zone-reef { 
          --zbg: var(--reef); 
          --zaccent: var(--coral); 
          --zborder: rgba(255,139,94,0.22); 
          --zicon-bg: rgba(255,139,94,0.14); 
          --ztext: var(--foam); 
          --ztext-dim: var(--foam-dim); 
          --zcard-bg: linear-gradient(160deg,rgba(255,139,94,0.08),rgba(234,246,246,0.02)); 
        }
        .ab-zone-current { --zbg: var(--current-bg); }
        .ab-zone-midnight { 
          --zbg: var(--midnight); 
          --ztext: #fff; 
          --ztext-dim: rgba(255,255,255,0.55); 
          --zaccent: var(--aqua); 
          --zborder: rgba(255,255,255,0.12); 
        }
        .ab-zone-topside { --zbg: var(--surface); }

        /* ── WAVE DIVIDER ── */
        .ab-wave {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 56px;
          transform: translateY(-99%);
          pointer-events: none; display: block;
        }

        /* ── SECTION BASE ── */
        .ab-section {
          padding: 8rem 6vw 7rem;
          position: relative;
          background: var(--zbg);
          color: var(--ztext);
          z-index: 1;
        }
        .ab-section-head { max-width: 46rem; margin-bottom: 3.2rem; }
        .ab-eyebrow {
          font-size: 0.7rem; text-transform: uppercase;
          color: var(--zaccent);
          display: flex; align-items: center; gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .ab-eyebrow::before { content:''; width:22px; height:1px; background:var(--zaccent); display:inline-block; }
        .ab-title {
          font-size: clamp(1.8rem, 3.4vw, 2.6rem);
          font-weight: 650; line-height: 1.15;
          color: var(--ztext);
        }
        .ab-sub {
          margin-top: 0.9rem;
          color: var(--ztext-dim);
          max-width: 42ch;
          font-size: 0.97rem;
          line-height: 1.65;
        }

        /* ==================== 1. HERO ==================== */
        .ab-hero {
          position: relative;
          min-height: 80svh;
          display: flex; align-items: flex-end;
          overflow: hidden;
          background: linear-gradient(180deg, #020c1b 0%, #07151d 60%, #0a1e2e 100%);
        }
        .ab-caustics {
          position: absolute; inset:0;
          mix-blend-mode: screen; opacity:0.35; pointer-events:none;
          background:
            radial-gradient(circle at 18% 28%, rgba(79,216,196,0.28), transparent 40%),
            radial-gradient(circle at 80% 55%, rgba(79,216,196,0.18), transparent 44%),
            radial-gradient(circle at 50% 82%, rgba(255,139,94,0.12), transparent 38%);
          background-size: 180% 180%;
          animation: ab-caustics 16s ease-in-out infinite alternate;
        }
        @keyframes ab-caustics { 0%{background-position:0% 0%;} 100%{background-position:100% 60%;} }

        .ab-bubble {
          position: absolute; bottom:-10%;
          border-radius:50%;
          background:rgba(234,246,246,0.18);
          pointer-events:none;
          animation: ab-rise linear infinite;
        }
        @keyframes ab-rise {
          0%   { transform:translateY(0); opacity:0; }
          10%  { opacity:0.65; }
          100% { transform:translateY(-115vh); opacity:0; }
        }

        .ab-hero-content {
          position: relative; z-index:2;
          width:100%; padding: 0 6vw 9vh;
          display:flex; justify-content:space-between; align-items:flex-end; gap:2rem;
        }
        .ab-hero-eyebrow {
          font-size:0.72rem; text-transform:uppercase;
          color:var(--aqua);
          display:flex; align-items:center; gap:0.6rem;
          margin-bottom:0.9rem;
        }
        .ab-hero-eyebrow::before { content:''; width:22px; height:1px; background:var(--aqua); display:inline-block; }
        .ab-hero-title {
          font-family:'Fraunces',serif;
          font-size: clamp(2.4rem, 6vw, 5rem);
          font-weight:650; line-height:1.04;
          white-space:pre-line; max-width:15ch;
        }
        .ab-hero-text {
          margin-top:1.1rem; max-width:36ch;
          color:var(--foam-dim); font-size:1rem; line-height:1.65;
        }
        .ab-depth-gauge {
          display:flex; flex-direction:column; align-items:flex-end; gap:0.6rem; flex-shrink:0;
        }
        .ab-depth-readout { font-size:0.78rem; color:var(--foam-dim); margin-bottom:0.3rem; }
        .ab-depth-pill {
          font-family:'JetBrains Mono',monospace; font-size:0.72rem;
          padding:0.45rem 0.9rem;
          border:1px solid var(--aqua); border-radius:999px;
          color:var(--abyss); background:var(--aqua);
          font-weight:600;
        }
        .ab-scroll-cue {
          position:absolute; left:6vw; bottom:2.4rem; z-index:2;
          display:flex; align-items:center; gap:0.5rem;
          color:var(--foam-dim); font-size:0.7rem;
        }
        .ab-dot {
          width:22px; height:34px;
          border:1px solid rgba(234,246,246,0.4); border-radius:12px; position:relative;
        }
        .ab-dot::after {
          content:''; position:absolute; top:6px; left:50%;
          width:3px; height:7px; background:var(--aqua); border-radius:2px;
          transform:translateX(-50%);
          animation: ab-scrolldot 1.8s ease-in-out infinite;
        }
        @keyframes ab-scrolldot { 0%,100%{top:6px;opacity:1;} 60%{top:16px;opacity:0.3;} }

        /* ==================== 2. SUNLIGHT — Origin ==================== */
        .ab-sun { overflow:hidden; }
        .ab-sun::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background: repeating-linear-gradient(115deg,rgba(14,140,127,0.05) 0px,rgba(14,140,127,0.05) 2px,transparent 2px,transparent 42px);
        }
        .ab-story-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start;
          position:relative; z-index:1;
        }
        .ab-story-body { font-size:0.97rem; line-height:1.8; color:var(--ztext-dim); margin-bottom:1.1rem; }

        /* Tank Art */
        .ab-tank-art {
          width:100%; aspect-ratio:4/3;
          border:1px solid var(--zborder);
          border-radius:16px;
          background: linear-gradient(160deg,#041224 0%,#0b2840 55%,#071d32 100%);
          position:relative; overflow:hidden;
        }
        .ab-tank-art-floor {
          position:absolute; bottom:0; left:0; right:0; height:28%;
          background:linear-gradient(180deg,transparent 0%,#1a3a2a 40%,#0f2a1e 100%);
        }
        .ab-tank-glow {
          position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(circle at 30% 40%, rgba(79,216,196,0.18), transparent 45%),
            radial-gradient(circle at 72% 60%, rgba(255,139,94,0.10), transparent 40%);
          mix-blend-mode:screen;
          animation: ab-caustics 10s ease-in-out infinite alternate;
        }
        .ab-tank-bubble-inner {
          position:absolute; border-radius:50%;
          border:1px solid rgba(79,216,196,0.45);
          pointer-events:none;
          animation: ab-rise linear infinite;
        }
        .ab-fish {
          position:absolute;
          animation: ab-swim linear infinite;
          pointer-events:none;
        }
        @keyframes ab-swim {
          0%   { transform:translateX(-60px); opacity:0; }
          8%   { opacity:1; }
          92%  { opacity:1; }
          100% { transform:translateX(calc(100vw + 60px)); opacity:0; }
        }
        .ab-plant-row {
          position:absolute; bottom:26%; left:0; right:0;
          display:flex; justify-content:space-around; padding:0 1.5rem;
        }
        .ab-plant { display:flex; flex-direction:column; align-items:center; }
        .ab-leaf {
          border-radius:50% 50% 50% 0;
          background:#3a8f5e; margin-bottom:-1px;
          transform-origin:bottom center;
        }
        .ab-stem { width:2px; background:#2d6e4e; border-radius:2px; }
        .ab-tank-label {
          position:absolute; bottom:0.9rem; right:1.1rem;
          font-family:'JetBrains Mono',monospace;
          font-size:0.62rem; letter-spacing:0.14em; text-transform:uppercase;
          color:rgba(79,216,196,0.45);
        }

        /* ==================== 3. REEF — Values ==================== */
        .ab-reef-wrap { overflow:hidden; }
        .ab-reef-wrap::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          mix-blend-mode:screen; opacity:0.45;
          background:
            radial-gradient(circle at 15% 25%,rgba(255,139,94,0.28),transparent 38%),
            radial-gradient(circle at 85% 70%,rgba(79,216,196,0.22),transparent 42%);
          animation: ab-caustics 18s ease-in-out infinite alternate;
        }
        .ab-values-grid {
          display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem;
          position:relative; z-index:1;
        }
        .ab-val-card {
          background:var(--zcard-bg);
          border:1px solid var(--zborder);
          border-top:3px solid var(--zaccent);
          border-radius:4px 4px 14px 14px;
          padding:2rem 1.7rem;
        }
        .ab-val-icon {
          width:46px; height:46px; border-radius:12px;
          background:var(--zicon-bg); color:var(--zaccent);
          display:flex; align-items:center; justify-content:center;
          margin-bottom:1.3rem;
        }
        .ab-val-icon svg { width:22px; height:22px; }
        .ab-val-title { font-family:'Fraunces',serif; font-size:1.1rem; font-weight:600; color:var(--ztext); margin-bottom:0.55rem; }
        .ab-val-body  { font-size:0.875rem; line-height:1.65; color:var(--ztext-dim); }

        /* ==================== 4. CURRENT — Timeline ==================== */
        .ab-timeline {
          position:relative;
          display:flex; justify-content:space-between; gap:1rem;
          margin-top:1rem;
        }
        .ab-timeline::before {
          content:''; position:absolute; top:27px; left:4%; right:4%; height:2px;
          background: repeating-linear-gradient(to right,var(--zaccent) 0 10px,transparent 10px 20px);
          opacity:0.5;
        }
        .ab-tl-step {
          position:relative; z-index:1; flex:1;
          display:flex; flex-direction:column; align-items:center; text-align:center; gap:0.75rem;
        }
        .ab-tl-node {
          width:56px; height:56px; border-radius:50%;
          background:#fff; border:2px solid var(--zaccent); color:var(--zaccent);
          display:flex; align-items:center; justify-content:center;
          font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:500;
          box-shadow:0 4px 16px rgba(11,32,39,0.08);
          flex-shrink:0;
        }
        .ab-tl-event { font-family:'Fraunces',serif; font-size:1rem; font-weight:600; color:var(--ztext); }
        .ab-tl-detail { font-size:0.8rem; color:var(--ztext-dim); max-width:18ch; line-height:1.55; }

        /* ==================== 5. TWILIGHT — Team ==================== */
        .ab-twilight-wrap { overflow:hidden; }
        .ab-plankton {
          position:absolute; border-radius:50%; background:var(--aqua); pointer-events:none;
          animation:ab-twinkle ease-in-out infinite;
        }
        @keyframes ab-twinkle { 0%,100%{opacity:0.12;} 50%{opacity:0.55;} }
        .ab-team-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; position:relative; z-index:1; }
        .ab-team-card {
          background:var(--zcard-bg);
          border:1px solid var(--zborder);
          border-radius:14px; padding:2.2rem 1.8rem;
        }
        .ab-team-avatar {
          width:52px; height:52px; border-radius:50%;
          background:var(--zicon-bg); color:var(--zaccent);
          display:flex; align-items:center; justify-content:center;
          font-family:'Fraunces',serif; font-size:1.3rem; font-weight:650;
          margin-bottom:1.2rem;
          border:1.5px solid var(--zborder);
        }
        .ab-team-name  { font-family:'Fraunces',serif; font-size:1.05rem; font-weight:600; color:var(--ztext); margin-bottom:0.25rem; }
        .ab-team-role  { font-size:0.82rem; color:var(--ztext-dim); line-height:1.5; }
        .ab-team-depth {
          margin-top:1rem; display:inline-block;
          font-family:'JetBrains Mono',monospace; font-size:0.68rem; letter-spacing:0.1em;
          text-transform:uppercase; color:var(--zaccent);
          border:1px solid rgba(79,216,196,0.28); border-radius:999px;
          padding:0.28rem 0.75rem;
        }

        /* ==================== 6. MIDNIGHT — Stats ==================== */
        .ab-midnight-wrap .ab-section-head { text-align:center; max-width:none; margin-bottom:3.6rem; }
        .ab-midnight-wrap .ab-eyebrow { justify-content:center; }
        .ab-midnight-wrap .ab-eyebrow::before { display:none; }
        .ab-midnight-wrap .ab-title {
          font-family:'JetBrains Mono',monospace;
          font-size:1rem; font-weight:500;
          letter-spacing:0.06em; text-transform:uppercase; opacity:0.85;
        }
        .ab-stat-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
          max-width:64rem; margin:0 auto; position:relative; z-index:1;
        }
        .ab-stat-item { padding:0 1.5rem; border-left:1px solid var(--zborder); text-align:center; }
        .ab-stat-item:first-child { border-left:none; }
        .ab-stat-number {
          font-family:'JetBrains Mono',monospace;
          font-size:clamp(1.7rem,3.4vw,2.5rem); font-weight:500; color:var(--zaccent);
        }
        .ab-stat-label {
          margin-top:0.5rem; font-size:0.74rem;
          text-transform:uppercase; letter-spacing:0.07em; color:rgba(255,255,255,0.55);
        }

        /* ==================== 7. TOPSIDE — CTA ==================== */
        .ab-topside-wrap .ab-cta-block {
          max-width:44rem;
          border-top:1px solid var(--ledger-line);
          padding-top:3rem; margin-top:1rem;
        }
        .ab-cta-title {
          font-family:'Fraunces',serif; font-style:italic;
          font-size:clamp(1.5rem,2.8vw,2.1rem); font-weight:500;
          line-height:1.3; color:var(--ink); margin-bottom:1.8rem;
        }
        .ab-cta-title strong { font-style:normal; color:var(--aqua-deep); }
        .ab-btn-row { display:flex; gap:1rem; flex-wrap:wrap; }
        .ab-btn-primary {
          padding:0.85rem 2rem;
          background:var(--aqua-deep); color:#fff;
          font-size:0.875rem; font-weight:600; letter-spacing:0.04em;
          border:none; border-radius:8px; cursor:pointer;
          transition:opacity 0.2s, transform 0.2s;
        }
        .ab-btn-primary:hover { opacity:0.88; transform:translateY(-2px); }
        .ab-btn-ghost {
          padding:0.85rem 2rem;
          background:transparent; color:var(--ink);
          font-size:0.875rem; font-weight:500;
          border:1px solid rgba(11,32,39,0.22); border-radius:8px; cursor:pointer;
          transition:border-color 0.2s;
        }
        .ab-btn-ghost:hover { border-color:var(--aqua-deep); color:var(--aqua-deep); }

        /* ── REDUCED MOTION ── */
        @media (prefers-reduced-motion:reduce) {
          .ab-caustics, .ab-bubble, .ab-plankton,
          .ab-reef-wrap::after, .ab-fish, .ab-tank-glow,
          .ab-tank-bubble-inner { animation:none !important; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width:1024px) { .ab-values-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:900px) {
          .ab-story-grid { grid-template-columns:1fr; gap:3rem; }
          .ab-team-grid  { grid-template-columns:1fr; max-width:28rem; }
          .ab-timeline   { flex-direction:column; align-items:flex-start; gap:2rem; }
          .ab-timeline::before { display:none; }
          .ab-tl-step    { flex-direction:row; text-align:left; gap:1.2rem; align-items:flex-start; }
          .ab-tl-detail  { max-width:none; }
          .ab-stat-grid  { grid-template-columns:repeat(2,1fr); row-gap:2.5rem; }
          .ab-stat-item:nth-child(2n+1) { border-left:none; }
          .ab-hero-content { flex-direction:column; align-items:flex-start; gap:1.6rem; padding-bottom:7vh; }
          .ab-section { padding:6rem 6vw; }
        }
        @media (max-width:540px) {
          .ab-values-grid { grid-template-columns:1fr; }
          .ab-stat-grid   { grid-template-columns:1fr; }
          .ab-stat-item   { border-left:none; }
        }
      `}</style>

      {/* ==================== 1. HERO ==================== */}
      <section className="ab-hero">
        <div className="ab-caustics" />

        {bubbles.map((b) => (
          <span
            key={b.id}
            className="ab-bubble"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}

        <motion.div 
          className="ab-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <div className="ab-hero-eyebrow fm">About Us</div>
            <h1 className="ab-hero-title fd">
              {"Twelve years\nbeneath the surface"}
            </h1>
            <p className="ab-hero-text">
              We started as a weekend stall and a stubborn belief that Indian
              aquarists deserved better livestock, better gear, and people who
              actually kept tanks.
            </p>
          </div>

          <motion.div 
            className="ab-depth-gauge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="ab-depth-readout fm">origin · 2012</span>
            <span className="ab-depth-pill fm">Madurai, IN</span>
          </motion.div>
        </motion.div>

        <div className="ab-scroll-cue">
          <span className="ab-dot" />
          <span className="fm">SCROLL</span>
        </div>
      </section>

      {/* ==================== 2. SUNLIGHT — Origin ==================== */}
      <section className="ab-section ab-zone-light ab-sun">
        <WaveDivider />
        <div className="ab-story-grid">
          <div>
            <Reveal>
              <div className="ab-section-head" style={{ marginBottom: 0 }}>
                <div className="ab-eyebrow fm">Sunlight Zone · 0–200m</div>
                <h2 className="ab-title fd">A tank, a goldfish,<br />and a decade of stubbornness</h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="ab-story-body" style={{ marginTop: "1.4rem" }}>
                It started in 2012 with one 20-litre tank, one ornery fantail goldfish, and a frustrating
                Saturday morning at the local fish market. The fish were underfed. The equipment was
                generic. The advice was worse.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="ab-story-body">
                Our founder Raj started sourcing direct — quarantine bays in the garage, species-matched
                food blended at home, filtration tested before it was ever listed for sale. What began as
                a hobby became a weekend stall. The stall became a warehouse.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="ab-story-body">
                Today we ship nationwide. The fish are still quarantined. The food is still date-stamped.
                The obsession is unchanged.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} direction="right">
            <motion.div 
              className="ab-tank-art"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ab-tank-glow" />

              {/* Inner bubbles */}
              {[
                { l:"22%", s:5, dur:"3.8s", del:"0s", top:"72%" },
                { l:"48%", s:7, dur:"4.5s", del:"1.2s", top:"80%" },
                { l:"68%", s:4, dur:"3.2s", del:"0.5s", top:"75%" },
                { l:"35%", s:6, dur:"5.2s", del:"2.4s", top:"85%" },
              ].map((b, i) => (
                <span key={i} className="ab-tank-bubble-inner" style={{
                  left: b.l, top: b.top,
                  width: b.s, height: b.s,
                  animationDuration: b.dur, animationDelay: b.del,
                }} />
              ))}

              {/* Swimming fish */}
              {tankFish.map((f, i) => (
                <svg
                  key={i}
                  className="ab-fish"
                  viewBox="0 0 40 20"
                  width={40 * f.scale}
                  height={20 * f.scale}
                  fill="none"
                  style={{ top: f.top, left: 0, animationDuration: f.dur, animationDelay: f.delay }}
                >
                  <path d="M32 10C24 4 10 4 2 10C10 16 24 16 32 10Z" fill={f.fill} opacity="0.85" />
                  <path d="M32 10L40 4L38 10L40 16Z" fill={f.fill} opacity="0.7" />
                  <circle cx="7" cy="9" r="1.2" fill="#07151d" opacity="0.7" />
                </svg>
              ))}

              {/* Plants */}
              <div className="ab-plant-row">
                {[50, 38, 62, 44, 55, 40].map((h, i) => (
                  <div key={i} className="ab-plant">
                    {[0, 1, 2].map((l) => (
                      <div key={l} className="ab-leaf" style={{
                        width: 11 + Math.abs(Math.sin(i + l)) * 5,
                        height: 16 + Math.abs(Math.cos(i * l + 1)) * 6,
                        transform: `rotate(${(l - 1) * 20}deg)`,
                        opacity: 0.65 + l * 0.12,
                        background: l % 2 === 0 ? "#3a8f5e" : "#2e7a50",
                        borderRadius: l % 2 === 0 ? "50% 50% 50% 0" : "50% 0 50% 50%",
                      }} />
                    ))}
                    <div className="ab-stem" style={{ height: h * 0.35 }} />
                  </div>
                ))}
              </div>

              <div className="ab-tank-art-floor" />
              <div className="ab-tank-label fm">Est. 2012 · Madurai</div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ==================== 3. REEF — Values ==================== */}
      <section className="ab-section ab-zone-dark ab-zone-reef ab-reef-wrap">
        <WaveDivider />
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">The Reef · What We Stand For</div>
            <h2 className="ab-title fd">Four things we won't compromise on</h2>
            <p className="ab-sub">These aren't mission-statement words. They're decisions we make with every order that ships.</p>
          </div>
        </Reveal>
        <div className="ab-values-grid">
          {values.map((v, i) => (
            <Reveal key={v.label} delay={i * 110}>
              <motion.div 
                className="ab-val-card"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="ab-val-icon"><Icon name={v.icon} /></div>
                <div className="ab-val-title">{v.label}</div>
                <p className="ab-val-body">{v.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== 4. CURRENT — Timeline ==================== */}
      <section className="ab-section ab-zone-light ab-zone-current">
        <WaveDivider />
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">The Current · How We Got Here</div>
            <h2 className="ab-title fd">A decade in five markers</h2>
            <p className="ab-sub">Every stop changed something about how we work — here's the chain.</p>
          </div>
        </Reveal>
        <div className="ab-timeline">
          {timeline.map((t, index) => (
            <Reveal key={t.year} delay={index * 100}>
              <motion.div 
                className="ab-tl-step"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="ab-tl-node fm">{t.year}</div>
                <div className="ab-tl-event fd">{t.event}</div>
                <p className="ab-tl-detail">{t.detail}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== 5. TWILIGHT — Team ==================== */}
      <section className="ab-section ab-zone-dark ab-twilight-wrap">
        <WaveDivider />
        {plankton.map((p) => (
          <span key={p.id} className="ab-plankton" style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }} />
        ))}
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">Twilight Zone · The Keepers</div>
            <h2 className="ab-title fd">People who actually keep tanks</h2>
            <p className="ab-sub">Every member of our team maintains a personal aquarium. Advice here is lived-in, not looked-up.</p>
          </div>
        </Reveal>
        <div className="ab-team-grid">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 120}>
              <motion.div 
                className="ab-team-card"
                whileHover={{ y: -4, borderColor: "var(--zaccent)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="ab-team-avatar">{m.name.charAt(0)}</div>
                <div className="ab-team-name">{m.name}</div>
                <div className="ab-team-role">{m.role}</div>
                <span className="ab-team-depth fm">{m.depth}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== 6. MIDNIGHT — Stats ==================== */}
      <section className="ab-section ab-zone-dark ab-zone-midnight ab-midnight-wrap">
        <WaveDivider />
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">Midnight Zone · 1,000–4,000m</div>
            <h2 className="ab-title fm">By the numbers</h2>
          </div>
        </Reveal>
        <div className="ab-stat-grid">
          {milestones.map((s, index) => (
            <Reveal key={s.label} delay={index * 100}>
              <motion.div 
                className="ab-stat-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="ab-stat-number fm">{s.value}</div>
                <div className="ab-stat-label fm">{s.label}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== 7. TOPSIDE — CTA ==================== */}
      <section className="ab-section ab-zone-light ab-zone-topside ab-topside-wrap">
        <WaveDivider />
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">Topside · Come Aboard</div>
            <h2 className="ab-title fd">Ready to build your world?</h2>
            <p className="ab-sub">
              Browse 340+ species, expert-curated kits, and everything else a serious
              aquarist needs — backed by keepers who've been at it since 2012.
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="ab-cta-block">
            <p className="ab-cta-title">
              "Every tank we've ever sold is something we would<br />
              <strong>put in our own living room.</strong>"
              <br />
              <span style={{ 
                fontSize:"0.78rem", 
                fontStyle:"normal", 
                fontFamily:"'JetBrains Mono',monospace", 
                letterSpacing:"0.1em", 
                opacity:0.55, 
                textTransform:"uppercase" 
              }}>
                — Raj, Founder
              </span>
            </p>
            <motion.div 
              className="ab-btn-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.button 
                className="ab-btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              <motion.button 
                className="ab-btn-ghost"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to an Aquarist
              </motion.button>
            </motion.div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default AboutUS;