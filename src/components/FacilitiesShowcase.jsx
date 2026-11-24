'use client';

import React from 'react';
import { Cpu, Waves, BookOpen, Monitor } from 'lucide-react';

export function FacilitiesShowcase({ onNavigate }) {
  const facilities = [
    {
      title: 'Robotics & AI Lab',
      desc: 'Atal Tinkering Lab equipped with 3D printers, IoT kits, drone simulation rigs, and NVIDIA computing hardware.',
      icon: <Cpu className="w-6 h-6 text-gold-400 group-hover:text-navy-900" />,
    },
    {
      title: 'Olympic Swimming Pool',
      desc: '50-meter 8-lane all-weather heated pool with ozone purification and FINA-certified coaching personnel.',
      icon: <Waves className="w-6 h-6 text-gold-400 group-hover:text-navy-900" />,
    },
    {
      title: 'Digital Resource Library',
      desc: '40,000+ curated volumes, Kindle e-reading stations, JSTOR academic access, and individual study carrels.',
      icon: <BookOpen className="w-6 h-6 text-gold-400 group-hover:text-navy-900" />,
    },
    {
      title: 'Smart Glass Classrooms',
      desc: 'Acoustically engineered air-conditioned spaces with 75" 4K interactive panels and ergonomic modular seating.',
      icon: <Monitor className="w-6 h-6 text-gold-400 group-hover:text-navy-900" />,
    },
  ];

  return (
    <div className="mb-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          World-Class Infrastructure
        </span>
        <h2 className="text-3xl font-extrabold text-navy-800 font-heading mt-3">
          18-Acre Campus Facilities
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Designed to stimulate creativity, athletic excellence, and intellectual curiosity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {facilities.map((f, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate('gallery')}
            className="p-6 bg-slate-50 hover:bg-navy-900 hover:text-white rounded-2xl border border-slate-200 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-12 h-12 bg-navy-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors">
              {f.icon}
            </div>
            <h3 className="text-base font-bold text-navy-800 group-hover:text-white font-heading">{f.title}</h3>
            <p className="text-xs text-slate-600 group-hover:text-slate-300 mt-2 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
