'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MetricsStrip } from '@/components/MetricsStrip';
import { PrincipalWelcome } from '@/components/PrincipalWelcome';
import { AcademicWings } from '@/components/AcademicWings';
import { NoticeBoardEvents } from '@/components/NoticeBoardEvents';
import { FacilitiesShowcase } from '@/components/FacilitiesShowcase';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { FeeEstimator } from '@/components/FeeEstimator';
import { AdmissionEnquiryForm } from '@/components/AdmissionEnquiryForm';
import { CampusGallery } from '@/components/CampusGallery';
import { MandatoryDisclosure } from '@/components/MandatoryDisclosure';
import { CampusTourScheduler } from '@/components/CampusTourScheduler';
import { Footer } from '@/components/Footer';
import { AdmissionsChatbot } from '@/components/AdmissionsChatbot';
import { ParentErpModal } from '@/components/ParentErpModal';
import { Eye, Shield } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [erpModalOpen, setErpModalOpen] = useState(false);
  const [enquiryGrade, setEnquiryGrade] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['home', 'about', 'academics', 'admissions', 'gallery', 'disclosure', 'contact'];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyWithGrade = (grade) => {
    setEnquiryGrade(grade);
    const formEl = document.getElementById('admission-form-card');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenErpModal={() => setErpModalOpen(true)}
      />

      <main className="flex-1">
        {/* ================================================================
            VIEW 1: HOME VIEW
            ================================================================ */}
        {currentView === 'home' && (
          <div>
            <Hero onNavigate={handleNavigate} />
            <MetricsStrip />
            <PrincipalWelcome onNavigate={handleNavigate} />
            <AcademicWings onNavigate={handleNavigate} />
            <NoticeBoardEvents />

            <section className="py-16 lg:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FacilitiesShowcase onNavigate={handleNavigate} />
                <TestimonialsCarousel />
              </div>
            </section>

            <section className="bg-gradient-to-r from-gold-500 via-gold-600 to-amber-600 text-navy-950 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-navy-950">
                    Ready to Give Your Child the Aurelia Advantage?
                  </h2>
                  <p className="text-sm text-navy-900 font-medium mt-1">
                    Admissions now underway for Session 2027-28 across Pre-Primary to Grade XI.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleNavigate('admissions')}
                    className="px-6 py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold rounded-xl text-sm shadow-lg transition-transform transform hover:-translate-y-0.5"
                  >
                    Apply Online Now
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('contact')}
                    className="px-5 py-3 bg-white/80 hover:bg-white text-navy-950 font-bold rounded-xl text-sm transition-colors"
                  >
                    Schedule Campus Visit
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================================================================
            VIEW 2: ABOUT US VIEW
            ================================================================ */}
        {currentView === 'about' && (
          <div>
            <div className="bg-navy-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Our Legacy & Philosophy</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">About Aurelia Global Academy</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Founded in 1998, Aurelia has nurtured over 12,000 alumni who lead with intellect, purpose, and compassionate leadership across the globe.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="w-12 h-12 bg-navy-800 text-gold-400 rounded-xl flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy-800 font-heading mb-3">Our Vision</h2>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    To be a beacon of transformative education in India where scientific inquiry and timeless humanist ethics converge, inspiring students to lead sustainable, purposeful, and globally meaningful lives.
                  </p>
                </div>

                <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="w-12 h-12 bg-navy-800 text-gold-400 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy-800 font-heading mb-3">Our Mission</h2>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    To provide child-centric experiential learning aligned with CBSE and NEP 2020 standards, cultivating critical thinking, emotional intelligence, athletic stamina, and an unwavering commitment to societal well-being.
                  </p>
                </div>
              </div>

              <div>
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600">The Aurelia Ethos</span>
                  <h2 className="text-3xl font-extrabold text-navy-800 font-heading mt-2">Our Four Foundational Pillars</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                    <span className="text-3xl font-black text-gold-500 font-heading">01</span>
                    <h3 className="text-base font-bold text-navy-800 mt-2">Intellectual Rigour</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Encouraging curiosity over conformity, deep conceptual comprehension, and research-minded inquiry.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                    <span className="text-3xl font-black text-gold-500 font-heading">02</span>
                    <h3 className="text-base font-bold text-navy-800 mt-2">Ethical Leadership</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Instilling transparency, moral courage, empathy, and active civic participation in community upliftment.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                    <span className="text-3xl font-black text-gold-500 font-heading">03</span>
                    <h3 className="text-base font-bold text-navy-800 mt-2">Global Competence</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Multilingual proficiency, intercultural fluency, Model UN leadership, and environmental stewardship.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
                    <span className="text-3xl font-black text-gold-500 font-heading">04</span>
                    <h3 className="text-base font-bold text-navy-800 mt-2">Holistic Wellness</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Dedicated sports academies, mindfulness guidance, nutrition hygiene, and emotional resilience counseling.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Academic Leadership</span>
                  <h2 className="text-3xl font-extrabold text-navy-800 font-heading mt-2">Guided by Visionary Educators</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm text-center p-4">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                      alt="Dr. Meera Krishnan"
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-3 border-2 border-gold-400"
                    />
                    <h3 className="text-base font-bold text-navy-800 font-heading">Dr. Meera Krishnan</h3>
                    <p className="text-xs text-gold-600 font-semibold">Principal & Academic Director</p>
                    <p className="text-[11px] text-slate-500 mt-1">Ph.D. Education, 26+ Years Experience</p>
                  </div>

                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm text-center p-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                      alt="Prof. Harish Vardhan"
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-3 border-2 border-gold-400"
                    />
                    <h3 className="text-base font-bold text-navy-800 font-heading">Prof. Harish Vardhan</h3>
                    <p className="text-xs text-gold-600 font-semibold">Chairman, Advisory Council</p>
                    <p className="text-[11px] text-slate-500 mt-1">Former Dean, Faculty of Education</p>
                  </div>

                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm text-center p-4">
                    <img
                      src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80"
                      alt="Mrs. Shweta Banerjee"
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-3 border-2 border-gold-400"
                    />
                    <h3 className="text-base font-bold text-navy-800 font-heading">Mrs. Shweta Banerjee</h3>
                    <p className="text-xs text-gold-600 font-semibold">Vice Principal (Senior Wing)</p>
                    <p className="text-[11px] text-slate-500 mt-1">M.A., B.Ed., CBSE Resource Person</p>
                  </div>

                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm text-center p-4">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                      alt="Mr. Anand Sengupta"
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-3 border-2 border-gold-400"
                    />
                    <h3 className="text-base font-bold text-navy-800 font-heading">Mr. Anand Sengupta</h3>
                    <p className="text-xs text-gold-600 font-semibold">Head of Innovation & STEM</p>
                    <p className="text-[11px] text-slate-500 mt-1">B.Tech IIT Roorkee, Robotics Mentor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 3: ACADEMICS VIEW
            ================================================================ */}
        {currentView === 'academics' && (
          <div>
            <div className="bg-navy-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Curriculum & NEP 2020</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Academic Excellence</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Our dual focus combines Board examination mastery with analytical thinking, creative expression, and high-tech STEM readiness.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              <div>
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Class XI & XII Baskets</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-heading mt-2">Senior Secondary Subject Choices</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 border-2 border-navy-800 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="px-3 py-1 bg-navy-800 text-white text-xs font-bold rounded-full">Science Stream</span>
                      <h3 className="text-lg font-bold text-navy-800 font-heading mt-3">Medical & Non-Medical</h3>
                      <p className="text-xs text-slate-600 mt-1 mb-4">Integrated with JEE Main/Advanced, NEET, and Olympiad coaching.</p>
                      <div className="space-y-2 text-xs text-slate-700">
                        <div className="p-2 bg-slate-50 rounded"><strong>Core:</strong> English Core, Physics, Chemistry</div>
                        <div className="p-2 bg-slate-50 rounded"><strong>Elective 1:</strong> Mathematics or Biology</div>
                        <div className="p-2 bg-slate-50 rounded"><strong>Elective 2:</strong> Computer Science, AI, Physical Ed, Economics, Psychology</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('admissions')}
                      className="mt-6 w-full py-2 bg-navy-50 text-navy-800 hover:bg-gold-500 hover:text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Enquire for Grade XI Science
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border-2 border-gold-400 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="px-3 py-1 bg-gold-500 text-navy-950 text-xs font-bold rounded-full">Commerce Stream</span>
                      <h3 className="text-lg font-bold text-navy-800 font-heading mt-3">Business & Finance</h3>
                      <p className="text-xs text-slate-600 mt-1 mb-4">Focus on chartered accountancy foundations, fintech, and CUET.</p>
                      <div className="space-y-2 text-xs text-slate-700">
                        <div className="p-2 bg-slate-50 rounded"><strong>Core:</strong> English Core, Accountancy, Business Studies</div>
                        <div className="p-2 bg-slate-50 rounded"><strong>Elective 1:</strong> Economics or Applied Mathematics</div>
                        <div className="p-2 bg-slate-50 rounded"><strong>Elective 2:</strong> Informatics Practices, Entrepreneurship, Fine Arts</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('admissions')}
                      className="mt-6 w-full py-2 bg-gold-50 text-navy-800 hover:bg-gold-500 hover:text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Enquire for Grade XI Commerce
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border-2 border-slate-300 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-full">Humanities Stream</span>
                      <h3 className="text-lg font-bold text-navy-800 font-heading mt-3">Liberal Arts & Law</h3>
                      <p className="text-xs text-slate-600 mt-1 mb-4">Focused preparation for CLAT, civil services, design, and journalism.</p>
                      <div className="space-y-2 text-xs text-slate-700">
                        <div className="p-2 bg-slate-50 rounded"><strong>Core:</strong> English Core, Political Science, History</div>
                        <div className="p-2 bg-slate-50 rounded"><strong>Elective 1:</strong> Psychology or Sociology</div>
                        <div className="p-2 bg-slate-50 rounded"><strong>Elective 2:</strong> Legal Studies, Economics, Mass Media, Hindi Core</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavigate('admissions')}
                      className="mt-6 w-full py-2 bg-slate-100 text-navy-800 hover:bg-gold-500 hover:text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Enquire for Grade XI Humanities
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Next-Gen Learning</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mt-2">STREAM & AI Curriculum</h2>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                      Aurelia is one of the few schools in NCR with an official Atal Innovation Mission hub and NVIDIA AI learning modules starting from Grade VI. Students build real-world IoT solutions, learn Python syntax, and interact with machine vision tools.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6 text-xs">
                      <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
                        <span className="text-gold-400 font-bold block">3D Prototyping</span>
                        <span className="text-slate-400">Dual extrusion FDM printers for CAD models</span>
                      </div>
                      <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
                        <span className="text-gold-400 font-bold block">Python & ML</span>
                        <span className="text-slate-400">Algorithmic thinking and data science</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                      alt="STREAM Lab"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 4: ADMISSIONS VIEW
            ================================================================ */}
        {currentView === 'admissions' && (
          <div>
            <div className="bg-navy-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Academic Session 2027-28</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Admissions & Fee Transparency</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Simple 4-step admission process, transparent annual fee estimator in Indian Rupees (₹), and instant online application enquiry.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              <div>
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Roadmap to Enrolment</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-heading mt-1">4-Step Admission Process</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="w-8 h-8 rounded-full bg-navy-800 text-gold-400 font-bold text-xs flex items-center justify-center mb-4">1</span>
                    <h3 className="text-base font-bold text-navy-800 font-heading">Online Registration</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Submit the online enquiry form below or visit the admissions office to register for the candidate reference ID.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="w-8 h-8 rounded-full bg-navy-800 text-gold-400 font-bold text-xs flex items-center justify-center mb-4">2</span>
                    <h3 className="text-base font-bold text-navy-800 font-heading">Campus Interaction</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Informal interaction for Pre-Primary; diagnostic aptitude evaluation in English, Math & Science for Grades I to XI.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="w-8 h-8 rounded-full bg-navy-800 text-gold-400 font-bold text-xs flex items-center justify-center mb-4">3</span>
                    <h3 className="text-base font-bold text-navy-800 font-heading">Document Verification</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Verification of child's birth certificate, previous school report cards, Transfer Certificate (TC), and residence proof.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="w-8 h-8 rounded-full bg-gold-500 text-navy-950 font-bold text-xs flex items-center justify-center mb-4">4</span>
                    <h3 className="text-base font-bold text-navy-800 font-heading">Seat Offer & Fee Deposit</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Formal admission offer letter issued via email; admission confirmed upon deposit of first quarter fee.
                    </p>
                  </div>
                </div>
              </div>

              <FeeEstimator onApplyWithGrade={handleApplyWithGrade} />

              <AdmissionEnquiryForm initialGrade={enquiryGrade} />
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 5: CAMPUS & GALLERY VIEW
            ================================================================ */}
        {currentView === 'gallery' && (
          <div>
            <div className="bg-navy-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Visual Experience</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Campus & Photo Gallery</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Explore our state-of-the-art facilities, laboratories, sporting complexes, and vibrant cultural events.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <CampusGallery />
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 6: MANDATORY DISCLOSURE VIEW
            ================================================================ */}
        {currentView === 'disclosure' && (
          <div>
            <div className="bg-navy-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-wider">
                  <span>Regulatory Compliance</span>
                  <span>•</span>
                  <span>Appendix-IX Norms</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Mandatory Public Disclosure</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  In compliance with CBSE Circular No. 03/2021, Aurelia Global Academy makes all statutory statutory certificates, academic results, and trust documentation publicly available.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <MandatoryDisclosure />
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 7: CONTACT VIEW
            ================================================================ */}
        {currentView === 'contact' && (
          <div>
            <div className="bg-navy-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Visit Gurugram Campus</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Connect With Us</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Schedule an in-person campus tour, speak with an admissions counselor, or find administrative office timings.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <CampusTourScheduler />
            </div>
          </div>
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenErpModal={() => setErpModalOpen(true)}
      />

      <AdmissionsChatbot />

      <ParentErpModal
        isOpen={erpModalOpen}
        onClose={() => setErpModalOpen(false)}
      />
    </>
  );
}
