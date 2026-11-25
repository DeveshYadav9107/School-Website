'use client';

import React, { useState } from 'react';
import { Emblem } from './Emblem';
import { AGA_DATA } from '@/data/academyData';
import { useToast } from '@/context/ToastContext';
import { ExternalLink, MapPin, Phone } from 'lucide-react';

export function Footer({ onNavigate, onOpenErpModal }) {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setEmail('');
    showToast('Thank you for subscribing to RMS World School Academic Digest & Circulars!', 'success');
  };

  return (
    <footer className="bg-navy-950 text-white border-t border-navy-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Emblem className="w-11 h-11" />
              <div>
                <span className="font-bold text-base font-heading">RMS World School</span>
                <p className="text-[11px] text-gold-400">CBSE Norms &amp; Curriculum • Haryana</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              RMS World School is an experiential K-12 institution committed to academic rigour, scientific inquiry, and empathetic global citizenship.
            </p>
            <div className="text-xs text-slate-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>{AGA_DATA.school.address}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gold-400 font-heading uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-gold-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('about')} className="hover:text-gold-400 transition-colors">
                  About Our Leadership
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('academics')} className="hover:text-gold-400 transition-colors">
                  Curriculum &amp; NEP 2020
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('admissions')} className="hover:text-gold-400 transition-colors">
                  Admissions 2027-28
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('gallery')} className="hover:text-gold-400 transition-colors">
                  Campus Photo Tour
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('careers')}
                  className="hover:text-gold-400 transition-colors font-semibold text-gold-300"
                >
                  Careers &amp; Walk-In Interview
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('contact')} className="hover:text-gold-400 transition-colors">
                  Schedule a Visit
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gold-400 font-heading uppercase tracking-wider">Compliance &amp; ERP</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('disclosure')}
                  className="hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold text-gold-300"
                >
                  <span>Mandatory Public Disclosure</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenErpModal} className="text-left hover:text-gold-400 transition-colors">
                  Parent ERP Portal Login
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('admissions')} className="hover:text-gold-400 transition-colors">
                  Fee Structure &amp; Transport Norms
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('careers')} className="hover:text-gold-400 transition-colors">
                  Faculty Recruitment (6th Dec 2026)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('contact')} className="hover:text-gold-400 transition-colors">
                  POSH &amp; Child Safety Cell
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gold-400 font-heading uppercase tracking-wider">Academic Digest</h3>
            <p className="text-xs text-slate-400">Subscribe for school circulars, Olympiad notifications, and open house dates.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter parent email address"
                className="w-full px-3 py-2 bg-navy-900 border border-navy-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="w-full py-2 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold rounded-lg text-xs transition-colors"
              >
                Subscribe to Circulars
              </button>
            </form>
            <div className="pt-2 space-y-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Helpline: <strong className="text-white">{AGA_DATA.school.phone}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Alt Desk: <strong className="text-white">{AGA_DATA.school.phoneAlt}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 RMS World School, Sulkha (Haryana). All rights reserved. {AGA_DATA.school.board}.</p>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => onNavigate('disclosure')} className="hover:text-slate-400">
              CBSE Norms Compliant
            </button>
            <span>•</span>
            <button type="button" onClick={() => onNavigate('contact')} className="hover:text-slate-400">
              Privacy &amp; Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
