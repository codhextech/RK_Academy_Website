'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  BookOpen,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import CourseModulesAccordion, { ModuleItem } from '@/components/common/CourseModulesAccordion';

interface CourseCurriculumSectionProps {
  highlights: string[];
  modules: ModuleItem[];
  defaultHighlightsOpen?: boolean;
  defaultModulesOpen?: boolean;
}

export default function CourseCurriculumSection({
  highlights,
  modules,
  defaultHighlightsOpen = false,
  defaultModulesOpen = false,
}: CourseCurriculumSectionProps) {
  const [highlightsOpen, setHighlightsOpen] = useState(defaultHighlightsOpen);
  const [modulesOpen, setModulesOpen] = useState(defaultModulesOpen);

  return (
    <div className="space-y-6">
      {/* 1. CURRICULUM HIGHLIGHTS DROPDOWN CARD */}
      {highlights && highlights.length > 0 && (
        <div
          className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
            highlightsOpen
              ? 'border-[#0098DA]/50 shadow-md ring-1 ring-[#0098DA]/20'
              : 'border-slate-200/90 shadow-xs hover:border-[#0098DA]/40 hover:shadow-sm'
          }`}
        >
          {/* Clickable Header Row */}
          <button
            type="button"
            onClick={() => setHighlightsOpen(!highlightsOpen)}
            aria-expanded={highlightsOpen}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-sky-50/40 select-none cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                  highlightsOpen
                    ? 'bg-[#0098DA] text-white shadow-xs'
                    : 'bg-sky-50 text-[#0098DA] border border-sky-100 group-hover:bg-[#0A3663] group-hover:text-white'
                }`}
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2
                    className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors leading-tight ${
                      highlightsOpen ? 'text-[#0098DA]' : 'text-[#0A3663] group-hover:text-[#0098DA]'
                    }`}
                  >
                    Curriculum Highlights
                  </h2>
                  <span className="text-[11px] font-extrabold text-[#0A3663] bg-sky-100/70 border border-sky-200 px-2.5 py-0.5 rounded-full shrink-0">
                    {highlights.length} Key Outcomes
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1">
                  {highlightsOpen
                    ? 'Click to collapse highlights overview'
                    : 'Click to view essential skills, training methods & competencies'}
                </p>
              </div>
            </div>

            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                highlightsOpen
                  ? 'bg-[#0098DA] text-white border-[#0098DA]'
                  : 'bg-slate-100/80 text-slate-600 border-slate-200 group-hover:bg-sky-100 group-hover:text-[#0098DA]'
              }`}
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  highlightsOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {/* Collapsible Dropdown Content */}
          {highlightsOpen && (
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
                {highlights.map((highlight, idx) => {
                  const colonIndex = highlight.indexOf(':');
                  const hasLabel = colonIndex !== -1;
                  const label = hasLabel ? highlight.slice(0, colonIndex) : null;
                  const content = hasLabel ? highlight.slice(colonIndex + 1).trim() : highlight;

                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:bg-sky-50/30 hover:border-sky-200 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#0098DA] shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {hasLabel ? (
                          <>
                            <strong className="font-bold text-[#0A3663] block sm:inline mr-1">
                              {label}:
                            </strong>
                            <span>{content}</span>
                          </>
                        ) : (
                          <span className="font-medium">{highlight}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. COURSE MODULES & TOPICS DROPDOWN CARD */}
      {modules && modules.length > 0 && (
        <div
          className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
            modulesOpen
              ? 'border-[#0098DA]/50 shadow-md ring-1 ring-[#0098DA]/20'
              : 'border-slate-200/90 shadow-xs hover:border-[#0098DA]/40 hover:shadow-sm'
          }`}
        >
          {/* Clickable Header Row */}
          <button
            type="button"
            onClick={() => setModulesOpen(!modulesOpen)}
            aria-expanded={modulesOpen}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-sky-50/40 select-none cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                  modulesOpen
                    ? 'bg-[#0098DA] text-white shadow-xs'
                    : 'bg-sky-50 text-[#0098DA] border border-sky-100 group-hover:bg-[#0A3663] group-hover:text-white'
                }`}
              >
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2
                    className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors leading-tight ${
                      modulesOpen ? 'text-[#0098DA]' : 'text-[#0A3663] group-hover:text-[#0098DA]'
                    }`}
                  >
                    Course Modules &amp; Topics
                  </h2>
                  <span className="text-[11px] font-extrabold text-[#0A3663] bg-sky-100/70 border border-sky-200 px-2.5 py-0.5 rounded-full shrink-0">
                    {modules.length} Modules
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1">
                  {modulesOpen
                    ? 'Structured step-by-step syllabus designed by accredited examiners'
                    : 'Click to expand syllabus modules, breakdown & topic details'}
                </p>
              </div>
            </div>

            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                modulesOpen
                  ? 'bg-[#0098DA] text-white border-[#0098DA]'
                  : 'bg-slate-100/80 text-slate-600 border-slate-200 group-hover:bg-sky-100 group-hover:text-[#0098DA]'
              }`}
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  modulesOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>

          {/* Collapsible Dropdown Content */}
          {modulesOpen && (
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="text-xs sm:text-sm text-slate-600 pt-2 leading-relaxed">
                Structured step-by-step syllabus designed by accredited examiners and language specialists.
              </p>

              <CourseModulesAccordion
                modules={modules}
                defaultAllCollapsed={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
