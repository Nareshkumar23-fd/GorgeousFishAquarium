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
          --abyss: #0a0f1a;
          --deep: #141e2b;
          --mid: #1a2a36;
          --surface: #f0f4f8;
          --pearl: #e8edf2;
          --gold: #c9a84c;
          --gold-light: #e8d5a3;
          --teal: #2a9d8f;
          --teal-dark: #1a7a6e;
          --coral: #e76f51;
          --rose: #f4a261;
          --cream: #faf6ef;
          --ink: #0a0f1a;
          --ink-light: #2a3a4a;
          --border: rgba(10,15,26,0.08);
          --card-bg: #ffffff;
          --shadow: rgba(10,15,26,0.06);
          
          background: var(--surface);
          color: var(--ink);
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .shop-root .font-display { font-family: 'Fraunces', serif; }
        .shop-root .font-mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }

        /* ============================================================
           HERO SECTION - SIMPLE CENTERED
           ============================================================ */
        .shop-hero {
          position: relative;
          padding: 4rem 4vw 3.5rem;
          background: linear-gradient(135deg, #0a0f1a 0%, #1a2a36 50%, #0a0f1a 100%);
          overflow: hidden;
          margin-bottom: 0;
          text-align: center;
        }

        .shop-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 50% 50%, rgba(42,157,143,0.15), transparent 60%),
            radial-gradient(circle at 30% 80%, rgba(201,168,76,0.1), transparent 40%),
            radial-gradient(circle at 70% 20%, rgba(231,111,81,0.08), transparent 40%);
          pointer-events: none;
        }

        /* Decorative line at bottom */
        .shop-hero::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          max-width: 400px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--teal), transparent);
          pointer-events: none;
        }

        .shop-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .shop-hero-text h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 650;
          line-height: 1.1;
          color: white;
          margin-bottom: 0.5rem;
        }

        .shop-hero-text h1 .highlight {
          background: linear-gradient(135deg, #c9a84c, #f4a261);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .shop-hero-text .subtitle {
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
        }

        .shop-hero-text .subtitle span {
          color: rgba(255,255,255,0.2);
          margin: 0 0.5rem;
        }

        /* ============================================================
           SHOP CONTAINER
           ============================================================ */
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
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .shop-container {
            padding: 1rem 3vw 2rem;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .shop-container {
            padding: 0.8rem 2vw 1.5rem;
            gap: 0.8rem;
          }
        }

        /* ============================================================
           BREADCRUMB
           ============================================================ */
        .shop-breadcrumb {
          grid-column: 1 / -1;
          font-size: 0.75rem;
          color: var(--ink-light);
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--gold);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .shop-breadcrumb .home-icon {
          font-size: 0.9rem;
          margin-right: 0.2rem;
        }

        .shop-breadcrumb span {
          color: var(--ink);
          font-weight: 600;
        }

        .shop-breadcrumb .separator {
          margin: 0 0.3rem;
          color: var(--gold);
          font-weight: 300;
        }

        .shop-breadcrumb .current {
          color: var(--gold);
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .shop-breadcrumb {
            font-size: 0.65rem;
            padding-bottom: 0.7rem;
          }
        }

        /* ============================================================
           SIDEBAR
           ============================================================ */
        .shop-sidebar {
          position: sticky;
          top: 2rem;
          align-self: start;
          background: var(--card-bg);
          border: 1px solid var(--border);
          padding: 1.8rem 1.5rem;
          box-shadow: 0 4px 30px var(--shadow);
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
          position: relative;
        }

        .shop-sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--gold), var(--teal), var(--coral));
        }

        .shop-sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .shop-sidebar::-webkit-scrollbar-thumb {
          background: var(--gold);
        }

        @media (max-width: 1024px) {
          .shop-sidebar {
            position: relative;
            top: 0;
            max-height: none;
            padding: 1.5rem 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .shop-sidebar {
            padding: 1rem 0.8rem;
          }
        }

        .sidebar-title {
          font-family: 'Fraunces', serif;
          font-size: 1.3rem;
          font-weight: 650;
          margin-bottom: 0.2rem;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sidebar-title::after {
          content: '⚡';
          font-size: 0.9rem;
        }

        .sidebar-sub {
          font-size: 0.75rem;
          color: var(--ink-light);
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
          opacity: 0.7;
        }

        @media (max-width: 480px) {
          .sidebar-title {
            font-size: 1.1rem;
          }
          .sidebar-sub {
            font-size: 0.65rem;
            margin-bottom: 1rem;
            padding-bottom: 0.7rem;
          }
        }

        .filter-group {
          margin-bottom: 1.5rem;
        }

        .filter-group:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 480px) {
          .filter-group {
            margin-bottom: 1rem;
          }
        }

        .filter-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
          color: var(--ink-light);
          margin-bottom: 0.6rem;
          display: block;
          position: relative;
          padding-left: 0.7rem;
        }

        .filter-label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 12px;
          background: var(--gold);
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--ink-light);
          padding: 0.4rem 0.6rem;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .filter-option:hover {
          color: var(--ink);
          background: rgba(201,168,76,0.06);
        }

        .filter-option.active {
          color: var(--gold);
          background: rgba(201,168,76,0.08);
          border-left-color: var(--gold);
          font-weight: 600;
        }

        .filter-option input[type="radio"] {
          accent-color: var(--gold);
          width: 14px;
          height: 14px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .filter-option .count {
          margin-left: auto;
          font-size: 0.65rem;
          color: var(--ink-light);
          background: rgba(10,15,26,0.05);
          padding: 0.05rem 0.6rem;
          flex-shrink: 0;
          font-weight: 500;
        }

        .filter-option.active .count {
          background: rgba(201,168,76,0.12);
          color: var(--gold);
        }

        @media (max-width: 480px) {
          .filter-option {
            font-size: 0.75rem;
            padding: 0.3rem 0.4rem;
          }
          .filter-option input[type="radio"] {
            width: 12px;
            height: 12px;
          }
        }

        /* Price Range */
        .price-range-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.4rem;
        }

        .price-range-inputs input {
          width: 100%;
          padding: 0.4rem 0.6rem;
          border: 1px solid var(--border);
          font-size: 0.8rem;
          font-family: 'JetBrains Mono', monospace;
          background: var(--surface);
          color: var(--ink);
          outline: none;
          transition: all 0.2s ease;
        }

        .price-range-inputs input:focus {
          border-color: var(--gold);
          box-shadow: inset 0 0 0 2px rgba(201,168,76,0.1);
        }

        .price-range-inputs span {
          color: var(--ink-light);
          font-size: 0.75rem;
        }

        @media (max-width: 480px) {
          .price-range-inputs input {
            font-size: 0.7rem;
            padding: 0.3rem 0.4rem;
          }
        }

        .price-slider {
          width: 100%;
          height: 5px;
          -webkit-appearance: none;
          appearance: none;
          background: linear-gradient(90deg, var(--gold), var(--teal));
          outline: none;
          margin: 0.6rem 0 0.3rem;
        }

        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: var(--gold);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(201,168,76,0.3);
        }

        .price-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: var(--gold);
          cursor: pointer;
          border: 2px solid white;
        }

        /* Quick Stats */
        .quick-stats {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 2px dashed var(--border);
        }

        .quick-stats .stat-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.75rem;
          color: var(--ink-light);
          padding: 0.25rem 0;
        }

        .quick-stats .stat-item .icon-box {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201,168,76,0.08);
          font-size: 0.8rem;
        }

        .quick-stats .stat-item strong {
          color: var(--ink);
          font-weight: 700;
        }

        @media (max-width: 480px) {
          .quick-stats {
            margin-top: 1rem;
            padding-top: 1rem;
          }
          .quick-stats .stat-item {
            font-size: 0.65rem;
          }
        }

        /* ============================================================
           MAIN CONTENT
           ============================================================ */
        .shop-main {
          min-width: 0;
        }

        /* Toolbar */
        .shop-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
          padding: 0.8rem 1.2rem;
          background: var(--card-bg);
          border: 1px solid var(--border);
          box-shadow: 0 2px 20px var(--shadow);
          position: relative;
        }

        .shop-toolbar::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--teal), var(--gold));
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .toolbar-left .results {
          font-size: 0.8rem;
          color: var(--ink-light);
        }

        .toolbar-left .results strong {
          color: var(--gold);
          font-weight: 700;
          font-size: 1rem;
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .sort-select {
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border);
          font-size: 0.8rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--surface);
          color: var(--ink);
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23c9a84c'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.6rem center;
          padding-right: 2rem;
        }

        .sort-select:focus {
          border-color: var(--gold);
          box-shadow: inset 0 0 0 2px rgba(201,168,76,0.1);
        }

        .view-toggle {
          display: flex;
          gap: 0;
          border: 1px solid var(--border);
          padding: 0;
          background: var(--surface);
        }

        .view-toggle button {
          padding: 0.35rem 0.6rem;
          border: none;
          background: transparent;
          cursor: pointer;
          color: var(--ink-light);
          transition: all 0.2s ease;
          font-size: 0.8rem;
          font-weight: 500;
          position: relative;
        }

        .view-toggle button.active {
          background: var(--gold);
          color: white;
        }

        .view-toggle button:hover:not(.active) {
          color: var(--ink);
          background: rgba(201,168,76,0.06);
        }

        @media (max-width: 768px) {
          .shop-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 0.6rem;
            padding: 0.6rem 1rem;
          }
          
          .toolbar-left,
          .toolbar-right {
            justify-content: center;
          }
          
          .toolbar-left .results {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .shop-toolbar {
            padding: 0.5rem 0.6rem;
            gap: 0.4rem;
          }
          
          .sort-select {
            font-size: 0.7rem;
            padding: 0.3rem 0.6rem;
            padding-right: 1.6rem;
          }
          
          .view-toggle button {
            font-size: 0.7rem;
            padding: 0.25rem 0.4rem;
          }
          
          .toolbar-left .results strong {
            font-size: 0.85rem;
          }
        }

        /* ============================================================
           PRODUCTS GRID
           ============================================================ */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .products-grid.list-view {
          grid-template-columns: 1fr;
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.7rem;
          }
        }

        /* Product Card */
        .product-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          box-shadow: 0 8px 40px rgba(201,168,76,0.12);
          transform: translateY(-4px);
        }

        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--teal), var(--gold));
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
          z-index: 5;
        }

        .product-card.list-view {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 0;
        }

        @media (max-width: 600px) {
          .product-card.list-view {
            grid-template-columns: 1fr;
          }
        }

        .product-image {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: var(--surface);
        }

        .product-card.list-view .product-image {
          height: 100%;
          min-height: 200px;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .product-image:hover img {
          transform: scale(1.08);
        }

        @media (max-width: 768px) {
          .product-image {
            height: 180px;
          }
        }

        @media (max-width: 480px) {
          .product-image {
            height: 140px;
          }
        }

        /* Product Badge */
        .product-badge {
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          padding: 0.2rem 0.7rem;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: var(--gold);
          color: white;
          z-index: 2;
        }

        .product-badge.sale {
          background: var(--coral);
        }

        .product-badge.premium {
          background: #2d3436;
          color: var(--gold);
        }

        .product-badge.new {
          background: var(--teal);
        }

        .product-badge.top-rated {
          background: #6c5ce7;
        }

        .product-badge.best-seller {
          background: var(--gold);
          color: var(--ink);
        }

        @media (max-width: 480px) {
          .product-badge {
            font-size: 0.45rem;
            padding: 0.15rem 0.5rem;
            top: 0.4rem;
            left: 0.4rem;
          }
        }

        /* Wishlist button */
        .product-wishlist {
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--ink-light);
          font-size: 1.1rem;
          z-index: 2;
          backdrop-filter: blur(4px);
        }

        .product-wishlist:hover {
          background: white;
          border-color: var(--coral);
          color: var(--coral);
          transform: scale(1.1) rotate(-5deg);
        }

        .product-wishlist.active {
          color: var(--coral);
          border-color: var(--coral);
          background: rgba(231,111,81,0.08);
        }

        @media (max-width: 480px) {
          .product-wishlist {
            width: 28px;
            height: 28px;
            font-size: 0.9rem;
            top: 0.4rem;
            right: 0.4rem;
          }
        }

        .product-info {
          padding: 1rem 1.2rem 1.2rem;
        }

        @media (max-width: 480px) {
          .product-info {
            padding: 0.6rem 0.6rem 0.8rem;
          }
        }

        .product-category {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gold);
          font-weight: 600;
        }

        .product-name {
          font-family: 'Fraunces', serif;
          font-size: 1rem;
          font-weight: 600;
          margin: 0.2rem 0 0.3rem;
          color: var(--ink);
          line-height: 1.3;
        }

        @media (max-width: 480px) {
          .product-name {
            font-size: 0.85rem;
          }
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: var(--ink-light);
        }

        .product-rating .stars {
          color: var(--gold);
          letter-spacing: 1px;
        }

        .product-rating .count {
          font-size: 0.65rem;
          opacity: 0.7;
        }

        @media (max-width: 480px) {
          .product-rating {
            font-size: 0.65rem;
          }
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.6rem;
          padding-top: 0.6rem;
          border-top: 1px solid var(--border);
        }

        .product-price {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--teal);
        }

        .product-price .original {
          font-size: 0.7rem;
          color: var(--ink-light);
          text-decoration: line-through;
          margin-left: 0.3rem;
          font-weight: 400;
        }

        @media (max-width: 480px) {
          .product-price {
            font-size: 0.85rem;
          }
          .product-price .original {
            font-size: 0.6rem;
          }
        }

        .add-to-cart {
          padding: 0.4rem 1.2rem;
          border: none;
          background: var(--gold);
          color: var(--ink);
          font-size: 0.7rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.04em;
          position: relative;
          overflow: hidden;
        }

        .add-to-cart::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg) translateX(-100%);
          transition: transform 0.6s ease;
        }

        .add-to-cart:hover::after {
          transform: rotate(45deg) translateX(100%);
        }

        .add-to-cart:hover {
          background: var(--teal);
          color: white;
          transform: scale(1.02);
        }

        .add-to-cart:active {
          transform: scale(0.95);
        }

        @media (max-width: 480px) {
          .add-to-cart {
            padding: 0.25rem 0.7rem;
            font-size: 0.6rem;
          }
        }

        /* ============================================================
           EMPTY STATE
           ============================================================ */
        .empty-state {
          text-align: center;
          padding: 3rem 1.5rem;
          color: var(--ink-light);
          background: var(--card-bg);
          border: 1px solid var(--border);
          position: relative;
        }

        .empty-state::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--gold), var(--teal), var(--coral));
        }

        .empty-state .icon {
          font-size: 3.5rem;
          margin-bottom: 0.8rem;
          display: inline-block;
        }

        .empty-state h3 {
          font-family: 'Fraunces', serif;
          font-size: 1.2rem;
          color: var(--ink);
          margin-bottom: 0.4rem;
        }

        .empty-state p {
          font-size: 0.85rem;
        }

        .empty-state .clear-filters {
          margin-top: 1rem;
          padding: 0.6rem 1.5rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .empty-state .clear-filters:hover {
          background: var(--gold);
          color: white;
          border-color: var(--gold);
        }

        @media (max-width: 480px) {
          .empty-state {
            padding: 2rem 1rem;
          }
          .empty-state .icon {
            font-size: 2.5rem;
          }
          .empty-state h3 {
            font-size: 1rem;
          }
          .empty-state p {
            font-size: 0.75rem;
          }
        }

        /* ============================================================
           SCROLLBAR
           ============================================================ */
        .shop-root ::-webkit-scrollbar {
          width: 6px;
        }

        .shop-root ::-webkit-scrollbar-track {
          background: var(--surface);
        }

        .shop-root ::-webkit-scrollbar-thumb {
          background: var(--gold);
        }

        .shop-root ::-webkit-scrollbar-thumb:hover {
          background: var(--teal);
        }
      `}</style>

      {/* ===================== HERO SECTION ===================== */}
      <section className="shop-hero">
        <div className="shop-hero-content">
          <motion.div 
            className="shop-hero-text"
            ref={headerRef}
            initial={{ opacity: 0, y: -20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1>
              Premium <span className="highlight">Fish</span> Selection
            </h1>
            <div className="subtitle">
              <span>✦</span> Curated Collection <span>✦</span>
            </div>
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
          <span className="home-icon">⌂</span>
          Home <span className="separator">/</span>
          <span>Shop</span> <span className="separator">/</span>
          <span className="current">All Products</span>
        </motion.div>

        {/* Sidebar */}
        <motion.aside 
          className="shop-sidebar"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="sidebar-title font-display">Filters</h3>
          <p className="sidebar-sub">Refine your selection</p>

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
            <span className="filter-label font-mono">Overview</span>
            <div className="stat-item">
              <span className="icon-box">📦</span>
              <span><strong>{filteredProducts.length}</strong> products</span>
            </div>
            <div className="stat-item">
              <span className="icon-box">⭐</span>
              <span>Avg: <strong>{(filteredProducts.reduce((acc, p) => acc + p.rating, 0) / filteredProducts.length || 0).toFixed(1)}</strong> stars</span>
            </div>
            <div className="stat-item">
              <span className="icon-box">💰</span>
              <span>Avg: <strong>${(filteredProducts.reduce((acc, p) => acc + p.price, 0) / filteredProducts.length || 0).toFixed(0)}</strong></span>
            </div>
            <div className="stat-item">
              <span className="icon-box">❤️</span>
              <span><strong>{wishlist.length}</strong> wishlisted</span>
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
              <span className="results">Showing <strong>{sortedProducts.length}</strong> of {products.length} products</span>
            </div>
            <div className="toolbar-right">
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Sort by: Price ↑</option>
                <option value="price-high">Sort by: Price ↓</option>
                <option value="rating">Sort by: Rating</option>
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
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  🐠
                </motion.div>
                <h3>No fish match your criteria</h3>
                <p>Try adjusting your filters or explore our full collection.</p>
                <motion.button 
                  className="clear-filters" 
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 500]);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
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