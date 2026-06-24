import React, { useState } from "react";
import { Heart, ShoppingCart, Menu, X, Search } from "lucide-react";
import { assets } from "../../MockData/Assets";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Navigation items
  const navItems = ["HOME", "SHOP", "ABOUT", "CONTACT"];

  return (
    <nav className="navbar-root sticky top-0 z-50">
      <style>{`
        .navbar-root {
          background: #ffffff;
          border-bottom: 2px solid #f1f5f9;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }

        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,650;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .navbar-root .font-display {
          font-family: 'Fraunces', serif;
        }

        /* Custom scrollbar */
        .navbar-root ::-webkit-scrollbar {
          width: 4px;
        }
        .navbar-root ::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .navbar-root ::-webkit-scrollbar-thumb {
          background: #0e8c7f;
          border-radius: 999px;
        }

        /* Nav container */
        .nav-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0.5rem 1rem;
          }
        }

        /* Logo */
        .nav-logo {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .nav-logo img {
          height: 50px;
          width: auto;
          object-fit: contain;
        }

        @media (min-width: 768px) {
          .nav-logo img {
            height: 78px;
          }
        }

        /* Desktop Navigation */
        .nav-desktop {
          display: none;
          flex: 1;
          justify-content: center;
          padding: 0 2rem;
        }

        @media (min-width: 768px) {
          .nav-desktop {
            display: flex;
          }
        }

        .nav-desktop ul {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 1024px) {
          .nav-desktop ul {
            gap: 3.5rem;
          }
        }

        .nav-desktop a {
          color: #475569;
          font-size: 0.85rem;
         font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
          text-transform: uppercase;
        }

        .nav-desktop a:hover {
          color: #0e8c7f;
        }

        .nav-desktop a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #4fd8c4, #0e8c7f);
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .nav-desktop a:hover::after {
          width: 100%;
        }

        /* Right Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .nav-actions {
            gap: 0.5rem;
          }
        }

        .nav-btn {
          position: relative;
          padding: 0.5rem;
          border-radius: 50%;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .nav-btn:hover {
          background: #f1f5f9;
          color: #0e8c7f;
        }

        .nav-btn svg {
          width: 20px;
          height: 20px;
        }

        @media (min-width: 768px) {
          .nav-btn svg {
            width: 22px;
            height: 22px;
          }
        }

        /* Badge */
        .nav-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          border-radius: 999px;
          font-size: 0.6rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .nav-badge-heart {
          background: linear-gradient(135deg, #4fd8c4, #0e8c7f);
          color: white;
        }

        .nav-badge-cart {
          background: linear-gradient(135deg, #4fd8c4, #0e8c7f);
          color: white;
        }

        /* Search */
        .nav-search-desktop {
          display: none;
          position: relative;
          margin-right: 0.5rem;
        }

        @media (min-width: 768px) {
          .nav-search-desktop {
            display: block;
          }
        }

        .nav-search-desktop input {
          width: 200px;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 999px;
          background: #f8fafc;
          color: #1e293b;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @media (min-width: 1024px) {
          .nav-search-desktop input {
            width: 260px;
          }
        }

        .nav-search-desktop input::placeholder {
          color: #94a3b8;
        }

        .nav-search-desktop input:focus {
          border-color: #0e8c7f;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(14,140,127,0.1);
        }

        .nav-search-desktop .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          width: 16px;
          height: 16px;
        }

        /* Mobile Search */
        .nav-search-mobile {
          padding: 0.75rem 2rem 1.25rem;
        }

        @media (min-width: 768px) {
          .nav-search-mobile {
            display: none;
          }
        }

        .nav-search-mobile .search-wrapper {
          position: relative;
        }

        .nav-search-mobile input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 999px;
          background: #f8fafc;
          color: #1e293b;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .nav-search-mobile input::placeholder {
          color: #94a3b8;
        }

        .nav-search-mobile input:focus {
          border-color: #0e8c7f;
          background: #ffffff;
        }

        .nav-search-mobile .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          width: 16px;
          height: 16px;
        }

        /* Mobile Menu Toggle */
        .nav-menu-toggle {
          display: flex;
          padding: 0.5rem;
          border-radius: 50%;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .nav-menu-toggle:hover {
          background: #f1f5f9;
          color: #0e8c7f;
        }

        @media (min-width: 768px) {
          .nav-menu-toggle {
            display: none;
          }
        }

        /* Mobile Drawer */
        .nav-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 100;
        }

        .nav-drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 300px;
          max-width: 85vw;
          background: #ffffff;
          z-index: 101;
          box-shadow: -8px 0 32px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .nav-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 2px solid #f1f5f9;
          flex-shrink: 0;
        }

        .nav-drawer-header img {
          height: 40px;
          width: auto;
          object-fit: contain;
        }

        .nav-drawer-close {
          padding: 0.5rem;
          border-radius: 50%;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .nav-drawer-close:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .nav-drawer-close svg {
          width: 24px;
          height: 24px;
        }

        .nav-drawer-body {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .nav-drawer-body ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-drawer-body a {
          display: block;
          padding: 0.75rem 1rem;
          color: #475569;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .nav-drawer-body a:hover {
          color: #0e8c7f;
          background: #f0fdfa;
        }

        .nav-drawer-footer {
          padding: 1.5rem;
          border-top: 2px solid #f1f5f9;
          flex-shrink: 0;
        }

        .nav-drawer-footer .drawer-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          margin-bottom: 0.25rem;
        }

        .nav-drawer-footer .drawer-item:hover {
          background: #f1f5f9;
        }

        .nav-drawer-footer .drawer-item span {
          color: #475569;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .nav-drawer-footer .drawer-badge {
          padding: 0.15rem 0.7rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .drawer-badge-heart {
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: white;
        }

        .drawer-badge-cart {
          background: linear-gradient(135deg, #4fd8c4, #0e8c7f);
          color: white;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .nav-container {
            padding: 0.35rem 0.75rem;
          }
          
          .nav-logo img {
            height: 38px;
          }
          
          .nav-btn {
            padding: 0.35rem;
          }
          
          .nav-btn svg {
            width: 18px;
            height: 18px;
          }
          
          .nav-badge {
            min-width: 16px;
            height: 16px;
            font-size: 0.5rem;
            padding: 0 4px;
          }
          
          .nav-drawer {
            width: 280px;
          }
        }
      `}</style>

      {/* Main Nav Container */}
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <img src={assets.Logo} alt="AquaHome" />
        </div>

        {/* Desktop Navigation */}
        <div className="nav-desktop">
          <ul>
            {navItems.map((item) => (
              <li key={item}>
                <a href={`/${item.toLowerCase()}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Desktop Search */}
          <div className="nav-search-desktop">
            <input type="text" placeholder="Search products..." />
            <Search className="search-icon" />
          </div>

          {/* Mobile Search Toggle */}
          <button
            className="nav-btn md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search />
          </button>

          {/* Wishlist */}
          <button className="nav-btn">
            <Heart />
            <span className="nav-badge nav-badge-heart">2</span>
          </button>

          {/* Cart */}
          <button className="nav-btn">
            <ShoppingCart />
            <span className="nav-badge nav-badge-cart">5</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="nav-menu-toggle"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="nav-search-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
              />
              <Search className="search-icon" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="nav-drawer-header">
              <img src={assets.Logo} alt="AquaHome" />
              <button className="nav-drawer-close" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="nav-drawer-body">
              <ul>
                {navItems.map((item) => (
                  <li key={item}>
                    <a href={`/${item.toLowerCase()}`} onClick={() => setOpen(false)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-drawer-footer">
              <div className="drawer-item">
                <span>Wishlist</span>
                <span className="drawer-badge drawer-badge-heart">2 items</span>
              </div>
              <div className="drawer-item">
                <span>Cart</span>
                <span className="drawer-badge drawer-badge-cart">5 items</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;