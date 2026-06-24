import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ----------------------------------------------------------------
   CONTACT — with Framer Motion animations
------------------------------------------------------------------ */

/* ── CONTACT INFO ── */
const infoCards = [
  {
    icon: "pin",
    label: "Visit the Store",
    primary: "Bethaniyapuram, Madurai",
    secondary: "Tamil Nadu – 625016, India",
    action: null,
  },
  {
    icon: "clock",
    label: "Store Hours",
    primary: "Mon – Sat  9 AM – 7 PM",
    secondary: "Sunday  10 AM – 4 PM",
    action: null,
  },
  {
    icon: "phone",
    label: "Call or WhatsApp",
    primary: "+91 98765 43210",
    secondary: "Response within the hour",
    action: "tel:+919876543210",
  },
  {
    icon: "mail",
    label: "Email Us",
    primary: "hello@aquahome.in",
    secondary: "We reply same business day",
    action: "mailto:hello@aquahome.in",
  },
];

/* ── ICONS ── */
const Icon = ({ name, className = "" }) => {
  const b = {
    viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
  };
  if (name === "pin")
    return <svg {...b} className={className}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
  if (name === "clock")
    return <svg {...b} className={className}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
  if (name === "phone")
    return <svg {...b} className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/></svg>;
  if (name === "mail")
    return <svg {...b} className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  if (name === "send")
    return <svg {...b} className={className}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
  if (name === "fish")
    return <svg {...b} className={className}><path d="M2 12c3.5-4 8-6 13-6 2 0 4 .9 5.5 2.3-1 1.2-1 2.2 0 3.4C19 13.1 17 14 15 14c-5 0-9.5-2-13-2z"/><circle cx="15.5" cy="10.5" r="0.6" fill="currentColor" stroke="none"/><path d="M2 12l-1.5-2M2 12l-1.5 2"/></svg>;
  return null;
};

/* ── WAVE DIVIDER ── */
const WaveDivider = () => (
  <svg className="ct-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" style={{ fill: "var(--zbg)" }} />
  </svg>
);

/* ── SCROLL REVEAL with Framer Motion ── */
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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

