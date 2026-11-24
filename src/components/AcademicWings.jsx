'use client';

import React from 'react';
import { Sparkles, BookOpen, Cpu, FlaskConical, ChevronRight } from 'lucide-react';

export function AcademicWings({ onNavigate }) {
  const wings = [
    {
      age: 'Ages 3 - 6 Years',
      title: 'Foundational Wing',
      subtitle: 'Nursery, LKG, UKG',
      icon: <Sparkles className="w-6 h-6 text-gold-400" />,
      desc: 'Sensorial discovery, phonics immersion, play-based numeracy, and fine-motor coordination in nature-inspired classrooms.',
      points: [
        'Reggio Emilia & Montessori blend',
        'Outdoor tactile sand & sensory labs',
        '10:1 Nurturing care ratio',
      ],
      cta: 'Curriculum Details',
      target: 'academics',
    },
    {
      age: 'Grades I to V',
      title: 'Preparatory Wing',
      subtitle: 'Foundational Mastery',
      icon: <BookOpen className="w-6 h-6 text-gold-400" />,
      desc: 'Experiential literacy, mental arithmetic, integrated social sciences, and bilingual linguistic confidence.',
      points: [
        'Inquiry-based STREAM projects',
        'Junior coding & Scratch animation',
        'Compulsory swimming & athletics',
      ],
      cta: 'Curriculum Details',
      target: 'academics',
    },
    {
      age: 'Grades VI to VIII',
      title: 'Middle School Wing',
      subtitle: 'Critical Thinking & STEAM',
      icon: <Cpu className="w-6 h-6 text-gold-400" />,
      desc: 'Analytical thinking, Python programming, robotics tinkering, third language mastery (French, German, Sanskrit), and debate.',
      points: [
        'Atal Tinkering Lab & IoT sensors',
        'Inter-school Model UN participation',
        'Scientific research paper writing',
      ],
      cta: 'Curriculum Details',
      target: 'academics',
    },
    {
      age: 'Grades IX to XII',
      title: 'Senior Secondary',
      subtitle: 'Science, Commerce, Arts',
      icon: <FlaskConical className="w-6 h-6 text-gold-400" />,
      desc: 'Rigorous CBSE board syllabus synchronized with integrated JEE, NEET, CUET, and CLAT preparation modules.',
      points: [
        'Artificial Intelligence as 6th subject',
        'Global university career counseling',
        'Advanced research internships',
      ],
      cta: 'Subject Combinations',
      target: 'academics',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
            NEP 2020 Pedagogical Framework
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 font-heading mt-3">
            Comprehensive Academic Wings
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Structured progressive learning from early childhood wonder to senior secondary mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wings.map((w, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-gold-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-navy-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {w.icon}
                </div>
                <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">{w.age}</span>
                <h3 className="text-lg font-bold text-navy-800 font-heading mt-1">{w.title}</h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">{w.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{w.desc}</p>
                <ul className="text-xs text-slate-600 space-y-1.5 mb-6">
                  {w.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(w.target)}
                className="text-xs font-bold text-navy-800 group-hover:text-gold-600 flex items-center gap-1"
              >
                <span>{w.cta}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
