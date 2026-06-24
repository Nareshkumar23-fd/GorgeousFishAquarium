import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const socialLinks = [
    { name: "Facebook", icon: "📘" },
    { name: "Instagram", icon: "📸" },
    { name: "WhatsApp", icon: "💬" },
  ];

  const infoLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const accountLinks = [
    { name: "Login / Register", path: "/login" },
    { name: "My Orders", path: "/orders" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Cart", path: "/cart" },
  ];

  const supportLinks = [
    { name: "Shipping", path: "/shipping" },
    { name: "Returns", path: "/returns" },
    { name: "Order Tracking", path: "/tracking" },
    { name: "Help", path: "/help" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.footer
      className="footer-root"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <style>{`
        .footer-root {
          --abyss: #07151d;
          --twilight: #0c2630;
          --reef: #161229;
          --midnight: #050709;
          --ink: #0b2027;
          --foam: #eaf6f6;
          --aqua: #4fd8c4;
          --aqua-deep: #0e8c7f;
          --coral: #ff8b5e;
          --sun: #f1faf8;
          --surface: #e9f1ee;
          
          background: var(--abyss);
          color: var(--foam);
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow: hidden;
        }

        .footer-root .font-display {
          font-family: 'Fraunces', serif;
        }
        
        .footer-root .font-mono {
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.08em;
        }

        /* Import fonts */
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,650;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        /* TOP INFO STRIP */
        .footer-top-strip {
          border-bottom: 1px solid rgba(234,246,246,0.08);
          background: rgba(7,21,29,0.6);
          padding: 0.8rem 0;
        }

        .footer-top-strip-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .footer-top-strip-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            padding: 0 1.5rem;
          }
        }

        .footer-strip-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(234,246,246,0.7);
          font-size: 0.85rem;
        }

        .footer-strip-item .icon {
          color: var(--aqua);
          font-size: 1rem;
        }

        .footer-strip-item .label {
          color: rgba(234,246,246,0.4);
          font-size: 0.7rem;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.06em;
        }

        .footer-strip-nav {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .footer-strip-nav a {
          color: rgba(234,246,246,0.5);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: 'JetBrains Mono', monospace;
        }

        .footer-strip-nav a:hover {
          color: var(--aqua);
        }

        @media (max-width: 768px) {
          .footer-strip-nav {
            flex-wrap: wrap;
            gap: 0.8rem;
          }
          
          .footer-strip-nav a {
            font-size: 0.65rem;
          }
        }

        /* MAIN SECTION */
        .footer-main {
          max-width: 1440px;
          margin: 0 auto;
          padding: 4rem 2rem 3rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
            padding: 3rem 2rem 2rem;
          }
        }

        @media (max-width: 640px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2.5rem 1.5rem 2rem;
          }
        }

        .footer-brand h2 {
          font-family: 'Fraunces', serif;
          font-size: 1.8rem;
          font-weight: 650;
          color: var(--aqua);
          margin-bottom: 0.8rem;
        }

        .footer-brand p {
          color: rgba(234,246,246,0.6);
          font-size: 0.9rem;
          line-height: 1.7;
          max-width: 30ch;
        }

        .footer-social {
          display: flex;
          gap: 1.2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .footer-social a {
          color: rgba(234,246,246,0.5);
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          padding: 0.3rem 0.8rem;
          background: rgba(79,216,196,0.06);
          border: 1px solid rgba(79,216,196,0.08);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .footer-social a:hover {
          color: var(--aqua);
          background: rgba(79,216,196,0.12);
          border-color: rgba(79,216,196,0.2);
          transform: translateY(-2px);
        }

        .footer-heading {
          font-family: 'Fraunces', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--foam);
          margin-bottom: 1.2rem;
          position: relative;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: -0.4rem;
          left: 0;
          width: 28px;
          height: 2px;
          background: var(--aqua);
          opacity: 0.4;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-links a {
          color: rgba(234,246,246,0.55);
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.3rem 0;
          text-decoration: none;
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--aqua);
          transform: translateX(6px);
        }

        /* NEWSLETTER */
        .footer-newsletter {
          border-top: 1px solid rgba(234,246,246,0.06);
          background: rgba(7,21,29,0.4);
          padding: 1.5rem 0;
        }

        .footer-newsletter-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .footer-newsletter-inner {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding: 0 1.5rem;
          }
        }

        .footer-newsletter-text {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: rgba(234,246,246,0.7);
          font-size: 0.9rem;
        }

        .footer-newsletter-text .icon {
          font-size: 1.3rem;
        }

        .footer-newsletter-form {
          display: flex;
          flex: 1;
          max-width: 420px;
          min-width: 280px;
        }

        @media (max-width: 768px) {
          .footer-newsletter-form {
            max-width: none;
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .footer-newsletter-form {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        .footer-newsletter-form input {
          flex: 1;
          padding: 0.7rem 1rem;
          font-size: 0.88rem;
          border: 1.5px solid rgba(234,246,246,0.12);
          border-right: none;
          outline: none;
          background: rgba(234,246,246,0.06);
          color: var(--foam);
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: border-color 0.3s ease;
        }

        @media (max-width: 480px) {
          .footer-newsletter-form input {
            border-right: 1.5px solid rgba(234,246,246,0.12);
          }
        }

        .footer-newsletter-form input::placeholder {
          color: rgba(234,246,246,0.35);
        }

        .footer-newsletter-form input:focus {
          border-color: var(--aqua);
          background: rgba(234,246,246,0.08);
        }

        .footer-newsletter-form button {
          padding: 0.7rem 1.8rem;
          background: var(--aqua);
          color: var(--abyss);
          font-size: 0.85rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .footer-newsletter-form button {
            width: 100%;
          }
        }

        .footer-newsletter-form button:hover {
          opacity: 0.85;
          transform: scale(1.02);
        }

        /* BOTTOM BAR */
        .footer-bottom {
          border-top: 1px solid rgba(234,246,246,0.05);
          text-align: center;
          padding: 1.2rem 2rem;
          color: rgba(234,246,246,0.3);
          font-size: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.04em;
          background: rgba(5,7,9,0.5);
        }

        .footer-bottom .highlight {
          color: var(--aqua);
          opacity: 0.5;
        }
      `}</style>

      {/* TOP INFO STRIP */}
      <motion.div
        className="footer-top-strip"
        variants={itemVariants}
      >
        <div className="footer-top-strip-inner">
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div className="footer-strip-item">
              <span className="icon">📞</span>
              <span>0123456789</span>
              <span className="label">Free support line</span>
            </div>

            <div className="footer-strip-item">
              <span className="icon">📧</span>
              <span>support@aquahome.in</span>
              <span className="label">Orders support</span>
            </div>

            <div className="footer-strip-item">
              <span className="icon">⏰</span>
              <span>Mon - Fri / 8:00 - 18:00</span>
              <span className="label">Working hours</span>
            </div>
          </div>

          <nav className="footer-strip-nav">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* MAIN SECTION */}
      <div className="footer-main">
        {/* BRAND */}
        <motion.div className="footer-brand" variants={itemVariants}>
          <h2>AquaHome</h2>
          <p>
            Premium aquarium store for exotic fish, tanks, and accessories.
            We help you create a peaceful underwater world at home.
          </p>

          <div className="footer-social">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{social.icon}</span>
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* INFORMATION */}
        <motion.div variants={itemVariants}>
          <h3 className="footer-heading">Information</h3>
          <ul className="footer-links">
            {infoLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ACCOUNT */}
        <motion.div variants={itemVariants}>
          <h3 className="footer-heading">My Account</h3>
          <ul className="footer-links">
            {accountLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* SUPPORT */}
        <motion.div variants={itemVariants}>
          <h3 className="footer-heading">Customer Service</h3>
          <ul className="footer-links">
            {supportLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* NEWSLETTER */}
      <motion.div
        className="footer-newsletter"
        variants={itemVariants}
      >
        <div className="footer-newsletter-inner">
          <div className="footer-newsletter-text">
            <span className="icon">🐠</span>
            <span>Join our newsletter for latest fish deals</span>
          </div>

          <motion.div
            className="footer-newsletter-form"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="email"
              placeholder="Enter email address"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* BOTTOM */}
      <motion.div
        className="footer-bottom"
        variants={itemVariants}
      >
        © {new Date().getFullYear()} <span className="highlight">AquaHome</span>. Built with care for aquarium lovers.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;