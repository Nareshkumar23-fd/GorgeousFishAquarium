import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { products } from '../MockData/Data';
import { assets } from '../MockData/Assets';

const Shop = () => {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [wishlist, setWishlist] = useState([]);

  // Categories from products
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // Filter products
  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Scroll reveal for header
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: { 
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { scale: 0.98 },
  };

  return (
    <div className="shop-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,650;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .shop-root {
          --abyss: #07151d;
          --twilight: #0c2630;
          --ink: #0b2027;
          --foam: #eaf6f6;
          --foam-dim: rgba(234,246,246,0.66);
          --aqua: #4fd8c4;
          --aqua-deep: #0e8c7f;
          --coral: #ff8b5e;
          --sun: #f1faf8;
          --surface: #e9f1ee;
          --zborder: rgba(11,32,39,0.12);
          --zcard-bg: #ffffff;
          --zicon-bg: rgba(14,140,127,0.1);
          --ztext: var(--ink);
          --ztext-dim: rgba(11,32,39,0.62);
          --zaccent: var(--aqua-deep);
          
          background: var(--sun);
          color: var(--ztext);
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .shop-root .font-display { font-family: 'Fraunces', serif; }
        .shop-root .font-mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }

        /* ---------- Hero Header ---------- */
        .shop-hero {
          position: relative;
          padding: 1rem 3vw 1rem;
          background: linear-gradient(135deg, #0b2027 0%, #07151d 100%);
          overflow: hidden;
          margin-bottom: 0;
        }

        .shop-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(79,216,196,0.15), transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(79,216,196,0.08), transparent 40%);
          pointer-events: none;
        }

        .shop-hero-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .shop-hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .shop-hero-text h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 650;
          line-height: 1.1;
          color: white;
          margin-bottom: 1.2rem;
        }

        .shop-hero-text h1 .highlight {
          color: #4fd8c4;
          position: relative;
        }

        .shop-hero-text h1 .highlight::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          height: 4px;
          background: #4fd8c4;
          border-radius: 2px;
          opacity: 0.3;
        }

        .shop-hero-text p {
          color: rgba(234,246,246,0.8);
          font-size: 1.1rem;
          line-height: 1.7;
          max-width: 40ch;
          margin-bottom: 2rem;
        }

        .shop-hero-stats {
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .shop-hero-stats .stat {
          display: flex;
          flex-direction: column;
        }

        .shop-hero-stats .stat .number {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.8rem;
          font-weight: 500;
          color: #4fd8c4;
        }

        .shop-hero-stats .stat .label {
          font-size: 0.8rem;
          color: rgba(234,246,246,0.6);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 0.2rem;
        }

        .shop-hero-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .shop-hero-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          display: block;
        }

        .shop-hero-image .floating-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-radius: 14px;
          padding: 1rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .shop-hero-image .floating-badge .icon {
          font-size: 1.8rem;
        }

        .shop-hero-image .floating-badge .text {
          flex: 1;
        }

        .shop-hero-image .floating-badge .text .main {
          font-weight: 600;
          color: #0b2027;
        }

        .shop-hero-image .floating-badge .text .sub {
          font-size: 0.85rem;
          color: rgba(11,32,39,0.6);
        }

        @media (max-width: 768px) {
          .shop-hero-image {
            height: 250px;
          }
          
          .shop-hero-image img {
            height: 250px;
          }
        }

        /* ---------- Shop Container ---------- */
        .shop-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 2rem 4vw 4rem;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2.5rem;
          position: relative;
        }

        @media (max-width: 1024px) {
          .shop-container {
            grid-template-columns: 1fr;
            padding: 1.5rem 4vw 3rem;
          }
        }

        /* ---------- Breadcrumb ---------- */
        .shop-breadcrumb {
          grid-column: 1 / -1;
          font-size: 0.8rem;
          color: var(--ztext-dim);
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--zborder);
          margin-bottom: 0.5rem;
        }

        .shop-breadcrumb span {
          color: var(--ztext);
        }

        .shop-breadcrumb .separator {
          margin: 0 0.5rem;
          color: var(--ztext-dim);
        }

        /* ---------- Sidebar ---------- */
        .shop-sidebar {
          position: sticky;
          top: 2rem;
          align-self: start;
          background: var(--zcard-bg);
          border: 1px solid var(--zborder);
          border-radius: 20px;
          padding: 1.8rem 1.5rem;
          box-shadow: 0 4px 20px rgba(11,32,39,0.06);
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
        }

        .shop-sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .shop-sidebar::-webkit-scrollbar-thumb {
          background: var(--zborder);
          border-radius: 999px;
        }

        @media (max-width: 1024px) {
          .shop-sidebar {
            position: relative;
            top: 0;
            max-height: none;
          }
        }

        .sidebar-title {
          font-family: 'Fraunces', serif;
          font-size: 1.3rem;
          font-weight: 650;
          margin-bottom: 0.3rem;
          color: var(--ztext);
        }

        .sidebar-sub {
          font-size: 0.8rem;
          color: var(--ztext-dim);
          margin-bottom: 1.8rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--zborder);
        }

        .filter-group {
          margin-bottom: 1.8rem;
        }

        .filter-group:last-child {
          margin-bottom: 0;
        }

        .filter-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
          color: var(--ztext-dim);
          margin-bottom: 0.8rem;
          display: block;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--ztext-dim);
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .filter-option:hover {
          color: var(--ztext);
          background: rgba(14,140,127,0.05);
        }

        .filter-option.active {
          color: var(--zaccent);
          background: var(--zicon-bg);
          font-weight: 500;
        }

        .filter-option input[type="radio"] {
          accent-color: var(--zaccent);
          width: 16px;
          height: 16px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .filter-option .count {
          margin-left: auto;
          font-size: 0.7rem;
          color: var(--ztext-dim);
          background: rgba(11,32,39,0.06);
          padding: 0.1rem 0.6rem;
          border-radius: 999px;
          flex-shrink: 0;
        }

        .filter-option.active .count {
          background: rgba(14,140,127,0.12);
          color: var(--zaccent);
        }

        /* Price Range */
        .price-range-inputs {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.5rem;
        }

        .price-range-inputs input {
          width: 100%;
          padding: 0.5rem 0.7rem;
          border: 1px solid var(--zborder);
          border-radius: 8px;
          font-size: 0.85rem;
          font-family: 'JetBrains Mono', monospace;
          background: var(--sun);
          color: var(--ztext);
          outline: none;
          transition: border-color 0.2s ease;
        }

        .price-range-inputs input:focus {
          border-color: var(--zaccent);
        }

        .price-range-inputs span {
          color: var(--ztext-dim);
          font-size: 0.8rem;
        }

        .price-slider {
          width: 100%;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: var(--zborder);
          border-radius: 2px;
          outline: none;
          margin: 0.8rem 0 0.4rem;
        }

        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--zaccent);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(14,140,127,0.3);
        }

        .price-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--zaccent);
          cursor: pointer;
          border: 2px solid white;
        }

        /* Quick Stats */
        .quick-stats {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--zborder);
        }

        .quick-stats .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--ztext-dim);
          padding: 0.2rem 0;
        }

        .quick-stats .stat-item .emoji {
          font-size: 1rem;
        }

        .quick-stats .stat-item strong {
          color: var(--ztext);
          font-weight: 600;
        }

        /* ---------- Main Content ---------- */
        .shop-main {
          min-width: 0;
        }

        /* Toolbar */
        .shop-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.8rem;
          padding: 1rem 1.2rem;
          background: var(--zcard-bg);
          border: 1px solid var(--zborder);
          border-radius: 16px;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .toolbar-left .results {
          font-size: 0.85rem;
          color: var(--ztext-dim);
        }

        .toolbar-left .results strong {
          color: var(--ztext);
          font-weight: 600;
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .sort-select {
          padding: 0.5rem 0.8rem;
          border: 1px solid var(--zborder);
          border-radius: 10px;
          font-size: 0.85rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--sun);
          color: var(--ztext);
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .sort-select:focus {
          border-color: var(--zaccent);
        }

        .view-toggle {
          display: flex;
          gap: 0.3rem;
          border: 1px solid var(--zborder);
          border-radius: 10px;
          padding: 0.2rem;
          background: var(--sun);
        }

        .view-toggle button {
          padding: 0.4rem 0.6rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          color: var(--ztext-dim);
          transition: all 0.2s ease;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .view-toggle button.active {
          background: var(--zaccent);
          color: white;
        }

        .view-toggle button:hover:not(.active) {
          color: var(--ztext);
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .products-grid.list-view {
          grid-template-columns: 1fr;
        }

        /* Product Card */
        .product-card {
          background: var(--zcard-bg);
          border: 1px solid var(--zborder);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .product-card.list-view {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 600px) {
          .product-card.list-view {
            grid-template-columns: 1fr;
          }
        }

        .product-image {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: var(--sun);
        }

        .product-card.list-view .product-image {
          height: 180px;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-badge {
          position: absolute;
          top: 0.8rem;
          left: 0.8rem;
          padding: 0.2rem 0.8rem;
          border-radius: 999px;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          background: var(--aqua);
          color: var(--abyss);
          z-index: 2;
        }

        .product-badge.sale {
          background: var(--coral);
          color: white;
        }

        .product-badge.premium {
          background: #ffd700;
          color: var(--abyss);
        }

        .product-badge.new {
          background: #6c63ff;
          color: white;
        }

        .product-badge.top-rated {
          background: #ff6b6b;
          color: white;
        }

        .product-badge.best-seller {
          background: #4fd8c4;
          color: var(--abyss);
        }

        .product-wishlist {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--zborder);
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--ztext-dim);
          font-size: 1.2rem;
          z-index: 2;
        }

        .product-wishlist:hover {
          background: white;
          border-color: var(--coral);
          color: var(--coral);
          transform: scale(1.1);
        }

        .product-wishlist.active {
          color: var(--coral);
          border-color: var(--coral);
          background: rgba(255,139,94,0.1);
        }

        .product-info {
          padding: 1.2rem 1.2rem 1.4rem;
        }

        .product-category {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ztext-dim);
          font-weight: 500;
        }

        .product-name {
          font-family: 'Fraunces', serif;
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0.3rem 0 0.4rem;
          color: var(--ztext);
          line-height: 1.3;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--ztext-dim);
        }

        .product-rating .stars {
          color: #f59e0b;
          letter-spacing: 1px;
        }

        .product-rating .count {
          font-size: 0.7rem;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.8rem;
          padding-top: 0.8rem;
          border-top: 1px solid var(--zborder);
        }

        .product-price {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--zaccent);
        }

        .product-price .original {
          font-size: 0.8rem;
          color: var(--ztext-dim);
          text-decoration: line-through;
          margin-left: 0.4rem;
          font-weight: 400;
        }

        .add-to-cart {
          padding: 0.5rem 1.2rem;
          border: none;
          border-radius: 10px;
          background: var(--zaccent);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .add-to-cart:hover {
          background: var(--aqua-deep);
          transform: scale(1.05);
        }

        .add-to-cart:active {
          transform: scale(0.95);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--ztext-dim);
          background: var(--zcard-bg);
          border-radius: 16px;
          border: 1px solid var(--zborder);
        }

        .empty-state .icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-family: 'Fraunces', serif;
          font-size: 1.3rem;
          color: var(--ztext);
          margin-bottom: 0.5rem;
        }

        .empty-state .clear-filters {
          margin-top: 1.2rem;
          padding: 0.6rem 1.5rem;
          border: 1px solid var(--zborder);
          border-radius: 10px;
          background: transparent;
          color: var(--ztext);
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.2s ease;
        }

        .empty-state .clear-filters:hover {
          background: var(--zaccent);
          color: white;
          border-color: var(--zaccent);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1rem;
          }

          .product-image {
            height: 160px;
          }

          .product-info {
            padding: 0.8rem 0.8rem 1rem;
          }

          .product-name {
            font-size: 0.9rem;
          }

          .shop-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 0.8rem;
          }

          .toolbar-left,
          .toolbar-right {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
          }

          .product-image {
            height: 140px;
          }

          .product-price {
            font-size: 0.9rem;
          }

          .add-to-cart {
            padding: 0.3rem 0.7rem;
            font-size: 0.7rem;
          }

          .shop-container {
            padding: 1rem 3vw 2rem;
          }
        }

        /* Scrollbar */
        .shop-root ::-webkit-scrollbar {
          width: 6px;
        }

        .shop-root ::-webkit-scrollbar-track {
          background: var(--sun);
        }

        .shop-root ::-webkit-scrollbar-thumb {
          background: var(--zborder);
          border-radius: 999px;
        }

        .shop-root ::-webkit-scrollbar-thumb:hover {
          background: var(--zaccent);
        }
      `}</style>

      {/* ===================== HERO HEADER ===================== */}
      <section className="shop-hero">
        <div className="text-center">
          <motion.div 
            className="shop-hero-text"
            ref={headerRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1>
              Our <span className="highlight">Fish</span> Products
            </h1>
          </motion.div>

  
        </div>
      </section>

      {/* ===================== SHOP CONTENT ===================== */}
      <div className="shop-container">
        {/* Breadcrumb */}
        <motion.div 
          className="shop-breadcrumb"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🏠 Home <span className="separator">/</span> <span>Shop</span>
        </motion.div>

        {/* Sidebar */}
        <motion.aside 
          className="shop-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="sidebar-title font-display">Filters</h3>
          <p className="sidebar-sub">Narrow down your search</p>

          {/* Category Filter */}
          <div className="filter-group">
            <span className="filter-label font-mono">Category</span>
            <div className="filter-options">
              <AnimatePresence>
                {categories.map((cat, index) => {
                  const count = products.filter(p => cat === "All" || p.category === cat).length;
                  return (
                    <motion.label 
                      key={cat} 
                      className={`filter-option ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <input type="radio" name="category" checked={selectedCategory === cat} readOnly />
                      <span>{cat}</span>
                      <span className="count">{count}</span>
                    </motion.label>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <span className="filter-label font-mono">Price Range</span>
            <input 
              type="range" 
              className="price-slider"
              min="0" 
              max="500" 
              value={priceRange[1]} 
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <div className="price-range-inputs">
              <input 
                type="number" 
                value={priceRange[0]} 
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                min="0"
              />
              <span>—</span>
              <input 
                type="number" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                max="500"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <motion.div 
            className="quick-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="filter-label font-mono">Quick Stats</span>
            <div className="stat-item">
              <span className="emoji">🟢</span>
              <span><strong>{filteredProducts.length}</strong> products found</span>
            </div>
            <div className="stat-item">
              <span className="emoji">⭐</span>
              <span>Avg. rating: <strong>{(filteredProducts.reduce((acc, p) => acc + p.rating, 0) / filteredProducts.length || 0).toFixed(1)}</strong></span>
            </div>
            <div className="stat-item">
              <span className="emoji">💵</span>
              <span>Avg. price: <strong>${(filteredProducts.reduce((acc, p) => acc + p.price, 0) / filteredProducts.length || 0).toFixed(0)}</strong></span>
            </div>
          </motion.div>
        </motion.aside>

        {/* Main Content */}
        <main className="shop-main">
          {/* Toolbar */}
          <motion.div 
            className="shop-toolbar"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="toolbar-left">
              <span className="results"><strong>{sortedProducts.length}</strong> results</span>
            </div>
            <div className="toolbar-right">
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Sort: Price Low–High</option>
                <option value="price-high">Sort: Price High–Low</option>
                <option value="rating">Sort: Top Rated</option>
              </select>
              <div className="view-toggle">
                <motion.button 
                  className={viewMode === 'grid' ? 'active' : ''} 
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⊞
                </motion.button>
                <motion.button 
                  className={viewMode === 'list' ? 'active' : ''} 
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ≡
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Products */}
          <AnimatePresence mode="wait">
            {sortedProducts.length > 0 ? (
              <motion.div 
                key={selectedCategory + priceRange[1] + sortBy + viewMode}
                className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedProducts.map((product, index) => (
                  <motion.div 
                    key={product.id} 
                    className={`product-card ${viewMode === 'list' ? 'list-view' : ''}`}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="product-image">
                      <motion.img 
                        src={product.image} 
                        alt={product.name} 
                        loading="lazy"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                      />
                      {product.badge && (
                        <motion.span 
                          className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                        >
                          {product.badge}
                        </motion.span>
                      )}
                      <motion.button 
                        className={`product-wishlist ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Add to wishlist"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {wishlist.includes(product.id) ? '♥' : '♡'}
                      </motion.button>
                    </div>
                    <div className="product-info">
                      <div className="product-category font-mono">{product.category}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        <span className="stars">★ {product.rating}</span>
                        <span className="count">({product.reviews} reviews)</span>
                      </div>
                      <div className="product-footer">
                        <span className="product-price">
                          ${product.price.toFixed(2)}
                          {product.badge === 'Sale' && <span className="original">${(product.price * 1.2).toFixed(2)}</span>}
                        </span>
                        <motion.button 
                          className="add-to-cart"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div 
                  className="icon"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  🐠
                </motion.div>
                <h3>No fish found</h3>
                <p>Try adjusting your filters — there's a whole ocean out there.</p>
                <motion.button 
                  className="clear-filters" 
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 500]);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Shop;