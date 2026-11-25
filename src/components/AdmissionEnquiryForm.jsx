'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import { Check, Printer } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export function AdmissionEnquiryForm({ initialGrade = '' }) {
  const { showToast } = useToast();
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [grade, setGrade] = useState(initialGrade || '');
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [comments, setComments] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (initialGrade) setGrade(initialGrade);
  }, [initialGrade]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentName || !dob || !grade || !parentName || !mobile || !email) {
      showToast('Please fill all mandatory fields marked with an asterisk (*).', 'error');
      return;
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanMobile)) {
      showToast('Please enter a valid 10-digit Indian mobile number.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `RMS-2027-${randomNum}`;
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const gradeLabels = {
      nursery: 'Foundational: Nursery / LKG / UKG',
      primary: 'Preparatory / Primary (Grades I to V)',
      middle: 'Middle School (Grades VI to VIII)',
      secondary: 'Secondary (Grades IX & X)',
      senior_science: 'Grade XI - Science Stream',
      senior_commerce_hum: 'Grade XI - Commerce / Humanities',
    };

    setConfirmation({
      refNumber: ref,
      studentName,
      dob,
      grade: gradeLabels[grade] || grade,
      parentName,
      mobile: '+91 ' + cleanMobile,
      email,
      submissionDate: dateStr,
    });

    setStudentName('');
    setDob('');
    setParentName('');
    setMobile('');
    setEmail('');
    setArea('');
    setComments('');

    showToast(`Application submitted successfully! Ref: ${ref}`, 'success');
  };

  return (
    <RevealOnScroll variant="fade-up">
      <div id="admission-form-card" className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm card-glow">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Online Enrolment</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-heading mt-1">Admission Enquiry Form 2027-28</h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Fill in your child&apos;s particulars to receive a confirmed Application Reference ID and schedule a campus meeting at RMS World School.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Student Full Name *</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Date of Birth *</label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Grade Applying For *</label>
              <select
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 transition-all"
              >
                <option value="">Select Grade</option>
                <option value="nursery">Foundational: Nursery / LKG / UKG</option>
                <option value="primary">Grades I to V</option>
                <option value="middle">Grades VI to VIII</option>
                <option value="secondary">Grades IX &amp; X</option>
                <option value="senior_science">Grade XI - Science Stream</option>
                <option value="senior_commerce_hum">Grade XI - Commerce / Humanities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Parent / Guardian Full Name *</label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Dr. Vikramaditya Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Parent Mobile Number (10 digits) *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">+91</span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9728035202"
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Parent Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Residential Area / City (Sulkha / Rewari / Shahjahanpur / Haryana)</label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Sulkha, Rewari-Shahjahanpur Road, Haryana"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Any Specific Questions / Medical Needs / Sibling Details</label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Tell us about your child's interests or questions regarding admission..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-800 transition-all"
              />
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="px-10 py-3.5 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-md transform hover:-translate-y-0.5"
            >
              Submit Online Admission Enquiry
            </button>
            <p className="text-[11px] text-slate-500 mt-2">
              Our Admissions Team (+91 9728035202 / +91 7988720175) will contact you within 24 business hours.
            </p>
          </div>
        </form>

        {confirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
              <div className="p-6 text-center border-b border-slate-100 bg-emerald-50/50">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy-800 font-heading">Application Received Successfully!</h3>
                <p className="text-xs text-slate-500 mt-1">Thank you for choosing RMS World School for your child.</p>
              </div>

              <div className="p-6 space-y-4 text-xs overflow-y-auto flex-1 printable-area">
                <div className="p-4 bg-navy-950 text-white rounded-xl text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Application Reference Number</span>
                  <div className="text-2xl font-extrabold font-mono text-gold-300 tracking-wider">{confirmation.refNumber}</div>
                  <span className="text-[10px] text-slate-400">Please quote this reference for all admissions correspondence</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between"><span className="text-slate-500">Student Name:</span><span className="font-bold text-slate-800">{confirmation.studentName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Grade Applied:</span><span className="font-bold text-slate-800">{confirmation.grade}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Parent Name:</span><span className="font-bold text-slate-800">{confirmation.parentName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Mobile:</span><span className="font-bold text-slate-800">{confirmation.mobile}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-bold text-slate-800">{confirmation.email}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Submission Date:</span><span className="font-bold text-slate-800">{confirmation.submissionDate}</span></div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                  <strong>Next Steps:</strong> An admissions coordinator from RMS World School (11th Milestone, Rewari-Shahjahanpur Road, Sulkha) will contact you within 24 working hours to schedule the interaction.
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center no-print">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print Slip
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmation(null)}
                  className="px-4 py-2 bg-navy-800 text-white hover:bg-navy-700 font-semibold rounded-lg text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RevealOnScroll>
  );
}
