import React from 'react';
import { Crown, Sparkles, Check, Download, Eye, ArrowUpRight } from 'lucide-react';
import { LOGO_OPTIONS, LogoOption } from '../logos';

interface BrandLogoShowcaseProps {
  selectedLogoId: string;
  onSelectLogo: (logoId: string) => void;
  onOpenModal: () => void;
}

export const BrandLogoShowcase: React.FC<BrandLogoShowcaseProps> = ({
  selectedLogoId,
  onSelectLogo,
  onOpenModal,
}) => {
  return (
    <div className="w-full">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LOGO_OPTIONS.map((logo, index) => {
          const isSelected = selectedLogoId === logo.id;

          return (
            <div
              key={logo.id}
              id={`sample-logo-card-${logo.id}`}
              className={`group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 transition-all duration-300 backdrop-blur-sm ${
                isSelected
                  ? 'border-gilt/70 bg-[#141417]/90 shadow-[0_15px_40px_rgba(212,175,55,0.14)] ring-1 ring-gilt/40'
                  : 'border-bone/15 bg-[#0d0d0f]/80 hover:border-bone/35 hover:bg-[#111114]'
              }`}
            >
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`eyebrow text-[0.55rem] px-2.5 py-1 rounded-full ${
                    isSelected
                      ? 'bg-gilt text-[#0b0b0c] font-bold'
                      : 'bg-bone/10 text-bone/70'
                  }`}
                >
                  Concept 0{index + 1} · {logo.badge}
                </span>

                {isSelected ? (
                  <span className="flex items-center gap-1 text-[0.68rem] text-gilt font-mono">
                    <Check className="size-3.5" /> ACTIVE
                  </span>
                ) : (
                  <span className="text-[0.65rem] text-bone/40 font-mono">
                    Sample
                  </span>
                )}
              </div>

              {/* Logo Graphic Canvas Display */}
              <div className="relative my-4 aspect-square w-full rounded-xl bg-black/90 border border-bone/15 overflow-hidden flex items-center justify-center p-3 shadow-inner group-hover:border-bone/30 transition-colors">
                {logo.imageSrc ? (
                  <img
                    src={logo.imageSrc}
                    alt={logo.name}
                    referrerPolicy="no-referrer"
                    className="size-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-center p-4">
                    <div className="size-24 rounded-full bg-bone/5 border border-gilt/30 flex items-center justify-center text-gilt shadow-[0_0_35px_rgba(212,175,55,0.2)]">
                      <Crown className="size-12 text-gilt" />
                    </div>
                    <span className="text-xs text-bone/50 font-mono tracking-widest uppercase">
                      Pure SVG Vector Icon
                    </span>
                  </div>
                )}

                {/* Corner live preview pill */}
                <div className="absolute top-2.5 right-2.5">
                  <div className="flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-[0.58rem] text-bone/70 border border-bone/20 backdrop-blur-md">
                    <Eye className="size-2.5 text-gilt" />
                    <span>Preview</span>
                  </div>
                </div>
              </div>

              {/* Description & Typography */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="display text-xl text-bone flex items-center justify-between">
                    <span>{logo.name}</span>
                  </h3>
                  <p className="eyebrow text-[0.58rem] text-gilt mt-1">
                    {logo.style}
                  </p>
                  <p className="body-copy mt-2 text-xs leading-relaxed text-bone/70">
                    {logo.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-4 border-t border-bone/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectLogo(logo.id)}
                    className={`eyebrow flex-1 py-2.5 text-center text-xs rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-gilt text-[#0b0b0c] font-bold shadow-[0_4px_15px_rgba(212,175,55,0.3)]'
                        : 'border border-bone/25 text-bone hover:border-gilt hover:text-gilt hover:bg-gilt/10'
                    }`}
                  >
                    {isSelected ? '✓ Currently Active' : 'Apply as Portfolio Logo'}
                  </button>

                  {logo.imageSrc && (
                    <a
                      href={logo.imageSrc}
                      download={`${logo.id}-logo.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Inspect full resolution asset"
                      className="flex size-9 items-center justify-center rounded-full border border-bone/20 text-bone/60 hover:border-bone hover:text-bone transition-colors"
                    >
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helper Banner */}
      <div className="mt-8 rounded-xl border border-bone/15 bg-bone/[0.03] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full border border-gilt/40 bg-gilt/10 text-gilt shrink-0">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h4 className="display text-base text-bone">Which sample do you like best?</h4>
            <p className="text-xs text-bone/60">
              Click <strong className="text-gilt font-medium">"Apply as Portfolio Logo"</strong> on any card above to see it dynamically take over the top navigation, mobile menu, and footer!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenModal}
          className="eyebrow shrink-0 inline-flex items-center gap-1.5 rounded-full border border-gilt/40 bg-gilt/10 px-5 py-2.5 text-xs text-gilt hover:bg-gilt hover:text-[#0b0b0c] transition-colors"
        >
          <span>Open Fullscreen Comparison</span>
          <ArrowUpRight className="size-3" />
        </button>
      </div>
    </div>
  );
};
