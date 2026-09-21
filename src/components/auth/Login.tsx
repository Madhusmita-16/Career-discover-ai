import React, { useState } from 'react';
import { ArrowRight, Fingerprint } from 'lucide-react';
import './Login.css';

interface Props {
  onLogin: () => void;
}

export const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="login-container">
      {/* Background Animated SVG Elements */}
      <div className="login-background">
        <svg className="bg-blob blob-1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2563EB" d="M45.7,-76.4C58.9,-69.3,69.1,-55.3,77.3,-40.4C85.5,-25.5,91.8,-9.7,91.6,6C91.4,21.7,84.7,37.3,74.5,50.1C64.3,62.9,50.6,72.9,35.4,80.1C20.2,87.3,3.5,91.7,-12.3,90C-28.1,88.3,-43,80.5,-55.8,70C-68.6,59.5,-79.3,46.3,-85.4,31.2C-91.5,16.1,-93,-0.9,-87.7,-16C-82.4,-31.1,-70.3,-44.3,-56.9,-51.9C-43.5,-59.5,-28.8,-61.5,-14.3,-66.3C0.2,-71.1,14.7,-78.7,32.5,-83.4C50.3,-88.1,32.5,-83.5,45.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="bg-blob blob-2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#EFF6FF" d="M42.7,-73.4C54.9,-65.3,64.1,-51.3,71.3,-36.4C78.5,-21.5,83.8,-5.7,81.6,9C79.4,23.7,69.7,37.3,58.5,49.1C47.3,60.9,34.6,70.9,20.4,76.1C6.2,81.3,-9.5,81.7,-24.3,76C-39.1,70.3,-53,58.5,-63.8,45C-74.6,31.5,-82.3,16.3,-84.4,0.2C-86.5,-15.9,-83,-31.9,-73.7,-44.9C-64.4,-57.9,-49.3,-67.9,-34.3,-72.7C-19.3,-77.5,-4.3,-77.1,11.5,-78.4C27.3,-79.7,42.7,-73.4,42.7,-73.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="login-content-wrapper">
        <div className="login-left-panel">
          <div className="brand-logo-large">
            <img 
              src="/careeros-logo.png" 
              alt="CareerOS AI Logo" 
              style={{ width: '64px', height: '64px', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(37,99,235,0.4))' }} 
            />
            <div>
              <h1 className="brand-heading">CareerOS <span style={{ color: '#2563EB' }}>AI</span></h1>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.3px' }}>Your Career, Powered by AI</div>
            </div>
          </div>
          <p className="brand-tagline">
            AI-Powered Career Discovery, Application & Growth Platform.
            Understand requirements, personalize profiles, apply intelligently, and track your career trajectory.
          </p>
          
          <div className="animated-hero-svg">
            <svg viewBox="0 0 400 300" className="hero-svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#1D4ED8', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Document Base */}
              <rect x="80" y="40" width="160" height="220" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" className="svg-doc" />
              <rect x="100" y="70" width="80" height="8" rx="4" fill="#E2E8F0" className="svg-line line-1" />
              <rect x="100" y="90" width="120" height="8" rx="4" fill="#E2E8F0" className="svg-line line-2" />
              <rect x="100" y="110" width="100" height="8" rx="4" fill="#E2E8F0" className="svg-line line-3" />
              
              <rect x="100" y="140" width="120" height="8" rx="4" fill="#E2E8F0" className="svg-line line-4" />
              <rect x="100" y="160" width="90" height="8" rx="4" fill="#E2E8F0" className="svg-line line-5" />
              
              {/* AI Nodes and Connections */}
              <path d="M 240 100 L 290 80 L 330 130 L 280 180 Z" fill="none" stroke="#DBEAFE" strokeWidth="2" className="svg-network-path" />
              <circle cx="240" cy="100" r="6" fill="#2563EB" filter="url(#glow)" className="svg-node node-1" />
              <circle cx="290" cy="80" r="8" fill="#1D4ED8" filter="url(#glow)" className="svg-node node-2" />
              <circle cx="330" cy="130" r="5" fill="#3B82F6" className="svg-node node-3" />
              <circle cx="280" cy="180" r="7" fill="#2563EB" filter="url(#glow)" className="svg-node node-4" />
              
              {/* Scanning laser */}
              <rect x="70" y="120" width="180" height="3" fill="url(#grad1)" className="svg-scanner" filter="url(#glow)" />
            </svg>
          </div>
        </div>

        <div className="login-right-panel">
          <div className="login-card glassmorphic">
            <div className="login-card-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your CareerOS AI workspace</p>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Work Email</label>
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              
              <button type="submit" className="btn-login" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="loader-dots">
                    <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  </span>
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
            
            <div className="sso-divider">
              <span>Or continue with</span>
            </div>
            
            <div className="sso-buttons">
              <button className="btn-sso">
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="btn-sso">
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="#0077b5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>
            
            <div className="login-footer">
              <div className="biometric-hint">
                <Fingerprint size={14} />
                <span>Passkey supported</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
