import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { assets } from "../MockData/Assets";

/* ----------------------------------------------------------------
   SLIDES DATA
------------------------------------------------------------------- */
const slides = [
  {
    src: assets.videoOne,
    eyebrow: "Live Arrivals",
    title: "Fish so fresh,\nthe tank still ripples",
    text: "Hand-picked saltwater & freshwater species, quarantined and ready for your tank.",
    depth: "4 ft",
  },
  {
    src: assets.videoTwo,
    eyebrow: "Build Your World",
    title: "Aquariums built\nfor obsession",
    text: "Tanks, filtration, substrate and décor for reef builders and first-timers alike.",
    depth: "9 ft",
  },
  {
    src: assets.videoThree,
    eyebrow: "Feed & Care",
    title: "Nutrition your\nfish actually crave",
    text: "Pellets, flakes and live feed, formulated by species — not guesswork.",
    depth: "15 ft",
  },
];

const features = [
  {
    title: "Live Fish",
    desc: "Quarantined, conditioned and shipped on a heartbeat-safe schedule — never just 'in stock'.",
    icon: "fish",
    num: "01",
  },
  {
    title: "Aquarium Setups",
    desc: "Tanks, filters, lighting and aquascaping pieces curated to actually work together.",
    icon: "tank",
    num: "02",
  },
  {
    title: "Fish Food & Care",
    desc: "Species-matched nutrition and water-care essentials, restocked weekly for freshness.",
    icon: "food",
    num: "03",
  },
];

const testimonials = [
  {
    text: "Lost two clownfish to a bad local shop years ago. Used this place for my whole 90-gallon rebuild — every single fish has thrived.",
    name: "Priya R.",
    role: "Reef keeper · 4 yrs",
  },
  {
    text: "The free setup call alone was worth it. They talked me out of overstocking before I made an expensive mistake.",
    name: "Marcus T.",
    role: "First-time owner",
  },
  {
    text: "Food arrives so fresh my picky discus actually eat it on day one. Never had that happen before.",
    name: "Helena K.",
    role: "Discus breeder",
  },
];

const steps = [
  { n: "01", title: "Order", text: "Pick species, gear or food online in minutes." },
  { n: "02", title: "Pack", text: "Bagged, oxygenated and boxed within hours." },
  { n: "03", title: "Ship", text: "Temperature-controlled courier, tracked door to door." },
  { n: "04", title: "Arrive", text: "Acclimate 20 minutes, then welcome them home." },
];

const stats = [
  { value: "12,400+", label: "Fish shipped safely" },
  { value: "98.6%", label: "Live arrival rate" },
  { value: "4.9 / 5", label: "Average rating" },
  { value: "6 yrs", label: "Building reefs" },
];

const faqs = [
  { q: "How do you ship live fish safely?", a: "Every fish travels in an insulated, oxygenated bag inside a temperature-controlled box, packed within hours of your order. Most routes arrive next-day." },
  { q: "What happens if a fish doesn't survive shipping?", a: "We cover live arrival. Send a photo within 2 hours of delivery and we'll replace the fish or refund it — no restocking fee, no hassle." },
  { q: "Can I return aquarium equipment?", a: "Unopened equipment can be returned within 30 days. Opened electricals (filters, heaters) are covered by a 1-year defect warranty instead of returns." },
  { q: "Do you help with tank setup?", a: "Yes — every order over a 20-gallon tank includes a free 15-minute setup call with one of our aquarists, before or after your gear arrives." },
  { q: "How fresh is the fish food stock?", a: "We turn over food inventory roughly every 6 weeks and date-stamp every bag. Anything past 70% of shelf life gets pulled, not discounted." },
];

const terms = [
  { title: "Ordering & Payment", body: "Orders are confirmed once payment clears. Live fish orders are held and scheduled for the next safe shipping window for your region's weather." },
  { title: "Live Animal Shipping", body: "Live arrival is guaranteed only when the listed shipping address requires no signature delay and someone is available within 2 hours of delivery." },
  { title: "Returns & Guarantees", body: "Equipment returns require original packaging. Livestock is non-returnable but covered separately under our live arrival guarantee above." },
  { title: "Tank Setup Liability", body: "Setup guidance is advisory. Final water parameters, cycling and stocking levels remain the responsibility of the tank owner." },
  { title: "Account & Privacy", body: "We store only what's needed to fulfill and track your order. We don't sell contact details, and you can request deletion at any time." },
];

