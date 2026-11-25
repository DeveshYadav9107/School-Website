'use client';

import React, { useState, useEffect } from 'react';
import { AGA_DATA } from '@/data/academyData';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export function CampusGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'academics', label: 'Academics & Classrooms' },
    { id: 'stem', label: 'STEM & Robotics Labs' },
    { id: 'sports', label: 'Sports & Athletics' },
    { id: 'cultural', label: 'Cultural & Arts' },
  ];

  const filteredItems = activeFilter === 'all'
    ? AGA_DATA.gallery
    : AGA_DATA.gallery.filter((item) => item.category === activeFilter);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : undefined;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => {
              setActiveFilter(f.id);
              setLightboxIndex(null);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeFilter === f.id
                ? 'bg-navy-800 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <RevealOnScroll key={item.id} delay={(index % 6) * 60} variant="fade-up">
            <div
              onClick={() => setLightboxIndex(index)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 card-glow bg-slate-900 cursor-pointer aspect-[4/3]"
            >
              <img
                src={item.thumb}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 text-xs font-semibold bg-white/90 backdrop-blur-md text-navy-900 rounded-full shadow">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h4 className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow">{item.title}</h4>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption}
                </p>
                <div className="mt-2 flex items-center text-gold-400 text-xs font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Click to enlarge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {currentLightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-white/10 transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0))}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0))}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
              <img
                src={currentLightboxItem.src}
                alt={currentLightboxItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="mt-4 text-center max-w-xl text-white">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gold-500 text-navy-950">
                  {currentLightboxItem.categoryLabel}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <h3 className="text-lg font-bold font-heading">{currentLightboxItem.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentLightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
