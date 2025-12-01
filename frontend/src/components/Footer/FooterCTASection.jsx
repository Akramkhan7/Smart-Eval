import React, { useState } from 'react';
import { ArrowRight, Linkedin, Facebook } from 'lucide-react';

const FooterCTASection = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    // Add your subscription logic here
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Hero/CTA Section */}
      <section className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-24">
        {/* Gradient Background Elements */}
       {/* Gradient Background Elements - Fixed gradient classes */}
<div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-transparent blur-3xl"></div>
<div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-indigo-600/20 via-purple-500/10 to-transparent blur-2xl"></div>

        
        {/* Wavy Line Pattern */}
        <div className="absolute right-20 top-40 opacity-40">
          <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
            <path
              d="M0 150 Q 100 100, 200 150 T 400 150"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
            {Array.from({ length: 50 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${150 + i * 2} Q 100 ${100 + i * 2}, 200 ${150 + i * 2} T 400 ${150 + i * 2}`}
                stroke="url(#gradient)"
                strokeWidth="0.3"
                fill="none"
                opacity={0.3 - i * 0.005}
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="mb-8 text-5xl font-light leading-tight md:text-6xl lg:text-7xl">
Smarter, Faster & Fair Academic Evaluation
            <br />
Powered by AI
          </h1>
          
          <button className="group flex items-center gap-3 rounded-full bg-gray-200 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white hover:shadow-lg">
            Start Evaluating Smarter
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Footer Section with Gradient Overlay on Top */}
      <footer className="relative border-t border-gray-800 px-6 py-16 md:px-12 lg:px-24">
        {/* Gradient Shade Overlay on Top of Footer */}
        <div className="absolute left-0 top-0 h-32 w-full bg-linear-to-b from-black via-black/50 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Logo Section */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white">
                  <span className="text-lg font-bold text-black">S</span>
                </div>
                <span className="text-xl font-semibold">SmartEval
</span>
              </div>
            </div>

            {/* Product Links */}
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-sm font-semibold text-white">Product</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    AI Features

                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    How SmartEval Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-2">
              <h3 className="mb-6 text-sm font-semibold text-white">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 transition-colors hover:text-white">
                    Accessibility Statement
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-5">
              <h3 className="mb-6 text-sm font-semibold text-white">Stay Updated with SmartEval</h3>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-gray-400">
                    Email *
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                      required
                      className="flex-1 border-b border-gray-700 bg-transparent pb-2 text-sm text-white outline-none transition-colors focus:border-white"
                    />
                    <button
                      type="submit"
                      className="rounded-full border-2 border-white px-8 py-2 text-sm font-semibold uppercase tracking-wider transition-all hover:bg-white hover:text-black"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-gray-800 pt-8 md:flex-row md:items-center">
            {/* Contact Info & Social */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <a
                href="mailto:info@mysite.com"
                className="text-sm uppercase tracking-wider text-gray-400 transition-colors hover:text-white"
              >
                support@smarteval.ai
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-500">
             © 2025 SmartEval.{' '}
              <a
                href="https://www.wix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-gray-300"
              >
                Powered by AI-Driven Academic Tools.
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterCTASection;
