'use client';

import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

export function MetricsStrip() {
  const metrics = [
    { value: '28+', label: 'Years of Academic Excellence', sub: 'Empowering leaders since 1998', isGold: false },
    { value: '15:1', label: 'Student-Teacher Ratio', sub: 'Individualized pastoral attention', isGold: true },
    { value: '100%', label: 'CBSE Board Pass Record', sub: '88.4% School Aggregate (2026)', isGold: false },
    { value: '18-Acre', label: 'Green & Smart Campus', sub: 'Olympic pool, STREAM & AI labs', isGold: true },
  ];

  return (
    <section className="bg-white border-y border-slate-200 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {metrics.map((m, idx) => (
            <RevealOnScroll key={idx} delay={idx * 80} variant="fade-up">
              <div className={`flex flex-col items-center text-center px-4 ${idx > 1 ? 'pt-6 lg:pt-0' : ''}`}>
                <span className={`text-4xl sm:text-5xl font-extrabold font-heading tracking-tight ${m.isGold ? 'text-gold-500' : 'text-navy-800'}`}>
                  {m.value}
                </span>
                <span className="text-sm font-bold text-slate-800 mt-2">{m.label}</span>
                <span className="text-xs text-slate-600 mt-0.5">{m.sub}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
