import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isValid: boolean, token: string) => void;
  isDark: boolean;
}

export const Captcha: React.FC<CaptchaProps> = ({ onVerify, isDark }) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random 5-character alphanumeric string (avoiding ambiguous letters)
  const generateCode = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = isDark ? '#141416' : '#e8e8e4';
    ctx.fillRect(0, 0, width, height);

    // Draw interference lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = isDark
        ? `rgba(212, 175, 55, ${0.15 + Math.random() * 0.25})`
        : `rgba(158, 121, 27, ${0.2 + Math.random() * 0.25})`;
      ctx.lineWidth = 1 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height
      );
      ctx.stroke();
    }

    // Draw background dots for noise
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = isDark ? 'rgba(241, 241, 239, 0.2)' : 'rgba(20, 20, 24, 0.2)';
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw distorted alphanumeric characters
    const charSpacing = width / (code.length + 1);
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const x = charSpacing * (i + 1);
      const y = height / 2 + (Math.random() - 0.5) * 8;
      const angle = (Math.random() - 0.5) * 0.5;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Gradient text matching gilt
      const grad = ctx.createLinearGradient(-10, -10, 10, 10);
      if (isDark) {
        grad.addColorStop(0, '#f1f1ef');
        grad.addColorStop(1, '#d4af37');
      } else {
        grad.addColorStop(0, '#111113');
        grad.addColorStop(1, '#9e791b');
      }
      ctx.fillStyle = grad;
      ctx.fillText(char, -8, 0);
      ctx.restore();
    }
  };

  const refreshCaptcha = () => {
    const newCode = generateCode();
    setCaptchaCode(newCode);
    setUserInput('');
    setStatus('idle');
    onVerify(false, '');
    setTimeout(() => drawCaptcha(newCode), 20);
  };

  useEffect(() => {
    refreshCaptcha();
  }, [isDark]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setUserInput(val);

    if (val.length === captchaCode.length) {
      if (val === captchaCode) {
        setStatus('valid');
        onVerify(true, `verified-${Date.now()}`);
      } else {
        setStatus('invalid');
        onVerify(false, '');
      }
    } else {
      setStatus('idle');
      onVerify(false, '');
    }
  };

  return (
    <div id="captcha-container" className="space-y-2 rounded-xl border border-bone/15 bg-bone/[0.025] p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-gilt" />
          <span className="eyebrow text-[0.6rem] text-bone/70">Anti-Spam Verification</span>
        </div>
        <button
          type="button"
          onClick={refreshCaptcha}
          className="group flex items-center gap-1 text-[0.68rem] text-bone/50 transition-colors hover:text-bone"
          title="Regenerate CAPTCHA"
        >
          <RefreshCw className="size-3 transition-transform duration-300 group-hover:rotate-180" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="relative overflow-hidden rounded-lg border border-bone/20 bg-black/40 shadow-inner">
          <canvas
            ref={canvasRef}
            width={170}
            height={50}
            className="block h-[50px] w-[170px]"
            aria-label="Visual CAPTCHA security challenge"
          />
        </div>

        <div className="relative flex-1">
          <input
            id="captcha-input"
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter 5 characters"
            maxLength={5}
            autoComplete="off"
            className={`w-full rounded-lg border px-3 py-2.5 font-mono text-sm tracking-widest uppercase transition-colors focus:outline-none focus:ring-1 ${
              status === 'valid'
                ? 'border-emerald-500/70 bg-emerald-500/10 text-emerald-300 focus:ring-emerald-500'
                : status === 'invalid'
                ? 'border-rose-500/70 bg-rose-500/10 text-rose-300 focus:ring-rose-500'
                : 'border-bone/20 bg-bone/[0.04] text-bone placeholder:text-bone/30 focus:border-gilt focus:ring-gilt/60'
            }`}
          />
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            {status === 'valid' && <CheckCircle2 className="size-4 text-emerald-400" />}
            {status === 'invalid' && <AlertCircle className="size-4 text-rose-400" />}
          </div>
        </div>
      </div>

      <p className="text-[0.62rem] text-bone/45">
        Case-insensitive security challenge protecting directly dispatched emails to Rehan Ali Shaik.
      </p>
    </div>
  );
};
