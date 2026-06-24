import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Goldfish',
      price: 24.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80/2a9d8f/ffffff?text=Fish',
      category: 'Live Fish'
    },
    {
      id: 2,
      name: 'Aquarium Tank 20L',
      price: 89.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80/2a9d8f/ffffff?text=Tank',
      category: 'Tanks'
    },
    {
      id: 3,
      name: 'Fish Food Premium',
      price: 12.50,
      quantity: 2,
      image: 'https://via.placeholder.com/80x80/2a9d8f/ffffff?text=Food',
      category: 'Accessories'
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="cart-modal"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <style>{`
                /* ── NO BORDER RADIUS ANYWHERE ── */
                .cart-modal * {
                  border-radius: 0 !important;
                }

                .cart-overlay {
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

                .cart-modal {
                  background: #ffffff;
                  width: 100%;
                  max-width: 480px;
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.1);
                }

                /* Header */
                .cart-header {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 1.5rem 1.5rem 1rem;
                  border-bottom: 2px solid #f0f4f8;
                  flex-shrink: 0;
                }

                .cart-header-left {
                  display: flex;
                  align-items: center;
                  gap: 0.75rem;
                }

                .cart-header-left h2 {
                  font-family: 'Fraunces', serif;
                  font-size: 1.4rem;
                  font-weight: 650;
                  color: #0a0f1a;
                  margin: 0;
                }

                .cart-header-left .item-count {
                  font-size: 0.75rem;
                  color: #6b7b8b;
                  font-family: 'JetBrains Mono', monospace;
                  background: #f0f4f8;
                  padding: 0.15rem 0.6rem;
                }

                .cart-close {
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

                .cart-close:hover {
                  color: #0a0f1a;
                  background: #f0f4f8;
                }

                .cart-close svg {
                  width: 24px;
                  height: 24px;
                }

                /* Cart Items */
                .cart-items {
                  flex: 1;
                  overflow-y: auto;
                  padding: 1rem 1.5rem;
                }

                .cart-items::-webkit-scrollbar {
                  width: 4px;
                }

                .cart-items::-webkit-scrollbar-track {
                  background: #f0f4f8;
                }

                .cart-items::-webkit-scrollbar-thumb {
                  background: #2a9d8f;
                }

                .cart-item {
                  display: flex;
                  gap: 1rem;
                  padding: 1rem 0;
                  border-bottom: 1px solid #f0f4f8;
                  align-items: center;
                }

                .cart-item:last-child {
                  border-bottom: none;
                }

                .cart-item-image {
                  width: 70px;
                  height: 70px;
                  background: #f0f4f8;
                  flex-shrink: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                }

                .cart-item-image img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }

                .cart-item-image .placeholder-icon {
                  color: #94a3b8;
                  font-size: 1.5rem;
                }

                .cart-item-details {
                  flex: 1;
                  min-width: 0;
                }

                .cart-item-name {
                  font-family: 'Fraunces', serif;
                  font-size: 0.95rem;
                  font-weight: 600;
                  color: #0a0f1a;
                  margin-bottom: 0.15rem;
                }

                .cart-item-category {
                  font-size: 0.7rem;
                  color: #94a3b8;
                  text-transform: uppercase;
                  letter-spacing: 0.06em;
                  font-family: 'JetBrains Mono', monospace;
                }

                .cart-item-price {
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.95rem;
                  font-weight: 600;
                  color: #2a9d8f;
                  margin-top: 0.2rem;
                }

                .cart-item-actions {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  flex-shrink: 0;
                }

                .cart-qty-btn {
                  width: 30px;
                  height: 30px;
                  background: #f0f4f8;
                  border: none;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #4a5a6a;
                  transition: all 0.3s ease;
                  font-size: 1rem;
                }

                .cart-qty-btn:hover {
                  background: #2a9d8f;
                  color: white;
                }

                .cart-qty-btn:disabled {
                  opacity: 0.4;
                  cursor: not-allowed;
                }

                .cart-qty-btn svg {
                  width: 14px;
                  height: 14px;
                }

                .cart-qty-display {
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 0.9rem;
                  font-weight: 600;
                  color: #0a0f1a;
                  min-width: 24px;
                  text-align: center;
                }

                .cart-remove-btn {
                  background: transparent;
                  border: none;
                  color: #94a3b8;
                  cursor: pointer;
                  padding: 0.3rem;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }

                .cart-remove-btn:hover {
                  color: #e76f51;
                  background: rgba(231, 111, 81, 0.08);
                }

                .cart-remove-btn svg {
                  width: 18px;
                  height: 18px;
                }

                /* Empty State */
                .cart-empty {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 2rem;
                  text-align: center;
                }

                .cart-empty .empty-icon {
                  font-size: 4rem;
                  margin-bottom: 1rem;
                }

                .cart-empty h3 {
                  font-family: 'Fraunces', serif;
                  font-size: 1.3rem;
                  color: #0a0f1a;
                  margin-bottom: 0.5rem;
                }

                .cart-empty p {
                  color: #6b7b8b;
                  font-size: 0.9rem;
                }

                /* Footer */
                .cart-footer {
                  border-top: 2px solid #f0f4f8;
                  padding: 1.5rem;
                  flex-shrink: 0;
                  background: #fafcfc;
                }

                .cart-total {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 1rem;
                }

                .cart-total-label {
                  font-size: 0.85rem;
                  font-weight: 600;
                  color: #4a5a6a;
                  text-transform: uppercase;
                  letter-spacing: 0.06em;
                  font-family: 'JetBrains Mono', monospace;
                }

                .cart-total-amount {
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 1.5rem;
                  font-weight: 700;
                  color: #2a9d8f;
                }

                .cart-checkout-btn {
                  width: 100%;
                  padding: 0.9rem;
                  background: #2a9d8f;
                  color: white;
                  border: none;
                  font-size: 0.9rem;
                  font-weight: 700;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  letter-spacing: 0.06em;
                  text-transform: uppercase;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                }

                .cart-checkout-btn:hover {
                  background: #1a7a6e;
                  transform: translateY(-2px);
                }

                .cart-checkout-btn:active {
                  transform: translateY(0);
                }

                .cart-checkout-btn svg {
                  width: 18px;
                  height: 18px;
                }

                /* Responsive */
                @media (max-width: 480px) {
                  .cart-modal {
                    max-width: 100%;
                  }

                  .cart-header {
                    padding: 1rem 1rem 0.8rem;
                  }

                  .cart-header-left h2 {
                    font-size: 1.2rem;
                  }

                  .cart-items {
                    padding: 0.8rem 1rem;
                  }

                  .cart-item {
                    padding: 0.8rem 0;
                  }

                  .cart-item-image {
                    width: 56px;
                    height: 56px;
                  }

                  .cart-item-name {
                    font-size: 0.85rem;
                  }

                  .cart-item-price {
                    font-size: 0.85rem;
                  }

                  .cart-qty-btn {
                    width: 26px;
                    height: 26px;
                  }

                  .cart-qty-btn svg {
                    width: 12px;
                    height: 12px;
                  }

                  .cart-qty-display {
                    font-size: 0.8rem;
                    min-width: 20px;
                  }

                  .cart-footer {
                    padding: 1rem;
                  }

                  .cart-total-amount {
                    font-size: 1.2rem;
                  }

                  .cart-checkout-btn {
                    font-size: 0.8rem;
                    padding: 0.8rem;
                  }
                }
              `}</style>

              {/* Header */}
              <div className="cart-header">
                <div className="cart-header-left">
                  <h2>Your Cart</h2>
                  <span className="item-count">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
                <button className="cart-close" onClick={onClose}>
                  <X />
                </button>
              </div>

              {/* Cart Items */}
              {cartItems.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        <div className="cart-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>

                        <div className="cart-item-details">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-category">{item.category}</div>
                          <div className="cart-item-price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        <div className="cart-item-actions">
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus />
                          </button>
                          <span className="cart-qty-display">{item.quantity}</span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus />
                          </button>
                          <button
                            className="cart-remove-btn"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="cart-footer">
                    <div className="cart-total">
                      <span className="cart-total-label">Total</span>
                      <span className="cart-total-amount">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                    <button className="cart-checkout-btn">
                      <ShoppingBag size={18} />
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              ) : (
                <div className="cart-empty">
                  <div className="empty-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                  <p>Start adding some amazing fish and accessories!</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;