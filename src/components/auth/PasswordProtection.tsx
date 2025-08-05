import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { GrokLoadingBar } from '../common/GrokLoadingBar';

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
  const [isSuccessMode, setIsSuccessMode] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);
  const [isErrorMode, setIsErrorMode] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const ballLargeRef = useRef<HTMLDivElement>(null);
  const ballMediumRef = useRef<HTMLDivElement>(null);
  const ballSmallRef = useRef<HTMLDivElement>(null);
  
  // Set your password here - change this to whatever you want
  const SITE_PASSWORD = 'suntiff101';

  // Initialize grid segments reference array - create a 20x20 grid of small segments
  useEffect(() => {
    gridLinesRef.current = new Array(800).fill(null); // 20x20 grid = 400 horizontal + 400 vertical segments
  }, []);

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const authStatus = sessionStorage.getItem('govchime_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setTimeout(() => {
        setShowMainApp(true);
      }, 50);
    }
    setIsLoading(false);
  }, []);

  // Mouse tracking for organic plant-like gravitational field effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const gridContainer = gridRef.current;
      if (!gridContainer) return;

      const rect = gridContainer.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Brighter background gradient like a gentle plant glow
      const gradientX = (mouseX / rect.width) * 100;
      const gradientY = (mouseY / rect.height) * 100;
      gridContainer.style.background = `
        radial-gradient(circle 120px at ${gradientX}% ${gradientY}%, 
          rgba(34, 197, 94, 0.12) 0%, 
          rgba(34, 197, 94, 0.05) 60%, 
          transparent 100%),
        linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px)
      `;
      gridContainer.style.backgroundSize = '100% 100%, 40px 40px, 40px 40px';

      // Grid dimensions
      const gridSize = 20; // 20x20 grid
      const cellWidth = rect.width / gridSize;
      const cellHeight = rect.height / gridSize;

      gridLinesRef.current.forEach((segment, index) => {
        if (!segment) return;

        const isHorizontal = index < 400; // First 400 are horizontal segments
        let segmentCenterX, segmentCenterY;
        
        if (isHorizontal) {
          // Horizontal segments
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          segmentCenterX = col * cellWidth + cellWidth / 2;
          segmentCenterY = row * cellHeight;
        } else {
          // Vertical segments  
          const segmentIndex = index - 400;
          const col = Math.floor(segmentIndex / gridSize);
          const row = segmentIndex % gridSize;
          segmentCenterX = col * cellWidth;
          segmentCenterY = row * cellHeight + cellHeight / 2;
        }
        
        // Calculate distance from mouse to segment center
        const distance = Math.sqrt(
          Math.pow(mouseX - segmentCenterX, 2) + Math.pow(mouseY - segmentCenterY, 2)
        );
        
        const maxDistance = 60; // Larger, more gentle field like plant sensitivity
        
        if (distance < maxDistance) {
          const normalizedDistance = Math.min(distance / maxDistance, 1);
          const effect = Math.pow(1 - normalizedDistance, 2); // Gentler falloff like plant growth
          
          // Calculate gentle bend direction toward mouse (like plants growing toward light)
          const dx = distance > 0 ? (mouseX - segmentCenterX) / distance : 0;
          const dy = distance > 0 ? (mouseY - segmentCenterY) / distance : 0;
          
          // Organic plant-like bending
          const bendStrength = 6 * effect; // Stronger bending for visibility
          const depthZ = -4 * effect; // Slightly more depth
          const rotation = effect * 5; // More visible rotation
          
          const translateX = dx * bendStrength;
          const translateY = dy * bendStrength;
          
          // Brighter plant-like glow - like bioluminescence
          const brightness = 1 + (1.2 * effect); // Much brighter
          const glowOpacity = 0.06 + (effect * 0.25); // Brighter base glow
          const plantGlow = effect * 0.6; // Stronger plant glow
          
          // Apply organic plant-like movement with proper transform
          segment.style.transform = `translate3d(${translateX}px, ${translateY}px, ${depthZ}px) rotate(${rotation}deg) scale(${1 + effect * 0.15})`;
          segment.style.filter = `brightness(${brightness})`;
          segment.style.background = `rgba(${120 + plantGlow * 80}, ${120 + plantGlow * 140}, ${120 + plantGlow * 100}, ${glowOpacity})`;
        } else {
          // Resting state - like plants at rest
          segment.style.transform = 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';
          segment.style.filter = 'brightness(1)';
          segment.style.background = 'rgba(120, 120, 120, 0.06)';
        }
      });
    };

    const handleMouseLeave = () => {
      const gridContainer = gridRef.current;
      if (gridContainer) {
        // Reset background to normal plant-like resting state
        gridContainer.style.background = `
          linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px)
        `;
        gridContainer.style.backgroundSize = '40px 40px, 40px 40px';
      }
      
      // Gently return all segments to resting state
      gridLinesRef.current.forEach((segment) => {
        if (segment) {
          segment.style.transform = 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)';
          segment.style.filter = 'brightness(1)';
          segment.style.background = 'rgba(120, 120, 120, 0.06)';
        }
      });
    };

    if (!isAuthenticated) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    setError('');

    setTimeout(() => {
      if (password === SITE_PASSWORD) {
        setIsErrorMode(false);
        setIsShaking(false);
        setIsSuccessMode(true);
        
        // Show green success animation for 1.5 seconds
        setTimeout(() => {
          setIsAuthenticated(true);
          sessionStorage.setItem('govchime_authenticated', 'true');
          setTimeout(() => {
            setShowMainApp(true);
          }, 200);
        }, 1500);
      } else {
        setIsErrorMode(true);
        setIsShaking(true);
        setError('Access Denied - Invalid Credentials');
        setPassword('');
        setIsAnimating(false);
        
        setTimeout(() => {
          setIsShaking(false);
        }, 600);
        
        setTimeout(() => {
          setIsErrorMode(false);
          setError('');
        }, 3000);
      }
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <GrokLoadingBar color="blue" size="lg" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Interactive Grid Background with Physical Distortion */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            ref={gridRef}
            className="absolute inset-0 grid-container"
          >
            {/* Grid of individual segments for precise bending */}
            <div className="absolute inset-0 distortion-grid">
              {/* Horizontal segments - 20x20 grid */}
              {Array.from({ length: 20 }, (_, row) => 
                Array.from({ length: 20 }, (_, col) => (
                  <div 
                    key={`h-${row}-${col}`} 
                    className="grid-line horizontal" 
                    style={{ 
                      top: `${(row * 100) / 20}%`,
                      left: `${(col * 100) / 20}%`,
                      width: `${100 / 20}%`,
                      height: '0.5px'
                    }}
                    ref={(el) => {
                      if (gridLinesRef.current) {
                        gridLinesRef.current[row * 20 + col] = el;
                      }
                    }}
                  />
                ))
              )}
              {/* Vertical segments - 20x20 grid */}
              {Array.from({ length: 20 }, (_, col) => 
                Array.from({ length: 20 }, (_, row) => (
                  <div 
                    key={`v-${col}-${row}`} 
                    className="grid-line vertical" 
                    style={{ 
                      left: `${(col * 100) / 20}%`,
                      top: `${(row * 100) / 20}%`,
                      width: '0.5px',
                      height: `${100 / 20}%`
                    }}
                    ref={(el) => {
                      if (gridLinesRef.current) {
                        gridLinesRef.current[400 + col * 20 + row] = el;
                      }
                    }}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Bowling ball effects with mouse following */}
          <div className="absolute inset-0">
            <div 
              ref={ballLargeRef}
              className="bowling-ball-large absolute animate-pulse opacity-50"
            />
            <div 
              ref={ballMediumRef}
              className="bowling-ball-medium absolute animate-pulse opacity-40"
            />
            <div 
              ref={ballSmallRef}
              className="bowling-ball-small absolute animate-pulse opacity-60"
            />
          </div>
        </div>

        <div className={`relative z-10 w-full max-w-md transform transition-all duration-500 ${
          isShaking ? 'animate-shake' : ''
        }`}>
          <div className={`backdrop-blur-xl rounded-2xl p-8 shadow-2xl border transition-all duration-500 ${
            isSuccessMode
              ? 'bg-green-950/40 border-green-500/30 animate-pulse' 
              : isErrorMode 
              ? 'bg-red-950/40 border-red-500/30' 
              : 'bg-gray-900/40 border-gray-700/30'
          }`}>
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-500 ${
                isSuccessMode
                  ? 'bg-green-600/20 text-green-400 animate-pulse' 
                  : isErrorMode 
                  ? 'bg-red-600/20 text-red-400' 
                  : 'bg-purple-600/20 text-purple-400'
              }`}>
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {isSuccessMode ? 'Access Granted!' : 'Secure Access'}
              </h1>
              {isSuccessMode ? (
                <div className="relative animate-banner-slide-in">
                  {/* Modern Banner Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/30 to-green-600/20 rounded-xl blur-sm animate-pulse"></div>
                  
                  {/* Banner Content */}
                  <div className="relative bg-gradient-to-r from-green-900/40 via-emerald-900/50 to-green-900/40 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-center">
                      {/* Welcome Text */}
                      <div className="mb-3">
                        <span className="text-2xl font-black bg-gradient-to-r from-green-300 via-emerald-200 to-green-300 bg-clip-text text-transparent tracking-wide leading-none filter drop-shadow-lg animate-banner-glow">
                          WELCOME TO
                        </span>
                      </div>
                      
                      {/* GovChime Branding */}
                      <div className="mb-2">
                        <span className="text-3xl font-black bg-gradient-to-r from-green-200 via-emerald-100 to-green-200 bg-clip-text text-transparent tracking-tight leading-none filter drop-shadow-xl animate-shimmer-banner">
                          GOVCHIME
                        </span>
                      </div>
                      
                      {/* Subtitle */}
                      <div className="flex items-center justify-center space-x-2">
                        <div className="h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent flex-1 animate-pulse"></div>
                        <span className="text-sm font-semibold text-green-300/90 tracking-[0.2em] uppercase">
                          Intelligence Platform
                        </span>
                        <div className="h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent flex-1 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Animated Border Effect */}
                    <div className="absolute inset-0 rounded-xl border border-green-400/20 animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Enter your credentials to continue</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                      isSuccessMode
                        ? 'bg-green-950/20 border-green-500/50 text-green-100 focus:ring-green-500/50'
                        : isErrorMode
                        ? 'bg-red-950/20 border-red-500/50 text-red-100 focus:ring-red-500/50'
                        : 'bg-gray-900/20 border-gray-600/50 text-white focus:ring-purple-500/50'
                    }`}
                    placeholder="Enter password"
                    required
                    disabled={isSuccessMode}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className={`border rounded-xl p-4 backdrop-blur-sm transition-all duration-500 ${
                  isErrorMode 
                    ? 'bg-red-600/40 border-red-400/50 animate-pulse' 
                    : 'bg-red-900/30 border-red-500/30'
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
                disabled={isAnimating || isSuccessMode}
                className={`w-full text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center relative overflow-hidden group shadow-2xl disabled:opacity-50 transform transition-all duration-500 ${
                  isSuccessMode
                    ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 animate-pulse cursor-default' 
                    : isErrorMode 
                    ? 'bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:from-red-700 hover:via-orange-700 hover:to-red-800 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-800 hover:scale-105'
                }`}
              >
                <div className={`absolute inset-0 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 ${
                  isSuccessMode
                    ? 'bg-gradient-to-r from-green-600/60 to-emerald-600/60' 
                    : isErrorMode 
                    ? 'bg-gradient-to-r from-red-600/60 to-orange-600/60' 
                    : 'bg-gradient-to-r from-purple-600/50 to-blue-600/50'
                }`}></div>
                
                <span className="relative flex items-center">
                  {isSuccessMode ? (
                    <>
                      <GrokLoadingBar color="blue" size="sm" className="mr-3" />
                      Unlocking Platform...
                    </>
                  ) : isAnimating ? (
                    <>
                      <GrokLoadingBar color="blue" size="sm" className="mr-3" />
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

            <div className="mt-8 p-4 bg-gray-900/30 border border-gray-700/30 rounded-xl backdrop-blur-sm">
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                🔒 Your session is secure and will expire when you close your browser.
                <br />
                <span className="text-purple-400">Powered by enterprise-grade security</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={showMainApp ? 'animate-apple-fade-in' : 'opacity-0 transform translate-y-5 scale-95'}>
      {children}
    </div>
  );
};

export default PasswordProtection;
