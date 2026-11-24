'use client';

import React, { useState } from 'react';
import { AGA_DATA } from '@/data/academyData';
import { useToast } from '@/context/ToastContext';
import { Clock, MapPin, Calendar, ChevronRight, X, Printer } from 'lucide-react';
import { Emblem } from './Emblem';

export function NoticeBoardEvents() {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedNotice, setSelectedNotice] = useState(null);

  const categories = ['All', 'Circulars', 'Exams', 'Holidays'];

  const filteredNotices = activeCategory === 'All'
    ? AGA_DATA.notices
    : AGA_DATA.notices.filter((n) => n.category.toLowerCase() === activeCategory.toLowerCase());

  const handleAddReminder = (eventTitle, date, month) => {
    showToast(`Reminder saved for "${eventTitle}" on ${date} ${month} 2026!`, 'success');
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Official Dispatches</span>
                <h2 className="text-2xl font-extrabold text-navy-800 font-heading">Live Notice Board</h2>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-navy-800 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-gold-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="group p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-navy-50 text-navy-800 rounded-lg flex flex-col items-center justify-center border border-navy-100 group-hover:bg-gold-50 group-hover:border-gold-300 transition-colors">
                    <span className="text-xs font-bold uppercase leading-none">{notice.date.split(' ')[1]}</span>
                    <span className="text-base font-extrabold leading-none mt-1 text-gold-600">{notice.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        notice.badge === 'High Priority' ? 'bg-red-100 text-red-700 font-semibold' :
                        notice.badge === 'Competition' ? 'bg-purple-100 text-purple-700' :
                        notice.badge === 'PTM' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {notice.badge}
                      </span>
                      <span className="text-xs text-slate-600 font-medium">{notice.category}</span>
                      {notice.isNew && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-navy-800 transition-colors line-clamp-2">
                      {notice.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">{notice.summary}</p>
                  </div>
                  <div className="text-slate-400 group-hover:text-gold-500 transition-colors self-center">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="pb-2 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Campus Calendar</span>
              <h2 className="text-2xl font-extrabold text-navy-800 font-heading">Upcoming Events</h2>
            </div>

            <div className="space-y-4">
              {AGA_DATA.events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl hover:border-gold-300 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 text-white rounded-xl flex flex-col items-center justify-center flex-shrink-0 shadow-sm border-2 border-gold-400">
                      <span className="text-[10px] font-bold uppercase text-gold-300 tracking-wider">{event.month}</span>
                      <span className="text-xl font-extrabold leading-none text-white">{event.date}</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 text-[11px] font-semibold text-navy-800 bg-navy-50 rounded-full mb-1">
                        {event.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 hover:text-navy-800 transition-colors">{event.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-600 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold-600" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gold-600" />
                          {event.venue}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5">{event.description}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddReminder(event.title, event.date, event.month)}
                    className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-semibold text-navy-800 bg-gold-50 border border-gold-300 rounded-lg hover:bg-gold-500 hover:text-white transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Add Reminder
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-navy-950 text-white flex justify-between items-center border-b border-navy-800">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Aurelia Official Circular</span>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 printable-area">
              <div className="border-b-2 border-navy-800 pb-4 mb-5 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Emblem className="w-10 h-10" />
                  <div className="text-left">
                    <h2 className="text-lg font-bold text-navy-800 tracking-tight leading-none">{AGA_DATA.school.name}</h2>
                    <p className="text-[11px] text-slate-500 font-medium">
                      CBSE Affiliation No. {AGA_DATA.school.affiliationNo} | School Code: {AGA_DATA.school.schoolCode}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">{AGA_DATA.school.address}</p>
                <div className="mt-3 inline-block bg-navy-50 text-navy-900 px-4 py-1 rounded text-xs font-bold uppercase tracking-wider border border-navy-200">
                  Official School Circular
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div><strong>Circular Ref:</strong> {selectedNotice.id}</div>
                <div><strong>Date of Issuance:</strong> {selectedNotice.date}</div>
                <div><strong>Category:</strong> {selectedNotice.category}</div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold uppercase text-gold-600 tracking-wide">Subject:</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedNotice.title}</h3>
              </div>

              <div
                className="text-sm text-slate-700 leading-relaxed mb-6 font-normal"
                dangerouslySetInnerHTML={{ __html: selectedNotice.content }}
              />

              <div className="border-t border-slate-200 pt-4 flex justify-between items-end">
                <div className="text-xs text-slate-500">
                  <p>Aurelia Global Academy Portal Copy</p>
                  <p>Verified & Dispatched to Registered Parents</p>
                </div>
                <div className="text-right">
                  <div className="font-serif text-xl text-navy-800 italic font-semibold">Dr. Meera Krishnan</div>
                  <p className="text-xs font-bold text-slate-800">Principal</p>
                  <p className="text-[10px] text-slate-500">Aurelia Global Academy, Gurugram</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Circular
              </button>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-navy-800 text-white hover:bg-navy-700 font-semibold rounded-lg text-xs transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
