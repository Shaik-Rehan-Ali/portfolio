import React, { useState } from 'react';
import { Globe2, CheckCircle2, ShieldAlert, Cpu, Sparkles, Activity } from 'lucide-react';
import { RADAR_CAPABILITIES } from '../data';

export const SystemBento: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'radar' | 'regions'>('radar');

  // Regions list
  const regions = [
    { name: 'Frankfurt', ping: '12ms', status: 'Online' },
    { name: 'London', ping: '15ms', status: 'Online' },
    { name: 'New York', ping: '38ms', status: 'Online' },
    { name: 'San Francisco', ping: '54ms', status: 'Online' },
    { name: 'Tokyo', ping: '72ms', status: 'Online' },
    { name: 'Singapore', ping: '68ms', status: 'Online' },
    { name: 'Sydney', ping: '92ms', status: 'Online' },
    { name: 'São Paulo', ping: '84ms', status: 'Online' },
    { name: 'Mumbai', ping: '48ms', status: 'Online' },
  ];

  // Pipeline checklist
  const pipelineTasks = [
    { title: 'Scene Calibrated', desc: 'Camera, light and materials calibrated per viewport' },
    { title: 'Frame Rate Locked', desc: 'Strict 60fps frame budget on desktop & mobile' },
    { title: 'Contrast & WCAG AA', desc: 'Text legibility preserved over dynamic 3D canvas' },
    { title: 'Bundle Optimised', desc: 'Sub-second cold starts with tree-shaken edge chunks' },
  ];

  // Radar polygon math for 6 axes
  const size = 180;
  const center = size / 2;
  const radius = 62;
  const axes = RADAR_CAPABILITIES;
  const totalAxes = axes.length;

  const points = axes.map((axis, i) => {
    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
    const r = (axis.score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div id="system-bento-grid" className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
        {/* Bento Card 1: Reach / Worldwide Delivery (span 2) */}
        <div className="h-full md:col-span-2">
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.06] via-bone/[0.03] to-bone/[0.015] p-5 md:p-6 shadow-2xl transition-all duration-500 hover:border-bone/30">
            {/* Subtle grid pattern background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(241,241,239,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(241,241,239,0.06) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="eyebrow text-[0.58rem] text-gilt/70">Reach & Architecture</span>
                <h3 className="display mt-1 text-xl text-bone">Delivered Worldwide</h3>
                <p className="body-copy mt-1 max-w-sm text-xs leading-relaxed">
                  Every portfolio piece and client application sits on high-availability edge networks — sub-second proximity to visitors globally.
                </p>
              </div>
              <span className="eyebrow rounded-full border border-bone/20 bg-black/40 px-3 py-1 text-[0.55rem] text-bone/85 backdrop-blur-sm">
                9 Regions · 99.99% Uptime
              </span>
            </div>

            {/* Interactive World Distribution Grid */}
            <div className="relative z-10 mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {regions.map((reg) => (
                <div
                  key={reg.name}
                  className="flex items-center justify-between rounded-lg border border-bone/10 bg-bone/[0.02] px-3 py-2 text-xs transition-colors hover:border-gilt/40 hover:bg-bone/[0.05]"
                >
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    <span className="font-medium text-bone/90 text-[0.75rem]">{reg.name}</span>
                  </div>
                  <span className="font-mono text-[0.65rem] text-bone/50">{reg.ping}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Card 2: 6-Axis Radar Capability Profile (span 1) */}
        <div className="h-full md:col-span-1">
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.06] via-bone/[0.03] to-bone/[0.015] p-5 md:p-6 shadow-2xl transition-all duration-500 hover:border-bone/30">
            <div>
              <span className="eyebrow text-[0.58rem] text-gilt/70">Weighting</span>
              <h3 className="display mt-1 text-xl text-bone">Capability Profile</h3>
              <p className="body-copy mt-1 text-xs leading-relaxed">
                Balanced craft: bridging visual typography, 3D shaders, and full-stack reliability.
              </p>
            </div>

            {/* SVG Radar Chart */}
            <div className="my-3 flex items-center justify-center">
              <svg width={size} height={size} className="overflow-visible">
                {/* Background concentric rings */}
                {[0.25, 0.5, 0.75, 1.0].map((level) => {
                  const ringPoints = axes.map((_, i) => {
                    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                    const r = level * radius;
                    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={level}
                      points={ringPoints}
                      fill="none"
                      stroke="rgba(241,241,239,0.12)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Axes lines */}
                {axes.map((_, i) => {
                  const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                  const x2 = center + radius * Math.cos(angle);
                  const y2 = center + radius * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(241,241,239,0.15)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Score polygon */}
                <polygon
                  points={points}
                  fill="rgba(212,175,55,0.25)"
                  stroke="#d4af37"
                  strokeWidth="2"
                  className="transition-all duration-700 hover:fill-opacity-40"
                />

                {/* Axis Labels */}
                {axes.map((axis, i) => {
                  const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                  const labelR = radius + 15;
                  const x = center + labelR * Math.cos(angle);
                  const y = center + labelR * Math.sin(angle);
                  return (
                    <text
                      key={axis.axis}
                      x={x}
                      y={y}
                      fill="rgba(241,241,239,0.65)"
                      fontSize="8"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-sans"
                    >
                      {axis.axis}
                    </text>
                  );
                })}
              </svg>
            </div>

            <p className="text-[0.62rem] text-bone/45 text-center">
              Comprehensive proficiency index (scale 0–100).
            </p>
          </div>
        </div>

        {/* Bento Card 3: Pre-launch Pipeline Checklist */}
        <div className="h-full md:col-span-1">
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.06] via-bone/[0.03] to-bone/[0.015] p-5 md:p-6 shadow-2xl transition-all duration-500 hover:border-bone/30">
            <div>
              <span className="eyebrow text-[0.58rem] text-gilt/70">Pipeline</span>
              <h3 className="display mt-1 text-xl text-bone">Quality Assurance</h3>
              <p className="body-copy mt-1 text-xs">Steps verified before any build goes live.</p>
            </div>

            <ul className="my-4 space-y-2.5">
              {pipelineTasks.map((task) => (
                <li
                  key={task.title}
                  className="flex items-start gap-2.5 rounded-lg border border-bone/10 bg-bone/[0.02] p-2.5"
                >
                  <CheckCircle2 className="size-3.5 text-gilt shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-medium text-bone">{task.title}</span>
                    <span className="block text-[0.68rem] text-bone/50 leading-tight mt-0.5">
                      {task.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <span className="text-[0.62rem] text-bone/45">Automated CI/CD validation on every commit</span>
          </div>
        </div>

        {/* Bento Card 4: Stance & Core Principles */}
        <div className="h-full md:col-span-2">
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.06] via-bone/[0.03] to-bone/[0.015] p-5 md:p-6 shadow-2xl transition-all duration-500 hover:border-bone/30">
            <div>
              <span className="eyebrow text-[0.58rem] text-gilt/70">Stance</span>
              <h3 className="display mt-1 text-xl text-bone">What We Hold To</h3>
              <p className="body-copy mt-1 max-w-md text-xs">
                Philosophies guiding every line of code and spatial composition.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-bone/10 bg-bone/[0.02] p-3.5">
                <span className="eyebrow text-[0.55rem] text-gilt">01 · Real Time</span>
                <h4 className="mt-1 text-sm font-medium text-bone">Zero Prerenders</h4>
                <p className="mt-1 text-[0.72rem] text-bone/55 leading-relaxed">
                  Every reflection and shadow is computed live on the GPU in the browser.
                </p>
              </div>

              <div className="rounded-xl border border-bone/10 bg-bone/[0.02] p-3.5">
                <span className="eyebrow text-[0.55rem] text-gilt">02 · One Piece</span>
                <h4 className="mt-1 text-sm font-medium text-bone">Design & Code Unified</h4>
                <p className="mt-1 text-[0.72rem] text-bone/55 leading-relaxed">
                  Strategy, art direction, and engineering executed by one singular mind.
                </p>
              </div>

              <div className="rounded-xl border border-bone/10 bg-bone/[0.02] p-3.5">
                <span className="eyebrow text-[0.55rem] text-gilt">03 · Measured</span>
                <h4 className="mt-1 text-sm font-medium text-bone">Tested, Not Guessed</h4>
                <p className="mt-1 text-[0.72rem] text-bone/55 leading-relaxed">
                  Every interaction is instrumented for frame consistency and conversion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
