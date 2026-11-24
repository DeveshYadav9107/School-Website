'use client';

import React, { useState } from 'react';
import { Emblem } from './Emblem';
import { Phone, Mail, LogIn, Menu, X, ArrowRight } from 'lucide-react';
import { AGA_DATA } from '@/data/academyData';

export function Navbar({ currentView, onNavigate, onOpenErpModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'gallery', label: 'Campus & Gallery' },
    { id: 'disclosure', label: 'Mandatory Disclosure' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. TOP UTILITY STRIP */}
      <header className="w-full bg-navy-950 text-slate-300 text-xs border-b border-navy-800/80 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-semibold border border-gold-500/30">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              Admissions Open for 2027-28
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="text-slate-300">
              CBSE Affiliation No: <strong className="text-white">{AGA_DATA.school.affiliationNo}</strong> (School Code: {AGA_DATA.school.schoolCode})
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href={`tel:${AGA_DATA.school.phone}`} className="hover:text-gold-400 transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>{AGA_DATA.school.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a href={`mailto:${AGA_DATA.school.email}`} className="hover:text-gold-400 transition-colors hidden lg:flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-gold-500" />
              <span>{AGA_DATA.school.email}</span>
            </a>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <button
              type="button"
              onClick={onOpenErpModal}
              className="px-3 py-1 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-md shadow-sm transition-all duration-200 flex items-center gap-1.5 text-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              Parent ERP Login
            </button>
          </div>
        </div>
      </header>

      {/* 2. STICKY MAIN NAVBAR */}
      <nav className="sticky top-0 z-40 bg-navy-800 text-white shadow-lg border-b border-navy-700/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold-400 rounded-lg p-1 text-left"
            >
              <div className="w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Emblem className="w-12 h-12" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white font-heading leading-tight group-hover:text-gold-400 transition-colors">
                  Aurelia Global Academy
                </span>
                <span className="text-[11px] font-medium text-gold-400 tracking-wider uppercase">
                  Nurturing Curiosity, Shaping Character • Gurugram
                </span>
              </div>
            </button>

            <div className="hidden xl:flex items-center space-x-1 lg:space-x-3">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-gold-400 ${
                      isActive ? 'text-gold-500 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleLinkClick('admissions')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold rounded-lg shadow-md hover:shadow-gold-500/20 transition-all duration-200 transform hover:-translate-y-0.5 text-sm"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Toggle Navigation Menu"
                className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/70 backdrop-blur-sm animate-fade-in">
          <aside className="w-80 max-w-[85vw] bg-navy-900 text-white shadow-2xl h-full flex flex-col justify-between border-l border-navy-700/80 p-6 animate-slide-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                <div className="flex items-center gap-2">
                  <Emblem className="w-8 h-8" />
                  <span className="font-bold text-base font-heading">Aurelia Academy</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      currentView === link.id
                        ? 'bg-navy-800 text-gold-400'
                        : 'text-slate-200 hover:bg-navy-800 hover:text-gold-400'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-navy-800 space-y-3">
              <button
                type="button"
                onClick={() => handleLinkClick('admissions')}
                className="w-full py-2.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-lg text-sm shadow"
              >
                Apply Now for 2027-28
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenErpModal();
                }}
                className="w-full py-2.5 bg-navy-800 hover:bg-navy-700 text-gold-400 font-semibold rounded-lg text-sm border border-gold-500/30 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Parent ERP Portal
              </button>
              <p className="text-[11px] text-center text-slate-500">Helpline: {AGA_DATA.school.phone}</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