/* ── CONTACT FORM with validation ── */
const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const topics = [
    "Live fish order", "Equipment & tanks", "Aquascaping advice",
    "Order issue / return", "Wholesale enquiry", "Something else",
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.topic)          e.topic   = "Pick a topic";
    if (!form.message.trim()) e.message = "Tell us what's on your mind";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1600);
  };

  if (status === "sent") {
    return (
      <motion.div 
        className="ct-sent-state"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="ct-sent-icon"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Icon name="fish" className="ct-sent-fish" />
        </motion.div>
        <h3 className="ct-sent-title fd">Message received</h3>
        <p className="ct-sent-body">
          We'll get back to you at <strong>{form.email}</strong> by end of business today.
          Live fish enquiries get a faster turnaround — usually within the hour.
        </p>
        <motion.button 
          className="ct-sent-reset" 
          onClick={() => { setForm({ name:"",email:"",topic:"",message:"" }); setStatus("idle"); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send another message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="ct-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Name + Email row */}
      <div className="ct-field-row">
        <motion.div 
          className={`ct-field ${errors.name ? "ct-field-error" : ""}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="ct-label fm">Your name</label>
          <input
            className="ct-input"
            type="text"
            placeholder="Arjun Mehta"
            value={form.name}
            onChange={handleChange("name")}
            autoComplete="name"
          />
          {errors.name && <span className="ct-error-msg">{errors.name}</span>}
        </motion.div>
        <motion.div 
          className={`ct-field ${errors.email ? "ct-field-error" : ""}`}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="ct-label fm">Email</label>
          <input
            className="ct-input"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange("email")}
            autoComplete="email"
          />
          {errors.email && <span className="ct-error-msg">{errors.email}</span>}
        </motion.div>
      </div>

      {/* Topic */}
      <motion.div 
        className={`ct-field ${errors.topic ? "ct-field-error" : ""}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="ct-label fm">What's it about?</label>
        <div className="ct-topic-grid">
          {topics.map((t) => (
            <motion.button
              key={t}
              type="button"
              className={`ct-topic-pill ${form.topic === t ? "ct-topic-active" : ""}`}
              onClick={() => { setForm((p) => ({ ...p, topic: t })); if (errors.topic) setErrors((p) => { const n={...p}; delete n.topic; return n; }); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t}
            </motion.button>
          ))}
        </div>
        {errors.topic && <span className="ct-error-msg">{errors.topic}</span>}
      </motion.div>

      {/* Message */}
      <motion.div 
        className={`ct-field ${errors.message ? "ct-field-error" : ""}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <label className="ct-label fm">Your message</label>
        <textarea
          className="ct-textarea"
          rows={5}
          placeholder="Tell us about your tank, your question, or what went wrong…"
          value={form.message}
          onChange={handleChange("message")}
        />
        {errors.message && <span className="ct-error-msg">{errors.message}</span>}
      </motion.div>

      <motion.button
        className="ct-submit-btn"
        onClick={handleSubmit}
        disabled={status === "sending"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {status === "sending" ? (
          <span className="ct-spinner" />
        ) : (
          <>
            <Icon name="send" className="ct-submit-icon" />
            Send message
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

/* ── MAIN COMPONENT ── */
const Contact = () => {
  // Generate bubble data
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: (i * 9.3 + 4) % 100,
    size: 4 + (i % 4) * 3,
    duration: 8 + (i % 5) * 2,
    delay: i * 0.7,
  }));

  // Trust signals data
  const trustSignals = [
    "Live fish queries answered within 1 hour",
    "Same-day reply on all order issues",
    "Free 15-min setup call with every 20-gal+ order",
  ];

  return (
    <div className="ct-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,650;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        /* ── ROOT TOKENS ── */
        .ct-root {
          --abyss:       #07151d;
          --twilight:    #0c2630;
          --reef:        #161229;
          --midnight:    #050709;
          --ink:         #0b2027;
          --foam:        #eaf6f6;
          --foam-dim:    rgba(234,246,246,0.66);
          --aqua:        #4fd8c4;
          --aqua-deep:   #0e8c7f;
          --coral:       #ff8b5e;
          --sun:         #f1faf8;
          --current-bg:  #edf4fa;
          --surface:     #e9f1ee;
          --ledger-line: rgba(11,32,39,0.09);
          --error:       #ff5e5e;

          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--abyss);
          color: var(--foam);
          overflow-x: hidden;
        }
        .ct-root .fd { font-family: 'Fraunces', serif; }
        .ct-root .fm { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }

        /* ── ZONE TOKENS ── */
        .ct-zone-dark {
          --zbg: var(--twilight); --ztext: var(--foam); --ztext-dim: var(--foam-dim);
          --zaccent: var(--aqua); --zborder: rgba(234,246,246,0.12);
          --zcard-bg: linear-gradient(160deg,rgba(79,216,196,0.08),rgba(234,246,246,0.02));
          --zicon-bg: rgba(79,216,196,0.14);
        }
        .ct-zone-light {
          --zbg: var(--sun); --ztext: var(--ink); --ztext-dim: rgba(11,32,39,0.62);
          --zaccent: var(--aqua-deep); --zborder: rgba(11,32,39,0.12);
          --zcard-bg: #ffffff; --zicon-bg: rgba(14,140,127,0.10);
        }
        .ct-zone-reef {
          --zbg: var(--reef); --ztext: var(--foam); --ztext-dim: var(--foam-dim);
          --zaccent: var(--coral); --zborder: rgba(255,139,94,0.22);
          --zcard-bg: linear-gradient(160deg,rgba(255,139,94,0.08),rgba(234,246,246,0.02));
          --zicon-bg: rgba(255,139,94,0.14);
        }
        .ct-zone-midnight {
          --zbg: var(--midnight); --ztext: #fff; --ztext-dim: rgba(255,255,255,0.55);
          --zaccent: var(--aqua); --zborder: rgba(255,255,255,0.12);
        }

        /* ── WAVE ── */
        .ct-wave {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 56px;
          transform: translateY(-99%);
          pointer-events: none; display: block;
        }

        /* ── SECTION BASE ── */
        .ct-section {
          padding: 8rem 6vw 7rem;
          position: relative;
          background: var(--zbg);
          color: var(--ztext);
          z-index: 1;
        }
        .ct-eyebrow {
          font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--zaccent);
          display: flex; align-items: center; gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .ct-eyebrow::before { content:''; width:22px; height:1px; background:var(--zaccent); display:inline-block; }
        .ct-section-title {
          font-size: clamp(1.8rem, 3.4vw, 2.6rem);
          font-weight: 650; line-height: 1.15;
          color: var(--ztext);
        }
        .ct-section-sub {
          margin-top: 0.9rem; color: var(--ztext-dim);
          max-width: 42ch; font-size: 0.97rem; line-height: 1.65;
        }

        /* ==================== 1. HERO ==================== */
        .ct-hero {
          position: relative; min-height: 80svh;
          display: flex; align-items: flex-end; overflow: hidden;
          background: linear-gradient(180deg, #020c1b 0%, #07151d 60%, #0a1e2e 100%);
        }
        .ct-caustics {
          position: absolute; inset:0;
          mix-blend-mode: screen; opacity:0.35; pointer-events:none;
          background:
            radial-gradient(circle at 20% 30%,rgba(79,216,196,0.28),transparent 40%),
            radial-gradient(circle at 76% 58%,rgba(79,216,196,0.18),transparent 44%),
            radial-gradient(circle at 48% 80%,rgba(255,139,94,0.12),transparent 38%);
          background-size:180% 180%;
          animation:ct-caustics 16s ease-in-out infinite alternate;
        }
        @keyframes ct-caustics { 0%{background-position:0% 0%;} 100%{background-position:100% 60%;} }
        .ct-bubble {
          position:absolute; bottom:-10%; border-radius:50%;
          background:rgba(234,246,246,0.18); pointer-events:none;
          animation:ct-rise linear infinite;
        }
        @keyframes ct-rise {
          0%  { transform:translateY(0);       opacity:0;   }
          10% {                                opacity:0.65;}
          100%{ transform:translateY(-115vh);  opacity:0;   }
        }
        .ct-hero-content {
          position:relative; z-index:2; width:100%;
          padding: 0 6vw 7vh;
          display:flex; justify-content:space-between; align-items:flex-end; gap:2rem;
        }
        .ct-hero-eyebrow {
          font-size:0.72rem; text-transform:uppercase; letter-spacing:0.12em;
          color:var(--aqua);
          display:flex; align-items:center; gap:0.6rem;
          margin-bottom:0.9rem;
        }
        .ct-hero-eyebrow::before { content:''; width:22px; height:1px; background:var(--aqua); display:inline-block; }
        .ct-hero-title {
          font-family:'Fraunces',serif;
          font-size: clamp(2.2rem,5.5vw,4.6rem);
          font-weight:650; line-height:1.06;
          white-space:pre-line; max-width:14ch;
        }
        .ct-hero-text {
          margin-top:1.1rem; max-width:36ch;
          color:var(--foam-dim); font-size:0.97rem; line-height:1.65;
        }
        .ct-depth-badge {
          flex-shrink:0;
          display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem;
        }
        .ct-depth-label { font-size:0.72rem; color:var(--foam-dim); font-family:'JetBrains Mono',monospace; letter-spacing:0.1em; }
        .ct-depth-pill {
          font-family:'JetBrains Mono',monospace; font-size:0.72rem;
          padding:0.45rem 1rem; border-radius:999px;
          border:1px solid var(--aqua); color:var(--abyss);
          background:var(--aqua); font-weight:600;
        }
        .ct-scroll-cue {
          position:absolute; left:6vw; bottom:2rem; z-index:2;
          display:flex; align-items:center; gap:0.5rem;
          color:var(--foam-dim); font-size:0.68rem; letter-spacing:0.1em;
        }
        .ct-dot {
          width:22px; height:34px;
          border:1px solid rgba(234,246,246,0.4); border-radius:12px; position:relative;
        }
        .ct-dot::after {
          content:''; position:absolute; top:6px; left:50%;
          width:3px; height:7px; background:var(--aqua); border-radius:2px;
          transform:translateX(-50%);
          animation:ct-scrolldot 1.8s ease-in-out infinite;
        }
        @keyframes ct-scrolldot { 0%,100%{top:6px;opacity:1;} 60%{top:16px;opacity:0.3;} }

        /* ==================== 2. FORM ZONE ==================== */
        .ct-sun { overflow:hidden; }
        .ct-sun::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:repeating-linear-gradient(115deg,rgba(14,140,127,0.05) 0px,rgba(14,140,127,0.05) 2px,transparent 2px,transparent 42px);
        }
        .ct-split {
          display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start;
          position:relative; z-index:1;
        }
        .ct-split-head { margin-bottom:0; }

        /* — FORM ELEMENTS — */
        .ct-form { display:flex; flex-direction:column; gap:1.4rem; }
        .ct-field-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .ct-field { display:flex; flex-direction:column; gap:0.45rem; }
        .ct-label {
          font-size:0.68rem; text-transform:uppercase; letter-spacing:0.1em;
          color:var(--ink); opacity:0.65;
        }
        .ct-input, .ct-textarea {
          width:100%;
          background:#fff;
          border:1.5px solid rgba(11,32,39,0.18);
          border-radius:8px;
          padding:0.78rem 1rem;
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:0.95rem;
          color:var(--ink);
          transition:border-color 0.22s, box-shadow 0.22s;
          outline:none;
          resize:none;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color:rgba(11,32,39,0.35); }
        .ct-input:focus, .ct-textarea:focus {
          border-color:var(--aqua-deep);
          box-shadow:0 0 0 3px rgba(14,140,127,0.12);
        }
        .ct-field-error .ct-input,
        .ct-field-error .ct-textarea {
          border-color:var(--error);
          box-shadow:0 0 0 3px rgba(255,94,94,0.1);
        }
        .ct-error-msg { font-size:0.76rem; color:var(--error); }

        .ct-topic-grid { display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.1rem; }
        .ct-topic-pill {
          padding:0.42rem 0.9rem;
          background:rgba(11,32,39,0.06);
          border:1.5px solid rgba(11,32,39,0.14);
          border-radius:999px;
          font-size:0.82rem; color:var(--ink); cursor:pointer;
          transition:all 0.2s;
        }
        .ct-topic-pill:hover { border-color:var(--aqua-deep); color:var(--aqua-deep); }
        .ct-topic-active {
          background:var(--aqua-deep) !important;
          border-color:var(--aqua-deep) !important;
          color:#fff !important; font-weight:600;
        }

        .ct-submit-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:0.55rem;
          padding:0.9rem 2rem;
          background:var(--aqua-deep); color:#fff;
          font-size:0.9rem; font-weight:600; letter-spacing:0.04em;
          border:none; border-radius:8px; cursor:pointer;
          transition:opacity 0.2s, transform 0.2s;
          align-self:flex-start;
        }
        .ct-submit-btn:hover:not(:disabled) { opacity:0.88; transform:translateY(-2px); }
        .ct-submit-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .ct-submit-icon { width:16px; height:16px; }

        .ct-spinner {
          width:18px; height:18px; border-radius:50%;
          border:2px solid rgba(255,255,255,0.3);
          border-top-color:#fff;
          animation:ct-spin 0.7s linear infinite;
        }
        @keyframes ct-spin { to { transform:rotate(360deg); } }

        .ct-sent-state {
          display:flex; flex-direction:column; gap:1rem;
          padding:2.5rem; background:#fff;
          border:1.5px solid rgba(14,140,127,0.25);
          border-radius:16px; text-align:center; align-items:center;
        }
        .ct-sent-icon {
          width:60px; height:60px; border-radius:50%;
          background:rgba(14,140,127,0.1); color:var(--aqua-deep);
          display:flex; align-items:center; justify-content:center;
        }
        .ct-sent-fish { width:28px; height:28px; }
        .ct-sent-title { font-size:1.4rem; font-weight:650; color:var(--ink); }
        .ct-sent-body { font-size:0.9rem; line-height:1.65; color:rgba(11,32,39,0.65); max-width:34ch; }
        .ct-sent-reset {
          margin-top:0.5rem; background:none; border:1.5px solid rgba(11,32,39,0.2);
          border-radius:8px; padding:0.6rem 1.3rem;
          font-size:0.82rem; color:var(--ink); cursor:pointer;
          transition:border-color 0.2s;
        }
        .ct-sent-reset:hover { border-color:var(--aqua-deep); color:var(--aqua-deep); }

        /* ==================== 3. INFO CARDS ==================== */
        .ct-reef-wrap { overflow:hidden; }
        .ct-reef-wrap::after {
          content:''; position:absolute; inset:0; pointer-events:none;
          mix-blend-mode:screen; opacity:0.45;
          background:
            radial-gradient(circle at 10% 20%,rgba(255,139,94,0.28),transparent 38%),
            radial-gradient(circle at 88% 70%,rgba(79,216,196,0.2),transparent 42%);
          animation:ct-caustics 18s ease-in-out infinite alternate;
        }
        .ct-cards-grid {
          display:grid; grid-template-columns:repeat(4,1fr); gap:1.25rem;
          position:relative; z-index:1; margin-top:3rem;
        }
        .ct-info-card {
          background:var(--zcard-bg);
          border:1px solid var(--zborder);
          border-top:3px solid var(--zaccent);
          border-radius:4px 4px 14px 14px;
          padding:1.9rem 1.7rem;
          transition:transform 0.3s ease, border-color 0.3s ease;
          text-decoration:none; display:block;
          color:inherit;
        }
        .ct-info-card:hover { transform:translateY(-5px); }
        .ct-info-icon {
          width:44px; height:44px; border-radius:12px;
          background:var(--zicon-bg); color:var(--zaccent);
          display:flex; align-items:center; justify-content:center;
          margin-bottom:1.2rem;
        }
        .ct-info-icon svg { width:20px; height:20px; }
        .ct-info-label { font-size:0.68rem; text-transform:uppercase; letter-spacing:0.12em; color:var(--zaccent); margin-bottom:0.6rem; font-family:'JetBrains Mono',monospace; }
        .ct-info-primary { font-family:'Fraunces',serif; font-size:1rem; font-weight:600; color:var(--ztext); line-height:1.4; margin-bottom:0.25rem; }
        .ct-info-secondary { font-size:0.8rem; color:var(--ztext-dim); }

        /* ==================== 4. MAP ==================== */
        .ct-map-section {
          position:relative;
          background:var(--midnight);
          z-index:1;
          padding:0;
        }
        .ct-map-header {
          padding:4rem 6vw 2.5rem;
          display:flex; align-items:flex-end; justify-content:space-between; gap:2rem; flex-wrap:wrap;
        }
        .ct-map-title { font-size:clamp(1.4rem,2.5vw,1.9rem); font-weight:650; color:#fff; }
        .ct-map-coords { font-family:'JetBrains Mono',monospace; font-size:0.72rem; letter-spacing:0.1em; color:rgba(255,255,255,0.4); }
        .ct-map-frame {
          width:100%; height:480px;
          border:none; display:block;
          filter: invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85);
        }
        .ct-map-overlay-bar {
          background:var(--twilight);
          padding:1.6rem 6vw;
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;
          border-top:1px solid rgba(79,216,196,0.15);
        }
        .ct-map-addr { color:var(--foam); font-size:0.92rem; line-height:1.55; }
        .ct-map-addr strong { color:var(--aqua); display:block; font-family:'Fraunces',serif; font-size:1rem; margin-bottom:0.15rem; }
        .ct-directions-btn {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.7rem 1.5rem;
          background:var(--aqua); color:var(--abyss);
          font-size:0.82rem; font-weight:700; letter-spacing:0.04em;
          border:none; border-radius:8px; cursor:pointer; text-decoration:none;
          transition:opacity 0.2s, transform 0.2s; flex-shrink:0;
        }
        .ct-directions-btn:hover { opacity:0.88; transform:translateY(-2px); }

        /* ── REDUCED MOTION ── */
        @media (prefers-reduced-motion:reduce) {
          .ct-caustics, .ct-bubble, .ct-reef-wrap::after, .ct-spinner
          { animation:none !important; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width:1024px) { .ct-cards-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:900px) {
          .ct-split { grid-template-columns:1fr; gap:3rem; }
          .ct-hero-content { flex-direction:column; align-items:flex-start; }
          .ct-section { padding:6rem 6vw; }
          .ct-map-frame { height:360px; }
        }
        @media (max-width:600px) {
          .ct-field-row { grid-template-columns:1fr; }
          .ct-cards-grid { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ==================== 1. HERO ==================== */}
      <section className="ct-hero">
        <div className="ct-caustics" />
        {bubbles.map((b) => (
          <span key={b.id} className="ct-bubble" style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }} />
        ))}

        <motion.div 
          className="ct-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <div className="ct-hero-eyebrow fm">Contact Us</div>
            <h1 className="ct-hero-title fd">{"Drop a line.\nWe're in the water."}</h1>
            <p className="ct-hero-text">
              Questions about live fish, gear recommendations, or an order — we reply the same day. Aquarist-to-aquarist, no ticketing system.
            </p>
          </div>
          <motion.div 
            className="ct-depth-badge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="ct-depth-label fm">location</span>
            <span className="ct-depth-pill fm">Madurai, IN</span>
          </motion.div>
        </motion.div>

        <div className="ct-scroll-cue">
          <span className="ct-dot" />
          <span className="fm">SCROLL</span>
        </div>
      </section>

      {/* ==================== 2. FORM — Sunlight Zone ==================== */}
      <section className="ct-section ct-zone-light ct-sun">
        <WaveDivider />
        <div className="ct-split">
          {/* Left: heading */}
          <Reveal>
            <div className="ct-split-head">
              <div className="ct-eyebrow fm">Sunlight Zone · Send a Message</div>
              <h2 className="ct-section-title fd">What can we help with?</h2>
              <p className="ct-section-sub">
                Fill in the form and one of our aquarists — not a bot — will reply within the hour for live fish queries, and by end of day for everything else.
              </p>

              {/* mini trust signals */}
              <div style={{ marginTop:"2.2rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                {trustSignals.map((t, i) => (
                  <motion.div 
                    key={t} 
                    style={{ display:"flex", alignItems:"center", gap:"0.65rem" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <motion.span style={{
                      width:20, height:20, borderRadius:"50%",
                      background:"rgba(14,140,127,0.12)", color:"var(--aqua-deep)",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}>
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </motion.span>
                    <span style={{ fontSize:"0.86rem", color:"rgba(11,32,39,0.65)", lineHeight:1.5 }}>{t}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={120} direction="right">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ==================== 3. INFO CARDS ==================== */}
      <section className="ct-section ct-zone-reef ct-reef-wrap">
        <WaveDivider />
        <Reveal>
          <div>
            <div className="ct-eyebrow fm">The Reef · Find Us</div>
            <h2 className="ct-section-title fd">Four ways to reach us</h2>
          </div>
        </Reveal>
        <div className="ct-cards-grid">
          {infoCards.map((c, i) => {
            const El = c.action ? "a" : "div";
            const props = c.action ? { href: c.action } : {};
            return (
              <Reveal key={c.label} delay={i * 100}>
                <motion.div
                  as={El}
                  className="ct-info-card"
                  {...props}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="ct-info-icon"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon name={c.icon} />
                  </motion.div>
                  <div className="ct-info-label fm">{c.label}</div>
                  <div className="ct-info-primary fd">{c.primary}</div>
                  <div className="ct-info-secondary">{c.secondary}</div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ==================== 4. LIVE MAP ==================== */}
      <section className="ct-map-section ct-zone-midnight">
        <WaveDivider />
        <Reveal>
          <div className="ct-map-header">
            <div>
              <div className="ct-eyebrow fm" style={{ "--zbg": "var(--midnight)", "--zaccent": "var(--aqua)" }}>Midnight Zone · Live Location</div>
              <h2 className="ct-map-title fd">We're in Bethaniyapuram</h2>
            </div>
            <span className="ct-map-coords fm">9.9361° N · 78.0943° E</span>
          </div>
        </Reveal>

        {/* OpenStreetMap embed */}
        <motion.iframe
          className="ct-map-frame"
          title="AquaHome Store Location – Bethaniyapuram, Madurai"
          src="https://www.openstreetmap.org/export/embed.html?bbox=78.0843%2C9.9261%2C78.1043%2C9.9461&layer=mapnik&marker=9.9361%2C78.0943"
          loading="lazy"
          allowFullScreen
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <motion.div 
          className="ct-map-overlay-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="ct-map-addr">
            <strong>AquaHome · Aquarium &amp; Accessories</strong>
            Bethaniyapuram, Madurai – 625016, Tamil Nadu, India
          </div>
          <motion.a
            className="ct-directions-btn"
            href="https://www.openstreetmap.org/directions?from=&to=9.9361%2C78.0943#map=15/9.9361/78.0943"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:15,height:15}}>
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            Get Directions
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;