/* ----------------------------------------------------------------
   ICONS
------------------------------------------------------------------- */
const Icon = ({ name, className = "" }) => {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "fish")
    return (
      <svg {...common} className={className}>
        <path d="M2 12c3.5-4 8-6 13-6 2 0 4 .9 5.5 2.3-1 1.2-1 2.2 0 3.4C19 13.1 17 14 15 14c-5 0-9.5-2-13-2z" />
        <circle cx="15.5" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
        <path d="M2 12l-1.5-2M2 12l-1.5 2" />
      </svg>
    );
  if (name === "tank")
    return (
      <svg {...common} className={className}>
        <rect x="3" y="5" width="18" height="14" rx="0" />
        <path d="M3 10c2-1 4 1 6 0s4-1 6 0 4-1 6 0" />
        <path d="M8 19v-4M16 19v-6" />
        <path d="M8 15c-1-1-1-3 0-4M16 13c1-1 1-2 0-3" />
      </svg>
    );
  if (name === "food")
    return (
      <svg {...common} className={className}>
        <circle cx="7" cy="8" r="1.8" />
        <circle cx="13" cy="6" r="1.4" />
        <circle cx="17.5" cy="10.5" r="1.6" />
        <circle cx="9" cy="14" r="1.4" />
        <circle cx="15" cy="15.5" r="1.8" />
      </svg>
    );
  if (name === "plus")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    );
  if (name === "minus")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
        <path d="M5 12h14" />
      </svg>
    );
  if (name === "arrow-right")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  return null;
};

/* ----------------------------------------------------------------
   SCROLL REVEAL
------------------------------------------------------------------- */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ----------------------------------------------------------------
   MARQUEE
------------------------------------------------------------------- */
const Marquee = ({ children, speed = 22 }) => (
  <div className="overflow-hidden">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {children}
      {children}
    </motion.div>
  </div>
);

