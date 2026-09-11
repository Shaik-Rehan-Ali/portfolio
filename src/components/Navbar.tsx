import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenContact: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenContact,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#leistungen' },
    { label: 'Work', href: '#arbeiten' },
    { label: 'Studio', href: '#studio' },
    { label: 'Process', href: '#prozess' },
    { label: 'System', href: '#system' },
    { label: 'Activity', href: '#aktivitaet' },
    { label: 'FAQ', href: '#fragen' },
    { label: 'Contact', href: '#kontakt' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-3 md:pt-4 px-4 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-7xl flex items-center justify-between pointer-events-auto">
        {/* Desktop Navbar pill */}
        <div
          id="main-navbar"
          className="relative mx-auto hidden w-full flex-row items-center justify-between rounded-full border border-bone/15 bg-[#0b0b0c]/80 px-6 py-2.5 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)] lg:flex"
        >
          {/* Brand Logo & Name */}
          <a
            href="#start"
            className="eyebrow flex items-center gap-2.5 text-bone transition-opacity hover:opacity-85"
            style={{ letterSpacing: '0.3em' }}
          >
            <img
              src="/favicon.jpg"
              alt="Rehan Ali Shaik Logo"
              referrerPolicy="no-referrer"
              className="size-7 rounded-full object-cover border border-gilt/50 ring-1 ring-gilt/25 shadow-md transition-transform hover:scale-105"
            />
            <span className="font-bold">REHAN ALI SHAIK</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`eyebrow relative py-1 text-[0.62rem] transition-colors duration-300 ${
                    isActive ? 'text-gilt' : 'text-bone/60 hover:text-bone'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gilt" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Controls: Dark Mode Toggle & CTA */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-desktop"
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="group flex size-8 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors hover:border-gilt hover:text-gilt"
            >
              {isDark ? (
                <Sun className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Moon className="size-3.5 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </button>

            {/* Start a project CTA */}
            <button
              id="start-project-btn-nav"
              type="button"
              onClick={onOpenContact}
              className="eyebrow inline-flex items-center gap-1.5 rounded-full border border-bone/25 bg-bone/[0.06] px-4 py-2 text-[0.6rem] text-bone transition-all duration-300 hover:border-gilt hover:bg-gilt/10 hover:text-gilt"
            >
              <span>Start a project</span>
              <ArrowUpRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Mobile Header Bar */}
        <div
          id="mobile-navbar"
          className="flex w-full items-center justify-between rounded-full border border-bone/15 bg-[#0b0b0c]/85 px-4 py-2.5 backdrop-blur-xl lg:hidden shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)]"
        >
          <a
            href="#start"
            className="eyebrow flex items-center gap-2 text-bone"
            style={{ letterSpacing: '0.24em' }}
          >
            <img
              src="/favicon.jpg"
              alt="Rehan Ali Shaik Logo"
              referrerPolicy="no-referrer"
              className="size-6 rounded-full object-cover border border-gilt/40 shadow-sm"
            />
            <span className="font-bold text-xs">REHAN ALI SHAIK</span>
          </a>

          <div className="flex items-center gap-2">
            {/* Mobile Dark Mode Toggle */}
            <button
              id="theme-toggle-mobile"
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle dark/light mode"
              className="flex size-9 items-center justify-center rounded-full border border-bone/20 text-bone/70"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="flex size-9 items-center justify-center rounded-full border border-bone/20 text-bone hover:border-bone/50"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-[#0b0b0c]/95 p-6 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-bone/10 pb-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon.jpg"
                alt="Rehan Ali Shaik Logo"
                referrerPolicy="no-referrer"
                className="size-7 rounded-full object-cover border border-gilt/40"
              />
              <span className="eyebrow text-bone font-bold text-xs" style={{ letterSpacing: '0.24em' }}>
                REHAN ALI SHAIK
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex size-10 items-center justify-center rounded-full border border-bone/20 text-bone"
              aria-label="Close mobile navigation"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="my-auto flex flex-col space-y-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="display text-2xl text-bone/85 transition-colors hover:text-gilt active:text-gilt"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-bone/10 pt-4 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-bone py-3 text-xs font-semibold text-[#060505] transition-transform active:scale-95"
            >
              <span>Start a Project Enquiry</span>
              <ArrowUpRight className="size-4" />
            </button>
            <div className="flex items-center justify-center gap-3 pt-1 text-xs">
              <a
                href="https://www.linkedin.com/in/shaik-rehan-ali-058969343/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-bone/20 px-3 py-1 text-[0.68rem] text-bone/70 hover:text-gilt hover:border-gilt transition-colors"
              >
                LinkedIn Profile
              </a>
              <a
                href="https://www.instagram.com/assassin064"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-bone/20 px-3 py-1 text-[0.68rem] text-bone/70 hover:text-gilt hover:border-gilt transition-colors"
              >
                @assassin064
              </a>
            </div>
            <p className="text-center text-[0.7rem] text-bone/50">
              Direct email: <span className="text-bone">rehanalishaik06@gmail.com</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
