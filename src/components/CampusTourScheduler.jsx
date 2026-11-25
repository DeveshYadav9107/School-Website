'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { AGA_DATA } from '@/data/academyData';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export function CampusTourScheduler() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('Morning Slot: 09:30 AM - 10:30 AM');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !date || !slot) {
      showToast('Please provide all details to schedule your campus tour.', 'error');
      return;
    }

    setName('');
    setPhone('');
    setDate('');
    setNotes('');
    showToast(`Campus Tour confirmed for ${name} on ${date} (${slot})! Our team at Sulkha campus will call you to confirm entry.`, 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5 space-y-6">
        <RevealOnScroll variant="fade-up">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 card-glow">
            <h2 className="text-lg font-bold text-navy-800 font-heading">Campus Address</h2>
            <div className="flex items-start gap-3 text-xs text-slate-700">
              <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">{AGA_DATA.school.name}</p>
                <p>{AGA_DATA.school.address}</p>
                <p className="text-slate-500 mt-1">Landmark: 11th Milestone, Rewari-Shahjahanpur Corridor</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-600" />
                <span>
                  <strong>Primary Helpline:</strong>{' '}
                  <a href="tel:+919728035202" className="text-navy-800 font-semibold hover:text-gold-600">
                    {AGA_DATA.school.phone}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-600" />
                <span>
                  <strong>Admissions &amp; Recruitment:</strong>{' '}
                  <a href="tel:+917988720175" className="text-navy-800 font-semibold hover:text-gold-600">
                    {AGA_DATA.school.phoneAlt}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-600" />
                <span><strong>Email:</strong> {AGA_DATA.school.email}</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="fade-up" delay={100}>
          <div className="p-4 bg-navy-950 text-white rounded-2xl border border-navy-800 card-glow">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-gold-400">Campus Route &amp; Highway Connectivity</span>
              <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 text-[10px]">Open for Visits</span>
            </div>
            <div className="h-44 bg-navy-900 rounded-xl relative overflow-hidden border border-navy-800 flex items-center justify-center text-center p-4">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-gold-500 text-navy-950 mx-auto flex items-center justify-center font-bold mb-1 shadow-lg animate-bounce">
                  <Navigation className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-white">11th Milestone, Rewari-Shahjahanpur Road</p>
                <p className="text-[11px] text-slate-400">Sulkha (Haryana) • Direct Access via NH-48</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <div className="lg:col-span-7">
        <RevealOnScroll variant="fade-up" delay={120}>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm card-glow">
            <h2 className="text-xl font-bold text-navy-800 font-heading mb-2">Book an In-Person Campus Tour</h2>
            <p className="text-xs text-slate-600 mb-6">
              Select your preferred date and time slot. Our Admissions Counselor conducts guided campus tours for prospective families at Sulkha.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Mehra"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot *</label>
                  <select
                    required
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  >
                    <option value="Morning Slot: 09:30 AM - 10:30 AM">Morning Slot: 09:30 AM - 10:30 AM</option>
                    <option value="Mid-Day Slot: 11:30 AM - 12:30 PM">Mid-Day Slot: 11:30 AM - 12:30 PM</option>
                    <option value="Afternoon Slot: 02:00 PM - 03:00 PM">Afternoon Slot: 02:00 PM - 03:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Grades interested in &amp; questions</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Interested in Grade VI STREAM labs and bus transport towards Rewari"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-navy-800 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white font-bold rounded-lg text-xs transition-colors shadow"
              >
                Confirm Campus Tour Appointment
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
