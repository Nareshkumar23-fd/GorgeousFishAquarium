import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ----------------------------------------------------------------
   ABOUT US — Unique design with NO BORDER RADIUS
   Clean, sharp edges with geometric accent patterns
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

/* ── DIVIDER WITH SHARP GEOMETRY ── */
const SharpDivider = () => (
  <svg className="ab-sharp-divider" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
    <polygon points="0,0 1440,60 1440,0 0,0" style={{ fill: "var(--zbg)" }} />
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
  // Generate geometric particles for hero
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: (i * 4.7 + 3) % 100,
    top: (i * 9.3 + 5) % 100,
    size: 3 + (i % 5) * 2,
    duration: 12 + (i % 6) * 2,
    delay: i * 0.3,
    rotation: (i * 37) % 360,
  }));

  return (
    <div className="ab-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,650;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .ab-root {
          --abyss: #0a0b12;
          --deep: #0f1724;
          --ink: #0b1a22;
          --foam: #e8f0f0;
          --foam-dim: rgba(232,240,240,0.6);
          --aqua: #2dd4bf;
          --aqua-deep: #0d9488;
          --coral: #f97316;
          --gold: #d97706;
          --surface: #f0f5f5;
          --paper: #ffffff;
          --border-light: rgba(10,11,18,0.08);
          --border-dark: rgba(232,240,240,0.12);
          
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--abyss);
          color: var(--foam);
          overflow-x: hidden;
        }
        
        .ab-root .fd { font-family: 'Fraunces', serif; }
        .ab-root .fm { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }

        /* ── NO BORDER RADIUS ANYWHERE ── */
        .ab-root * {
          border-radius: 0 !important;
        }

        /* ── ZONE SYSTEM ── */
        .ab-zone-dark {
          --zbg: var(--deep);
          --ztext: var(--foam);
          --ztext-dim: var(--foam-dim);
          --zaccent: var(--aqua);
          --zborder: var(--border-dark);
          --zcard-bg: rgba(232,240,240,0.04);
          --zicon-bg: rgba(45,212,191,0.12);
          --zpanel-bg: rgba(232,240,240,0.03);
        }
        .ab-zone-light {
          --zbg: var(--surface);
          --ztext: var(--ink);
          --ztext-dim: rgba(11,26,34,0.6);
          --zaccent: var(--aqua-deep);
          --zborder: var(--border-light);
          --zcard-bg: var(--paper);
          --zicon-bg: rgba(13,148,136,0.1);
          --zpanel-bg: rgba(255,255,255,0.5);
        }
        .ab-zone-reef { 
          --zbg: #111827; 
          --zaccent: var(--coral); 
          --zborder: rgba(249,115,22,0.2); 
          --zicon-bg: rgba(249,115,22,0.12); 
          --ztext: var(--foam); 
          --ztext-dim: var(--foam-dim); 
          --zcard-bg: rgba(249,115,22,0.05); 
        }
        .ab-zone-midnight { 
          --zbg: #05070c; 
          --ztext: #fff; 
          --ztext-dim: rgba(255,255,255,0.5); 
          --zaccent: var(--aqua); 
          --zborder: rgba(255,255,255,0.08); 
        }
        .ab-zone-topside { --zbg: var(--surface); }

        /* ── SHARP DIVIDER ── */
        .ab-sharp-divider {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 60px;
          transform: translateY(-99%);
          pointer-events: none; display: block;
        }

        /* ── SECTION BASE ── */
        .ab-section {
          padding: 7rem 6vw 6rem;
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
          letter-spacing: 0.12em;
        }
        .ab-eyebrow::before { content:''; width:28px; height:2px; background:var(--zaccent); display:inline-block; }
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
          background: linear-gradient(135deg, #0a0b12 0%, #0f1724 40%, #1a2535 100%);
        }
        
        .ab-hero-grid {
          position: absolute; inset: 0;
          pointer-events: none;
          background-image: 
            linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        .ab-hero-grid::after {
          content: '';
          position: absolute; inset: 0;
          background: 
            radial-gradient(circle at 15% 30%, rgba(45,212,191,0.08), transparent 50%),
            radial-gradient(circle at 85% 70%, rgba(249,115,22,0.06), transparent 40%);
        }

        .ab-particle {
          position: absolute;
          border: 1px solid rgba(45,212,191,0.15);
          pointer-events: none;
          animation: ab-float linear infinite;
        }
        
        @keyframes ab-float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          25% { opacity: 0.5; }
          75% { opacity: 0.5; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }

        .ab-hero-content {
          position: relative; z-index: 2;
          width: 100%; padding: 0 6vw 10vh;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: end;
        }
        
        .ab-hero-eyebrow {
          font-size: 0.72rem; text-transform: uppercase;
          color: var(--aqua);
          display: flex; align-items: center; gap: 0.6rem;
          margin-bottom: 0.9rem;
          letter-spacing: 0.14em;
        }
        .ab-hero-eyebrow::before { content: ''; width: 28px; height: 2px; background: var(--aqua); display: inline-block; }
        
        .ab-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.4rem, 6vw, 5rem);
          font-weight: 650; line-height: 1.04;
          white-space: pre-line; max-width: 15ch;
        }
        
        .ab-hero-text {
          margin-top: 1.1rem; max-width: 36ch;
          color: var(--foam-dim); font-size: 1rem; line-height: 1.65;
        }
        
        .ab-hero-meta {
          display: flex; flex-direction: column; align-items: flex-end;
          gap: 0.5rem; flex-shrink: 0;
          border-left: 2px solid var(--aqua);
          padding-left: 1.5rem;
        }
        
        .ab-hero-meta .label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--foam-dim);
        }
        
        .ab-hero-meta .value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.4rem;
          font-weight: 500;
          color: var(--aqua);
        }
        
        .ab-hero-meta .sub {
          font-size: 0.75rem;
          color: var(--foam-dim);
        }

        .ab-scroll-indicator {
          position: absolute; left: 6vw; bottom: 2.4rem; z-index: 2;
          display: flex; align-items: center; gap: 0.6rem;
          color: var(--foam-dim); font-size: 0.7rem;
          letter-spacing: 0.1em;
        }
        
        .ab-scroll-line {
          width: 32px; height: 1px;
          background: var(--aqua);
          position: relative;
        }
        
        .ab-scroll-line::after {
          content: '';
          position: absolute; right: 0; top: -3px;
          width: 6px; height: 6px;
          border-right: 1px solid var(--aqua);
          border-top: 1px solid var(--aqua);
          transform: rotate(45deg);
          animation: ab-scrollarrow 1.8s ease-in-out infinite;
        }
        
        @keyframes ab-scrollarrow {
          0%, 100% { right: 0; opacity: 1; }
          60% { right: -8px; opacity: 0.2; }
        }

        /* ==================== 2. ORIGIN ==================== */
        .ab-origin-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
          align-items: start;
          position: relative; z-index: 1;
        }
        
        .ab-story-text { font-size: 0.97rem; line-height: 1.8; color: var(--ztext-dim); }
        .ab-story-text + .ab-story-text { margin-top: 1rem; }
        
        .ab-origin-visual {
          position: relative;
          border: 1px solid var(--zborder);
          background: linear-gradient(160deg, #0a0b12, #1a2535);
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        
        .ab-origin-visual::before {
          content: '';
          position: absolute; inset: 0;
          background: 
            radial-gradient(circle at 30% 40%, rgba(45,212,191,0.06), transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(249,115,22,0.04), transparent 40%);
        }
        
        .ab-origin-grid-lines {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(45,212,191,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,212,191,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .ab-origin-badge {
          position: absolute; bottom: 1.5rem; right: 1.5rem;
          padding: 0.6rem 1.2rem;
          background: rgba(45,212,191,0.12);
          border: 1px solid rgba(45,212,191,0.2);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--aqua);
        }
        
        .ab-origin-year {
          position: absolute; top: 1.5rem; left: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 3rem;
          font-weight: 500;
          color: rgba(45,212,191,0.06);
          line-height: 1;
        }

        /* ==================== 3. VALUES ==================== */
        .ab-values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          position: relative; z-index: 1;
        }
        
        .ab-value-card {
          background: var(--zcard-bg);
          border: 1px solid var(--zborder);
          padding: 2rem 1.5rem;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .ab-value-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--zaccent);
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
        
        .ab-value-card:hover::before {
          opacity: 1;
        }
        
        .ab-value-icon {
          width: 44px; height: 44px;
          background: var(--zicon-bg);
          color: var(--zaccent);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.2rem;
        }
        .ab-value-icon svg { width: 20px; height: 20px; }
        
        .ab-value-title {
          font-family: 'Fraunces', serif;
          font-size: 1.05rem; font-weight: 600;
          color: var(--ztext); margin-bottom: 0.5rem;
        }
        .ab-value-body {
          font-size: 0.875rem; line-height: 1.65;
          color: var(--ztext-dim);
        }

        /* ==================== 4. TIMELINE ==================== */
        .ab-timeline-grid {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          margin-top: 1rem;
          position: relative;
        }
        
        .ab-timeline-grid::before {
          content: '';
          position: absolute; top: 28px; left: 8%; right: 8%;
          height: 2px;
          background: var(--zaccent);
          opacity: 0.2;
        }
        
        .ab-timeline-step {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 0.6rem;
        }
        
        .ab-timeline-node {
          width: 56px; height: 56px;
          background: var(--zcard-bg);
          border: 2px solid var(--zaccent);
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem; font-weight: 500;
          color: var(--zaccent);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        
        .ab-timeline-step:hover .ab-timeline-node {
          background: var(--zaccent);
          color: var(--zbg);
        }
        
        .ab-timeline-event {
          font-family: 'Fraunces', serif;
          font-size: 1rem; font-weight: 600;
          color: var(--ztext);
        }
        
        .ab-timeline-detail {
          font-size: 0.8rem; color: var(--ztext-dim);
          max-width: 18ch; line-height: 1.5;
        }

        /* ==================== 5. TEAM ==================== */
        .ab-team-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          position: relative; z-index: 1;
        }
        
        .ab-team-card {
          background: var(--zcard-bg);
          border: 1px solid var(--zborder);
          padding: 2rem 1.8rem;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .ab-team-card:hover {
          border-color: var(--zaccent);
          transform: translateY(-3px);
        }
        
        .ab-team-avatar {
          width: 48px; height: 48px;
          background: var(--zicon-bg);
          color: var(--zaccent);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif;
          font-size: 1.2rem; font-weight: 650;
          margin-bottom: 1rem;
          border: 1px solid var(--zborder);
        }
        
        .ab-team-name {
          font-family: 'Fraunces', serif;
          font-size: 1.05rem; font-weight: 600;
          color: var(--ztext);
          margin-bottom: 0.2rem;
        }
        
        .ab-team-role {
          font-size: 0.82rem; color: var(--ztext-dim);
          line-height: 1.5;
        }
        
        .ab-team-tag {
          margin-top: 1rem; display: inline-block;
          padding: 0.25rem 0.8rem;
          border: 1px solid var(--zborder);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--zaccent);
        }

        /* ==================== 6. STATS ==================== */
        .ab-stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          max-width: 64rem; margin: 0 auto;
          position: relative; z-index: 1;
        }
        
        .ab-stat-item {
          padding: 0 1.5rem;
          border-left: 1px solid var(--zborder);
          text-align: center;
        }
        .ab-stat-item:first-child { border-left: none; }
        
        .ab-stat-number {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.7rem, 3.4vw, 2.5rem);
          font-weight: 500;
          color: var(--zaccent);
        }
        
        .ab-stat-label {
          margin-top: 0.5rem;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ztext-dim);
        }

        /* ==================== 7. CTA ==================== */
        .ab-cta-box {
          max-width: 44rem;
          border-top: 2px solid var(--zborder);
          padding-top: 3rem;
          margin-top: 0.5rem;
        }
        
        .ab-cta-quote {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.5rem, 2.8vw, 2.1rem);
          font-weight: 500;
          line-height: 1.3;
          color: var(--ztext);
          margin-bottom: 1.8rem;
        }
        
        .ab-cta-quote strong {
          color: var(--zaccent);
          font-style: normal;
        }
        
        .ab-cta-quote .attribution {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-style: normal;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.5;
          margin-top: 0.5rem;
        }
        
        .ab-btn-group {
          display: flex; gap: 1rem;
          flex-wrap: wrap;
        }
        
        .ab-btn-primary {
          padding: 0.85rem 2.2rem;
          background: var(--zaccent);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ab-btn-primary:hover {
          opacity: 0.85;
          transform: translateY(-2px);
        }
        
        .ab-btn-secondary {
          padding: 0.85rem 2.2rem;
          background: transparent;
          color: var(--ztext);
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--zborder);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ab-btn-secondary:hover {
          border-color: var(--zaccent);
          color: var(--zaccent);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ab-values-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-timeline-grid { grid-template-columns: repeat(3, 1fr); }
        }
        
        @media (max-width: 900px) {
          .ab-origin-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .ab-team-grid { grid-template-columns: 1fr; max-width: 28rem; }
          .ab-timeline-grid { grid-template-columns: 1fr; }
          .ab-timeline-grid::before { display: none; }
          .ab-timeline-step { flex-direction: row; text-align: left; gap: 1rem; align-items: center; }
          .ab-timeline-detail { max-width: none; }
          .ab-stats-grid { grid-template-columns: repeat(2, 1fr); row-gap: 2rem; }
          .ab-stat-item:nth-child(2n+1) { border-left: none; }
          .ab-hero-content { grid-template-columns: 1fr; gap: 1.5rem; }
          .ab-hero-meta { flex-direction: row; border-left: none; border-top: 2px solid var(--aqua); padding-left: 0; padding-top: 1rem; align-items: center; flex-wrap: wrap; }
          .ab-section { padding: 5rem 6vw; }
        }
        
        @media (max-width: 540px) {
          .ab-values-grid { grid-template-columns: 1fr; }
          .ab-stats-grid { grid-template-columns: 1fr; }
          .ab-stat-item { border-left: none; }
        }
      `}</style>

      {/* ==================== 1. HERO ==================== */}
      <section className="ab-hero">
        <div className="ab-hero-grid" />
        
        {particles.map((p) => (
          <span
            key={p.id}
            className="ab-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              transform: `rotate(${p.rotation}deg)`,
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
            className="ab-hero-meta"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="label">Origin</span>
            <span className="value">2012</span>
            <span className="sub">Madurai, India</span>
          </motion.div>
        </motion.div>

        <div className="ab-scroll-indicator">
          <span className="ab-scroll-line" />
          <span className="fm">Scroll</span>
        </div>
      </section>

      {/* ==================== 2. ORIGIN ==================== */}
      <section className="ab-section ab-zone-light">
        <SharpDivider />
        <div className="ab-origin-grid">
          <div>
            <Reveal>
              <div className="ab-section-head" style={{ marginBottom: 0 }}>
                <div className="ab-eyebrow fm">Origin · 2012</div>
                <h2 className="ab-title fd">A tank, a goldfish,<br />and a decade of obsession</h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="ab-story-text" style={{ marginTop: "1.4rem" }}>
                It started in 2012 with one 20-litre tank, one ornery fantail goldfish, and a frustrating
                Saturday morning at the local fish market. The fish were underfed. The equipment was
                generic. The advice was worse.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="ab-story-text">
                Our founder Raj started sourcing direct — quarantine bays in the garage, species-matched
                food blended at home, filtration tested before it was ever listed for sale. What began as
                a hobby became a weekend stall. The stall became a warehouse.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="ab-story-text">
                Today we ship nationwide. The fish are still quarantined. The food is still date-stamped.
                The obsession is unchanged.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} direction="right">
            <motion.div 
              className="ab-origin-visual"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ab-origin-grid-lines" />
              <div className="ab-origin-year">'12</div>
              <div className="ab-origin-badge fm">Est. 2012 · Madurai</div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ==================== 3. VALUES ==================== */}
      <section className="ab-section ab-zone-dark ab-zone-reef">
        <SharpDivider />
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">Core Values</div>
            <h2 className="ab-title fd">Four things we won't compromise on</h2>
            <p className="ab-sub">These aren't mission-statement words. They're decisions we make with every order that ships.</p>
          </div>
        </Reveal>
        <div className="ab-values-grid">
          {values.map((v, i) => (
            <Reveal key={v.label} delay={i * 110}>
              <motion.div 
                className="ab-value-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="ab-value-icon"><Icon name={v.icon} /></div>
                <div className="ab-value-title">{v.label}</div>
                <p className="ab-value-body">{v.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== 4. TIMELINE ==================== */}
      <section className="ab-section ab-zone-light">
        <SharpDivider />
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">Timeline</div>
            <h2 className="ab-title fd">A decade in five markers</h2>
            <p className="ab-sub">Every stop changed something about how we work — here's the chain.</p>
          </div>
        </Reveal>
        <div className="ab-timeline-grid">
          {timeline.map((t, index) => (
            <Reveal key={t.year} delay={index * 100}>
              <motion.div 
                className="ab-timeline-step"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <div className="ab-timeline-node fm">{t.year}</div>
                <div className="ab-timeline-event fd">{t.event}</div>
                <p className="ab-timeline-detail">{t.detail}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== 5. TEAM ==================== */}
      <section className="ab-section ab-zone-dark">
        <SharpDivider />
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">The Keepers</div>
            <h2 className="ab-title fd">People who actually keep tanks</h2>
            <p className="ab-sub">Every member of our team maintains a personal aquarium. Advice here is lived-in, not looked-up.</p>
          </div>
        </Reveal>
        <div className="ab-team-grid">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 120}>
              <motion.div 
                className="ab-team-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="ab-team-avatar">{m.name.charAt(0)}</div>
                <div className="ab-team-name">{m.name}</div>
                <div className="ab-team-role">{m.role}</div>
                <span className="ab-team-tag fm">{m.depth}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== 6. STATS ==================== */}
      <section className="ab-section ab-zone-dark ab-zone-midnight">
        <SharpDivider />
        <Reveal>
          <div className="ab-section-head" style={{ textAlign: "center", maxWidth: "none" }}>
            <div className="ab-eyebrow" style={{ justifyContent: "center" }}>
              <span>By the numbers</span>
            </div>
            <h2 className="ab-title" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 }}>
              Track record
            </h2>
          </div>
        </Reveal>
        <div className="ab-stats-grid">
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

      {/* ==================== 7. CTA ==================== */}
      <section className="ab-section ab-zone-light ab-zone-topside">
        <SharpDivider />
        <Reveal>
          <div className="ab-section-head">
            <div className="ab-eyebrow fm">Join us</div>
            <h2 className="ab-title fd">Ready to build your world?</h2>
            <p className="ab-sub">
              Browse 340+ species, expert-curated kits, and everything else a serious
              aquarist needs — backed by keepers who've been at it since 2012.
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="ab-cta-box">
            <blockquote className="ab-cta-quote">
              "Every tank we've ever sold is something we would
              <strong> put in our own living room.</strong>"
              <span className="attribution">— Raj, Founder</span>
            </blockquote>
            <motion.div 
              className="ab-btn-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.button 
                className="ab-btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Shop Now
              </motion.button>
              <motion.button 
                className="ab-btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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