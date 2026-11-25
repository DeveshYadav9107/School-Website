'use client';

import React, { useState, useEffect } from 'react';
import { AGA_DATA } from '@/data/academyData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AGA_DATA.testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + AGA_DATA.testimonials.length) % AGA_DATA.testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % AGA_DATA.testimonials.length);
  };

  const item = AGA_DATA.testimonials[currentIndex];

  return (
    <RevealOnScroll variant="fade-up">
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-gold-500/20 shadow-xl">
        <div className="absolute right-6 top-6 text-navy-800/50 pointer-events-none select-none text-9xl font-serif">&ldquo;</div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Voices of Trust</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">What Our Parents Say</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                className="p-2.5 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-950 transition-colors border border-navy-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="p-2.5 rounded-full bg-navy-800 hover:bg-gold-500 hover:text-navy-950 transition-colors border border-navy-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="min-h-[140px] flex flex-col justify-center">
            <p className="text-base sm:text-xl text-slate-200 italic leading-relaxed font-light">
              &ldquo;{item.quote}&rdquo;
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-navy-700/80 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold-400 shadow"
              />
              <div>
                <h4 className="text-base font-bold text-white font-heading">{item.author}</h4>
                <p className="text-xs text-gold-400 font-medium">{item.designation}</p>
                <p className="text-xs text-slate-400">{item.parentOf}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {AGA_DATA.testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentIndex ? 'bg-gold-500 w-8' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
