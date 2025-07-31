import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Shield, Sparkles, LogOut } from 'lucide-react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Set your password here - change this to whatever you want
  const SITE_PASSWORD = 'suntiff101';

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authStatus = sessionStorage.getItem('govchime_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAnimating(true);

    // Add a slight delay for smooth animation
    setTimeout(() => {
      if (password === SITE_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem('govchime_authenticated', 'true');
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
        setIsAnimating(false);
      }
    }, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('govchime_authenticated');
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/30 border-t-purple-400"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" data-delay="1s"></div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-purple-400/30 rounded-full animate-ping`}
              data-position={`${20 + (i * 15)}-${30 + (i * 10)}`}
            ></div>
          ))}
        </div>

        <div className="relative z-10 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-700 hover:scale-105">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl"></div>
          
          <div className="relative text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl transform transition-all duration-500 hover:rotate-6 relative group">
              <Shield className="w-10 h-10 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </div>
            
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-3">
                GovChime Access
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <p className="text-slate-300 text-sm">Secure Private Preview</p>
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" data-delay="0.5s" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enter your access credentials to continue to the platform
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-3">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-slate-400 pr-12 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                  disabled={isAnimating}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors duration-200"
                  disabled={isAnimating}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {/* Input glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm animate-pulse">
                <p className="text-red-300 text-sm flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isAnimating}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-indigo-800 transition-all duration-300 font-medium flex items-center justify-center relative overflow-hidden group shadow-2xl disabled:opacity-50 transform hover:scale-105"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              
              <span className="relative flex items-center">
                {isAnimating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-3" />
                    Access Platform
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 p-4 bg-slate-900/30 border border-slate-700/30 rounded-xl backdrop-blur-sm">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              🔒 Your session is secure and will expire when you close your browser.
              <br />
              <span className="text-purple-400">Powered by enterprise-grade security</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Logout button - styled to match the dark theme */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-slate-800/80 hover:bg-red-600/80 backdrop-blur-sm border border-slate-600/50 hover:border-red-500/50 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg flex items-center gap-2 group"
        >
          <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          Logout
        </button>
      </div>
      {children}
    </div>
  );
};

export default PasswordProtection;
