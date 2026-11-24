'use client';

import React from 'react';
import { ArrowRight, Video, CheckCircle2 } from 'lucide-react';
import { AGA_DATA } from '@/data/academyData';

export function Hero({ onNavigate }) {
  return (
    <section className="relative bg-navy-950 text-white min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=80"
          alt="Aurelia Global Academy Campus Building"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(#D99B26_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gold-400" />
              CBSE Affiliated Senior Secondary Institution (No. {AGA_DATA.school.affiliationNo})
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Nurturing Curiosity,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
                Shaping Character
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Ranked <strong className="text-white">#1 K-12 CBSE Institution in Gurugram</strong>. Our 18-acre green campus integrates NEP 2020 experiential learning, STREAM robotics innovation, Olympic-grade sports, and timeless Indian values to prepare students for top global universities.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('admissions')}
                className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold rounded-xl shadow-lg hover:shadow-gold-500/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
              >
                <span>Start 2027-28 Application</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('gallery')}
                className="px-8 py-3.5 bg-navy-800/80 hover:bg-navy-800 text-white font-semibold rounded-xl border border-navy-600 hover:border-gold-400 transition-all duration-200 flex items-center justify-center gap-2 text-base backdrop-blur-sm"
              >
                <Video className="w-5 h-5 text-gold-400" />
                <span>Explore Campus Facilities</span>
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-slate-300 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% CBSE Pass Record</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>15:1 Student-Teacher Ratio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Air-Conditioned GPS Fleet</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-500 to-navy-600 rounded-3xl blur-lg opacity-40" />

              <div className="relative bg-navy-900/90 border border-gold-400/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-slate-200">
                <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Admissions Desk 2027-28</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-300">Phase 1 Active</span>
                </div>

                <div className="py-5 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-heading">Limited Seats for Nursery to Grade XI</h2>
                    <p className="text-xs text-slate-400 mt-1">Interactions & Aptitude Assessments scheduled on upcoming Saturdays.</p>
                  </div>

                  <div className="bg-navy-950/80 p-3.5 rounded-xl border border-navy-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Merit Scholarship Test:</span>
                      <span className="text-gold-300 font-semibold">12 Dec 2026</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Campus Interaction Window:</span>
                      <span className="text-white font-semibold">Mon - Sat (9 AM - 2 PM)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Fee Concessions:</span>
                      <span className="text-emerald-400 font-semibold">Available for Siblings & Defense</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('admissions')}
                    className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-xl text-sm transition-colors text-center block shadow"
                  >
                    Calculate Annual Fee & Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="w-full py-2.5 bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors border border-navy-700 text-center block"
                  >
                    Book an In-Person Campus Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
