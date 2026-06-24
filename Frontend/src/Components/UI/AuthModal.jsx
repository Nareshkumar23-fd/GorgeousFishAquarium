import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('Login attempt:', { email, password });
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="auth-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="auth-modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <style>{`
                /* ── NO BORDER RADIUS ANYWHERE ── */
                .auth-modal * {
                  border-radius: 0 !important;
                }

                .auth-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(7, 21, 29, 0.8);
                  backdrop-filter: blur(8px);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 1000;
                  padding: 1rem;
                }

                .auth-modal {
                  background: #0c2630;
                  border: 1px solid rgba(79, 216, 196, 0.15);
                  width: 100%;
                  max-width: 400px;
                  padding: 2.5rem 2rem 2rem;
                  position: relative;
                  box-shadow: 0 8px 60px rgba(0, 0, 0, 0.4);
                }

                /* Close button */
                .auth-close {
                  position: absolute;
                  top: 0.8rem;
                  right: 0.8rem;
                  background: transparent;
                  border: none;
                  color: rgba(234, 246, 246, 0.4);
                  cursor: pointer;
                  padding: 0.4rem;
                  transition: all 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }

                .auth-close:hover {
                  color: #4fd8c4;
                  background: rgba(79, 216, 196, 0.08);
                }

                .auth-close svg {
                  width: 22px;
                  height: 22px;
                }

                /* Header */
                .auth-header {
                  text-align: center;
                  margin-bottom: 2rem;
                }

                .auth-title {
                  font-family: 'Fraunces', serif;
                  font-size: 1.8rem;
                  font-weight: 650;
                  color: #eaf6f6;
                  margin-bottom: 0.3rem;
                }

                .auth-subtitle {
                  font-size: 0.85rem;
                  color: rgba(234, 246, 246, 0.5);
                  font-family: 'JetBrains Mono', monospace;
                  letter-spacing: 0.06em;
                }

                /* Form */
                .auth-form {
                  display: flex;
                  flex-direction: column;
                  gap: 1.2rem;
                }

                .auth-field {
                  display: flex;
                  flex-direction: column;
                  gap: 0.4rem;
                }

                .auth-field-label {
                  font-size: 0.7rem;
                  text-transform: uppercase;
                  letter-spacing: 0.08em;
                  color: rgba(234, 246, 246, 0.4);
                  font-family: 'JetBrains Mono', monospace;
                }

                .auth-input-wrapper {
                  position: relative;
                  display: flex;
                  align-items: center;
                  border: 1px solid rgba(234, 246, 246, 0.12);
                  background: rgba(234, 246, 246, 0.04);
                  transition: all 0.3s ease;
                }

                .auth-input-wrapper:focus-within {
                  border-color: #4fd8c4;
                  background: rgba(234, 246, 246, 0.06);
                }

                .auth-input-wrapper .input-icon {
                  padding: 0 0.8rem;
                  color: rgba(234, 246, 246, 0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-shrink: 0;
                }

                .auth-input-wrapper .input-icon svg {
                  width: 18px;
                  height: 18px;
                }

                .auth-input {
                  width: 100%;
                  padding: 0.8rem 0.8rem 0.8rem 0;
                  background: transparent;
                  border: none;
                  outline: none;
                  color: #eaf6f6;
                  font-size: 0.95rem;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                }

                .auth-input::placeholder {
                  color: rgba(234, 246, 246, 0.25);
                }

                /* Error message */
                .auth-error {
                  font-size: 0.75rem;
                  color: #ff6b6b;
                  margin-top: 0.2rem;
                  font-family: 'JetBrains Mono', monospace;
                  letter-spacing: 0.04em;
                }

                /* Submit button */
                .auth-submit {
                  width: 100%;
                  padding: 0.9rem;
                  background: #4fd8c4;
                  color: #07151d;
                  border: none;
                  font-size: 0.9rem;
                  font-weight: 700;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  letter-spacing: 0.06em;
                  text-transform: uppercase;
                  margin-top: 0.5rem;
                  position: relative;
                  overflow: hidden;
                }

                .auth-submit:hover:not(:disabled) {
                  background: #3cc9b5;
                  transform: translateY(-2px);
                }

                .auth-submit:active:not(:disabled) {
                  transform: translateY(0);
                }

                .auth-submit:disabled {
                  opacity: 0.6;
                  cursor: not-allowed;
                  transform: none;
                }

                /* Loading spinner */
                .auth-spinner {
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  border: 2px solid rgba(7, 21, 29, 0.2);
                  border-top-color: #07151d;
                  animation: spin 0.7s linear infinite;
                }

                @keyframes spin {
                  to { transform: rotate(360deg); }
                }

                /* Responsive */
                @media (max-width: 480px) {
                  .auth-modal {
                    padding: 2rem 1.2rem 1.5rem;
                    max-width: 340px;
                  }

                  .auth-title {
                    font-size: 1.5rem;
                  }

                  .auth-input {
                    font-size: 0.85rem;
                    padding: 0.7rem 0.7rem 0.7rem 0;
                  }

                  .auth-submit {
                    font-size: 0.8rem;
                    padding: 0.8rem;
                  }
                }
              `}</style>

              {/* Close Button */}
              <button className="auth-close" onClick={onClose}>
                <X />
              </button>

              {/* Header */}
              <div className="auth-header">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your account</p>
              </div>

              {/* Form */}
              <form className="auth-form" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="auth-field">
                  <label className="auth-field-label">Email Address</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">
                      <Mail />
                    </span>
                    <input
                      type="email"
                      className="auth-input"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="auth-field">
                  <label className="auth-field-label">Password</label>
                  <div className="auth-input-wrapper">
                    <span className="input-icon">
                      <Lock />
                    </span>
                    <input
                      type="password"
                      className="auth-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Error */}
                {error && <div className="auth-error">{error}</div>}

                {/* Submit */}
                <button
                  type="submit"
                  className="auth-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="auth-spinner" />
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;