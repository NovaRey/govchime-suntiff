import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useClickTracking } from '../../hooks/useClickTracking';
import { Search, Menu, X, User, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { trackSearchClick } = useClickTracking();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Spending Analysis', href: '/spending' },
    { name: 'Contracts', href: '/awards' },
    { name: 'Set-Aside', href: '/set-aside' },
    { name: 'Chatter Wall', href: '/chatter' },
    { name: 'Learning Center', href: '/learning' },
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
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-12 h-12 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                {/* Enhanced background with darker, more contrasted layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-gray-900/95 to-black/95 dark:from-slate-700/95 dark:via-gray-800/95 dark:to-black/95 rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.4)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.6)] group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.5)] transition-all duration-500"></div>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" style={{padding: '1px'}}>
                  <div className="w-full h-full bg-gray-900 rounded-xl"></div>
                </div>
                
                {/* Subtle shine layers for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-xl group-hover:from-white/25 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-white/15 rounded-xl opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                
                {/* Clear G+C logo shape with enhanced styling */}
                <div className="relative z-10 w-7 h-7 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 32 32" className="text-white group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
                    <defs>
                      <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                        <stop offset="25%" stopColor="rgba(248,250,252,0.98)" />
                        <stop offset="50%" stopColor="rgba(241,245,249,0.95)" />
                        <stop offset="75%" stopColor="rgba(248,250,252,0.98)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.92)" />
                      </linearGradient>
                      <linearGradient id="headerShineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                      </linearGradient>
                      <filter id="headerGlow">
                        <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* G shape - clear and defined with better contrast */}
                    <path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12c3.31 0 6.31-1.34 8.49-3.51L21.66 21.66C20.11 23.21 18.17 24 16 24c-4.42 0-8-3.58-8-8s3.58-8 8-8c2.21 0 4.21 0.89 5.66 2.34L24 14h-8v4h12c0.11-0.66 0.11-1.34 0-2C28 9.37 22.63 4 16 4z" 
                          fill="url(#headerLogoGradient)" 
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="0.5"
                          filter="url(#headerGlow)"/>
                    
                    {/* C shape - overlapping to create blend with better visibility */}
                    <path d="M26 16c0 5.52-4.48 10-10 10-2.76 0-5.26-1.12-7.07-2.93l2.83-2.83C13.11 21.59 14.51 22 16 22c3.31 0 6-2.69 6-6s-2.69-6-6-6c-1.49 0-2.89 0.41-4.24 1.76L8.93 8.93C10.74 7.12 13.24 6 16 6c5.52 0 10 4.48 10 10z" 
                          fill="url(#headerLogoGradient)" 
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="0.5"
                          opacity="0.8"
                          transform="translate(1, 0)"
                          filter="url(#headerGlow)"/>
                    
                    {/* Enhanced shine effect overlay */}
                    <path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12c3.31 0 6.31-1.34 8.49-3.51L21.66 21.66C20.11 23.21 18.17 24 16 24c-4.42 0-8-3.58-8-8s3.58-8 8-8c2.21 0 4.21 0.89 5.66 2.34L24 14h-8v4h12c0.11-0.66 0.11-1.34 0-2C28 9.37 22.63 4 16 4z" 
                          fill="url(#headerShineGradient)" 
                          opacity="0.6"
                          className="group-hover:opacity-80 transition-opacity duration-500"/>
                    
                    {/* Central connection point */}
                    <circle cx="16" cy="16" r="2" fill="url(#headerLogoGradient)" opacity="0.9" className="animate-pulse-slow"/>
                    
                    {/* Additional sparkle effects */}
                    <circle cx="24" cy="12" r="1.5" fill="rgba(255,255,255,0.8)" opacity="0" className="group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="10" cy="20" r="1" fill="rgba(255,255,255,0.7)" opacity="0" className="group-hover:opacity-100 transition-opacity duration-700 delay-300">
                      <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                </div>
                
                {/* Rotating ring effect */}
                <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-all duration-500 animate-spin-slow"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-500 bg-clip-text text-transparent tracking-tight leading-none group-hover:animate-shimmer bg-size-200 bg-pos-0 transition-all duration-300 filter drop-shadow-sm">
                  GovChime
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold -mt-0.5 tracking-widest opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-sm">FEDERAL INTEL</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 transition-all duration-500 group-has-hover:space-x-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold nav-item flex items-center justify-center min-h-[40px] transition-all duration-300 ${
                  isActiveRoute(item.href)
                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 shadow-3d dark:shadow-dark-3d'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-3d dark:hover:shadow-dark-3d'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Enhanced Expandable Search Bar */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-sm mx-4">
            <div className="relative group/search w-full">
              {/* Collapsed search button */}
              <div className="relative flex justify-center">
                <button className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.5)] transition-all duration-700 backdrop-blur-sm group-hover/search:w-full group-hover/search:max-w-md group-hover/search:bg-gradient-to-br group-hover/search:from-blue-500/10 group-hover/search:to-purple-600/10 group-focus-within/search:w-full group-focus-within/search:max-w-md">
                  <Search className="w-5 h-5 text-blue-400 group-hover/search:text-blue-300 transition-all duration-500 group-hover/search:absolute group-hover/search:left-4 group-hover/search:top-1/2 group-hover/search:transform group-hover/search:-translate-y-1/2 group-focus-within/search:absolute group-focus-within/search:left-4 group-focus-within/search:top-1/2 group-focus-within/search:transform group-focus-within/search:-translate-y-1/2 drop-shadow-sm z-10" />
                  
                  {/* Expanded input field */}
                  <input
                    type="text"
                    placeholder="Search contracts, vendors, agencies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="absolute inset-0 w-full h-full bg-transparent border-0 outline-0 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 pl-12 pr-4 rounded-xl opacity-0 group-hover/search:opacity-100 group-focus-within/search:opacity-100 transition-opacity duration-500 delay-200"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(e);
                      }
                    }}
                  />
                </button>
                
                {/* Enhanced glowing ring effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/search:opacity-40 group-focus-within/search:opacity-40 transition-opacity duration-700 blur-sm -z-10 scale-110"></div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover/search:opacity-20 group-focus-within/search:opacity-20 transition-opacity duration-700 blur-lg -z-20 scale-125"></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 hover:text-yellow-400 icon-hover" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 hover:text-indigo-500 icon-hover" />
              )}
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover">
              <Bell className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 icon-hover" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover">
              <User className="w-5 h-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 icon-hover" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 figma-button shadow-3d dark:shadow-dark-3d hover:shadow-3d-hover dark:hover:shadow-dark-3d-hover"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
                className={`flex items-center px-4 py-3 rounded-lg text-base font-semibold figma-button ${
                  isActiveRoute(item.href)
                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 shadow-3d dark:shadow-dark-3d'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-3d dark:hover:shadow-dark-3d'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
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
    </header>
  );
};

export default Header;