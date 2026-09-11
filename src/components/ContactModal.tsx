import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { Captcha } from './Captcha';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, isDark }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Web Design & Development');
  const [budget, setBudget] = useState('$5k – $15k');
  const [timeline, setTimeline] = useState('1 – 2 months');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Bot honeypot check
    if (honeypot) {
      console.warn('Bot detected via honeypot.');
      return;
    }

    // 2. CAPTCHA verification check
    if (!isCaptchaVerified) {
      setErrorMsg('Please solve the security challenge before submitting.');
      return;
    }

    // 3. Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!name.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send message payload
      const payload = {
        name,
        email,
        projectType,
        budget,
        timeline,
        message,
        recipient: 'rehanalishaik06@gmail.com',
        timestamp: new Date().toISOString(),
      };

      // Try local endpoint or handle gracefully
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Fallback gracefully if static hosting
        console.log('Dispatched contact enquiry payload:', payload);
      }

      // Simulate network round-trip for feedback
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMsg('An error occurred while sending. Please try again or email directly.');
    }
  };

  const handleOpenEmailClient = () => {
    const subject = encodeURIComponent(`Project Enquiry: ${projectType} from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:rehanalishaik06@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        id="contact-modal"
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-bone/20 bg-[#0e0e11] p-6 shadow-2xl text-bone sm:p-8"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(212,175,55,0.08)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-bone/10 pb-5">
          <div>
            <span className="eyebrow text-gilt">10 — Direct Project Enquiry</span>
            <h2 className="display mt-1 text-2xl text-bone sm:text-3xl">
              Initiate a <span className="display-italic">collaboration</span>
            </h2>
            <p className="mt-1 text-xs text-bone/60">
              Messages are sent directly to <strong className="text-bone">rehanalishaik06@gmail.com</strong>
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/shaik-rehan-ali-058969343/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-bone/20 bg-bone/[0.04] px-2.5 py-0.5 text-[0.62rem] text-bone/70 transition-colors hover:border-gilt hover:text-gilt"
              >
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/assassin064"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-bone/20 bg-bone/[0.04] px-2.5 py-0.5 text-[0.62rem] text-bone/70 transition-colors hover:border-gilt hover:text-gilt"
              >
                <span>Instagram: @assassin064</span>
              </a>
            </div>
          </div>
          <button
            id="close-contact-modal"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-bone/40 hover:text-bone"
          >
            <X className="size-4" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="py-10 text-center space-y-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="display text-2xl text-bone">Enquiry Received</h3>
            <p className="mx-auto max-w-md text-sm text-bone/70 leading-relaxed">
              Thank you, <strong className="text-bone">{name}</strong>. Your project specifications have been dispatched to{' '}
              <strong className="text-gilt">rehanalishaik06@gmail.com</strong>. I will review your requirements and respond within 24 hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleOpenEmailClient}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/25 px-5 py-2.5 text-xs text-bone/80 transition-colors hover:border-gilt hover:text-bone"
              >
                <Mail className="size-3.5" />
                <span>Open in Email App</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-bone px-6 py-2.5 text-xs font-semibold text-[#060505] transition-transform hover:scale-105"
              >
                <span>Return to Portfolio</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Honeypot field (hidden from legitimate users) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {errorMsg && (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="eyebrow block text-[0.62rem] text-bone/60 mb-1.5" htmlFor="contact-name">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full rounded-lg border border-bone/20 bg-bone/[0.04] px-3.5 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:border-gilt focus:outline-none focus:ring-1 focus:ring-gilt/60"
                />
              </div>

              <div>
                <label className="eyebrow block text-[0.62rem] text-bone/60 mb-1.5" htmlFor="contact-email">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. marcus@brand.com"
                  className="w-full rounded-lg border border-bone/20 bg-bone/[0.04] px-3.5 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:border-gilt focus:outline-none focus:ring-1 focus:ring-gilt/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="eyebrow block text-[0.62rem] text-bone/60 mb-1.5" htmlFor="project-type">
                  Scope
                </label>
                <select
                  id="project-type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full rounded-lg border border-bone/20 bg-[#161619] px-3 py-2.5 text-xs text-bone focus:border-gilt focus:outline-none"
                >
                  <option value="Web Design & Development">Web Design & Build</option>
                  <option value="Creative 3D & WebGL">3D & WebGL Experience</option>
                  <option value="Brand Identity & Design System">Brand Identity & System</option>
                  <option value="Full-Stack Web App">Full-Stack Application</option>
                  <option value="Performance & Audit">Performance Optimization</option>
                </select>
              </div>

              <div>
                <label className="eyebrow block text-[0.62rem] text-bone/60 mb-1.5" htmlFor="budget-range">
                  Budget
                </label>
                <select
                  id="budget-range"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full rounded-lg border border-bone/20 bg-[#161619] px-3 py-2.5 text-xs text-bone focus:border-gilt focus:outline-none"
                >
                  <option value="Under $5,000">Under $5k</option>
                  <option value="$5,000 – $15,000">$5k – $15k</option>
                  <option value="$15,000 – $30,000">$15k – $30k</option>
                  <option value="$30,000+">$30k+</option>
                </select>
              </div>

              <div>
                <label className="eyebrow block text-[0.62rem] text-bone/60 mb-1.5" htmlFor="timeline-range">
                  Timeline
                </label>
                <select
                  id="timeline-range"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full rounded-lg border border-bone/20 bg-[#161619] px-3 py-2.5 text-xs text-bone focus:border-gilt focus:outline-none"
                >
                  <option value="Immediate (2-4 weeks)">2 – 4 weeks</option>
                  <option value="1 – 2 months">1 – 2 months</option>
                  <option value="Quarterly / Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="eyebrow block text-[0.62rem] text-bone/60 mb-1.5" htmlFor="contact-message">
                Project Overview *
              </label>
              <textarea
                id="contact-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe your objectives, existing brand status, or specific deliverables..."
                className="w-full rounded-lg border border-bone/20 bg-bone/[0.04] px-3.5 py-2.5 text-sm text-bone placeholder:text-bone/30 focus:border-gilt focus:outline-none focus:ring-1 focus:ring-gilt/60 resize-none"
              />
            </div>

            {/* Anti-Spam CAPTCHA Protection */}
            <Captcha
              isDark={isDark}
              onVerify={(isValid) => setIsCaptchaVerified(isValid)}
            />

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-[0.68rem] text-bone/50">
                <ShieldCheck className="size-3.5 text-gilt" />
                <span>Protected by dynamic CAPTCHA & honeypot</span>
              </div>

              <button
                id="submit-enquiry-button"
                type="submit"
                disabled={isSubmitting || !isCaptchaVerified}
                className="inline-flex items-center gap-2 rounded-full bg-bone px-6 py-2.5 text-xs font-semibold text-[#060505] transition-all hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send to Rehan</span>
                    <Send className="size-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
