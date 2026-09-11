import React, { useState } from 'react';

interface PageChromeProps {
  activeSection: string;
  onOpenContact: () => void;
  onNavigateSection: (direction: 'next' | 'prev') => void;
}

export const PageChrome: React.FC<PageChromeProps> = ({
  activeSection,
  onOpenContact,
}) => {
  const [keyboardNavEnabled, setKeyboardNavEnabled] = useState(true);

  const sections = [
    { id: 'start', label: 'Start' },
    { id: 'zahlen', label: 'By the Numbers' },
    { id: 'leistungen', label: 'What we build' },
    { id: 'umsetzung', label: 'How we build' },
    { id: 'arbeiten', label: 'Work' },
    { id: 'studio', label: 'Studio' },
    { id: 'prozess', label: 'Process' },
    { id: 'fragen', label: 'FAQ' },
    { id: 'system', label: 'The System' },
    { id: 'aktivitaet', label: 'Activity' },
    { id: 'logos', label: 'Brand Logos' },
    { id: 'kontakt', label: 'Contact' },
    { id: 'footer', label: 'Footer' },
  ];

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Left Vertical "On this page" scene index */}
      <aside
        id="desktop-page-index"
        aria-label="Scene navigation"
        className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block xl:left-10 select-none"
        style={{ textShadow: '0 1px 14px rgba(6,5,5,0.95), 0 0 4px rgba(6,5,5,0.9)' }}
      >
        <p className="eyebrow mb-5 text-[0.58rem] text-bone/35">On this page</p>
        <ul className="space-y-3.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  onClick={(e) => handleSectionClick(e, sec.id)}
                  className="group flex items-center text-left py-0.5 focus:outline-none"
                >
                  <span
                    className={`mr-3 h-px transition-all duration-500 ${
                      isActive
                        ? 'w-9 bg-gilt shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                        : 'w-3.5 bg-bone/30 group-hover:w-6 group-hover:bg-bone/60'
                    }`}
                  />
                  <span
                    className={`text-[0.74rem] font-light tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-bone font-medium' : 'text-bone/40 group-hover:text-bone/80'
                    }`}
                  >
                    {sec.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 2. Left Bottom Keyboard Legend */}
      <aside
        id="desktop-keyboard-legend"
        aria-label="Keyboard navigation"
        className="fixed bottom-7 left-6 z-30 hidden lg:block xl:left-10"
        style={{ textShadow: '0 1px 14px rgba(6,5,5,0.95), 0 0 4px rgba(6,5,5,0.9)' }}
      >
        <div className="mb-3 flex items-center gap-3">
          <p className="eyebrow text-[0.55rem] text-bone/35">Navigation</p>
          <button
            type="button"
            aria-label="Toggle keyboard navigation"
            aria-pressed={keyboardNavEnabled}
            onClick={() => setKeyboardNavEnabled(!keyboardNavEnabled)}
            className="group relative h-[11px] w-[24px] rounded-full border border-bone/25 transition-colors duration-300 hover:border-bone/45"
          >
            <span
              aria-hidden="true"
              className={`absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full transition-all duration-300 ${
                keyboardNavEnabled ? 'left-[14px] bg-gilt' : 'left-[3px] bg-bone/40'
              }`}
            />
          </button>
        </div>

        {keyboardNavEnabled && (
          <dl className="grid grid-cols-[auto_1fr] items-center gap-x-3.5 gap-y-2 text-[0.7rem] text-bone/45 font-light">
            <dt className="flex gap-[3px]">
              <kbd className="inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-[3px] border border-bone/20 px-1 font-mono text-[0.58rem] text-bone/60">
                ↑
              </kbd>
              <kbd className="inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-[3px] border border-bone/20 px-1 font-mono text-[0.58rem] text-bone/60">
                ↓
              </kbd>
              <kbd className="inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-[3px] border border-bone/20 px-1 font-mono text-[0.58rem] text-bone/60">
                W
              </kbd>
              <kbd className="inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-[3px] border border-bone/20 px-1 font-mono text-[0.58rem] text-bone/60">
                S
              </kbd>
            </dt>
            <dd>Change scene</dd>

            <dt>
              <kbd className="inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-[3px] border border-bone/20 px-1 font-mono text-[0.58rem] text-bone/60">
                K
              </kbd>
            </dt>
            <dd>
              <button
                type="button"
                onClick={onOpenContact}
                className="hover:text-gilt hover:underline focus:outline-none"
              >
                Direct contact
              </button>
            </dd>
          </dl>
        )}
      </aside>

      {/* 3. Floating Right Badge: Portfolio Nominee / Excellence */}
      <div
        id="desktop-badge"
        className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 lg:block select-none"
      >
        <button
          type="button"
          onClick={onOpenContact}
          title="Direct Collaboration Enquiry"
          className="group flex flex-col items-center justify-center bg-white px-2 py-4 rounded-l-md shadow-2xl transition-transform hover:-translate-x-1"
        >
          <span className="writing-vertical-rl rotate-180 text-[0.62rem] font-bold tracking-widest text-[#060505] uppercase">
            Awwwards · Nominee
          </span>
          <span className="mt-2 text-[0.5rem] font-semibold text-gilt">2026</span>
        </button>
      </div>
    </>
  );
};
