import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useClickTracking } from '../../hooks/useClickTracking';
import { Menu, X, Bell, Sun, Moon, Telescope, Mailbox } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import ContactModal from '../common/ContactModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { trackSearchClick } = useClickTracking();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Dashboard', href: '/', short: 'Home' },
    { name: 'Spending Analysis', href: '/spending', short: 'Spending' },
    { name: 'Contracts', href: '/awards', short: 'Awards' },
    { name: 'Chatter Wall', href: '/chatter', short: 'Chatter' },
    { name: 'Learning Center', href: '/learning', short: 'Learning' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Track the search action
      await trackSearchClick(
        `${window.location.origin}/search?q=${encodeURIComponent(searchQuery)}`,
        searchQuery,
        1
      );
      
      // TODO: Implement actual search functionality
      console.log('Searching for:', searchQuery);
    }
  };
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 navbar-container">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo - Fixed width */}
          <div className="flex items-center flex-shrink-0 w-48">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group no-focus-outline" 
              style={{
                outline: 'none !important', 
                border: 'none !important', 
                boxShadow: 'none !important',
                textDecoration: 'none !important'
              }}
              onFocus={(e) => e.target.style.outline = 'none'}
            >
              <div className="relative w-10 h-10 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                {/* Minimal, tight background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/98 via-gray-900/98 to-black/98 dark:from-slate-700/98 dark:via-gray-800/98 dark:to-black/98 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.4)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] transition-all duration-500"></div>
                
                {/* Clean G+C lettering */}
                <div className="relative z-10 flex items-center justify-center space-x-0.5">
                  <span className="text-white font-black text-lg tracking-tighter drop-shadow-lg">G</span>
                  <span className="text-white font-black text-lg tracking-tighter drop-shadow-lg">C</span>
                </div>
              </div>
              
              <div className="flex flex-col relative no-border-container">
                <div className="relative inline-block no-border-container">
                  <span className="text-lg font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-500 bg-clip-text text-transparent tracking-tight leading-none group-hover:animate-shimmer bg-size-200 bg-pos-0 transition-all duration-300 filter drop-shadow-sm">
                    GovChime
                  </span>
                  
                  {/* Swimming dots that traverse across GovChime width */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-90 transition-opacity duration-1000 no-border-container" 
                    viewBox="0 0 100 24" 
                    preserveAspectRatio="none"
                  >
                    {/* Dot 1 - Blue - Full width traverse */}
                    <circle cx="5" cy="12" r="1.5" fill="#3b82f6" className="drop-shadow-sm" opacity="1">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 10,2; 20,-1; 30,3; 40,1; 50,-2; 60,2; 70,-1; 80,3; 90,1; 95,0; 90,-2; 80,-1; 70,2; 60,-3; 50,1; 40,-2; 30,3; 20,1; 10,-1; 0,0"
                        dur="15s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="1.5; 2.2; 1.8; 2.5; 1.3; 2; 1.7; 2.3; 1.5"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    
                    {/* Dot 2 - Orange - Reverse direction */}
                    <circle cx="95" cy="18" r="1.2" fill="#f97316" className="drop-shadow-sm" opacity="0.9">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; -8,1; -18,-2; -28,2; -38,-1; -48,3; -58,1; -68,-2; -78,2; -88,-1; -95,0; -88,2; -78,-1; -68,3; -58,-2; -48,1; -38,2; -28,-1; -18,3; -8,1; 0,0"
                        dur="18s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="1.2; 1.8; 1.4; 2.1; 1; 1.6; 1.3; 1.9; 1.2"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    
                    {/* Dot 3 - Purple - Wave motion */}
                    <circle cx="50" cy="6" r="1.3" fill="#8b5cf6" className="drop-shadow-sm" opacity="1">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; -15,4; -25,8; -20,6; -10,2; 0,0; 10,-2; 20,-6; 25,-8; 15,-4; 0,0"
                        dur="12s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="1.3; 1.9; 1.5; 2.2; 1.1; 1.7; 1.4; 2; 1.3"
                        dur="9s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Dot 4 - Green - Small darting */}
                    <circle cx="25" cy="20" r="1" fill="#22c55e" className="drop-shadow-sm" opacity="0.8">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 15,-3; 35,-5; 55,-3; 75,0; 70,2; 50,4; 30,2; 10,0; 0,0"
                        dur="20s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="1; 1.5; 1.2; 1.8; 0.8; 1.4; 1.1; 1.6; 1"
                        dur="7s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    
                    {/* Dot 5 - Cyan - Quick traverse */}
                    <circle cx="75" cy="15" r="0.8" fill="#06b6d4" className="drop-shadow-sm" opacity="0.7">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; -20,3; -40,1; -60,-2; -80,1; -85,0; -60,2; -40,-1; -20,-3; 0,0"
                        dur="25s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="r"
                        values="0.8; 1.3; 1; 1.6; 0.6; 1.2; 0.9; 1.4; 0.8"
                        dur="11s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold -mt-0.5 tracking-widest opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-sm">INTEL</span>
              </div>
            </Link>
          </div>

          {/* Medium Screen Navigation - Compact */}
          <nav className="hidden md:flex lg:hidden items-center space-x-0.5 transition-all duration-500 flex-1 justify-center nav-container">
            <div className="flex items-center bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-slate-200/30 dark:border-slate-700/30 transition-all duration-500">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-2.5 py-2 mx-0.5 text-xs font-medium nav-item flex items-center justify-center min-h-[36px] transition-all duration-400 overflow-hidden whitespace-nowrap group hover:scale-[1.02] ${
                    isActiveRoute(item.href)
                      ? 'text-slate-800 dark:text-slate-100 active-nav'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    outline: 'none',
                    border: 'none',
                  }}
                >
                  {/* Pulsing Green Active Indicator Line */}
                  {isActiveRoute(item.href) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse-glow"></div>
                  )}
                  
                  {/* Subtle hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-100/0 via-slate-100/40 to-slate-100/0 dark:from-slate-800/0 dark:via-slate-800/40 dark:to-slate-800/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                  
                  <span className="relative z-10 tracking-wide font-semibold">{item.short}</span>
                  
                  {/* Elegant separators */}
                  {index < navigation.length - 1 && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-5 bg-gradient-to-b from-transparent via-slate-300/60 to-transparent dark:via-slate-600/60"></div>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Navigation - Ultra Modern Fintech Design - Optimized for 5 items */}
          <nav className="hidden lg:flex items-center space-x-0.5 transition-all duration-500 flex-1 justify-center nav-container">
            <div className="flex items-center bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-slate-200/30 dark:border-slate-700/30 transition-all duration-500">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-3 py-2 mx-0.5 text-xs lg:text-sm font-medium nav-item flex items-center justify-center min-h-[36px] transition-all duration-400 overflow-hidden whitespace-nowrap group hover:scale-[1.02] ${
                    isActiveRoute(item.href)
                      ? 'text-slate-800 dark:text-slate-100 active-nav'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    outline: 'none',
                    border: 'none',
                  }}
                >
                  {/* Pulsing Green Active Indicator Line */}
                  {isActiveRoute(item.href) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse-glow"></div>
                  )}
                  
                  {/* Subtle hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-100/0 via-slate-100/40 to-slate-100/0 dark:from-slate-800/0 dark:via-slate-800/40 dark:to-slate-800/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                  
                  <span className="relative z-10 tracking-wide font-semibold">{item.name}</span>
                  
                  {/* Elegant separators */}
                  {index < navigation.length - 1 && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-5 bg-gradient-to-b from-transparent via-slate-300/60 to-transparent dark:via-slate-600/60"></div>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right side container - Fixed width, only search expands */}
          <div className="flex items-center space-x-2 flex-shrink-0 w-auto justify-end">
            {/* Action Buttons - Fixed position, only responsive to search hover */}
            <div className="hidden sm:flex items-center space-x-2">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-300"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500 hover:text-yellow-400 icon-hover transition-all duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600 hover:text-indigo-500 icon-hover transition-all duration-300" />
                )}
              </button>
              <button 
                title="Notifications"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-300"
              >
                <Bell className="w-5 h-5 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 icon-hover transition-all duration-300" />
              </button>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                title="Contact Us"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-300"
              >
                <Mailbox className="w-5 h-5 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 icon-hover transition-all duration-300" />
              </button>
            </div>

            {/* Expandable Telescope Search - Only this component affects layout */}
            <div className="relative group/search search-container">
              <form onSubmit={handleSearch} className="relative">
                {/* Compact Search Container - Expands on Hover */}
                <div className="relative flex items-center w-10 h-10 group-hover/search:w-64 sm:group-hover/search:w-72 md:group-hover/search:w-80 group-focus-within/search:w-64 sm:group-focus-within/search:w-72 md:group-focus-within/search:w-80 bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-800/80 dark:to-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_6px_30px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out backdrop-blur-md group-focus-within/search:shadow-[0_8px_40px_rgba(34,197,94,0.15)] group-focus-within/search:border-emerald-400/50 overflow-hidden">
                  
                  {/* Telescope Icon - Always Visible */}
                  <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 z-10">
                    <Telescope className="w-5 h-5 text-emerald-500 dark:text-emerald-400 group-hover/search:text-emerald-400 dark:group-hover/search:text-emerald-300 group-focus-within/search:text-emerald-600 dark:group-focus-within/search:text-emerald-400 transition-all duration-300 drop-shadow-sm" />
                  </div>
                  
                  {/* Expanding Input Field - Hidden by default, appears on hover/focus */}
                  <input
                    type="text"
                    placeholder="Search contracts, vendors, insights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(e);
                      }
                    }}
                    className="flex-1 h-full bg-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 pl-1 pr-4 focus:outline-none transition-all duration-500 text-sm font-medium tracking-wide no-focus-outline opacity-0 group-hover/search:opacity-100 group-focus-within/search:opacity-100 pointer-events-none group-hover/search:pointer-events-auto group-focus-within/search:pointer-events-auto"
                  />
                  
                  {/* Subtle search hint glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                </div>
              </form>
            </div>

            {/* Mobile menu button - only show on very small screens */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover transition-all duration-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`relative flex items-center px-4 py-3 rounded-lg text-base font-semibold figma-button overflow-hidden ${
                  isActiveRoute(item.href)
                    ? 'text-purple-400 dark:text-purple-300 glow-text'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 hover:shadow-3d dark:hover:shadow-dark-3d'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
            <div className="mt-4 px-3">
              <form onSubmit={handleSearch} className="relative">
                <Telescope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </form>
              <button 
                onClick={toggleTheme}
                className="mt-3 flex items-center w-full px-3 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md figma-button"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 mr-2 text-yellow-500 icon-hover" />
                ) : (
                  <Moon className="w-5 h-5 mr-2 text-indigo-600 icon-hover" />
                )}
                <span className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </header>
  );
};

export default Header;