'use client';

import React, { useState } from 'react';
import { AGA_DATA, formatINR } from '@/data/academyData';
import { useToast } from '@/context/ToastContext';

export function FeeEstimator({ onApplyWithGrade }) {
  const { showToast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState('primary');
  const [selectedTransport, setSelectedTransport] = useState('zone1');
  const [mealSelected, setMealSelected] = useState(false);
  const [sportsSelected, setSportsSelected] = useState(false);

  const gradeData = AGA_DATA.feeSchedule.grades[selectedGrade] || AGA_DATA.feeSchedule.grades.primary;
  const transportData = AGA_DATA.feeSchedule.transport[selectedTransport] || { fee: 0 };

  const tuition = gradeData.tuition;
  const development = gradeData.development;
  const activity = gradeData.activity;
  const transportFee = transportData.fee;
  const mealFee = mealSelected ? AGA_DATA.feeSchedule.addons.meals.fee : 0;
  const sportsFee = sportsSelected ? AGA_DATA.feeSchedule.addons.sportsAcademy.fee : 0;
  const addonsTotal = mealFee + sportsFee;

  const totalAnnual = tuition + development + activity + transportFee + addonsTotal;
  const quarterly = Math.round(totalAnnual / 4);

  const handleApply = () => {
    if (onApplyWithGrade) {
      onApplyWithGrade(selectedGrade);
    }
    showToast(`Estimate applied for ${gradeData.label}. Switched to enquiry form.`, 'info');
  };

  return (
    <div className="bg-gradient-to-br from-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-navy-700 shadow-2xl">
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Interactive Calculator</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-1">Annual Fee Estimator (2027-28)</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Select student grade level, transport zone, and optional enrichment activities to see real-time annual and quarterly fee calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5 bg-navy-800/80 p-6 rounded-2xl border border-navy-700">
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">Select Grade Level</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full bg-navy-950 border border-navy-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400 transition-colors"
            >
              <option value="nursery">Foundational: Nursery & Kindergarten</option>
              <option value="primary">Preparatory / Primary: Grades I to V</option>
              <option value="middle">Middle School: Grades VI to VIII</option>
              <option value="secondary">Secondary Wing: Grades IX & X</option>
              <option value="senior_science">Senior Secondary: Class XI-XII (Science)</option>
              <option value="senior_commerce_hum">Senior Secondary: Class XI-XII (Commerce / Humanities)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">GPS Bus Transport Zone</label>
            <select
              value={selectedTransport}
              onChange={(e) => setSelectedTransport(e.target.value)}
              className="w-full bg-navy-950 border border-navy-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400 transition-colors"
            >
              <option value="none">No School Transport (Self Drop & Pickup)</option>
              <option value="zone1">Zone 1 (0 to 5 km) - Sec 54-57, Golf Course Rd (₹ 38,000/yr)</option>
              <option value="zone2">Zone 2 (5 to 10 km) - Sohna Rd, DLF Phase 1-5, Nirvana (₹ 48,000/yr)</option>
              <option value="zone3">Zone 3 (10 to 18 km) - Cyber Hub, MG Rd, Dwarka Expwy (₹ 62,000/yr)</option>
            </select>
          </div>

          <div className="pt-2 border-t border-navy-700 space-y-3">
            <span className="block text-xs font-bold text-gold-400">Optional Campus Programs</span>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={mealSelected}
                onChange={(e) => setMealSelected(e.target.checked)}
                className="w-4 h-4 rounded text-gold-500 focus:ring-gold-400 bg-navy-950 border-navy-600"
              />
              <span className="text-xs text-slate-300">Organic Hot Lunch & Snack Plan (+₹ 32,000 / year)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={sportsSelected}
                onChange={(e) => setSportsSelected(e.target.checked)}
                className="w-4 h-4 rounded text-gold-500 focus:ring-gold-400 bg-navy-950 border-navy-600"
              />
              <span className="text-xs text-slate-300">After-School Sports Academy (Swimming/Tennis/Cricket) (+₹ 24,000 / year)</span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-5 bg-navy-950 p-6 rounded-2xl border border-gold-400/40 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white font-heading pb-3 border-b border-navy-800 flex items-center justify-between">
            <span>Fee Summary Breakdown</span>
            <span className="text-xs text-gold-400 font-mono">INR (₹)</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Annual Tuition Fee:</span>
              <span className="font-bold text-white font-mono">{formatINR(tuition)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Development & IT Infrastructure:</span>
              <span className="font-bold text-white font-mono">{formatINR(development)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Co-Curricular & Labs:</span>
              <span className="font-bold text-white font-mono">{formatINR(activity)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>GPS Transport Fee:</span>
              <span className="font-bold text-white font-mono">{formatINR(transportFee)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Optional Programs:</span>
              <span className="font-bold text-white font-mono">{formatINR(addonsTotal)}</span>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-navy-800 space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase font-bold text-slate-400">Total Annual Payable:</span>
              <span className="text-2xl font-extrabold text-gold-400 font-mono">{formatINR(totalAnnual)}</span>
            </div>
            <div className="flex justify-between items-baseline text-xs text-slate-400">
              <span>Quarterly Installment (x 4):</span>
              <span className="font-bold text-emerald-400 font-mono text-sm">{formatINR(quarterly)} / qtr</span>
            </div>
            <div className="flex justify-between items-baseline text-[11px] text-slate-400 pt-1">
              <span>One-time Admission Fee (New Adm):</span>
              <span className="font-mono text-slate-200">{formatINR(gradeData.admissionOneTime)}</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold rounded-xl text-xs transition-all shadow-md"
            >
              Apply with this Estimated Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
