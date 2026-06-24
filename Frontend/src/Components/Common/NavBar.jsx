import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart, Menu, X, User } from "lucide-react";
import { assets } from "../../MockData/Assets";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../UI/AuthModal";
import CartModal from "../UI/CartModal";
import WishListModal from "../UI/WishListModal";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = ["HOME", "SHOP", "ABOUT", "CONTACT"];

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <>
      <nav className={`navbar-root ${scrolled ? 'navbar-scrolled' : ''}`}>
        <style>{`
          /* ── NO BORDER RADIUS ANYWHERE ── */
          .navbar-root * {
            border-radius: 0 !important;
          }

          .navbar-root {
            background: #ffffff;
            border-bottom: 2px solid #e8edf2;
            font-family: 'Plus Jakarta Sans', sans-serif;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            box-shadow: 0 2px 20px rgba(10,15,26,0.04);
            transition: all 0.3s ease;
            height: 80px;
          }

          .navbar-scrolled {
            box-shadow: 0 4px 30px rgba(10,15,26,0.08);
            border-bottom-color: #dce4eb;
            height: 72px;
          }

          @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,650;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

          .navbar-root .font-display {
            font-family: 'Fraunces', serif;
          }
          
          .navbar-root .font-mono {
            font-family: 'JetBrains Mono', monospace;
            letter-spacing: 0.08em;
          }

          /* Custom scrollbar */
          .navbar-root ::-webkit-scrollbar {
            width: 4px;
          }
          .navbar-root ::-webkit-scrollbar-track {
            background: #f0f4f8;
          }
          .navbar-root ::-webkit-scrollbar-thumb {
            background: #2a9d8f;
          }

          /* Nav container */
          .nav-container {
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            height: 100%;
            transition: all 0.3s ease;
          }

          @media (max-width: 768px) {
            .nav-container {
              padding: 0 1rem;
            }
          }

          /* Logo */
          .nav-logo {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
          }

          .nav-logo img {
            height: 70px;
            width: auto;
            object-fit: contain;
            transition: all 0.3s ease;
          }

          .navbar-scrolled .nav-logo img {
            height: 55px;
          }

          @media (min-width: 768px) {
            .nav-logo img {
              height: 85px;
            }
            .navbar-scrolled .nav-logo img {
              height: 65px;
            }
          }

          @media (min-width: 1024px) {
            .nav-logo img {
              height: 95px;
            }
            .navbar-scrolled .nav-logo img {
              height: 70px;
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
            color: #4a5a6a;
            font-size: 0.8rem;
            font-weight: 600;
            text-decoration: none;
            letter-spacing: 0.12em;
            transition: all 0.3s ease;
            position: relative;
            padding: 0.5rem 0;
            text-transform: uppercase;
            font-family: 'JetBrains Mono', monospace;
          }

          .nav-desktop a:hover {
            color: #2a9d8f;
          }

          .nav-desktop a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #2a9d8f;
            transition: width 0.3s ease;
          }

          .nav-desktop a:hover::after {
            width: 100%;
          }

          .nav-desktop a.active {
            color: #2a9d8f;
          }

          .nav-desktop a.active::after {
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
            border: none;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7b8b;
          }

          .nav-btn:hover {
            background: rgba(42,157,143,0.06);
            color: #2a9d8f;
          }

          .nav-btn svg {
            width: 22px;
            height: 22px;
            transition: all 0.3s ease;
          }

          .navbar-scrolled .nav-btn svg {
            width: 20px;
            height: 20px;
          }

          @media (min-width: 768px) {
            .nav-btn svg {
              width: 24px;
              height: 24px;
            }
            .navbar-scrolled .nav-btn svg {
              width: 22px;
              height: 22px;
            }
          }

          /* Badge */
          .nav-badge {
            position: absolute;
            top: -2px;
            right: -2px;
            min-width: 20px;
            height: 20px;
            padding: 0 6px;
            font-size: 0.6rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #ffffff;
            font-family: 'JetBrains Mono', monospace;
            transition: all 0.3s ease;
          }

          .navbar-scrolled .nav-badge {
            min-width: 18px;
            height: 18px;
            font-size: 0.55rem;
            padding: 0 5px;
          }

          .nav-badge-heart {
            background: #2a9d8f;
            color: #ffffff;
          }

          .nav-badge-cart {
            background: #2a9d8f;
            color: #ffffff;
          }

          /* Mobile Menu Toggle */
          .nav-menu-toggle {
            display: flex;
            padding: 0.5rem;
            border: none;
            background: transparent;
            cursor: pointer;
            color: #6b7b8b;
            transition: all 0.3s ease;
          }

          .nav-menu-toggle:hover {
            background: rgba(42,157,143,0.06);
            color: #2a9d8f;
          }

          @media (min-width: 768px) {
            .nav-menu-toggle {
              display: none;
            }
          }

          .nav-menu-toggle svg {
            width: 28px;
            height: 28px;
            transition: all 0.3s ease;
          }

          .navbar-scrolled .nav-menu-toggle svg {
            width: 24px;
            height: 24px;
          }

          /* Mobile Drawer Overlay */
          .nav-drawer-overlay {
            position: fixed;
            inset: 0;
            background: rgba(10,15,26,0.6);
            backdrop-filter: blur(4px);
            z-index: 100;
          }

          /* Mobile Drawer */
          .nav-drawer {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 320px;
            max-width: 85vw;
            background: #ffffff;
            z-index: 101;
            box-shadow: -8px 0 32px rgba(10,15,26,0.1);
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            border-left: 1px solid #e8edf2;
          }

          .nav-drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid #e8edf2;
            flex-shrink: 0;
          }

          .nav-drawer-header img {
            height: 50px;
            width: auto;
            object-fit: contain;
          }

          .nav-drawer-close {
            padding: 0.5rem;
            border: none;
            background: transparent;
            cursor: pointer;
            color: #6b7b8b;
            transition: all 0.3s ease;
          }

          .nav-drawer-close:hover {
            background: rgba(42,157,143,0.06);
            color: #2a9d8f;
          }

          .nav-drawer-close svg {
            width: 28px;
            height: 28px;
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
            color: #4a5a6a;
            font-size: 0.9rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-family: 'JetBrains Mono', monospace;
          }

          .nav-drawer-body a:hover {
            color: #2a9d8f;
            background: rgba(42,157,143,0.06);
          }

          .nav-drawer-body a.active {
            color: #2a9d8f;
            background: rgba(42,157,143,0.06);
          }

          .nav-drawer-body .drawer-divider {
            height: 1px;
            background: #e8edf2;
            margin: 1rem 0;
          }

          .nav-drawer-footer {
            padding: 1.5rem;
            border-top: 1px solid #e8edf2;
            flex-shrink: 0;
          }

          .nav-drawer-footer .drawer-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.6rem 1rem;
            transition: all 0.3s ease;
            margin-bottom: 0.25rem;
            cursor: pointer;
          }

          .nav-drawer-footer .drawer-item:hover {
            background: rgba(42,157,143,0.06);
          }

          .nav-drawer-footer .drawer-item span {
            color: #4a5a6a;
            font-size: 0.9rem;
            font-weight: 500;
          }

          .nav-drawer-footer .drawer-item .drawer-icon {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .nav-drawer-footer .drawer-item .drawer-icon svg {
            width: 20px;
            height: 20px;
            color: #6b7b8b;
          }

          .nav-drawer-footer .drawer-badge {
            padding: 0.15rem 0.7rem;
            font-size: 0.7rem;
            font-weight: 600;
            font-family: 'JetBrains Mono', monospace;
            background: #2a9d8f;
            color: #ffffff;
          }

          /* User Profile Section */
          .nav-user-profile {
            display: none;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.5rem 0.25rem 0.75rem;
            border: 1px solid #e2e8f0;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          @media (min-width: 768px) {
            .nav-user-profile {
              display: flex;
            }
          }

          .nav-user-profile:hover {
            border-color: #2a9d8f;
            background: rgba(42,157,143,0.06);
          }

          .nav-user-profile .user-avatar {
            width: 36px;
            height: 36px;
            background: rgba(42,157,143,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2a9d8f;
            transition: all 0.3s ease;
          }

          .navbar-scrolled .nav-user-profile .user-avatar {
            width: 32px;
            height: 32px;
          }

          .nav-user-profile .user-avatar svg {
            width: 18px;
            height: 18px;
            transition: all 0.3s ease;
          }

          .navbar-scrolled .nav-user-profile .user-avatar svg {
            width: 16px;
            height: 16px;
          }

          .nav-user-profile .user-name {
            color: #1a2a3a;
            font-size: 0.85rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .navbar-scrolled .nav-user-profile .user-name {
            font-size: 0.8rem;
          }

          /* Drawer User Profile */
          .drawer-user {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border: 1px solid #e8edf2;
            margin-bottom: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .drawer-user:hover {
            background: rgba(42,157,143,0.06);
            border-color: #2a9d8f;
          }

          .drawer-user .user-avatar {
            width: 44px;
            height: 44px;
            background: rgba(42,157,143,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #2a9d8f;
          }

          .drawer-user .user-avatar svg {
            width: 22px;
            height: 22px;
          }

          .drawer-user .user-info {
            flex: 1;
          }

          .drawer-user .user-info .name {
            color: #1a2a3a;
            font-size: 0.95rem;
            font-weight: 600;
          }

          .drawer-user .user-info .email {
            color: #6b7b8b;
            font-size: 0.8rem;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .navbar-root {
              height: 70px;
            }
            .navbar-scrolled {
              height: 64px;
            }
            
            .nav-container {
              padding: 0 1rem;
            }
            
            .nav-logo img {
              height: 50px;
            }
            .navbar-scrolled .nav-logo img {
              height: 40px;
            }
            
            .nav-btn {
              padding: 0.4rem;
            }
            
            .nav-btn svg {
              width: 22px;
              height: 22px;
            }
            .navbar-scrolled .nav-btn svg {
              width: 20px;
              height: 20px;
            }
            
            .nav-badge {
              min-width: 18px;
              height: 18px;
              font-size: 0.5rem;
              padding: 0 5px;
            }
            .navbar-scrolled .nav-badge {
              min-width: 16px;
              height: 16px;
              font-size: 0.45rem;
              padding: 0 4px;
            }
            
            .nav-menu-toggle svg {
              width: 26px;
              height: 26px;
            }
            .navbar-scrolled .nav-menu-toggle svg {
              width: 22px;
              height: 22px;
            }
          }

          @media (max-width: 480px) {
            .navbar-root {
              height: 60px;
            }
            .navbar-scrolled {
              height: 56px;
            }
            
            .nav-container {
              padding: 0 0.75rem;
            }
            
            .nav-logo img {
              height: 42px;
            }
            .navbar-scrolled .nav-logo img {
              height: 34px;
            }
            
            .nav-btn {
              padding: 0.35rem;
            }
            
            .nav-btn svg {
              width: 20px;
              height: 20px;
            }
            .navbar-scrolled .nav-btn svg {
              width: 18px;
              height: 18px;
            }
            
            .nav-badge {
              min-width: 16px;
              height: 16px;
              font-size: 0.45rem;
              padding: 0 4px;
            }
            .navbar-scrolled .nav-badge {
              min-width: 14px;
              height: 14px;
              font-size: 0.4rem;
              padding: 0 3px;
            }
            
            .nav-drawer {
              width: 280px;
            }
            
            .nav-menu-toggle svg {
              width: 24px;
              height: 24px;
            }
            .navbar-scrolled .nav-menu-toggle svg {
              width: 20px;
              height: 20px;
            }
          }

          @media (min-width: 769px) and (max-width: 1024px) {
            .navbar-root {
              height: 75px;
            }
            .navbar-scrolled {
              height: 68px;
            }
            
            .nav-desktop ul {
              gap: 1.5rem;
            }
            
            .nav-desktop a {
              font-size: 0.7rem;
            }
            
            .nav-logo img {
              height: 75px;
            }
            .navbar-scrolled .nav-logo img {
              height: 55px;
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
              {navItems.map((item) => {
                const path = item === "HOME" ? "/" : `/${item.toLowerCase()}`;
                const isActive = location.pathname === path || 
                  (item !== "HOME" && location.pathname.startsWith(path));
                return (
                  <li key={item}>
                    <Link to={path} className={isActive ? 'active' : ''}>
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* User Profile */}
            <div className="nav-user-profile" onClick={handleAuthClick}>
              <div className="user-avatar">
                <User />
              </div>
              <span className="user-name">Sign In</span>
            </div>

            {/* Wishlist */}
            <button className="nav-btn" onClick={() => setWishlistModalOpen(true)}>
              <Heart />
              <span className="nav-badge nav-badge-heart">2</span>
            </button>

            {/* Cart */}
            <button className="nav-btn" onClick={() => setCartModalOpen(true)}>
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
                {/* User Profile in Drawer */}
                <div className="drawer-user" onClick={() => {
                  setOpen(false);
                  handleAuthClick();
                }}>
                  <div className="user-avatar">
                    <User />
                  </div>
                  <div className="user-info">
                    <div className="name">Guest User</div>
                    <div className="email">Sign in to your account</div>
                  </div>
                </div>

                <ul>
                  {navItems.map((item) => {
                    const path = item === "HOME" ? "/" : `/${item.toLowerCase()}`;
                    const isActive = location.pathname === path || 
                      (item !== "HOME" && location.pathname.startsWith(path));
                    return (
                      <li key={item}>
                        <Link 
                          to={path}
                          className={isActive ? 'active' : ''}
                          onClick={() => setOpen(false)}
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="drawer-divider" />

                {/* Quick Links */}
                <ul>
                  <li>
                    <Link 
                      to="/wishlist" 
                      onClick={() => setOpen(false)}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#4a5a6a',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        textDecoration: 'none',
                        padding: '0.75rem 1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Heart size={20} />
                      Wishlist (2)
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/cart" 
                      onClick={() => setOpen(false)}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#4a5a6a',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        textDecoration: 'none',
                        padding: '0.75rem 1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <ShoppingCart size={20} />
                      Cart (5)
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="nav-drawer-footer">
                <div className="drawer-item" onClick={() => {
                  setOpen(false);
                  handleAuthClick();
                }}>
                  <span className="drawer-icon">
                    <User size={20} />
                    Account
                  </span>
                  <span className="drawer-badge">Sign In</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div style={{ height: '80px' }} className="navbar-spacer" />

      {/* Auth Modal - Login Only */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
      />

      {/* Wishlist Modal */}
      <WishListModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
      />
    </>
  );
};

export default NavBar;