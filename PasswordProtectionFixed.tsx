import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [showMainApp, setShowMainApp] = useState(false);
  const [isErrorMode, setIsErrorMode] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showHoverParticles, setShowHoverParticles] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [jellyfishOrbs, setJellyfishOrbs] = useState([
    { id: 1, x: 0, y: 0, delay: 0.5, distance: 80, color: 'bg-blue-400/40' },
    { id: 2, x: 0, y: 0, delay: 0.8, distance: 120, color: 'bg-purple-400/35' },
    { id: 3, x: 0, y: 0, delay: 1.2, distance: 150, color: 'bg-indigo-400/30' },
    { id: 4, x: 0, y: 0, delay: 0.3, distance: 200, color: 'bg-cyan-400/25' },
    { id: 5, x: 0, y: 0, delay: 1.5, distance: 100, color: 'bg-violet-400/35' },
  ]);
  
  const navigate = useNavigate();

  // Set your password here - change this to whatever you want
  const SITE_PASSWORD = 'suntiff101';

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authStatus = sessionStorage.getItem('govchime_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      // Don't automatically navigate - let the user stay on whatever page they're trying to access
      // Add a slight delay for the main app fade-in
      setTimeout(() => {
        setShowMainApp(true);
      }, 50);
    }
    setIsLoading(false);
  }, []);

  // Jellyfish mouse following effect - only on login screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update jellyfish orbs with delayed following effect
      setJellyfishOrbs(prevOrbs => 
        prevOrbs.map(orb => {
          // Calculate target position with distance offset to avoid touching cursor
          const angle = Math.random() * Math.PI * 2; // Random angle for whispy movement
          const targetX = e.clientX + Math.cos(angle) * orb.distance;
          const targetY = e.clientY + Math.sin(angle) * orb.distance;
          
          // Smooth interpolation for jellyfish-like movement
          const lerpFactor = 0.02 / orb.delay; // Slower movement for more delay
          const newX = orb.x + (targetX - orb.x) * lerpFactor;
          const newY = orb.y + (targetY - orb.y) * lerpFactor;
          
          return {
            ...orb,
            x: newX,
            y: newY
          };
        })
      );
    };

    // Only add mouse listener when not authenticated (on login screen)
    if (!isAuthenticated) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isAuthenticated]);

  // Update CSS custom properties for jellyfish orbs
  useEffect(() => {
    jellyfishOrbs.forEach((orb) => {
      const orbElement = document.querySelector(`[data-orb-id="${orb.id}"]`) as HTMLElement;
      if (orbElement) {
        orbElement.style.transform = `translate(${orb.x - 12}px, ${orb.y - 12}px)`;
      }
    });
  }, [jellyfishOrbs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAnimating(true);

    // Add a slight delay for smooth animation
    setTimeout(() => {
      if (password === SITE_PASSWORD) {
        // Clear any error state and trigger unlock animation
        setIsErrorMode(false);
        setIsShaking(false);
        setIsUnlocking(true);
        
        // After unlock animation, proceed with authentication
        setTimeout(() => {
          setIsAuthenticated(true);
          sessionStorage.setItem('govchime_authenticated', 'true');
          // Navigate to dashboard after successful login
          navigate('/');
          // Add Apple-like fade-in delay
          setTimeout(() => {
            setShowMainApp(true);
          }, 200);
        }, 1000); // Wait for unlock animation to complete
      } else {
        // Trigger dramatic error transformation
        setIsErrorMode(true);
        setIsShaking(true);
        setError('Access Denied - Invalid Credentials');
        setPassword('');
        setIsAnimating(false);
        
        // Reset shake animation after it completes
        setTimeout(() => {
          setIsShaking(false);
        }, 600);
        
        // Reset error mode after a few seconds
        setTimeout(() => {
          setIsErrorMode(false);
          setError('');
        }, 3000);
      }
    }, 500);
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
        {/* Animated background elements - change based on error state */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl transition-all duration-500 ${
            isErrorMode 
              ? 'bg-gradient-to-br from-red-500/30 to-orange-500/20 animate-pulse' 
              : 'bg-gradient-to-br from-purple-500/10 to-transparent animate-pulse'
          }`}></div>
          <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl transition-all duration-500 ${
            isErrorMode 
              ? 'bg-gradient-to-tl from-red-600/30 to-yellow-500/20 animate-pulse' 
              : 'bg-gradient-to-tl from-blue-500/10 to-transparent animate-pulse'
          }`} data-delay="1s"></div>
          
          {/* Floating particles - change color in error mode */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full transition-all duration-300 ${
                isErrorMode 
                  ? 'bg-red-400/50 animate-ping' 
                  : 'bg-purple-400/30 animate-ping'
              }`}
              data-position={`${20 + (i * 15)}-${30 + (i * 10)}`}
            ></div>
          ))}
          
          {/* Jellyfish Mouse-Following Orbs - only in normal mode */}
          {!isErrorMode && jellyfishOrbs.map((orb) => (
            <div
              key={orb.id}
              data-orb-id={orb.id}
              className={`absolute w-6 h-6 rounded-full ${orb.color} transition-all duration-1000 ease-out blur-sm animate-pulse pointer-events-none`}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
              {/* Whispy trail effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
            </div>
          ))}
          
          {/* Emergency strobe effect during error */}
          {isErrorMode && (
            <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
          )}
          
          {/* Hoverable floating particles - similar to dashboard effect */}
          {showHoverParticles && !isErrorMode && (
            <>
              {/* Floating particles with different colors and movements */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400/60 rounded-full animate-bounce-gentle opacity-0 animate-fade-in"></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce-gentle opacity-0 animate-fade-in animation-delay-500"></div>
              <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-indigo-400/50 rounded-full animate-bounce-gentle opacity-0 animate-fade-in animation-delay-1000"></div>
              <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-cyan-400/60 rounded-full animate-bounce-gentle opacity-0 animate-fade-in animation-delay-1500"></div>
              <div className="absolute bottom-1/4 right-1/2 w-3.5 h-3.5 bg-violet-400/50 rounded-full animate-bounce-gentle opacity-0 animate-fade-in animation-delay-2000"></div>
              <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-pink-400/60 rounded-full animate-bounce-gentle opacity-0 animate-fade-in animation-delay-800"></div>
            </>
          )}
        </div>

        <div className={`relative z-10 backdrop-blur-xl border rounded-3xl shadow-2xl p-8 w-full max-w-md transition-all duration-500 ${
          isShaking ? 'animate-shake' : ''
        } ${
          isErrorMode 
            ? 'bg-red-900/60 border-red-500/60 shadow-red-500/25 shadow-2xl' 
            : 'bg-slate-800/50 border-slate-700/50 hover:scale-105'
        }`}>
          {/* Glassmorphism overlay - changes in error mode */}
          <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
            isErrorMode 
              ? 'bg-gradient-to-br from-red-500/20 to-orange-500/10' 
              : 'bg-gradient-to-br from-white/5 to-white/0'
          }`}></div>
          
          <div className="relative text-center mb-8">
            <div className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl transform transition-all duration-500 relative group ${
              isErrorMode 
                ? 'bg-gradient-to-br from-red-500 via-orange-500 to-red-600 animate-pulse' 
                : isUnlocking
                ? 'bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 animate-pulse'
                : 'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 hover:rotate-6'
            }`}>
              {isErrorMode ? (
                <Lock className="w-10 h-10 text-white animate-pulse" />
              ) : isUnlocking ? (
                <div className="relative w-10 h-10 text-white">
                  {/* Unlocking animation - lock turns and opens */}
                  <Lock className={`absolute w-10 h-10 transition-all duration-1000 ${
                    isUnlocking ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`} />
                  <Shield className={`absolute w-10 h-10 transition-all duration-1000 ${
                    isUnlocking ? 'rotate-0 opacity-100 scale-110' : 'rotate-90 opacity-0 scale-50'
                  }`} />
                </div>
              ) : (
                <Shield className="w-10 h-10 text-white" />
              )}
              <div className={`absolute inset-0 rounded-3xl blur-xl transition-all duration-300 ${
                isErrorMode 
                  ? 'bg-gradient-to-r from-red-500/60 to-orange-500/60 group-hover:blur-2xl' 
                  : isUnlocking
                  ? 'bg-gradient-to-r from-green-500/60 to-emerald-500/60 group-hover:blur-2xl'
                  : 'bg-gradient-to-r from-purple-500/50 to-blue-500/50 group-hover:blur-2xl'
              }`}></div>
            </div>
            
            <div className="relative">
              <h1 
                className={`text-3xl font-bold bg-clip-text text-transparent mb-3 transition-all duration-500 cursor-default ${
                  isErrorMode 
                    ? 'bg-gradient-to-r from-red-300 via-orange-200 to-red-300 animate-pulse' 
                    : 'bg-gradient-to-r from-white via-purple-200 to-blue-200'
                }`}
                onMouseEnter={() => !isErrorMode && setShowHoverParticles(true)}
                onMouseLeave={() => setShowHoverParticles(false)}
              >
                {isErrorMode ? 'ACCESS DENIED' : isUnlocking ? 'ACCESS GRANTED' : 'GovChime Access'}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className={`w-4 h-4 animate-pulse transition-colors duration-500 ${
                  isErrorMode ? 'text-red-400' : 'text-purple-400'
                }`} />
                <p className={`text-sm transition-all duration-500 ${
                  isErrorMode 
                    ? 'text-red-300 font-medium animate-pulse' 
                    : 'text-slate-300'
                }`}>
                  {isErrorMode ? 'SECURITY BREACH ATTEMPT' : 'Secure Private Preview'}
                </p>
                <Sparkles className={`w-4 h-4 animate-pulse transition-colors duration-500 ${
                  isErrorMode ? 'text-orange-400' : 'text-blue-400'
                }`} data-delay="0.5s" />
              </div>
              <p className={`text-sm leading-relaxed transition-all duration-500 ${
                isErrorMode 
                  ? 'text-red-200 font-medium' 
                  : 'text-slate-400'
              }`}>
                {isErrorMode 
                  ? 'Invalid credentials detected - Access restricted' 
                  : 'Enter your access credentials to continue to the platform'
                }
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-2">
              <label htmlFor="password" className={`block text-sm font-medium mb-3 transition-colors duration-500 ${
                isErrorMode ? 'text-red-300' : 'text-slate-300'
              }`}>
                {isErrorMode ? 'RESTRICTED ACCESS' : 'Password'}
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-4 border rounded-xl text-white pr-12 transition-all duration-500 backdrop-blur-sm ${
                    isErrorMode 
                      ? 'bg-red-900/60 border-red-500/60 focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 placeholder-red-300' 
                      : 'bg-slate-900/50 border-slate-600/50 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 placeholder-slate-400'
                  }`}
                  placeholder={isErrorMode ? "Access Denied" : "Enter your password"}
                  required
                  disabled={isAnimating}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-500 ${
                    isErrorMode 
                      ? 'text-red-300 hover:text-red-200' 
                      : 'text-slate-400 hover:text-purple-400'
                  }`}
                  disabled={isAnimating}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {/* Input glow effect */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  isErrorMode 
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20' 
                    : 'bg-gradient-to-r from-purple-500/10 to-blue-500/10'
                }`}></div>
              </div>
            </div>

            {error && (
              <div className={`border rounded-xl p-4 backdrop-blur-sm transition-all duration-500 ${
                isErrorMode 
                  ? 'bg-red-600/40 border-red-400/50 animate-pulse' 
                  : 'bg-red-900/30 border-red-500/30 animate-pulse'
              }`}>
                <p className={`text-sm flex items-center transition-colors duration-500 ${
                  isErrorMode ? 'text-red-100 font-medium' : 'text-red-300'
                }`}>
                  <Lock className={`w-4 h-4 mr-2 transition-all duration-300 ${
                    isErrorMode ? 'animate-bounce' : ''
                  }`} />
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isAnimating}
              className={`w-full text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center relative overflow-hidden group shadow-2xl disabled:opacity-50 transform transition-all duration-500 ${
                isErrorMode 
                  ? 'bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:from-red-700 hover:via-orange-700 hover:to-red-800 animate-pulse' 
                  : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-800 hover:scale-105'
              }`}
            >
              {/* Button glow effect */}
              <div className={`absolute inset-0 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 ${
                isErrorMode 
                  ? 'bg-gradient-to-r from-red-600/60 to-orange-600/60' 
                  : 'bg-gradient-to-r from-purple-600/50 to-blue-600/50'
              }`}></div>
              
              <span className="relative flex items-center">
                {isAnimating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3"></div>
                    {isErrorMode ? 'Checking Security...' : 'Authenticating...'}
                  </>
                ) : (
                  <>
                    {isErrorMode ? (
                      <>
                        <Lock className="w-5 h-5 mr-3 animate-pulse" />
                        Security Lockdown
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-3" />
                        Access Platform
                      </>
                    )}
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
    <div 
      className={`${
        showMainApp 
          ? 'animate-apple-fade-in' 
          : 'opacity-0 transform translate-y-5 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

export default PasswordProtection;
