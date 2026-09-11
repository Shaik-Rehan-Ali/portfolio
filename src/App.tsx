import React, { useState, useEffect } from 'react';
import {
  Crown,
  ArrowRight,
  ExternalLink,
  Github,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  Send,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  GitCommit,
} from 'lucide-react';
import { ChessKingCanvas } from './components/ChessKingCanvas';
import { Navbar } from './components/Navbar';
import { PageChrome } from './components/PageChrome';
import { ContactModal } from './components/ContactModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SystemBento } from './components/SystemBento';
import { ActivityHeatmap } from './components/ActivityHeatmap';
import { Captcha } from './components/Captcha';
import {
  PROJECTS_DATA,
  STATS_DATA,
  SERVICES_DESIGN,
  SERVICES_BUILD,
  PROCESS_STEPS,
  FAQ_DATA,
} from './data';
import { Project } from './types';

const SECTION_IDS = [
  'start',
  'zahlen',
  'leistungen',
  'umsetzung',
  'arbeiten',
  'studio',
  'prozess',
  'fragen',
  'system',
  'aktivitaet',
  'kontakt',
  'footer',
];

export default function App() {
  const [activeSection, setActiveSection] = useState('start');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  // In-page contact form state
  const [inPageName, setInPageName] = useState('');
  const [inPageEmail, setInPageEmail] = useState('');
  const [inPageScope, setInPageScope] = useState('Web Design & Build');
  const [inPageMessage, setInPageMessage] = useState('');
  const [inPageCaptchaVerified, setInPageCaptchaVerified] = useState(false);
  const [inPageSubmitting, setInPageSubmitting] = useState(false);
  const [inPageSuccess, setInPageSuccess] = useState(false);

  // 1. Dark Mode Toggle
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // 2. IntersectionObserver to detect which section is in view
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          const idx = SECTION_IDS.indexOf(id);
          if (idx !== -1) {
            setActiveSectionIndex(idx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-10% 0px -25% 0px',
      threshold: 0.1,
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Keyboard navigation listener (W/S or Up/Down arrows, K for contact)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        setContactModalOpen(true);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        const nextIdx = Math.min(activeSectionIndex + 1, SECTION_IDS.length - 1);
        const nextId = SECTION_IDS[nextIdx];
        document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        const prevIdx = Math.max(activeSectionIndex - 1, 0);
        const prevId = SECTION_IDS[prevIdx];
        document.getElementById(prevId)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSectionIndex]);

  // Handle in-page contact submit
  const handleInPageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inPageCaptchaVerified) return;

    setInPageSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inPageName,
          email: inPageEmail,
          projectType: inPageScope,
          message: inPageMessage,
          recipient: 'rehanalishaik06@gmail.com',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});

      await new Promise((r) => setTimeout(r, 600));
      setInPageSuccess(true);
      setInPageSubmitting(false);
    } catch (err) {
      setInPageSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-gilt/30 selection:text-bone">
      {/* 1. 3D WebGL Chess King Canvas (fixed background) */}
      <ChessKingCanvas currentSection={activeSectionIndex} isDark={isDark} />

      {/* 2. Radial vignette and ambient lighting gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{
          background: isDark
            ? 'radial-gradient(130% 100% at 50% 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.48) 100%)'
            : 'radial-gradient(130% 100% at 50% 45%, rgba(255,255,255,0) 60%, rgba(0,0,0,0.06) 100%)',
        }}
      />

      {/* Mobile background dimming */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[6] bg-black/45 lg:hidden"
      />

      {/* Subtle procedural noise grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[7]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 0 1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '140px 140px',
          mixBlendMode: 'overlay',
          opacity: isDark ? 0.35 : 0.15,
        }}
      />

      {/* 3. Floating Navigation Bar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setContactModalOpen(true)}
        activeSection={activeSection}
      />

      {/* 4. Desktop Page Chrome (Left scene indicator, bottom keyboard legend, right badge) */}
      <PageChrome
        activeSection={activeSection}
        onOpenContact={() => setContactModalOpen(true)}
        onNavigateSection={(dir) => {
          const delta = dir === 'next' ? 1 : -1;
          const nextIdx = Math.max(0, Math.min(activeSectionIndex + delta, SECTION_IDS.length - 1));
          document.getElementById(SECTION_IDS[nextIdx])?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. Main Scrollable Sections */}
      <main id="main" className="relative z-10">
        {/* =========================================
            SECTION 00: START (HERO)
        ========================================= */}
        <section
          id="start"
          className="relative flex min-h-[100svh] px-6 pb-16 pt-28 md:items-center md:pt-16 md:px-12 justify-start lg:pl-52 xl:pl-64"
        >
          <div className="relative max-w-xl">
            <p className="eyebrow mb-4 text-gilt flex flex-wrap items-center gap-2">
              <span className="tabular-nums opacity-70">00</span>
              <span>Linux · Python · HTML/CSS · Kotlin</span>
              <span className="text-bone/30">•</span>
              <span className="text-bone/60 font-mono">@assassin064</span>
            </p>

            <h1 className="display text-[clamp(2.9rem,8vw,6.5rem)] text-bone font-medium leading-[1.02]">
              <span className="block">Rehan Ali</span>
              <span className="block">Shaik</span>
            </h1>

            <div className="mt-5">
              <div className="text-[1.15rem] md:text-[1.45rem] font-normal display text-bone leading-snug">
                Learning systems & building code{' '}
                <span className="text-gilt display-italic">from the shell up</span>.
              </div>
            </div>

            <p className="body-copy mt-5 max-w-md text-[0.95rem] leading-relaxed">
              Newbie exploring how Linux works under the hood, writing automated Python utilities, crafting semantic HTML/CSS web experiences, and experimenting with Kotlin on Android. Built openly through hands-on curiosity and AI pair-programming.
            </p>

            {/* Social quick links & badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <a
                href="https://www.linkedin.com/in/shaik-rehan-ali-058969343/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-bone/20 bg-bone/[0.04] px-3 py-1 text-[0.68rem] text-bone/80 transition-colors hover:border-gilt hover:text-gilt"
              >
                <Linkedin className="size-3 text-gilt" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://www.instagram.com/assassin064"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-bone/20 bg-bone/[0.04] px-3 py-1 text-[0.68rem] text-bone/80 transition-colors hover:border-gilt hover:text-gilt"
              >
                <Instagram className="size-3 text-gilt" />
                <span>@assassin064</span>
              </a>
              <a
                href="#aktivitaet"
                className="flex items-center gap-1.5 rounded-full border border-bone/20 bg-bone/[0.04] px-3 py-1 text-[0.68rem] text-bone/80 transition-colors hover:border-gilt hover:text-gilt"
              >
                <Terminal className="size-3 text-gilt" />
                <span>1,064 Contributions</span>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="eyebrow inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 text-[0.68rem] font-semibold text-[#060505] transition-all hover:bg-white hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)]"
              >
                <span>Get in touch</span>
                <ArrowRight className="size-3.5" />
              </button>

              <a
                href="#arbeiten"
                className="eyebrow inline-flex items-center gap-1.5 rounded-full border border-bone/20 px-5 py-3 text-[0.68rem] text-bone/80 transition-colors hover:border-bone/50 hover:text-bone"
              >
                <span>Explore Projects</span>
              </a>
            </div>

            <div className="eyebrow mt-12 flex items-center gap-3 text-[0.62rem] text-bone/45">
              <span className="inline-block h-7 w-px animate-pulse bg-bone/40" />
              Scroll to explore journey & 3D King
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 01: NUMBERS (BY THE NUMBERS)
        ========================================= */}
        <section
          id="zahlen"
          className="relative flex min-h-[100svh] px-6 pb-16 pt-28 md:items-center md:pt-16 md:px-12 justify-end lg:pr-14 xl:pr-24"
        >
          <div className="relative max-w-lg">
            <p className="eyebrow mb-4 text-gilt">
              <span className="mr-3 tabular-nums opacity-70">01</span>Numbers
            </p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.2rem)] text-bone">
              <span className="block">By the</span>
              <span className="block">Numbers</span>
            </h2>
            <p className="body-copy mt-4 max-w-md text-sm">
              What the work of recent production web builds measurably leaves behind.
            </p>

            <dl className="mt-7 space-y-px">
              {STATS_DATA.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 gap-1 border-t border-bone/15 py-3.5 md:grid-cols-[7rem_1fr] md:gap-4 transition-colors hover:bg-bone/[0.02]"
                >
                  <dt className="eyebrow text-bone/45 md:pt-1 text-[0.65rem]">{item.label}</dt>
                  <dd>
                    <span className="display block text-2xl text-bone">{item.value}</span>
                    <span className="body-copy mt-0.5 block text-xs">{item.description}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* =========================================
            SECTION 02: SERVICES — DESIGN (WHAT WE BUILD)
        ========================================= */}
        <section
          id="leistungen"
          className="relative flex min-h-[100svh] px-6 pb-16 pt-28 md:items-center md:pt-16 md:px-12 justify-start lg:pl-52 xl:pl-64"
        >
          <div className="relative max-w-lg">
            <p className="eyebrow mb-4 text-gilt">
              <span className="mr-3 tabular-nums opacity-70">02</span>Services — Design
            </p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.2rem)] text-bone">
              <span className="block">What we</span>
              <span className="block">build</span>
            </h2>
            <p className="body-copy mt-4 max-w-md text-sm">
              From a complete high-finish brand presence down to an interactive spatial 3D experience — work that takes an unapologetic position.
            </p>

            <dl className="mt-7 space-y-px">
              {SERVICES_DESIGN.map((item) => (
                <div
                  key={item.number}
                  className="grid grid-cols-1 gap-1 border-t border-bone/15 py-3.5 md:grid-cols-[4rem_1fr] md:gap-4 transition-colors hover:bg-bone/[0.02]"
                >
                  <dt className="eyebrow text-gilt/70 md:pt-1 text-[0.7rem]">{item.number}</dt>
                  <dd>
                    <span className="display block text-xl text-bone">{item.title}</span>
                    <span className="body-copy mt-1 block text-xs leading-relaxed">
                      {item.description}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* =========================================
            SECTION 03: SERVICES — BUILD (HOW WE BUILD)
        ========================================= */}
        <section
          id="umsetzung"
          className="relative flex min-h-[100svh] px-6 pb-16 pt-28 md:items-center md:pt-16 md:px-12 justify-end lg:pr-14 xl:pr-24"
        >
          <div className="relative max-w-lg">
            <p className="eyebrow mb-4 text-gilt">
              <span className="mr-3 tabular-nums opacity-70">03</span>Services — Build
            </p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.2rem)] text-bone">
              <span className="block">And how</span>
              <span className="block">we build</span>
            </h2>
            <p className="body-copy mt-4 max-w-md text-sm">
              Design is one half of the equation. The other half is immaculate, type-safe engineering.
            </p>

            <dl className="mt-7 space-y-px">
              {SERVICES_BUILD.map((item) => (
                <div
                  key={item.number}
                  className="grid grid-cols-1 gap-1 border-t border-bone/15 py-3.5 md:grid-cols-[4rem_1fr] md:gap-4 transition-colors hover:bg-bone/[0.02]"
                >
                  <dt className="eyebrow text-gilt/70 md:pt-1 text-[0.7rem]">{item.number}</dt>
                  <dd>
                    <span className="display block text-xl text-bone">{item.title}</span>
                    <span className="body-copy mt-1 block text-xs leading-relaxed">
                      {item.description}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* =========================================
            SECTION 04: WORK (PORTFOLIO SHOWCASE)
        ========================================= */}
        <section
          id="arbeiten"
          aria-labelledby="work-heading"
          className="relative flex min-h-[100svh] items-center px-6 py-24 md:px-12"
        >
          <div className="relative mx-auto w-full max-w-6xl">
            <header className="relative z-10 mb-8 max-w-xl">
              <p className="eyebrow mb-3 text-gilt">
                <span className="mr-3 tabular-nums opacity-70">04</span>Work
              </p>
              <h2 id="work-heading" className="display text-[clamp(1.8rem,3.5vw,2.8rem)] text-bone">
                Work that <span className="display-italic">works</span>
              </h2>
              <p className="body-copy mt-2.5 max-w-md text-sm">
                Concept and client builds engineered with real-time Three.js shaders, reactive TypeScript, and radical typographic clarity.
              </p>
            </header>

            {/* 3D Spatial Perspective Card Grid matching scfo.de */}
            <div className="spatial-perspective pointer-events-none relative z-10 w-full max-w-5xl">
              <div
                className="spatial-orientation pointer-events-auto relative"
                style={{
                  transform: 'rotateX(5.6deg) rotateY(16.2deg) rotateZ(1deg)',
                }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {PROJECTS_DATA.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.07] to-bone/[0.015] p-3.5 shadow-2xl transition-all duration-500 hover:border-gilt/60 hover:-translate-y-1 hover:shadow-[0_20px_45px_-10px_rgba(212,175,55,0.15)]"
                    >
                      <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="eyebrow absolute right-2.5 top-2.5 rounded-full border border-bone/20 bg-black/60 px-2.5 py-1 text-[0.52rem] text-bone/90 backdrop-blur-md">
                          Demo {project.demoNumber}
                        </span>
                        <span className="eyebrow absolute left-2.5 top-2.5 rounded-full border border-gilt/30 bg-gilt/15 px-2 py-0.5 text-[0.5rem] text-gilt backdrop-blur-md">
                          {project.badge}
                        </span>
                      </div>

                      <div className="relative z-10 mt-3 flex flex-1 flex-col">
                        <span className="eyebrow text-[0.52rem] text-gilt/70">{project.category}</span>
                        <h3 className="display mt-1 text-lg text-bone group-hover:text-gilt transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-bone/60 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-bone/10">
                          <span className="eyebrow text-[0.52rem] text-bone/70 group-hover:text-bone flex items-center gap-1">
                            Inspect Specs <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                          </span>
                          <span className="text-[0.62rem] font-mono text-bone/40">
                            {project.techStack[0]} · {project.techStack[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 05: STUDIO (ALL UNDER ONE ROOF)
        ========================================= */}
        <section
          id="studio"
          className="relative flex min-h-[100svh] px-6 pb-16 pt-28 md:items-center md:pt-16 md:px-12 justify-start lg:pl-52 xl:pl-64"
        >
          <div className="relative max-w-xl">
            <p className="eyebrow mb-4 text-gilt">
              <span className="mr-3 tabular-nums opacity-70">05</span>Studio & Tech Stack
            </p>
            <h2 className="display text-[clamp(2.4rem,6vw,5rem)] text-bone">
              <span className="block">Learning systems</span>
              <span className="block text-gilt display-italic">from first principles</span>
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed body-copy">
              <p>
                I am dedicated to understanding software from the ground up: navigating the Linux terminal, bash scripting, file permissions, and process management, while building modular automation tools in Python 3.
              </p>
              <p>
                On the client side, I explore native Android development with Kotlin and craft responsive, framework-free web pages using pure semantic HTML5 and CSS3. For advanced 3D WebGL and full-stack web builds, I openly collaborate with Google AI Studio and Gemini to architect scalable solutions.
              </p>
            </div>

            {/* Visual Tech Connectivity Architecture */}
            <div className="mt-8 rounded-2xl border border-bone/15 bg-bone/[0.025] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="eyebrow text-[0.55rem] text-gilt">Core Learning Toolchain</span>
                <span className="text-[0.62rem] font-mono text-bone/45">Linux + Web + Mobile</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs font-mono">
                <div className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] p-2.5">
                  <span className="size-1.5 rounded-full bg-gilt" />
                  <span className="text-bone/80">Linux / Ubuntu</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] p-2.5">
                  <span className="size-1.5 rounded-full bg-gilt" />
                  <span className="text-bone/80">Python 3</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] p-2.5">
                  <span className="size-1.5 rounded-full bg-gilt" />
                  <span className="text-bone/80">HTML5 & CSS3</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] p-2.5">
                  <span className="size-1.5 rounded-full bg-gilt" />
                  <span className="text-bone/80">Kotlin Android</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] p-2.5">
                  <span className="size-1.5 rounded-full bg-gilt" />
                  <span className="text-bone/80">AI Studio / Gemini</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] p-2.5">
                  <span className="size-1.5 rounded-full bg-gilt" />
                  <span className="text-bone/80">Bash / Shell</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] p-2.5">
                  <span className="size-1.5 rounded-full bg-gilt" />
                  <span className="text-bone/80">Git & Pattern 064</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] p-2.5">
                  <span className="size-1.5 rounded-full bg-gilt" />
                  <span className="text-bone/80">Three.js WebGL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 06: PROCESS (FROM BRIEFING TO LAUNCH)
        ========================================= */}
        <section
          id="prozess"
          className="relative flex min-h-[100svh] px-6 pb-16 pt-28 md:items-center md:pt-16 md:px-12 justify-end lg:pr-14 xl:pr-24"
        >
          <div className="relative max-w-lg">
            <p className="eyebrow mb-4 text-gilt">
              <span className="mr-3 tabular-nums opacity-70">06</span>Process
            </p>
            <h2 className="display text-[clamp(2.2rem,5vw,4.2rem)] text-bone">
              <span className="block">From briefing</span>
              <span className="block">to launch</span>
            </h2>
            <p className="body-copy mt-4 max-w-md text-sm">
              Four disciplined milestones every project runs through — with zero surprises in between.
            </p>

            <dl className="mt-7 space-y-px">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="grid grid-cols-1 gap-1 border-t border-bone/15 py-3.5 md:grid-cols-[4rem_1fr] md:gap-4 transition-colors hover:bg-bone/[0.02]"
                >
                  <dt className="eyebrow text-gilt/70 md:pt-1 text-[0.7rem]">{step.number}</dt>
                  <dd>
                    <span className="display block text-xl text-bone">{step.title}</span>
                    <span className="body-copy mt-1 block text-xs leading-relaxed">
                      {step.description}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* =========================================
            SECTION 07: FAQ (CLARITY UP FRONT)
        ========================================= */}
        <section
          id="fragen"
          aria-labelledby="faq-heading"
          className="relative flex min-h-[100svh] items-center px-6 py-20 md:px-12"
        >
          <div className="relative mx-auto w-full max-w-4xl">
            <header className="mb-8 max-w-xl">
              <p className="eyebrow mb-3 text-gilt">
                <span className="mr-3 tabular-nums opacity-70">07</span>Frequently Asked
              </p>
              <h2 id="faq-heading" className="display text-[clamp(1.8rem,3.5vw,2.8rem)] text-bone">
                Clarity <span className="display-italic">up front</span>
              </h2>
            </header>

            {/* 3D Spatial FAQ Card */}
            <div className="spatial-perspective w-full max-w-3xl">
              <div
                className="spatial-orientation rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.06] to-bone/[0.015] p-6 md:p-8 shadow-2xl"
                style={{ transform: 'rotateX(4.5deg) rotateY(15deg) rotateZ(1deg)' }}
              >
                <div className="mb-4">
                  <span className="eyebrow text-[0.6rem] text-gilt">Interactive Dialogues</span>
                </div>

                <ul className="divide-y divide-bone/10">
                  {FAQ_DATA.map((item, idx) => {
                    const isSelected = activeFaqIndex === idx;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveFaqIndex(idx)}
                          className={`flex w-full items-center gap-3 py-3.5 text-left transition-colors ${
                            isSelected ? 'text-bone' : 'text-bone/55 hover:text-bone/85'
                          }`}
                        >
                          <span
                            className={`h-4 w-1 shrink-0 rounded-full transition-colors ${
                              isSelected ? 'bg-gilt' : 'bg-transparent'
                            }`}
                          />
                          <span className="display text-base md:text-lg">{item.question}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="relative mt-4 min-h-[6.5rem] border-t border-bone/10 pt-4">
                  <p className="body-copy text-xs leading-relaxed text-bone/85 transition-opacity duration-300">
                    {FAQ_DATA[activeFaqIndex]?.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 08: THE SYSTEM
        ========================================= */}
        <section
          id="system"
          aria-labelledby="system-heading"
          className="relative flex min-h-[100svh] items-center px-6 py-20 md:px-12"
        >
          <div className="relative mx-auto w-full max-w-6xl">
            <header className="mb-8 max-w-xl">
              <p className="eyebrow mb-3 text-gilt">
                <span className="mr-3 tabular-nums opacity-70">08</span>The System
              </p>
              <h2 id="system-heading" className="display text-[clamp(1.8rem,3.5vw,2.8rem)] text-bone">
                How a site is <span className="display-italic">put together</span>
              </h2>
              <p className="body-copy mt-2.5 max-w-md text-sm">
                Not a hunch, a systematic pipeline: weighting, worldwide edge delivery, sequence, and code craft working seamlessly together.
              </p>
            </header>

            <SystemBento />
          </div>
        </section>

        {/* =========================================
            SECTION 09: ACTIVITY (HEATMAP)
        ========================================= */}
        <section
          id="aktivitaet"
          aria-labelledby="activity-heading"
          className="relative flex min-h-[100svh] items-center px-6 py-20 md:px-12"
        >
          <div className="relative mx-auto w-full max-w-6xl">
            <header className="mb-8 max-w-xl">
              <p className="eyebrow mb-3 text-gilt">
                <span className="mr-3 tabular-nums opacity-70">09</span>Activity
              </p>
              <h2 id="activity-heading" className="display text-[clamp(1.8rem,3.5vw,2.8rem)] text-bone">
                A year, <span className="display-italic">day by day</span>
              </h2>
              <p className="body-copy mt-2.5 max-w-md text-sm">
                Each cell represents a production working day. Dense blocks are active build & shader phases; lighter cells are design discovery and audit reviews.
              </p>
            </header>

            <ActivityHeatmap />
          </div>
        </section>

        {/* =========================================
            SECTION 10: CONTACT (PROJECT ENQUIRY)
        ========================================= */}
        <section
          id="kontakt"
          aria-labelledby="contact-heading"
          className="relative flex min-h-[100svh] items-center justify-center px-6 py-20 md:px-12"
        >
          <div className="w-full max-w-2xl text-center">
            <p className="eyebrow mb-4 text-gilt">10 — Direct Project Enquiry</p>
            <h2 id="contact-heading" className="display text-[clamp(2.2rem,5vw,4.2rem)] text-bone leading-[1.05]">
              <span className="block">Ready to make</span>
              <span className="block">
                the <span className="display-italic text-gilt">move</span>?
              </span>
            </h2>
            <p className="body-copy mx-auto mt-4 max-w-md text-sm leading-relaxed">
              Tell me about your project or upcoming milestone. Messages go directly to{' '}
              <strong className="text-bone">rehanalishaik06@gmail.com</strong> — with an honest assessment and personal response.
            </p>

            {/* In-page Action Button triggering Modal OR direct form below */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="eyebrow inline-flex items-center gap-3 rounded-full bg-bone px-8 py-3.5 text-xs font-semibold text-[#060505] transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_15px_40px_rgba(212,175,55,0.3)]"
              >
                <span>Open Project Enquiry Sheet</span>
                <ArrowRight className="size-4" />
              </button>

              <a
                href="mailto:rehanalishaik06@gmail.com"
                className="eyebrow inline-flex items-center gap-2 rounded-full border border-bone/20 px-6 py-3.5 text-xs text-bone/80 transition-colors hover:border-bone/50 hover:text-bone"
              >
                <Mail className="size-3.5" />
                <span>rehanalishaik06@gmail.com</span>
              </a>
            </div>

            {/* Quick In-Page Fast Contact Card with CAPTCHA */}
            <div className="mt-12 rounded-2xl border border-bone/15 bg-[#0e0e11]/90 p-6 text-left shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-bone/10 pb-3 mb-4">
                <span className="eyebrow text-xs text-gilt">Fast Direct Dispatch</span>
                <span className="text-[0.68rem] text-bone/50 font-mono">Protected by CAPTCHA</span>
              </div>

              {inPageSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <h4 className="display text-xl text-bone">Message Dispatched</h4>
                  <p className="text-xs text-bone/60">
                    Sent to <strong className="text-gilt">rehanalishaik06@gmail.com</strong>. I'll get back to you shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInPageSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={inPageName}
                      onChange={(e) => setInPageName(e.target.value)}
                      className="rounded-lg border border-bone/15 bg-bone/[0.03] px-3.5 py-2.5 text-xs text-bone placeholder:text-bone/30 focus:border-gilt focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your email"
                      value={inPageEmail}
                      onChange={(e) => setInPageEmail(e.target.value)}
                      className="rounded-lg border border-bone/15 bg-bone/[0.03] px-3.5 py-2.5 text-xs text-bone placeholder:text-bone/30 focus:border-gilt focus:outline-none"
                    />
                  </div>

                  <textarea
                    required
                    rows={2}
                    placeholder="Briefly describe your objectives or questions..."
                    value={inPageMessage}
                    onChange={(e) => setInPageMessage(e.target.value)}
                    className="w-full rounded-lg border border-bone/15 bg-bone/[0.03] px-3.5 py-2.5 text-xs text-bone placeholder:text-bone/30 focus:border-gilt focus:outline-none resize-none"
                  />

                  {/* Anti-Spam CAPTCHA */}
                  <Captcha
                    isDark={isDark}
                    onVerify={(isValid) => setInPageCaptchaVerified(isValid)}
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[0.65rem] text-bone/45">
                      Sends directly to rehanalishaik06@gmail.com
                    </span>
                    <button
                      type="submit"
                      disabled={inPageSubmitting || !inPageCaptchaVerified}
                      className="eyebrow inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2 text-[0.62rem] font-semibold text-[#060505] transition-all hover:bg-white disabled:opacity-40"
                    >
                      {inPageSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="size-3" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 11: FOOTER
        ========================================= */}
        <footer
          id="footer"
          className="relative border-t border-bone/10 px-6 py-16 md:px-12 lg:pl-52 xl:pl-64"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-xl">
              <p className="eyebrow mb-2 text-gilt flex items-center gap-2">
                <Crown className="size-3.5 text-gilt" />
                <span>REHAN ALI SHAIK</span>
                <span className="text-bone/30">•</span>
                <span className="font-mono text-bone/60">@assassin064</span>
              </p>
              <p className="body-copy max-w-md text-xs leading-relaxed">
                Exploring Linux internals, building automated Python utilities, native Kotlin Android apps, and semantic HTML/CSS web experiences.
              </p>

              {/* Social Links */}
              <div className="mt-5 flex items-center gap-3">
                <a
                  href="https://github.com/rehanalishaik"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                  className="flex size-8 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-bone hover:text-bone"
                >
                  <Github className="size-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shaik-rehan-ali-058969343/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn: Shaik Rehan Ali"
                  title="LinkedIn: Shaik Rehan Ali"
                  className="flex size-8 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-gilt hover:text-gilt"
                >
                  <Linkedin className="size-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/assassin064"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram: @assassin064"
                  title="Instagram: @assassin064"
                  className="flex size-8 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-gilt hover:text-gilt"
                >
                  <Instagram className="size-3.5" />
                </a>
                <a
                  href="mailto:rehanalishaik06@gmail.com"
                  aria-label="Send Email"
                  title="rehanalishaik06@gmail.com"
                  className="flex size-8 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-bone hover:text-bone"
                >
                  <Mail className="size-3.5" />
                </a>
              </div>

              {/* Ask AI Section */}
              <div className="mt-7">
                <h3 className="eyebrow mb-2.5 text-[0.55rem] text-gilt/70">
                  (Ask AI about Rehan Ali Shaik · @assassin064)
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <a
                    href="https://chat.openai.com/?q=Evaluate%20Rehan%20Ali%20Shaik%20(%40assassin064)%20learning%20Linux%2C%20Python%2C%20Kotlin%2C%20and%20web%20technologies."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-bone/20 px-3 py-1 text-[0.68rem] text-bone/60 transition-colors hover:border-bone hover:text-bone"
                  >
                    ChatGPT
                  </a>
                  <a
                    href="https://claude.ai/new?q=Evaluate%20Rehan%20Ali%20Shaik%20(%40assassin064)%20learning%20Linux%2C%20Python%2C%20and%20software%20engineering."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-bone/20 px-3 py-1 text-[0.68rem] text-bone/60 transition-colors hover:border-bone hover:text-bone"
                  >
                    Claude
                  </a>
                  <a
                    href="https://www.perplexity.ai/search/new?q=Who%20is%20Rehan%20Ali%20Shaik%20(%40assassin064)%20developer%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-bone/20 px-3 py-1 text-[0.68rem] text-bone/60 transition-colors hover:border-bone hover:text-bone"
                  >
                    Perplexity
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Navigation Columns */}
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-bone/10 pt-8 sm:grid-cols-4">
              <div>
                <h4 className="eyebrow text-[0.58rem] text-gilt mb-3">Navigation</h4>
                <ul className="space-y-2 text-xs text-bone/60">
                  <li><a href="#start" className="hover:text-bone">Start</a></li>
                  <li><a href="#leistungen" className="hover:text-bone">Services</a></li>
                  <li><a href="#arbeiten" className="hover:text-bone">Work</a></li>
                  <li><a href="#prozess" className="hover:text-bone">Process</a></li>
                  <li><a href="#fragen" className="hover:text-bone">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 className="eyebrow text-[0.58rem] text-gilt mb-3">Capabilities</h4>
                <ul className="space-y-2 text-xs text-bone/60">
                  <li><a href="#zahlen" className="hover:text-bone">By the Numbers</a></li>
                  <li><a href="#studio" className="hover:text-bone">Studio Stack</a></li>
                  <li><a href="#system" className="hover:text-bone">The System</a></li>
                  <li><a href="#aktivitaet" className="hover:text-bone">Activity Heatmap</a></li>
                </ul>
              </div>

              <div>
                <h4 className="eyebrow text-[0.58rem] text-gilt mb-3">Connect & Socials</h4>
                <ul className="space-y-2 text-xs text-bone/60">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/shaik-rehan-ali-058969343/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bone hover:text-gilt flex items-center gap-1.5 transition-colors"
                    >
                      <Linkedin className="size-3 text-gilt" />
                      <span>LinkedIn Profile</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/assassin064"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bone hover:text-gilt flex items-center gap-1.5 transition-colors"
                    >
                      <Instagram className="size-3 text-gilt" />
                      <span>Instagram (@assassin064)</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:rehanalishaik06@gmail.com" className="text-bone hover:text-gilt transition-colors">
                      rehanalishaik06@gmail.com
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setContactModalOpen(true)}
                      className="hover:text-bone transition-colors"
                    >
                      Send a Message
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="eyebrow text-[0.58rem] text-gilt mb-3">Learning Path</h4>
                <ul className="space-y-2 text-xs text-bone/60">
                  <li>Linux / Bash Shell</li>
                  <li>Python 3 Automation</li>
                  <li>Kotlin Android SDK</li>
                  <li>Semantic HTML5 / CSS3</li>
                  <li>AI Studio Co-Building</li>
                </ul>
              </div>
            </div>

            {/* Bottom Copyright & WebGL Badge */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-bone/10 pt-6 text-[0.72rem] text-bone/45">
              <span>© {new Date().getFullYear()} Rehan Ali Shaik (@assassin064) — All rights reserved.</span>
              <span className="eyebrow text-[0.52rem] text-gilt/60 mt-2 sm:mt-0">
                Rendered in real time · WebGL Chess King
              </span>
            </div>
          </div>
        </footer>
      </main>

      {/* 6. Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 7. Contact Modal with Anti-Spam CAPTCHA */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
}
