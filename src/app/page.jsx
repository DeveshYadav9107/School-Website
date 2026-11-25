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
import { CareersRecruitment } from '@/components/CareersRecruitment';
import { CampusTourScheduler } from '@/components/CampusTourScheduler';
import { Footer } from '@/components/Footer';
import { AdmissionsChatbot } from '@/components/AdmissionsChatbot';
import { ParentErpModal } from '@/components/ParentErpModal';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Eye, Shield, Briefcase, ArrowRight, Calendar } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [erpModalOpen, setErpModalOpen] = useState(false);
  const [enquiryGrade, setEnquiryGrade] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = [
        'home',
        'about',
        'academics',
        'admissions',
        'gallery',
        'disclosure',
        'careers',
        'contact',
      ];
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

            {/* Subtle Highlight Banner for Faculty Recruitment Drive */}
            <section className="bg-navy-900 border-b border-gold-500/30 text-white py-3.5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500 text-navy-950 font-extrabold text-[11px] uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5" />
                    Faculty Recruitment
                  </span>
                  <span className="text-slate-200 font-medium text-center sm:text-left">
                    Highly Energetic &amp; Well Experienced Faculty Required • Walk-In Interview:{' '}
                    <strong className="text-gold-300 inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 inline" /> 6th Dec 2026 (Sunday)
                    </strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('careers')}
                  className="px-4 py-1.5 rounded-lg bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-navy-950 border border-gold-400/50 font-bold text-xs transition-all flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Explore Careers &amp; Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

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
                    Ready to Give Your Child the RMS World School Advantage?
                  </h2>
                  <p className="text-sm text-navy-900 font-medium mt-1">
                    Admissions now underway for Session 2027-28 across Pre-Primary to Grade XI at Sulkha, Haryana.
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap justify-center">
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
                    className="px-5 py-3 bg-white/85 hover:bg-white text-navy-950 font-bold rounded-xl text-sm transition-colors"
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
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Our Legacy &amp; Philosophy</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">About RMS World School</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Founded in 1998, RMS World School has nurtured over 12,000 alumni who lead with intellect, purpose, and compassionate leadership across the globe.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RevealOnScroll variant="fade-up" delay={0}>
                  <div className="h-full p-8 bg-slate-50 rounded-2xl border border-slate-200 card-glow">
                    <div className="w-12 h-12 bg-navy-800 text-gold-400 rounded-xl flex items-center justify-center mb-4">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy-800 font-heading mb-3">Our Vision</h2>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      To be a beacon of transformative education in Haryana where scientific inquiry and timeless humanist ethics converge, inspiring students to lead sustainable, purposeful, and globally meaningful lives.
                    </p>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll variant="fade-up" delay={90}>
                  <div className="h-full p-8 bg-slate-50 rounded-2xl border border-slate-200 card-glow">
                    <div className="w-12 h-12 bg-navy-800 text-gold-400 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy-800 font-heading mb-3">Our Mission</h2>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      To provide child-centric experiential learning aligned with CBSE Norms &amp; Curriculum and NEP 2020 standards, cultivating critical thinking, emotional intelligence, athletic stamina, and societal responsibility.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>

              <div>
                <RevealOnScroll variant="fade-up">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-600">The RMS Ethos</span>
                    <h2 className="text-3xl font-extrabold text-navy-800 font-heading mt-2">Our Four Foundational Pillars</h2>
                  </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { num: '01', title: 'Intellectual Rigour', desc: 'Encouraging curiosity over conformity, deep conceptual comprehension, and research-minded inquiry.' },
                    { num: '02', title: 'Ethical Leadership', desc: 'Instilling transparency, moral courage, empathy, and active civic participation in community upliftment.' },
                    { num: '03', title: 'Global Competence', desc: 'Multilingual proficiency, intercultural fluency, Model UN leadership, and environmental stewardship.' },
                    { num: '04', title: 'Holistic Wellness', desc: 'Dedicated sports academies, mindfulness guidance, nutrition hygiene, and emotional resilience counseling.' },
                  ].map((pillar, i) => (
                    <RevealOnScroll key={pillar.num} delay={i * 75} variant="fade-up">
                      <div className="h-full p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-center card-glow">
                        <span className="text-3xl font-black text-gold-500 font-heading">{pillar.num}</span>
                        <h3 className="text-base font-bold text-navy-800 mt-2">{pillar.title}</h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{pillar.desc}</p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              <div>
                <RevealOnScroll variant="fade-up">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Academic Leadership</span>
                    <h2 className="text-3xl font-extrabold text-navy-800 font-heading mt-2">Guided by Visionary Educators</h2>
                  </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: 'Dr. Meera Krishnan',
                      role: 'Principal & Academic Director',
                      qual: 'Ph.D. Education, 26+ Years Experience',
                      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                    },
                    {
                      name: 'Prof. Harish Vardhan',
                      role: 'Chairman, Advisory Council',
                      qual: 'Former Dean, Faculty of Education',
                      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                    },
                    {
                      name: 'Mrs. Shweta Banerjee',
                      role: 'Vice Principal (Senior Wing)',
                      qual: 'M.A., B.Ed., CBSE Resource Person',
                      img: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
                    },
                    {
                      name: 'Mr. Anand Sengupta',
                      role: 'Head of Innovation & STEM',
                      qual: 'B.Tech IIT Roorkee, Robotics Mentor',
                      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                    },
                  ].map((leader, idx) => (
                    <RevealOnScroll key={leader.name} delay={idx * 75} variant="fade-up">
                      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm text-center p-4 card-glow">
                        <img
                          src={leader.img}
                          alt={leader.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto mb-3 border-2 border-gold-400"
                        />
                        <h3 className="text-base font-bold text-navy-800 font-heading">{leader.name}</h3>
                        <p className="text-xs text-gold-600 font-semibold">{leader.role}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{leader.qual}</p>
                      </div>
                    </RevealOnScroll>
                  ))}
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
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Norms &amp; Curriculum • NEP 2020</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Academic Excellence</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Our dual focus combines Board examination mastery with analytical thinking, creative expression, and high-tech STEM readiness.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              <div>
                <RevealOnScroll variant="fade-up">
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Class XI &amp; XII Baskets</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-heading mt-2">Senior Secondary Subject Choices</h2>
                  </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <RevealOnScroll delay={0} variant="fade-up">
                    <div className="h-full bg-white rounded-2xl p-6 border-2 border-navy-800 shadow-sm flex flex-col justify-between card-glow">
                      <div>
                        <span className="px-3 py-1 bg-navy-800 text-white text-xs font-bold rounded-full">Science Stream</span>
                        <h3 className="text-lg font-bold text-navy-800 font-heading mt-3">Medical &amp; Non-Medical</h3>
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
                        className="mt-6 w-full py-2 bg-navy-50 text-navy-800 hover:bg-gold-500 hover:text-navy-950 rounded-lg text-xs font-bold transition-colors"
                      >
                        Enquire for Grade XI Science
                      </button>
                    </div>
                  </RevealOnScroll>

                  <RevealOnScroll delay={90} variant="fade-up">
                    <div className="h-full bg-white rounded-2xl p-6 border-2 border-gold-400 shadow-sm flex flex-col justify-between card-glow">
                      <div>
                        <span className="px-3 py-1 bg-gold-500 text-navy-950 text-xs font-bold rounded-full">Commerce Stream</span>
                        <h3 className="text-lg font-bold text-navy-800 font-heading mt-3">Business &amp; Finance</h3>
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
                        className="mt-6 w-full py-2 bg-gold-50 text-navy-800 hover:bg-gold-500 hover:text-navy-950 rounded-lg text-xs font-bold transition-colors"
                      >
                        Enquire for Grade XI Commerce
                      </button>
                    </div>
                  </RevealOnScroll>

                  <RevealOnScroll delay={180} variant="fade-up">
                    <div className="h-full bg-white rounded-2xl p-6 border-2 border-slate-300 shadow-sm flex flex-col justify-between card-glow">
                      <div>
                        <span className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-full">Humanities Stream</span>
                        <h3 className="text-lg font-bold text-navy-800 font-heading mt-3">Liberal Arts &amp; Law</h3>
                        <p className="text-xs text-slate-600 mt-1 mb-4">Focused preparation for CLAT, civil services, design, and journalism.</p>
                        <div className="space-y-2 text-xs text-slate-700">
                          <div className="p-2 bg-slate-50 rounded"><strong>Core:</strong> English Core, Political Science, History</div>
                          <div className="p-2 bg-slate-50 rounded"><strong>Elective 1:</strong> Psychology, Geography or Sociology</div>
                          <div className="p-2 bg-slate-50 rounded"><strong>Elective 2:</strong> Legal Studies, Economics, Mass Media, Hindi Core</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNavigate('admissions')}
                        className="mt-6 w-full py-2 bg-slate-100 text-navy-800 hover:bg-gold-500 hover:text-navy-950 rounded-lg text-xs font-bold transition-colors"
                      >
                        Enquire for Grade XI Humanities
                      </button>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>

              <RevealOnScroll variant="fade-up">
                <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-500/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Next-Gen Learning</span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mt-2">STREAM &amp; AI Curriculum</h2>
                      <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                        RMS World School features a dedicated Innovation Hub and NVIDIA AI learning modules starting from Grade VI. Students build real-world IoT solutions, learn Python syntax, and interact with machine vision tools.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-6 text-xs">
                        <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
                          <span className="text-gold-400 font-bold block">3D Prototyping</span>
                          <span className="text-slate-400">Dual extrusion FDM printers for CAD models</span>
                        </div>
                        <div className="p-3 bg-navy-900 rounded-lg border border-navy-800">
                          <span className="text-gold-400 font-bold block">Python &amp; ML</span>
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
              </RevealOnScroll>
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
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Admissions &amp; Fee Transparency</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Simple 4-step admission process, transparent annual fee estimator in Indian Rupees (₹), and instant online application enquiry at RMS World School.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              <div>
                <RevealOnScroll variant="fade-up">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Roadmap to Enrolment</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-heading mt-1">4-Step Admission Process</h2>
                  </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { step: '1', title: 'Online Registration', desc: 'Submit the online enquiry form below or visit the admissions office to register for the candidate reference ID.', isGold: false },
                    { step: '2', title: 'Campus Interaction', desc: 'Informal interaction for Pre-Primary; diagnostic aptitude evaluation in English, Math & Science for Grades I to XI.', isGold: false },
                    { step: '3', title: 'Document Verification', desc: "Verification of child's birth certificate, previous school report cards, Transfer Certificate (TC), and residence proof.", isGold: false },
                    { step: '4', title: 'Seat Offer & Fee Deposit', desc: 'Formal admission offer letter issued via email; admission confirmed upon deposit of first quarter fee.', isGold: true },
                  ].map((s, idx) => (
                    <RevealOnScroll key={s.step} delay={idx * 75} variant="fade-up">
                      <div className="h-full p-6 bg-slate-50 rounded-2xl border border-slate-200 card-glow">
                        <span className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mb-4 ${s.isGold ? 'bg-gold-500 text-navy-950' : 'bg-navy-800 text-gold-400'}`}>
                          {s.step}
                        </span>
                        <h3 className="text-base font-bold text-navy-800 font-heading">{s.title}</h3>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
                      </div>
                    </RevealOnScroll>
                  ))}
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
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Campus &amp; Photo Gallery</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Explore our state-of-the-art facilities, laboratories, sporting complexes, and vibrant cultural events at Sulkha (Haryana).
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
                  <span>CBSE Norms &amp; Curriculum (Appendix-IX)</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Mandatory Public Disclosure</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  In compliance with CBSE Circular guidelines, RMS World School makes all statutory certificates, academic results, and trust documentation publicly available.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <MandatoryDisclosure />
            </div>
          </div>
        )}

        {/* ================================================================
            VIEW 7: CAREERS / FACULTY RECRUITMENT VIEW
            ================================================================ */}
        {currentView === 'careers' && (
          <div>
            <div className="bg-navy-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Walk-In Drive • Sunday, 6th December 2026
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">
                  Careers &amp; Faculty Recruitment
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Join RMS World School at 11th Milestone, Rewari-Shahjahanpur Road, Sulkha (Haryana). Salary No Bar for Deserving Candidates | Qualification as per CBSE Norms.
                </p>
              </div>
            </div>

            <CareersRecruitment />
          </div>
        )}

        {/* ================================================================
            VIEW 8: CONTACT VIEW
            ================================================================ */}
        {currentView === 'contact' && (
          <div>
            <div className="bg-navy-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Visit Sulkha Campus (Haryana)</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading mt-2">Connect With Us</h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                  Schedule an in-person campus tour at 11th Milestone, Rewari-Shahjahanpur Road, Sulkha (Haryana), or reach us at +91 9728035202 / +91 7988720175.
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

      <ScrollToTopButton />

      <ParentErpModal
        isOpen={erpModalOpen}
        onClose={() => setErpModalOpen(false)}
      />
    </>
  );
}
