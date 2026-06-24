import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

const WishListModal = ({ isOpen, onClose }) => {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: 'Premium Goldfish',
            price: 24.99,
            image: 'https://via.placeholder.com/80x80/2a9d8f/ffffff?text=Fish',
            category: 'Live Fish',
            inStock: true
        },
        {
            id: 2,
            name: 'Aquarium Tank 20L',
            price: 89.99,
            image: 'https://via.placeholder.com/80x80/2a9d8f/ffffff?text=Tank',
            category: 'Tanks',
            inStock: true
        },
        {
            id: 3,
            name: 'Fish Food Premium',
            price: 12.50,
            image: 'https://via.placeholder.com/80x80/2a9d8f/ffffff?text=Food',
            category: 'Accessories',
            inStock: false
        },
        {
            id: 4,
            name: 'Neon Tetras (Set of 6)',
            price: 18.99,
            image: 'https://via.placeholder.com/80x80/2a9d8f/ffffff?text=Neon',
            category: 'Live Fish',
            inStock: true
        }
    ]);

    const removeFromWishlist = (id) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    const addToCart = (id) => {
        // Simulate adding to cart
        console.log('Added to cart:', id);
        // You can also remove from wishlist after adding to cart
        // setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="wishlist-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div
                            className="wishlist-modal"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <style>{`
                /* ── NO BORDER RADIUS ANYWHERE ── */
                .wishlist-modal * {
                  border-radius: 0 !important;
                }

                .wishlist-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(7, 21, 29, 0.6);
                  backdrop-filter: blur(4px);
                  z-index: 1000;
                  display: flex;
                  justify-content: flex-end;
                }

                .wishlist-modal {
                  background: #ffffff;
                  width: 100%;
                  max-width: 580px;
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.1);
                }

                /* Header */
                .wishlist-header {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 1.5rem 1.5rem 1rem;
                  border-bottom: 2px solid #f0f4f8;
                  flex-shrink: 0;
                }

                .wishlist-header-left {
                  display: flex;
                  align-items: center;
                  gap: 0.75rem;
                }

                .wishlist-header-left h2 {
                  font-family: 'Fraunces', serif;
                  font-size: 1.4rem;
                  font-weight: 650;
                  color: #0a0f1a;
                  margin: 0;
                }

                .wishlist-header-left .item-count {
                  font-size: 0.75rem;
                  color: #6b7b8b;
                  font-family: 'JetBrains Mono', monospace;
                  background: #f0f4f8;
                  padding: 0.15rem 0.6rem;
                }

                .wishlist-close {
                  background: transparent;
                  border: none;
                  color: #6b7b8b;
                  cursor: pointer;
                  padding: 0.4rem;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }

                .wishlist-close:hover {
                  color: #0a0f1a;
                  background: #f0f4f8;
                }

                .wishlist-close svg {
                  width: 24px;
                  height: 24px;
                }

                /* Wishlist Items */
                .wishlist-items {
                  flex: 1;
                  overflow-y: auto;
                  padding: 1rem 1.5rem;
                }

                .wishlist-items::-webkit-scrollbar {
                  width: 4px;
                }

                .wishlist-items::-webkit-scrollbar-track {
                  background: #f0f4f8;
                }

                .wishlist-items::-webkit-scrollbar-thumb {
                  background: #2a9d8f;
                }

                .wishlist-item {
                  display: flex;
                  gap: 1rem;
                  padding: 1rem 0;
                  border-bottom: 1px solid #f0f4f8;
                  align-items: center;
                }

                .wishlist-item:last-child {
                  border-bottom: none;
                }

                .wishlist-item-image {
                  width: 70px;
                  height: 70px;
                  background: #f0f4f8;
                  flex-shrink: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  position: relative;
                }

                .wishlist-item-image img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }

                .wishlist-item-image .placeholder-icon {
                  color: #94a3b8;
                  font-size: 1.5rem;
                }

                .wishlist-item-image .out-of-stock-badge {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  background: rgba(231, 111, 81, 0.9);
                  color: white;
                  font-size: 0.55rem;
                  font-weight: 700;
                  text-transform: uppercase;
                  text-align: center;
                  padding: 0.15rem 0;
                  font-family: 'JetBrains Mono', monospace;
                  letter-spacing: 0.06em;
                }

                .wishlist-item-details {
                  flex: 1;
                  min-width: 0;
                }

                .wishlist-item-name {
                  font-family: 'Fraunces', serif;
                  font-size: 0.95rem;
                  font-weight: 600;
                  color: #0a0f1a;
                  margin-bottom: 0.15rem;
                }

                .wishlist-item-category {
                  font-size: 0.7rem;
                  color: #94a3b8;
                  text-transform: uppercase;
                  letter-spacing: 0.06em;
                  font-family: 'JetBrains Mono', monospace;
                }

                .wishlist-item-price {
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.95rem;
                  font-weight: 600;
                  color: #2a9d8f;
                  margin-top: 0.2rem;
                }

                .wishlist-item-actions {
                  display: flex;
                  flex-direction: column;
                  gap: 0.4rem;
                  flex-shrink: 0;
                }

                .wishlist-cart-btn {
                  padding: 0.3rem 0.8rem;
                  background: #2a9d8f;
                  color: white;
                  border: none;
                  font-size: 0.65rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  letter-spacing: 0.04em;
                  text-transform: uppercase;
                  white-space: nowrap;
                  display: flex;
                  align-items: center;
                  gap: 0.3rem;
                }

                .wishlist-cart-btn:hover:not(:disabled) {
                  background: #1a7a6e;
                  transform: scale(1.05);
                }

                .wishlist-cart-btn:disabled {
                  opacity: 0.4;
                  cursor: not-allowed;
                  transform: none;
                }

                .wishlist-cart-btn svg {
                  width: 14px;
                  height: 14px;
                }

                .wishlist-remove-btn {
                  background: transparent;
                  border: none;
                  color: #94a3b8;
                  cursor: pointer;
                  padding: 0.2rem;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 0.7rem;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                }

                .wishlist-remove-btn:hover {
                  color: #e76f51;
                }

                .wishlist-remove-btn svg {
                  width: 16px;
                  height: 16px;
                }

                /* Empty State */
                .wishlist-empty {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 2rem;
                  text-align: center;
                }

                .wishlist-empty .empty-icon {
                  font-size: 4rem;
                  margin-bottom: 1rem;
                }

                .wishlist-empty h3 {
                  font-family: 'Fraunces', serif;
                  font-size: 1.3rem;
                  color: #0a0f1a;
                  margin-bottom: 0.5rem;
                }

                .wishlist-empty p {
                  color: #6b7b8b;
                  font-size: 0.9rem;
                }

                .wishlist-empty .shop-now-btn {
                  margin-top: 1.5rem;
                  padding: 0.7rem 2rem;
                  background: #2a9d8f;
                  color: white;
                  border: none;
                  font-size: 0.8rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  text-transform: uppercase;
                  letter-spacing: 0.06em;
                }

                .wishlist-empty .shop-now-btn:hover {
                  background: #1a7a6e;
                  transform: translateY(-2px);
                }

                /* Responsive */
                @media (max-width: 480px) {
                  .wishlist-modal {
                    max-width: 100%;
                  }

                  .wishlist-header {
                    padding: 1rem 1rem 0.8rem;
                  }

                  .wishlist-header-left h2 {
                    font-size: 1.2rem;
                  }

                  .wishlist-items {
                    padding: 0.8rem 1rem;
                  }

                  .wishlist-item {
                    padding: 0.8rem 0;
                  }

                  .wishlist-item-image {
                    width: 56px;
                    height: 56px;
                  }

                  .wishlist-item-name {
                    font-size: 0.85rem;
                  }

                  .wishlist-item-price {
                    font-size: 0.85rem;
                  }

                  .wishlist-cart-btn {
                    font-size: 0.55rem;
                    padding: 0.2rem 0.6rem;
                  }

                  .wishlist-cart-btn svg {
                    width: 12px;
                    height: 12px;
                  }
                }
              `}</style>

                            {/* Header */}
                            <div className="wishlist-header">
                                <div className="wishlist-header-left">
                                    <h2>Wishlist</h2>
                                    <span className="item-count">{wishlistItems.length} items</span>
                                </div>
                                <button className="wishlist-close" onClick={onClose}>
                                    <X />
                                </button>
                            </div>

                            {/* Wishlist Items */}
                            {wishlistItems.length > 0 ? (
                                <div className="wishlist-items">
                                    {wishlistItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="wishlist-item"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            layout
                                        >
                                            <div className="wishlist-item-image">
                                                <img src={item.image} alt={item.name} />
                                                {!item.inStock && (
                                                    <div className="out-of-stock-badge">Out of Stock</div>
                                                )}
                                            </div>

                                            <div className="wishlist-item-details">
                                                <div className="wishlist-item-name">{item.name}</div>
                                                <div className="wishlist-item-category">{item.category}</div>
                                                <div className="wishlist-item-price">
                                                    ${item.price.toFixed(2)}
                                                </div>
                                            </div>

                                            <div className="wishlist-item-actions">
                                                <button
                                                    className="wishlist-cart-btn"
                                                    onClick={() => addToCart(item.id)}
                                                    disabled={!item.inStock}
                                                >
                                                    <ShoppingCart size={14} />
                                                    {item.inStock ? 'Add' : 'Unavailable'}
                                                </button>
                                                <button
                                                    className="wishlist-remove-btn"
                                                    onClick={() => removeFromWishlist(item.id)}
                                                >
                                                    <Trash2 />
                                                    Remove
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="wishlist-empty">
                                    <div className="empty-icon">❤️</div>
                                    <h3>Your wishlist is empty</h3>
                                    <p>Start adding your favorite fish and accessories!</p>
                                    <button
                                        className="shop-now-btn"
                                        onClick={onClose}
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WishListModal;