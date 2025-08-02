import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Shield, Database, Zap, Heart, Flag } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Dashboard', href: '/' },
      { name: 'Contract Awards', href: '/awards' },
      { name: 'Spending Analysis', href: '/spending' },
      { name: 'Learning Center', href: '/learning' },
      { name: 'Chatter Wall', href: '/chatter' }
    ],
    company: [
      { name: 'About Suntiff', href: '#' },
      { name: 'Our Mission', href: '#' },
      { name: 'Careers', href: '#' }
    ],
    resources: [
      { name: 'API Documentation', href: '#' },
      { name: 'Data Sources', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Status Page', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Data Protection', href: '#' },
      { name: 'Compliance', href: '#' }
    ]
  };

  return (
    <footer className="relative bg-slate-900 dark:bg-black border-t border-slate-800 dark:border-gray-900 mt-16">
      {/* Swimming dots background - spanning full footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg 
          className="absolute inset-0 w-full h-full opacity-60" 
          viewBox="0 0 1200 400" 
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Large swimming dot - Blue */}
          <circle cx="200" cy="100" r="4" fill="#3b82f6" className="drop-shadow-lg" opacity="0.8">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 150,20; 300,10; 450,-15; 600,25; 750,5; 900,-10; 1050,15; 1100,0; 950,-20; 800,-15; 650,10; 500,-25; 350,15; 200,-5; 50,20; 0,0"
              dur="45s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="4; 5.5; 4.2; 6; 3.5; 5; 4.5; 5.8; 4"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Medium swimming dot - Purple */}
          <circle cx="800" cy="200" r="3.5" fill="#8b5cf6" className="drop-shadow-md" opacity="0.9">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -120,30; -250,15; -380,-20; -520,35; -650,10; -780,-15; -920,25; -1000,0; -850,-25; -700,-20; -550,15; -400,-30; -250,20; -100,-10; 50,25; 0,0"
              dur="52s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="3.5; 2.8; 4.2; 3.8; 4.5; 3.2; 3.9; 4.1; 3.5"
              dur="18s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Small swimming dot - Green */}
          <circle cx="400" cy="300" r="2.8" fill="#22c55e" className="drop-shadow-sm" opacity="0.7">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 80,15; 180,-10; 280,25; 400,-5; 520,20; 640,-15; 760,10; 880,0; 760,-20; 640,15; 520,-25; 400,10; 280,-15; 180,20; 80,-10; 0,0"
              dur="38s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2.8; 3.5; 2.5; 3.8; 2.2; 3.2; 2.9; 3.6; 2.8"
              dur="15s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Tiny swimming dot - Orange */}
          <circle cx="600" cy="80" r="2.2" fill="#f97316" className="drop-shadow-sm" opacity="0.6">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -60,40; -140,20; -220,-30; -300,45; -380,10; -460,-20; -540,30; -600,0; -520,-35; -440,-25; -360,20; -280,-40; -200,25; -120,-15; -40,35; 0,0"
              dur="41s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2.2; 2.8; 2; 3.1; 1.8; 2.6; 2.3; 2.9; 2.2"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Extra small swimming dot - Cyan */}
          <circle cx="900" cy="250" r="1.8" fill="#06b6d4" className="drop-shadow-sm" opacity="0.5">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 70,-25; 160,-40; 250,-25; 340,0; 430,25; 520,40; 610,25; 700,0; 610,-25; 520,-40; 430,-25; 340,0; 250,25; 160,40; 70,25; 0,0"
              dur="48s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="1.8; 2.3; 1.6; 2.6; 1.4; 2.1; 1.9; 2.4; 1.8"
              dur="14s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Additional small swimming dot - Indigo */}
          <circle cx="300" cy="180" r="2.5" fill="#4f46e5" className="drop-shadow-sm" opacity="0.8">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 100,35; 220,20; 340,-25; 460,40; 580,15; 700,-20; 820,30; 900,0; 780,-30; 660,-20; 540,15; 420,-35; 300,25; 180,-15; 60,30; 0,0"
              dur="44s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2.5; 3.1; 2.3; 3.4; 2.1; 2.9; 2.6; 3.2; 2.5"
              dur="16s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/98 via-gray-800/98 to-black/98 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] transition-all duration-500"></div>
                <div className="relative z-10 flex items-center justify-center space-x-0.5">
                  <span className="text-white font-black text-lg tracking-tighter drop-shadow-lg">G</span>
                  <span className="text-white font-black text-lg tracking-tighter drop-shadow-lg">C</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  GovChime
                </h3>
                <p className="text-xs text-slate-400 font-semibold tracking-widest">INTEL</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Federal contracting intelligence platform powered by{' '}
              <span className="text-white font-semibold">Suntiff, LLC</span>. 
              Making government contracting accessible and transparent for businesses of all sizes.
              <br />
              <span className="inline-flex items-center mt-2 text-blue-300 font-medium">
                <Flag className="w-4 h-4 mr-1 text-red-400" />
                Proudly Veteran Owned
              </span>
            </p>
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Enterprise-grade security</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <Database className="w-4 h-4 mr-2 text-blue-400" />
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-purple-400" />
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-400" />
              Legal & Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center mb-2">
                <Mail className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-white text-sm font-medium">Need Help?</span>
              </div>
              <p className="text-slate-400 text-xs">
                Contact our support team for assistance with GovChime
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <p className="text-slate-400 text-sm">
                © {currentYear} <span className="text-white font-semibold">Suntiff, LLC</span>. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <span className="flex items-center">
                  <Heart className="w-3 h-3 mr-1 text-red-400" />
                  Made in USA
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Flag className="w-3 h-3 mr-1 text-blue-400" />
                  Veteran Owned
                </span>
                <span>•</span>
                <span>GDPR Ready</span>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