/* ----------------------------------------------------------------
   HOME
------------------------------------------------------------------- */
const Home = () => {
  const [current, setCurrent] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [openTerms, setOpenTerms] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: (i * 9 + 4) % 100,
    size: 4 + (i % 4) * 3,
    duration: 8 + (i % 5) * 2,
    delay: i * 0.7,
  }));

  return (
    <div className="bg-[#07151d] text-[#eaf6f6] font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; }
        .f-display { font-family: 'DM Serif Display', serif; }
        .f-sans   { font-family: 'Space Grotesk', sans-serif; }
        .f-mono   { font-family: 'Space Mono', monospace; }

        /* --- clip shapes --- */
        .clip-hero   { clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%); }
        .clip-slant-r{ clip-path: polygon(0 0, 100% 6%, 100% 100%, 0 94%); }
        .clip-slash  { clip-path: polygon(0 8%, 100% 0, 100% 92%, 0 100%); }
        .clip-wedge  { clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%); }

        @keyframes rise {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.6; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }
        .bubble { animation: rise linear infinite; }

        @keyframes scan {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        .scanline { animation: scan 3s linear infinite; }

        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        .blink { animation: blink 1s step-end infinite; }

        /* ticker tape */
        .ticker { display: flex; }

        /* diagonal stripe bg */
        .stripe-bg {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 18px,
            rgba(79,216,196,0.04) 18px,
            rgba(79,216,196,0.04) 19px
          );
        }

        /* grid dot bg */
        .dot-bg {
          background-image: radial-gradient(circle, rgba(14,140,127,0.22) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* graph paper */
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* halftone */
        .halftone {
          background-image: radial-gradient(circle, rgba(255,139,94,0.18) 1px, transparent 1px);
          background-size: 16px 16px;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          §1  HERO — Full-bleed video with sharp diagonal cut
          Design: stark diagonal slash at bottom, raw terminal
          typography overlay, no rounded elements anywhere
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen overflow-hidden clip-hero" style={{ minHeight: 640 }}>
        {/* Video */}
        <video
          key={current}
          src={slide.src}
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.04)" }}
        />

        {/* Dark gradient */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(170deg, rgba(7,21,29,0.55) 0%, rgba(7,21,29,0.1) 45%, rgba(7,21,29,0.88) 100%)"
        }} />

        {/* Scan-line CRT overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)"
        }} />

        {/* Moving scanline */}
        <div className="scanline absolute left-0 w-full h-[2px] bg-[rgba(79,216,196,0.12)] pointer-events-none" />

        {/* Bubbles */}
        {bubbles.map((b) => (
          <div key={b.id} className="bubble absolute bottom-0 bg-[rgba(234,246,246,0.16)]"
            style={{
              left: `${b.left}%`,
              width: b.size, height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}

        {/* Slide counter strip — left vertical */}
        <div className="absolute left-0 top-0 bottom-0 w-[52px] bg-[rgba(7,21,29,0.7)] flex flex-col items-center justify-center gap-6 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="f-mono text-[11px] transition-all"
              style={{
                color: current === i ? "#4fd8c4" : "rgba(234,246,246,0.35)",
                fontWeight: current === i ? 700 : 400,
                writingMode: "vertical-lr",
                letterSpacing: "0.1em",
              }}
              aria-label={`Slide ${i + 1}`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
          <div style={{ flex: 1, width: 1, background: "rgba(79,216,196,0.3)", maxHeight: 60 }} />
        </div>

        {/* Hero copy */}
        <div className="absolute bottom-0 left-[52px] right-0 z-10 px-10 pb-20 f-sans">
          {/* Eyebrow */}
          <div className="f-mono text-[#4fd8c4] text-[11px] uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
            <span style={{ width: 32, height: 1, background: "#4fd8c4", display: "inline-block" }} />
            {slide.eyebrow}
            <span className="blink" style={{ color: "#4fd8c4" }}>_</span>
          </div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={current + "title"}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="f-display text-[#eaf6f6] leading-[1.02]"
              style={{ fontSize: "clamp(2.4rem, 5.8vw, 5rem)", whiteSpace: "pre-line", maxWidth: "16ch" }}
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          <div className="flex items-end gap-16 mt-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={current + "text"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-[rgba(234,246,246,0.62)] max-w-[38ch] text-base"
              >
                {slide.text}
              </motion.p>
            </AnimatePresence>

            {/* Depth badge — sharp rectangle */}
            <div style={{
              border: "1px solid rgba(79,216,196,0.5)",
              background: "rgba(7,21,29,0.6)",
              padding: "10px 22px",
              flexShrink: 0,
            }}>
              <div className="f-mono text-[10px] text-[rgba(234,246,246,0.4)] uppercase tracking-[0.15em]">DEPTH</div>
              <div className="f-mono text-[#4fd8c4] text-2xl font-bold">{slide.depth}</div>
            </div>
          </div>
        </div>

        {/* Top-right nav prev/next */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <button
            onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
            className="f-mono text-xs text-[rgba(234,246,246,0.5)] hover:text-[#4fd8c4] transition-colors px-4 py-2"
            style={{ border: "1px solid rgba(234,246,246,0.18)" }}
            aria-label="Previous"
          >
            ← PREV
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % slides.length)}
            className="f-mono text-xs text-[rgba(234,246,246,0.5)] hover:text-[#4fd8c4] transition-colors px-4 py-2"
            style={{ border: "1px solid rgba(234,246,246,0.18)" }}
            aria-label="Next"
          >
            NEXT →
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §2  FEATURES — Brutalist split grid on light ground
          Design: raw numbered column layout, thick top border
          accent bar, hard-ruled columns, NO curves anywhere
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#f0f6f4] text-[#0b2027] f-sans dot-bg"
        style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>

        {/* Top accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#0e8c7f" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6vw" }}>
          {/* Section header — pure left-aligned editorial */}
          <Reveal>
            <div className="flex items-start gap-8 mb-16" style={{ borderBottom: "1px solid rgba(11,32,39,0.14)", paddingBottom: "2rem" }}>
              <div className="f-mono text-[#0e8c7f] text-[10px] uppercase tracking-[0.2em] pt-1" style={{ minWidth: 80 }}>
                Zone 0–200m
              </div>
              <div>
                <h2 className="f-display" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", lineHeight: 1.1, fontWeight: 400 }}>
                  Everything between<br />the glass and the gravel
                </h2>
                <p className="mt-3 text-[rgba(11,32,39,0.55)]" style={{ maxWidth: "44ch", fontSize: 15 }}>
                  Three categories. No filler.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Feature cards — asymmetric column widths, hard borders */}
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderTop: "2px solid #0b2027", borderLeft: "2px solid #0b2027" }}>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <motion.div
                  whileHover={{ backgroundColor: "#0b2027", color: "#eaf6f6" }}
                  transition={{ duration: 0.25 }}
                  className="group"
                  style={{
                    borderRight: "2px solid #0b2027",
                    borderBottom: "2px solid #0b2027",
                    padding: "2.5rem 2rem",
                    position: "relative",
                    cursor: "default",
                  }}
                >
                  {/* Large number watermark */}
                  <div className="f-mono" style={{
                    position: "absolute",
                    top: 14, right: 18,
                    fontSize: "4.5rem",
                    fontWeight: 700,
                    color: "rgba(14,140,127,0.1)",
                    lineHeight: 1,
                    transition: "color 0.25s",
                  }}>
                    {f.num}
                  </div>

                  <div style={{
                    width: 42, height: 42,
                    background: "#0e8c7f",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "1.25rem",
                    color: "#fff",
                    flexShrink: 0,
                  }}>
                    <Icon name={f.icon} className="w-5 h-5" />
                  </div>

                  <h3 className="f-display" style={{ fontSize: "1.45rem", marginBottom: "0.75rem", fontWeight: 400 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(11,32,39,0.62)" }}
                    className="group-hover:text-[rgba(234,246,246,0.65)] transition-colors">
                    {f.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §3  TESTIMONIALS — Biopunk dark, diagonal band layout
          Design: overlapping diagonal color bands, oversized
          quotes as structural elements, halftone texture
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0d1f12] text-[#eaf6f6] f-sans overflow-hidden"
        style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>

        {/* Diagonal halftone accent bands */}
        <div className="halftone absolute inset-0 opacity-60 pointer-events-none" />
        <div style={{
          position: "absolute",
          top: "18%", left: "-8%",
          width: "56%", height: "64%",
          background: "rgba(14,140,127,0.07)",
          transform: "rotate(-8deg)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%", right: "-5%",
          width: "42%", height: "50%",
          background: "rgba(255,139,94,0.06)",
          transform: "rotate(5deg)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6vw", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ borderLeft: "4px solid #3ddc97", paddingLeft: "1.5rem", marginBottom: "4rem" }}>
              <div className="f-mono" style={{ color: "#3ddc97", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
                After Dark — The Reef
              </div>
              <h2 className="f-display" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", lineHeight: 1.1, fontWeight: 400 }}>
                Built by people who<br />actually keep tanks
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 110}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: "2.5rem 2rem",
                    borderTop: i === 1 ? "1px solid rgba(61,220,151,0.2)" : "none",
                    borderBottom: i === 1 ? "1px solid rgba(61,220,151,0.2)" : "none",
                    borderLeft: i !== 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    position: "relative",
                  }}
                >
                  {/* Giant quotation mark */}
                  <div className="f-display" style={{
                    fontSize: "7rem",
                    lineHeight: 0.7,
                    color: i % 2 === 0 ? "rgba(61,220,151,0.18)" : "rgba(255,139,94,0.18)",
                    marginBottom: "0.5rem",
                  }}>
                    "
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(234,246,246,0.78)", marginBottom: "1.5rem" }}>
                    {t.text}
                  </p>
                  {/* Name row */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    <div style={{
                      width: 36, height: 36,
                      background: i % 2 === 0 ? "#0e8c7f" : "#c25a34",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span className="f-mono" style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>
                        {t.name[0]}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                      <div className="f-mono" style={{ fontSize: 10, color: "rgba(234,246,246,0.45)", letterSpacing: "0.06em" }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Ticker */}
          <div style={{ marginTop: "4rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
            <Marquee speed={28}>
              <div className="ticker" style={{ gap: "3rem", paddingRight: "3rem" }}>
                {["Premium Marine Life", "Expert Aquascaping", "Live Arrival Guarantee", "Species-Matched Nutrition", "Reef-Safe Gear"].map((label, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                    <span style={{ color: "#3ddc97", fontSize: 8 }}>◆</span>
                    <span className="f-mono" style={{ fontSize: 11, color: "rgba(234,246,246,0.5)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                      {label}
                    </span>
                  </span>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §4  HOW IT WORKS — Isometric-inspired horizontal rail
          Design: a continuous horizontal "pipeline" with sharp
          connector lines, alternating above/below text blocks,
          industrial blueprint aesthetic on pale blue-grey
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#dde9ef] text-[#0b2027] f-sans overflow-hidden"
        style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>

        {/* Blueprint grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(14,140,127,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,140,127,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6vw", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem" }}>
              <div>
                <div className="f-mono" style={{ color: "#0e8c7f", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
                  The Current — Door to Door
                </div>
                <h2 className="f-display" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)", lineHeight: 1.1, fontWeight: 400 }}>
                  From order to your living room
                </h2>
              </div>
              <div className="f-mono" style={{ fontSize: 11, color: "rgba(11,32,39,0.4)", textAlign: "right", lineHeight: 1.8 }}>
                PROCESS MAP<br />REV. 3.1
              </div>
            </div>
          </Reveal>

          {/* Pipeline */}
          <div style={{ position: "relative" }}>
            {/* Horizontal rail */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: 0, right: 0,
              height: 2,
              background: "#0b2027",
              transform: "translateY(-50%)",
            }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
              {steps.map((s, i) => {
                const above = i % 2 === 0;
                return (
                  <Reveal key={s.n} delay={i * 120}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                      {/* Top text block */}
                      {above ? (
                        <div style={{ textAlign: "center", paddingBottom: "2rem", minHeight: 100, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                          <h4 className="f-display" style={{ fontSize: "1.25rem", marginBottom: 6, fontWeight: 400 }}>{s.title}</h4>
                          <p style={{ fontSize: 13, color: "rgba(11,32,39,0.55)", maxWidth: "20ch", margin: "0 auto", lineHeight: 1.6 }}>{s.text}</p>
                        </div>
                      ) : (
                        <div style={{ minHeight: 100 }} />
                      )}

                      {/* Node */}
                      <motion.div
                        whileHover={{ scale: 1.15, backgroundColor: "#0e8c7f", color: "#fff" }}
                        transition={{ duration: 0.25 }}
                        style={{
                          width: 56, height: 56,
                          background: "#fff",
                          border: "2px solid #0b2027",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          zIndex: 2, position: "relative",
                          flexShrink: 0,
                        }}
                      >
                        <span className="f-mono" style={{ fontSize: 13, fontWeight: 700 }}>{s.n}</span>
                      </motion.div>

                      {/* Bottom text block */}
                      {!above ? (
                        <div style={{ textAlign: "center", paddingTop: "2rem", minHeight: 100 }}>
                          <h4 className="f-display" style={{ fontSize: "1.25rem", marginBottom: 6, fontWeight: 400 }}>{s.title}</h4>
                          <p style={{ fontSize: 13, color: "rgba(11,32,39,0.55)", maxWidth: "20ch", margin: "0 auto", lineHeight: 1.6 }}>{s.text}</p>
                        </div>
                      ) : (
                        <div style={{ minHeight: 100 }} />
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §5  FAQ — Deep ocean dark, left-column table of contents
          Design: two-column split — sticky TOC labels on left,
          accordion answers on right; typewriter/terminal feel;
          active item highlighted with full-width color band
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#060e16] text-[#eaf6f6] f-sans overflow-hidden"
        style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>

        {/* Grid lines */}
        <div className="grid-bg absolute inset-0 pointer-events-none opacity-70" />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6vw", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ borderBottom: "1px solid rgba(79,216,196,0.2)", paddingBottom: "2rem", marginBottom: "3.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
              <div>
                <div className="f-mono" style={{ color: "#4fd8c4", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
                  Twilight Zone — 200–1000m
                </div>
                <h2 className="f-display" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)", lineHeight: 1.1, fontWeight: 400 }}>
                  Where the questions surface
                </h2>
              </div>
              <div className="f-mono" style={{ fontSize: 10, color: "rgba(79,216,196,0.4)", letterSpacing: "0.1em", textAlign: "right" }}>
                {faqs.length} ENTRIES
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "3rem", alignItems: "start" }}>
            {/* Left: TOC */}
            <div style={{ position: "sticky", top: "6rem" }}>
              <div className="f-mono" style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(79,216,196,0.5)", marginBottom: "1rem" }}>
                Index
              </div>
              {faqs.map((f, i) => (
                <button key={i} onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="block w-full text-left"
                  style={{
                    padding: "8px 12px",
                    marginBottom: 2,
                    background: openFAQ === i ? "rgba(79,216,196,0.1)" : "transparent",
                    borderLeft: openFAQ === i ? "2px solid #4fd8c4" : "2px solid transparent",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                >
                  <span className="f-mono" style={{ fontSize: 9, color: "rgba(79,216,196,0.5)", display: "block", marginBottom: 2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: 12, color: openFAQ === i ? "#4fd8c4" : "rgba(234,246,246,0.45)", lineHeight: 1.4 }}>
                    {f.q.split(" ").slice(0, 4).join(" ")}…
                  </span>
                </button>
              ))}
            </div>

            {/* Right: accordion */}
            <div>
              {faqs.map((f, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    overflow: "hidden",
                  }}>
                    <button
                      onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                      style={{
                        width: "100%", textAlign: "left", padding: "1.4rem 0",
                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                        background: "none", border: "none", cursor: "pointer", color: "#eaf6f6",
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 500 }}>{f.q}</span>
                      <span style={{
                        width: 28, height: 28, flexShrink: 0,
                        border: "1px solid rgba(79,216,196,0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#4fd8c4",
                        transition: "background 0.2s",
                        background: openFAQ === i ? "rgba(79,216,196,0.15)" : "transparent",
                      }}>
                        {openFAQ === i ? <Icon name="minus" className="w-3 h-3" /> : <Icon name="plus" className="w-3 h-3" />}
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openFAQ === i ? "auto" : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingBottom: "1.5rem", color: "rgba(234,246,246,0.55)", fontSize: 15, lineHeight: 1.7, maxWidth: "56ch" }}>
                        {f.a}
                      </div>
                    </motion.div>
                  </div>
                </Reveal>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §6  STATS — Void black with stark mono counters
          Design: enormous monospaced figures on pure black,
          vertical dividers only, no decoration — the numbers
          are the design. Contrast-maximum typographic moment.
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#000] text-white f-sans overflow-hidden"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>

        {/* Subtle diagonal stripe */}
        <div className="stripe-bg absolute inset-0 pointer-events-none" />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6vw", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="f-mono" style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(79,216,196,0.45)", marginBottom: "3.5rem", textAlign: "center" }}>
              Midnight Zone — 1,000–4,000m &nbsp;·&nbsp; By the numbers
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  whileHover={{ backgroundColor: "rgba(79,216,196,0.05)" }}
                  transition={{ duration: 0.25 }}
                  style={{
                    padding: "2rem 2.5rem",
                    borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    textAlign: "center",
                  }}
                >
                  <div className="f-mono" style={{
                    fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                    fontWeight: 700,
                    color: "#4fd8c4",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                  }}>
                    {s.value}
                  </div>
                  <div className="f-mono" style={{
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          §7  TERMS — Logbook / manifest page aesthetic
          Design: warm pale parchment, left-bound "log entry"
          layout with stamped category tags, double-ruled
          header lines — looks like a captain's manifest
      ═══════════════════════════════════════════════════════ */}
      <section className="relative f-sans overflow-hidden"
        style={{
          backgroundColor: "#f5f0e8",
          color: "#1a1209",
          paddingTop: "7rem",
          paddingBottom: "7rem",
        }}>

        {/* Ruled lines overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 47px, rgba(26,18,9,0.07) 47px, rgba(26,18,9,0.07) 48px)",
        }} />

        {/* Left margin red line */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: "6vw",
          width: 1,
          background: "rgba(180,60,40,0.25)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 6vw", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ marginBottom: "3.5rem" }}>
              {/* Double ruled header */}
              <div style={{ borderTop: "2px solid #1a1209", borderBottom: "1px solid #1a1209", padding: "0.6rem 0", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="f-mono" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,18,9,0.5)" }}>
                  Ship's Log — Topside
                </span>
                <span className="f-mono" style={{ fontSize: 10, color: "rgba(26,18,9,0.35)" }}>
                  {new Date().getFullYear()}
                </span>
              </div>
              <h2 className="f-display" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)", lineHeight: 1.1, fontWeight: 400 }}>
                The fine print, logged plainly
              </h2>
              <p style={{ marginTop: "0.75rem", color: "rgba(26,18,9,0.5)", maxWidth: "44ch", fontSize: 15 }}>
                No legalese. Read top to bottom, like a logbook, before you cast off.
              </p>
            </div>
          </Reveal>

          <div style={{ maxWidth: 720 }}>
            {terms.map((t, i) => (
              <Reveal key={i} delay={i * 70}>
                <div style={{
                  borderBottom: "1px solid rgba(26,18,9,0.12)",
                  overflow: "hidden",
                }}>
                  <button
                    onClick={() => setOpenTerms(openTerms === i ? null : i)}
                    style={{
                      width: "100%", textAlign: "left", padding: "1.4rem 0 1.4rem 1rem",
                      display: "flex", alignItems: "center", gap: "1.5rem",
                      background: "none", border: "none", cursor: "pointer", color: "#1a1209",
                    }}
                  >
                    {/* Stamped entry number */}
                    <span className="f-mono" style={{
                      fontSize: 10, letterSpacing: "0.14em",
                      color: openTerms === i ? "#b43c28" : "rgba(26,18,9,0.3)",
                      flexShrink: 0, minWidth: 28,
                      transition: "color 0.2s",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="f-display" style={{ fontSize: "1.2rem", fontWeight: 400, flex: 1, textAlign: "left" }}>
                      {t.title}
                    </span>
                    <span style={{
                      width: 26, height: 26, flexShrink: 0,
                      border: "1px solid rgba(26,18,9,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: openTerms === i ? "#1a1209" : "transparent",
                      color: openTerms === i ? "#f5f0e8" : "#1a1209",
                      transition: "all 0.2s",
                    }}>
                      {openTerms === i ? <Icon name="minus" className="w-3 h-3" /> : <Icon name="plus" className="w-3 h-3" />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openTerms === i ? "auto" : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      paddingBottom: "1.5rem",
                      paddingLeft: "calc(1rem + 28px + 1.5rem)",
                      color: "rgba(26,18,9,0.58)",
                      fontSize: 15, lineHeight: 1.7,
                      fontStyle: "italic",
                    }}>
                      {t.body}
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Footer stamp */}
          <Reveal delay={200}>
            <div style={{ marginTop: "4rem", display: "flex", alignItems: "center", gap: "2rem" }}>
              <div style={{
                border: "2px solid rgba(26,18,9,0.2)",
                padding: "1rem 1.5rem",
                display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <div className="f-mono" style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(26,18,9,0.35)", textTransform: "uppercase" }}>
                  Live Arrival
                </div>
                <div className="f-display" style={{ fontSize: "1.1rem", color: "#0e8c7f" }}>Guaranteed</div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(26,18,9,0.4)", maxWidth: "36ch", lineHeight: 1.6 }}>
                Questions? Reach us before casting off — we read every message and respond within a working day.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;