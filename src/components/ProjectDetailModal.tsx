import React from 'react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      id="project-detail-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        id="project-detail-modal"
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-bone/20 bg-[#0e0e11] p-6 shadow-2xl text-bone sm:p-8"
      >
        <div className="flex items-start justify-between border-b border-bone/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow text-gilt">{project.category}</span>
              <span className="rounded-full border border-bone/20 bg-bone/[0.08] px-2 py-0.5 text-[0.6rem] text-bone/80">
                Demo {project.demoNumber}
              </span>
            </div>
            <h2 className="display mt-1 text-3xl text-bone sm:text-4xl">{project.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-bone/40 hover:text-bone"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          <div className="relative overflow-hidden rounded-xl border border-bone/15 aspect-[16/9]">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="eyebrow text-[0.65rem] text-gilt/70 mb-1.5">Overview</h3>
            <p className="text-sm leading-relaxed text-bone/80">{project.fullDescription}</p>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h3 className="eyebrow text-[0.65rem] text-gilt/70 mb-2.5">Measurable Impact</h3>
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="rounded-lg border border-bone/10 bg-bone/[0.03] p-3 text-center">
                    <span className="display block text-xl text-bone">{m.value}</span>
                    <span className="text-[0.68rem] text-bone/55">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="eyebrow text-[0.65rem] text-gilt/70 mb-2">Technologies & Architecture</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-full border border-bone/15 bg-bone/[0.04] px-3 py-1 text-xs text-bone/85"
                >
                  <CheckCircle2 className="size-3 text-gilt" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-bone/10 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-bone/20 px-4 py-2 text-xs text-bone/75 transition-colors hover:border-bone/50 hover:text-bone"
              >
                <Github className="size-3.5" />
                <span>Source Code</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2 text-xs font-semibold text-[#060505] transition-transform hover:scale-105"
            >
              <span>Close View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
