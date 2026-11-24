'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export function PrincipalWelcome({ onNavigate }) {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-4 ring-gold-400/30">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Meera Krishnan, Principal Aurelia Global Academy"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent p-4 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">Principal & Director</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold text-navy-800 font-heading">Dr. Meera Krishnan</h3>
                <p className="text-xs text-slate-700 font-medium mt-0.5">Ph.D. in Education • M.Sc. Physics (Gold Medalist)</p>
                <p className="text-[11px] text-slate-600">Member, CBSE National Curriculum Advisory Committee</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-navy-50 text-navy-800 text-xs font-bold uppercase tracking-wider">
                Principal's Desk
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-heading leading-tight">
                "Education is not merely preparing for life; it is empowering young minds to shape it."
              </h2>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                <p>
                  At Aurelia Global Academy, we cultivate an ecosystem where every student feels seen, heard, and challenged to exceed their own expectations. Our pedagogy unites CBSE academic rigour with modern NEP 2020 frameworks—fostering inquiry over memorization and empathy over competition.
                </p>
                <p>
                  Whether your child is programming machine learning algorithms in our Atal Tinkering Hub, debating global climate treaties in our Model UN chamber, or mastering breaststroke in our Olympic pool, we anchor their pursuits in integrity, resilience, and compassion.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 flex-wrap gap-4">
                <div>
                  <div className="font-serif text-3xl text-navy-800 italic font-bold tracking-wide">
                    Meera Krishnan
                  </div>
                  <span className="text-xs text-slate-700 font-medium">Principal, Aurelia Global Academy</span>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-xs font-bold text-gold-600 hover:text-gold-700 flex items-center gap-1 group"
                >
                  <span>Read Full Educational Philosophy</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
