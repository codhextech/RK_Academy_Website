'use client';

import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, Clock } from 'lucide-react';

export interface ModuleItem {
  number?: string;
  num?: string;
  title: string;
  description?: string;
  desc?: string;
  topics?: string[];
  points?: string[];
  durationHours?: number;
}

interface CourseModulesAccordionProps {
  modules: ModuleItem[];
  defaultAllCollapsed?: boolean;
}

export default function CourseModulesAccordion({
  modules,
  defaultAllCollapsed = true,
}: CourseModulesAccordionProps) {
  // Store set of open indices. By default all collapsed as requested
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultAllCollapsed ? [] : [0]
  );

  const toggleModule = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const allExpanded = openIndices.length === modules.length;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(modules.map((_, idx) => idx));
    }
  };

  return (
    <div className="space-y-3">
      {/* Quick Action Toggle Bar */}
      <div className="flex items-center justify-between gap-3 pb-1">
        <span className="text-xs text-slate-500 font-medium">
          Click any module to view topics & syllabus details
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-bold text-[#0098DA] hover:text-[#0A3663] transition-colors cursor-pointer shrink-0"
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {modules.map((mod, idx) => {
          const isOpen = openIndices.includes(idx);
          const badgeText = mod.number || (mod.num ? `Module ${mod.num}` : `Part ${idx + 1}`);
          const descText = mod.description || mod.desc;
          const topicList = mod.topics || mod.points || [];

          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[#0098DA]/50 shadow-md ring-1 ring-[#0098DA]/20'
                  : 'border-slate-200/90 shadow-2xs hover:border-sky-300 hover:shadow-xs'
              }`}
            >
              {/* Clickable Header Row */}
              <button
                type="button"
                onClick={() => toggleModule(idx)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 transition-colors hover:bg-sky-50/40 select-none cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                  <span
                    className={`text-xs font-extrabold px-2.5 py-1 rounded-md border shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#0098DA] text-white border-[#0098DA]'
                        : 'bg-sky-100/70 text-[#0A3663] border-sky-200 group-hover:bg-[#0098DA] group-hover:text-white group-hover:border-[#0098DA]'
                    }`}
                  >
                    {badgeText}
                  </span>
                  <h3
                    className={`font-bold text-sm sm:text-base md:text-lg transition-colors leading-snug truncate sm:whitespace-normal ${
                      isOpen
                        ? 'text-[#0098DA]'
                        : 'text-[#0A3663] group-hover:text-[#0098DA]'
                    }`}
                  >
                    {mod.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {mod.durationHours && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                      <Clock className="w-3 h-3 text-[#0098DA]" />
                      <span>{mod.durationHours}h</span>
                    </span>
                  )}
                  {topicList.length > 0 && (
                    <span className="hidden md:inline-block text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {topicList.length} Topics
                    </span>
                  )}
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#0098DA] text-white rotate-180 shadow-xs'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-[#0A3663]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {/* Expandable Dropdown Content */}
              {isOpen && (
                <div className="border-t border-slate-100 p-4 sm:p-6 bg-slate-50/40 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  {descText && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {descText}
                    </p>
                  )}

                  {topicList.length > 0 && (
                    <div className="pt-1">
                      <p className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0098DA]" />
                        <span>Topics Covered:</span>
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        {topicList.map((topic, tIdx) => (
                          <li
                            key={tIdx}
                            className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/60 shadow-2xs"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0098DA] mt-1.5 shrink-0" />
                            <span className="leading-snug">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
