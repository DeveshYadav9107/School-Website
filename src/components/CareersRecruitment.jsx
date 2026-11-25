'use client';

import React, { useState } from 'react';
import { AGA_DATA } from '@/data/academyData';
import { useToast } from '@/context/ToastContext';
import { RevealOnScroll } from './RevealOnScroll';
import { Emblem } from './Emblem';
import {
  Briefcase,
  Calendar,
  MapPin,
  Phone,
  Award,
  CheckCircle2,
  ArrowRight,
  Users,
  BookOpen,
  GraduationCap,
  Sparkles,
  Wrench,
  X,
  Check,
  Printer,
  Bell,
} from 'lucide-react';

export function CareersRecruitment() {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [reminderAdded, setReminderAdded] = useState(false);

  // Modal & Form State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [city, setCity] = useState('');
  const [interviewPass, setInterviewPass] = useState(null);

  const { careers } = AGA_DATA;
  const categories = ['All', 'Academic Faculty', 'Support & Co-Curricular'];

  const filteredPositions =
    activeCategory === 'All'
      ? careers.positions
      : careers.positions.filter((pos) => pos.category === activeCategory);

  const roleIcons = {
    'coaching-faculty': <Sparkles className="w-6 h-6 text-gold-400" />,
    pgt: <GraduationCap className="w-6 h-6 text-gold-400" />,
    tgt: <BookOpen className="w-6 h-6 text-gold-400" />,
    prt: <Users className="w-6 h-6 text-gold-400" />,
    'mother-teacher': <Award className="w-6 h-6 text-gold-400" />,
    'co-curricular-support': <Wrench className="w-6 h-6 text-gold-400" />,
  };

  const handleSetReminder = () => {
    setReminderAdded(true);
    showToast(
      `Walk-In Interview Reminder saved for ${careers.interview.date} at RMS World School, Sulkha!`,
      'success'
    );
  };

  const openApplyModal = (roleTitle) => {
    setSelectedRole(roleTitle || careers.positions[0].title);
    setSelectedSubject('');
    setInterviewPass(null);
    setApplyModalOpen(true);
  };

  const resetAndCloseModal = () => {
    setApplyModalOpen(false);
    setInterviewPass(null);
  };

  const isPgtRole = selectedRole.toLowerCase().includes('pgt');
  const isSupportRole = selectedRole.toLowerCase().includes('co-curricular');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!candidateName.trim() || !phone.trim() || !qualification.trim() || !experience.trim() || !city.trim()) {
      showToast('Please fill all mandatory candidate fields.', 'error');
      return;
    }

    if (isPgtRole && !selectedSubject) {
      showToast('Please select your PGT Subject specialization.', 'error');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      showToast('Please enter a valid 10-digit Indian mobile number.', 'error');
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const passId = `RMS-2026-${randomCode}`;

    setInterviewPass({
      passId,
      candidateName: candidateName.trim(),
      phone: `+91 ${cleanPhone}`,
      role: selectedRole,
      subject: selectedSubject || (isPgtRole ? 'General' : ''),
      qualification: qualification.trim(),
      experience: experience.trim(),
      city: city.trim(),
      interviewDate: careers.interview.date,
      interviewTime: careers.interview.time,
      venue: careers.interview.venue,
    });

    setCandidateName('');
    setPhone('');
    setQualification('');
    setExperience('');
    setCity('');

    showToast(`Walk-In Pass Generated! Registration ID: ${passId}`, 'success');
  };

  return (
    <section id="careers-section" className="py-14 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Highlighted Walk-In Interview Event Card (Navy & Antique Gold) */}
        <RevealOnScroll variant="fade-up">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white border-2 border-gold-500/60 shadow-2xl">
            {/* Ambient subtle dot matrix & gold glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-gold-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/50 text-gold-300 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
                    Faculty Recruitment &amp; Walk-In Interview
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight text-white">
                    {careers.headline}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    {careers.subheadline}
                  </p>

                  {/* Compensation & Eligibility Highlight Pill */}
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-navy-950/90 border border-gold-400/40 text-gold-300 text-xs sm:text-sm font-bold shadow-inner">
                    <Award className="w-5 h-5 text-gold-400 flex-shrink-0" />
                    <span>{careers.interview.note}</span>
                  </div>

                  {/* Quick Call & Action Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="tel:+919728035202"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call 9728035202</span>
                    </a>

                    <a
                      href="tel:+917988720175"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call 7988720175</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleSetReminder}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                        reminderAdded
                          ? 'bg-emerald-600/90 border-emerald-400 text-white'
                          : 'bg-navy-800/90 hover:bg-navy-700 border-gold-400/50 text-gold-300 hover:text-white'
                      }`}
                    >
                      {reminderAdded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Reminder Added</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4" />
                          <span>Add to Calendar / Set Reminder</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Walk-In Date & Venue Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white/5 backdrop-blur-md border border-gold-400/50 rounded-2xl p-6 space-y-5 shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/15 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                        Walk-In Schedule
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-gold-500 text-navy-950 text-[11px] font-extrabold">
                        OPEN FOR ALL POSTS
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                            Interview Date
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-white font-heading">
                            {careers.interview.date}
                          </span>
                          <span className="text-xs text-gold-300 block mt-0.5">
                            Reporting Time: {careers.interview.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                            Venue
                          </span>
                          <span className="text-sm font-bold text-white leading-snug block">
                            {careers.interview.venue}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openApplyModal(careers.positions[1].title)}
                      className="w-full py-3 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-navy-950 font-extrabold rounded-xl text-sm shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <span>Pre-Register for Walk-In Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Job Category Filter & Positions Grid */}
        <div className="space-y-8">
          <RevealOnScroll variant="fade-up" delay={100}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                  Current Vacancies (2026–27)
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-heading mt-1">
                  Explore Open Faculty &amp; Staff Positions
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Select a department filter below or click <strong>Apply Now</strong> on any role to generate your Walk-In Registration Pass.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {categories.map((cat) => {
                  const count =
                    cat === 'All'
                      ? careers.positions.length
                      : careers.positions.filter((p) => p.category === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-navy-800 text-white shadow-md ring-2 ring-gold-400/50'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-gold-400 hover:text-navy-800'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          isActive ? 'bg-gold-500 text-navy-950' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPositions.map((pos, idx) => (
              <RevealOnScroll key={pos.id} delay={idx * 75} variant="fade-up" className="h-full">
                <div className="h-full bg-white rounded-2xl p-6 border border-slate-200 card-glow flex flex-col justify-between group">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                        {roleIcons[pos.id] || <Briefcase className="w-6 h-6 text-gold-400" />}
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-[11px] font-bold">
                        {pos.category}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600">
                      {pos.badge}
                    </span>
                    <h4 className="text-lg font-extrabold text-navy-800 font-heading mt-1 group-hover:text-navy-900">
                      {pos.title}
                    </h4>

                    <p className="text-xs font-semibold text-navy-700 bg-navy-50/70 border border-navy-100 rounded-lg p-2.5 mt-2.5 leading-relaxed">
                      {pos.summary}
                    </p>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {pos.details}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {pos.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-500 font-medium">
                      CBSE Norms Apply
                    </span>
                    <button
                      type="button"
                      onClick={() => openApplyModal(pos.title)}
                      className="px-4 py-2 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white font-bold rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Apply / Pre-Register for Walk-In Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-navy-950 text-white flex justify-between items-center border-b border-navy-800 no-print">
              <div className="flex items-center gap-3">
                <Emblem className="w-9 h-9" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block">
                    RMS World School Recruitment
                  </span>
                  <h3 className="text-sm sm:text-base font-bold font-heading">
                    {interviewPass ? 'Official Walk-In Interview Pass' : 'Pre-Register for Walk-In Interview'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={resetAndCloseModal}
                aria-label="Close Recruitment Modal"
                className="text-slate-400 hover:text-white p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!interviewPass ? (
              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2 flex-wrap">
                  <span>
                    <strong>Walk-In Date:</strong> {careers.interview.date}
                  </span>
                  <span className="font-semibold text-navy-800">Sulkha, Haryana</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Position Applying For *
                  </label>
                  <select
                    required
                    value={selectedRole}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setSelectedSubject('');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none bg-white"
                  >
                    {careers.positions.map((pos) => (
                      <option key={pos.id} value={pos.title}>
                        {pos.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject dropdown specifically for PGT */}
                {isPgtRole && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      PGT Subject Specialization *
                    </label>
                    <select
                      required
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gold-400 text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none bg-gold-50/40"
                    >
                      <option value="">-- Select PGT Subject --</option>
                      {careers.pgtSubjects.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Post dropdown for Support & Co-Curricular */}
                {isSupportRole && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Specific Post / Discipline
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none bg-white"
                    >
                      <option value="">-- Select Specific Post --</option>
                      {careers.supportRoles.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Priya Yadav"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number (10 digits) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9728035202"
                        className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Highest Qualification *
                    </label>
                    <input
                      type="text"
                      required
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      placeholder="e.g. M.Sc. Physics, B.Ed., CTET"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Years of Experience *
                    </label>
                    <input
                      type="text"
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 5 Years"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current City / District *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Rewari, Haryana"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={resetAndCloseModal}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <span>Generate Walk-In Interview Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              /* Instant Walk-In Interview Pass Result */
              <>
                <div className="p-6 overflow-y-auto flex-1 printable-area space-y-5">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-extrabold text-navy-800 font-heading">
                      Pre-Registration Confirmed!
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Please bring an updated CV and original documents to the interview venue.
                    </p>
                  </div>

                  <div className="p-4 bg-navy-950 text-white rounded-2xl border border-gold-500/50 text-center space-y-1 shadow-lg">
                    <span className="text-[10px] uppercase font-bold text-gold-400 tracking-widest">
                      Walk-In Interview Registration ID
                    </span>
                    <div className="text-2xl font-black font-mono text-gold-300 tracking-wider">
                      {interviewPass.passId}
                    </div>
                    <span className="text-[11px] text-slate-300 block">
                      {interviewPass.role}
                      {interviewPass.subject ? ` — ${interviewPass.subject}` : ''}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Candidate Name:</span>
                      <span className="font-bold text-slate-900">{interviewPass.candidateName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Applied Role:</span>
                      <span className="font-bold text-navy-800">
                        {interviewPass.role}
                        {interviewPass.subject ? ` (${interviewPass.subject})` : ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Qualification:</span>
                      <span className="font-semibold text-slate-800">{interviewPass.qualification}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Experience:</span>
                      <span className="font-semibold text-slate-800">{interviewPass.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact &amp; City:</span>
                      <span className="font-semibold text-slate-800">
                        {interviewPass.phone} • {interviewPass.city}
                      </span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-1.5">
                    <div className="font-bold text-navy-900 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gold-600" />
                      <span>Walk-In Interview Date: {interviewPass.interviewDate}</span>
                    </div>
                    <p className="text-amber-900">
                      <strong>Reporting Time:</strong> {interviewPass.interviewTime}
                    </p>
                    <p className="text-amber-900">
                      <strong>Venue:</strong> {interviewPass.venue}
                    </p>
                    <p className="text-[11px] text-amber-800 pt-1">
                      Recruitment Helpline: +91 9728035202 / +91 7988720175
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center no-print">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print Interview Pass
                  </button>
                  <button
                    type="button"
                    onClick={resetAndCloseModal}
                    className="px-5 py-2 bg-navy-800 text-white hover:bg-navy-700 font-semibold rounded-lg text-xs transition-colors"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
