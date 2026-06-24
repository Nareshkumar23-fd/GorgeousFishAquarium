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
    icon: "fish" 
  },
  { 
    title: "Aquarium Setups", 
    desc: "Tanks, filters, lighting and aquascaping pieces curated to actually work together.", 
    icon: "tank" 
  },
  { 
    title: "Fish Food & Care", 
    desc: "Species-matched nutrition and water-care essentials, restocked weekly for freshness.", 
    icon: "food" 
  },
];

const testimonials = [
  { 
    text: "Lost two clownfish to a bad local shop years ago. Used this place for my whole 90-gallon rebuild — every single fish has thrived.", 
    name: "Priya R.", 
    role: "Reef keeper · 4 yrs" 
  },
  { 
    text: "The free setup call alone was worth it. They talked me out of overstocking before I made an expensive mistake.", 
    name: "Marcus T.", 
    role: "First-time owner" 
  },
  { 
    text: "Food arrives so fresh my picky discus actually eat it on day one. Never had that happen before.", 
    name: "Helena K.", 
    role: "Discus breeder" 
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

/* ---------------------------- Icons ---------------------------- */
const Icon = ({ name, className = "" }) => {
  const common = { 
    viewBox: "0 0 24 24", 
    fill: "none", 
    stroke: "currentColor", 
    strokeWidth: 1.5, 
    strokeLinecap: "round", 
    strokeLinejoin: "round" 
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
        <rect x="3" y="5" width="18" height="14" rx="1" />
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
  if (name === "chevron")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 9l6 6 6-6" />
      </svg>
    );
  if (name === "arrow")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 6l6 6-6 6" />
      </svg>
    );
  return null;
};

/* -------------------- Marquee Component -------------------- */
const Marquee = ({ children, direction = "left", speed = 20, className = "" }) => {
  const [duplicate, setDuplicate] = useState(true);
  
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

/* ------------------------- Scroll Reveal ------------------------ */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* --------------------------- Accordion --------------------------- */
const Accordion = ({ items, openIndex, setOpenIndex, variant = "faq" }) => (
  <div className="space-y-3">
    {items.map((item, i) => {
      const isOpen = openIndex === i;
      return (
        <motion.div
          key={i}
          className={`border rounded-xl overflow-hidden ${
            variant === "faq" 
              ? "border-white/10 bg-white/5" 
              : "border-[rgba(11,32,39,0.12)] bg-white/55"
          } ${isOpen ? `border-${variant === "faq" ? "[#4fd8c4]" : "[#0e8c7f]"}` : ""}`}
          initial={false}
          animate={{ borderColor: isOpen ? (variant === "faq" ? "#4fd8c4" : "#0e8c7f") : undefined }}
        >
          <button
            className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer bg-transparent border-none"
            onClick={() => setOpenIndex(isOpen ? null : i)}
            aria-expanded={isOpen}
          >
            {variant === "terms" && (
              <span className="font-mono text-[#0e8c7f] text-sm flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <span className={`flex-1 ${variant === "terms" ? "font-serif text-lg" : "text-base"}`}>
              {variant === "terms" ? item.title : item.q}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <Icon name="chevron" className={`w-4 h-4 ${isOpen ? "text-[#4fd8c4]" : "text-gray-400"}`} />
            </motion.div>
          </button>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isOpen ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-4 ${
              variant === "terms" ? "pl-12" : ""
            }`}>
              <p className={variant === "terms" ? "text-[rgba(11,32,39,0.62)]" : "text-white/60"}>
                {variant === "terms" ? item.body : item.a}
              </p>
            </div>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
);

/* ----------------------------- Home ------------------------------ */
const Home = () => {
  const [current, setCurrent] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(0);
  const [openTerms, setOpenTerms] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 6000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  const slide = slides[current];

  // Generate random bubbles
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: (i * 9 + 4) % 100,
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

  return (
    <div className="bg-[#07151d] text-[#eaf6f6] font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,650;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }
        
        /* Animation keyframes for bubbles and other effects */
        @keyframes rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translateY(-115vh) translateX(10px); opacity: 0; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.55; }
        }
        
        .animate-rise {
          animation: rise linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        
        @keyframes kenburns {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }
        
        .animate-kenburns {
          animation: kenburns 9s ease-in-out infinite alternate;
        }
      `}</style>

      {/* ===================== 1. HERO — The Deep ===================== */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-end">
        <video 
          key={current} 
          src={slide.src} 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-fill animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,21,29,0.35)] via-[rgba(7,21,29,0.15)] to-[rgba(7,21,29,0.9)]" />
        
        {/* Caustics effect */}
        <div className="absolute inset-0 mix-blend-screen opacity-35 pointer-events-none">
          <motion.div 
            className="w-full h-full"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 60%"],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(79,216,196,0.25), transparent 40%),
                radial-gradient(circle at 75% 60%, rgba(79,216,196,0.18), transparent 45%),
                radial-gradient(circle at 50% 85%, rgba(79,216,196,0.15), transparent 40%)
              `,
              backgroundSize: "180% 180%",
            }}
          />
        </div>
        
        {/* Bubbles */}
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="absolute bottom-[-10%] rounded-full bg-[rgba(234,246,246,0.18)] pointer-events-none animate-rise"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
        
        {/* Navigation buttons */}
        <button 
          className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/25 bg-[rgba(7,21,29,0.35)] backdrop-blur-sm flex items-center justify-center text-white cursor-pointer transition-all hover:bg-[#4fd8c4] hover:text-[#07151d] hover:border-[#4fd8c4] left-[4vw]"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <Icon name="arrow" className="w-4 h-4 rotate-180" />
        </button>
        <button 
          className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/25 bg-[rgba(7,21,29,0.35)] backdrop-blur-sm flex items-center justify-center text-white cursor-pointer transition-all hover:bg-[#4fd8c4] hover:text-[#07151d] hover:border-[#4fd8c4] right-[4vw]"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <Icon name="arrow" className="w-4 h-4" />
        </button>
        
        {/* Hero content */}
        <div className="relative z-10 w-full px-[6vw] pb-[9vh] flex justify-between items-end gap-8">
          <div>
            <div className="font-mono text-[#4fd8c4] text-xs uppercase flex items-center gap-2 mb-4">
              <span className="w-5 h-px bg-[#4fd8c4] inline-block" />
              {slide.eyebrow}
            </div>
            <h1 className="font-display text-[clamp(2.1rem,5.4vw,4.4rem)] leading-[1.04] font-[650] whitespace-pre-line max-w-[16ch]">
              {slide.title}
            </h1>
            <p className="mt-3 max-w-[36ch] text-[rgba(234,246,246,0.66)] text-base">
              {slide.text}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="font-mono text-xs text-[rgba(234,246,246,0.66)]">
              depth · {slide.depth}
            </span>
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={i}
                  className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all ${
                    current === i 
                      ? "border-[#4fd8c4] text-[#07151d] bg-[#4fd8c4] font-semibold" 
                      : "border-[rgba(234,246,246,0.25)] text-[rgba(234,246,246,0.66)] bg-[rgba(14,43,56,0.4)] backdrop-blur-sm"
                  }`}
                  onClick={() => setCurrent(i)}
                >
                  {s.depth}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll cue */}
        <div className="absolute left-[6vw] bottom-10 z-10 flex items-center gap-2 text-[rgba(234,246,246,0.66)] text-xs">
          <span className="w-[22px] h-[34px] border border-[rgba(234,246,246,0.4)] rounded-xl relative">
            <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-[7px] bg-[#4fd8c4] rounded-sm animate-[scrollDot_1.8s_ease-in-out_infinite]" />
          </span>
          <span className="font-mono">SCROLL</span>
        </div>
      </section>

      {/* ===================== 2. SUNLIGHT ZONE — feature cards ===================== */}
      <section className="relative py-24 px-[6vw] bg-[#f1faf8] text-[#0b2027] z-10 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-[56px] -translate-y-full pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="#f1faf8" />
        </svg>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "repeating-linear-gradient(115deg, rgba(14,140,127,0.05) 0px, rgba(14,140,127,0.05) 2px, transparent 2px, transparent 42px)"
        }} />
        
        <Reveal>
          <div className="max-w-[46rem] mb-12 relative z-10">
            <div className="font-mono text-[#0e8c7f] text-xs uppercase flex items-center gap-2 mb-4">
              <span className="w-[22px] h-px bg-[#0e8c7f] inline-block" />
              Sunlight Zone · 0–200m
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-[650] leading-[1.15]">
              Everything between the glass and the gravel
            </h2>
            <p className="mt-3 text-[rgba(11,32,39,0.62)] max-w-[42ch]">
              From the fish themselves to the water they swim in — three categories, no filler.
            </p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <motion.div 
                className="bg-white border border-[rgba(11,32,39,0.12)] rounded-2xl p-8 relative overflow-hidden shadow-sm transition-all"
                whileHover={{ 
                  y: -6,
                  borderColor: "#0e8c7f",
                  boxShadow: "0 20px 50px -24px rgba(14,140,127,0.35)",
                }}
              >
                <motion.div 
                  className="absolute -inset-x-[40%] -top-[40%] w-[60%] h-[60%] pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: "radial-gradient(circle, rgba(14,140,127,0.14), transparent 70%)",
                    right: "auto",
                  }}
                />
                <div className="w-[46px] h-[46px] rounded-xl bg-[rgba(14,140,127,0.1)] text-[#0e8c7f] flex items-center justify-center mb-4 relative z-10">
                  <Icon name={f.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2 relative z-10">{f.title}</h3>
                <p className="text-[rgba(11,32,39,0.62)] text-sm leading-relaxed relative z-10">{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== 3. REEF — testimonials with marquee ===================== */}
      <section className="relative py-24 px-[6vw] bg-[#161229] text-[#eaf6f6] z-10 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-[56px] -translate-y-full pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="#161229" />
        </svg>
        
        {/* Bioluminescent glow */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-55">
          <motion.div 
            className="w-full h-full"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 60%"],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `
                radial-gradient(circle at 15% 20%, rgba(255,139,94,0.28), transparent 38%),
                radial-gradient(circle at 85% 75%, rgba(79,216,196,0.22), transparent 42%)
              `,
              backgroundSize: "180% 180%",
            }}
          />
        </div>
        
        <Reveal>
          <div className="max-w-[46rem] mb-12 relative z-10">
            <div className="font-mono text-[#ff8b5e] text-xs uppercase flex items-center gap-2 mb-4">
              <span className="w-[22px] h-px bg-[#ff8b5e] inline-block" />
              The Reef · After Dark
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-[650] leading-[1.15]">
              Built by people who actually keep tanks
            </h2>
            <p className="mt-3 text-[rgba(234,246,246,0.66)] max-w-[42ch]">
              Real customers, real builds — not stock photos.
            </p>
          </div>
        </Reveal>
        
        {/* Testimonials with image/video cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <motion.div 
                className="bg-[linear-gradient(160deg,rgba(79,216,196,0.08),rgba(234,246,246,0.02))] border border-[rgba(255,139,94,0.22)] border-l-[3px] border-l-[#ff8b5e] rounded-[4px_14px_14px_4px] p-6 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {i === 0 && (
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src={assets.videoOne} alt="Reef" className="w-full h-full object-cover" />
                  </div>
                )}
                <span className="font-serif text-4xl text-[#ff8b5e] opacity-55 block mb-1">
                  &ldquo;
                </span>
                <p className="text-sm leading-relaxed mb-3 relative z-10">{t.text}</p>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="font-mono text-xs text-[rgba(234,246,246,0.66)] mt-0.5">{t.role}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        
        {/* Marquee Section */}
        <div className="mt-16 relative z-10">
          <Marquee speed={25} className="py-3">
            <div className="flex items-center gap-8 px-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-[#4fd8c4]">✦</span>
                  <span className="text-white/80">Premium Marine Life</span>
                  <span className="text-[#4fd8c4]">✦</span>
                  <span className="text-white/80">Expert Aquascaping</span>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </section>

      {/* ===================== 4. CURRENT — how it works with image/video cards ===================== */}
      <section className="relative py-24 px-[6vw] bg-[#edf4fa] text-[#0b2027] z-10">
        <svg className="absolute top-0 left-0 w-full h-[56px] -translate-y-full pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="#edf4fa" />
        </svg>
        
        <Reveal>
          <div className="max-w-[46rem] mb-12">
            <div className="font-mono text-[#0e8c7f] text-xs uppercase flex items-center gap-2 mb-4">
              <span className="w-[22px] h-px bg-[#0e8c7f] inline-block" />
              The Current · Door to Door
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-[650] leading-[1.15]">
              From order to your living room
            </h2>
            <p className="mt-3 text-[rgba(11,32,39,0.62)] max-w-[42ch]">
              Four steps, no surprises — here's exactly what happens after you hit buy.
            </p>
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="relative flex flex-col md:flex-row justify-between gap-4 mt-4">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[27px] left-[6%] right-[6%] h-[2px] pointer-events-none" style={{
              background: "repeating-linear-gradient(to right, #0e8c7f 0 10px, transparent 10px 19px)",
              opacity: 0.45,
            }} />
            
            {steps.map((s) => (
              <motion.div 
                key={s.n} 
                className="relative z-10 flex-1 flex flex-col items-center text-center gap-3"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#0e8c7f] text-[#0e8c7f] flex items-center justify-center font-mono font-semibold text-sm shadow-md">
                  {s.n}
                </div>
                <h4 className="font-serif text-lg font-semibold">{s.title}</h4>
                <p className="text-sm text-[rgba(11,32,39,0.62)] max-w-[22ch]">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===================== 5. TWILIGHT ZONE — FAQ ===================== */}
      <section className="relative py-24 px-[6vw] bg-[#0c2630] text-[#eaf6f6] z-10 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-[56px] -translate-y-full pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="#0c2630" />
        </svg>
        
        {/* Plankton particles */}
        {plankton.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#4fd8c4] pointer-events-none animate-twinkle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
        
        <Reveal>
          <div className="max-w-[46rem] mb-12 relative z-10">
            <div className="font-mono text-[#4fd8c4] text-xs uppercase flex items-center gap-2 mb-4">
              <span className="w-[22px] h-px bg-[#4fd8c4] inline-block" />
              Twilight Zone · 200–1000m
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-[650] leading-[1.15]">
              Where the questions surface
            </h2>
            <p className="mt-3 text-[rgba(234,246,246,0.66)] max-w-[42ch]">
              It gets a little hazy down here — here's what most people ask before they order.
            </p>
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="relative z-10 max-w-[50rem]">
            <Accordion items={faqs} openIndex={openFAQ} setOpenIndex={setOpenFAQ} variant="faq" />
          </div>
        </Reveal>
      </section>

      {/* ===================== 6. MIDNIGHT ZONE — stats ===================== */}
      <section className="relative py-24 px-[6vw] bg-[#050709] text-white z-10">
        <svg className="absolute top-0 left-0 w-full h-[56px] -translate-y-full pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="#050709" />
        </svg>
        
        <Reveal>
          <div className="text-center max-w-none mb-14">
            <div className="font-mono text-[#4fd8c4] text-xs uppercase mb-4">
              Midnight Zone · 1,000–4,000m
            </div>
            <h2 className="font-mono text-base font-medium uppercase tracking-[0.06em] opacity-85">
              By the numbers
            </h2>
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 max-w-[64rem] mx-auto gap-8 md:gap-0 relative z-10">
            {stats.map((s, i) => (
              <motion.div 
                key={s.label} 
                className={`text-center px-4 ${
                  i > 0 ? "md:border-l border-white/12" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="font-mono text-[clamp(1.7rem,3.4vw,2.5rem)] font-medium text-[#4fd8c4]">
                  {s.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.07em] text-white/55 font-mono">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===================== 7. TOPSIDE — terms ===================== */}
      <section className="relative py-24 px-[6vw] bg-[#e9f1ee] text-[#0b2027] z-10">
        <svg className="absolute top-0 left-0 w-full h-[56px] -translate-y-full pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" fill="#e9f1ee" />
        </svg>
        
        <Reveal>
          <div className="max-w-[46rem] mb-12">
            <div className="font-mono text-[#0e8c7f] text-xs uppercase flex items-center gap-2 mb-4">
              <span className="w-[22px] h-px bg-[#0e8c7f] inline-block" />
              Topside · Ship's Log
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-[650] leading-[1.15]">
              The fine print, logged plainly
            </h2>
            <p className="mt-3 text-[rgba(11,32,39,0.62)] max-w-[42ch]">
              No legalese. Read it top to bottom, like a logbook, before you cast off.
            </p>
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="relative z-10 max-w-[50rem]">
            <div className="space-y-3" style={{
              backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 73px, rgba(11,32,39,0.09) 73px 74px)",
            }}>
              <Accordion items={terms} openIndex={openTerms} setOpenIndex={setOpenTerms} variant="terms" />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;