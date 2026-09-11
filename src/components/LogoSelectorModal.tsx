import React, { useState } from 'react';
import { X, Check, Crown, Sparkles, Download, ArrowRight, Eye } from 'lucide-react';
import { LOGO_OPTIONS, LogoOption } from '../logos';

interface LogoSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLogoId: string;
  onSelectLogo: (logoId: string) => void;
}

export const LogoSelectorModal: React.FC<LogoSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedLogoId,
  onSelectLogo,
}) => {
  const [previewId, setPreviewId] = useState<string>(selectedLogoId);

  if (!isOpen) return null;

  const currentOption =
    LOGO_OPTIONS.find((l) => l.id === previewId) || LOGO_OPTIONS[0];

  const handleApply = (id: string) => {
    onSelectLogo(id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
    >
      <div
        id="logo-selector-modal"
        className="relative my-auto w-full max-w-5xl rounded-2xl border border-bone/20 bg-[#0c0c0d] p-5 sm:p-8 text-bone shadow-[0_25px_70px_rgba(0,0,0,0.9)] transition-all"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-bone/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[0.62rem] eyebrow text-gilt">
              <Sparkles className="size-3.5" />
              <span>BRAND IDENTITY SUITE</span>
              <span className="text-bone/30">•</span>
              <span className="text-bone/60">5 Sample Logo Explorations</span>
            </div>
            <h2 id="logo-modal-title" className="display mt-1 text-2xl sm:text-3xl text-bone">
              Select Your Portfolio <span className="display-italic">Brand Mark</span>
            </h2>
            <p className="mt-1 text-xs text-bone/65 max-w-2xl">
              Choose the logo that best expresses your personal aesthetic. Clicking a design immediately updates your header, mobile drawer, and footer.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex size-9 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-bone hover:text-bone"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Live Navbar Simulation Banner */}
        <div className="my-5 rounded-xl border border-bone/15 bg-[#141416] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-[0.58rem] text-bone/50 uppercase tracking-widest">
              Live Preview in Navbar:
            </span>
            <div className="flex items-center gap-2.5 rounded-full border border-bone/20 bg-black/80 px-4 py-1.5 shadow-inner">
              {currentOption.imageSrc ? (
                <img
                  src={currentOption.imageSrc}
                  alt={currentOption.name}
                  referrerPolicy="no-referrer"
                  className="size-6 rounded-full object-cover border border-gilt/40 ring-1 ring-gilt/20 shadow-sm"
                />
              ) : (
                <Crown className="size-4 text-gilt" />
              )}
              <span className="eyebrow text-xs font-bold text-bone tracking-widest">
                REHAN ALI SHAIK
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedLogoId === currentOption.id ? (
              <span className="inline-flex items-center gap-1.5 text-[0.68rem] text-gilt font-medium bg-gilt/10 border border-gilt/30 px-3 py-1 rounded-full">
                <Check className="size-3" /> Active on Portfolio
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleApply(currentOption.id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-gilt text-[#0b0b0c] px-4 py-1.5 text-xs font-semibold hover:bg-gilt/90 transition-colors"
              >
                Apply this Logo
              </button>
            )}
          </div>
        </div>

        {/* Logo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[58vh] overflow-y-auto pr-1">
          {LOGO_OPTIONS.map((logo) => {
            const isSelected = selectedLogoId === logo.id;
            const isPreviewing = previewId === logo.id;

            return (
              <div
                key={logo.id}
                onMouseEnter={() => setPreviewId(logo.id)}
                onClick={() => {
                  setPreviewId(logo.id);
                  handleApply(logo.id);
                }}
                className={`group relative flex flex-col rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-gilt bg-[#151518] shadow-[0_0_25px_rgba(212,175,55,0.18)] ring-1 ring-gilt/40'
                    : isPreviewing
                    ? 'border-bone/40 bg-[#121214]'
                    : 'border-bone/15 bg-[#0e0e10] hover:border-bone/30 hover:bg-[#111113]'
                }`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`eyebrow text-[0.55rem] px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-gilt text-[#0b0b0c] font-bold'
                        : 'bg-bone/10 text-bone/70'
                    }`}
                  >
                    {logo.badge}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[0.65rem] text-gilt font-mono">
                      <Check className="size-3" /> SELECTED
                    </span>
                  )}
                </div>

                {/* Logo Graphic Canvas / Display */}
                <div className="relative aspect-square w-full rounded-lg bg-black/90 border border-bone/15 overflow-hidden flex items-center justify-center p-3 group-hover:border-bone/35 transition-colors">
                  {logo.imageSrc ? (
                    <img
                      src={logo.imageSrc}
                      alt={logo.name}
                      referrerPolicy="no-referrer"
                      className="size-full object-contain rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                      <div className="size-20 rounded-full bg-bone/5 border border-gilt/40 flex items-center justify-center text-gilt shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                        <Crown className="size-10 text-gilt" />
                      </div>
                      <span className="text-[0.68rem] text-bone/50 uppercase tracking-widest font-mono">
                        Vector SVG Mark
                      </span>
                    </div>
                  )}

                  {/* Hover Inspect Icon */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="size-7 rounded-full bg-black/80 backdrop-blur border border-bone/20 flex items-center justify-center text-bone/80 text-xs">
                      <Eye className="size-3.5" />
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="display text-lg text-bone flex items-center justify-between">
                      <span>{logo.name}</span>
                    </h3>
                    <p className="eyebrow text-[0.58rem] text-gilt/80 mt-0.5">{logo.style}</p>
                    <p className="mt-2 text-xs text-bone/65 leading-relaxed">
                      {logo.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-bone/10 flex items-center justify-between">
                    <span className="text-[0.65rem] text-bone/45 italic truncate max-w-[170px]">
                      {logo.recommendedFor}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewId(logo.id);
                        handleApply(logo.id);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                        isSelected
                          ? 'bg-gilt text-[#0b0b0c] font-semibold'
                          : 'border border-bone/20 text-bone/80 hover:border-bone hover:text-bone'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Choose'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer actions */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between border-t border-bone/10 pt-4 gap-3">
          <div className="text-xs text-bone/55 flex items-center gap-2">
            <span>Selected mark:</span>
            <strong className="text-bone font-medium">
              {LOGO_OPTIONS.find((l) => l.id === selectedLogoId)?.name || 'Default'}
            </strong>
            <span className="text-bone/30">•</span>
            <span>Saved to your browser</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-full bg-gilt text-[#0b0b0c] px-6 py-2.5 text-xs font-semibold tracking-wider hover:bg-gilt/90 transition-colors uppercase"
            >
              Done & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
