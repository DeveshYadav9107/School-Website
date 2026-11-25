'use client';

import React, { useState } from 'react';
import { AGA_DATA } from '@/data/academyData';
import { Eye, X, Printer } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export function MandatoryDisclosure() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="space-y-12">
      <RevealOnScroll variant="fade-up">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden card-glow">
          <div className="bg-navy-800 text-white px-6 py-4">
            <h2 className="text-base font-bold font-heading">Section A: General Information</h2>
          </div>
          <div className="p-6">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50"><td className="py-2.5 font-bold text-slate-800 w-1/3">Name of the School</td><td className="py-2.5 font-bold text-navy-800">{AGA_DATA.school.name}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2.5 font-bold text-slate-800">Board Affiliation</td><td className="py-2.5 font-mono font-bold text-navy-800">{AGA_DATA.school.board}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2.5 font-bold text-slate-800">Campus Code</td><td className="py-2.5 font-mono font-bold text-navy-800">{AGA_DATA.school.schoolCode}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2.5 font-bold text-slate-800">Complete Campus Address</td><td className="py-2.5 text-slate-700">{AGA_DATA.school.address}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2.5 font-bold text-slate-800">Principal Name &amp; Qualification</td><td className="py-2.5 text-slate-700">{AGA_DATA.school.principal}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2.5 font-bold text-slate-800">School Email ID</td><td className="py-2.5 text-slate-700">{AGA_DATA.school.email} / {AGA_DATA.school.infoEmail}</td></tr>
                <tr className="hover:bg-slate-50"><td className="py-2.5 font-bold text-slate-800">Contact Telephone Numbers</td><td className="py-2.5 font-semibold text-navy-800">{AGA_DATA.school.phone} / {AGA_DATA.school.phoneAlt}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll variant="fade-up" delay={100}>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden card-glow">
          <div className="bg-navy-800 text-white px-6 py-4 flex flex-wrap gap-2 justify-between items-center">
            <h2 className="text-base font-bold font-heading">Section B: Documents and Information</h2>
            <span className="text-xs text-gold-400 font-semibold">Click &apos;View Document&apos; to inspect certified copies</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-center">S.No.</th>
                  <th className="px-4 py-3">Document Title</th>
                  <th className="px-4 py-3">Issuing Authority</th>
                  <th className="px-4 py-3">Order / Memo No.</th>
                  <th className="px-4 py-3">Validity</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {AGA_DATA.disclosureDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5 text-xs font-semibold text-slate-800 text-center">{doc.number}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-900 font-medium">{doc.title}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600">{doc.authority}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 font-mono">{doc.fileNo}</td>
                    <td className="px-4 py-3.5 text-xs text-emerald-700 font-medium">{doc.validity}</td>
                    <td className="px-4 py-3.5 text-xs text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedDoc(doc)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white rounded text-xs font-semibold transition-colors shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Document
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll variant="fade-up" delay={160}>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden card-glow">
          <div className="bg-navy-800 text-white px-6 py-4">
            <h2 className="text-base font-bold font-heading">Section C: Last 3-Year CBSE Board Examination Results</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-navy-800 mb-3">Class X (All India Secondary School Exam)</h3>
                <table className="w-full text-xs">
                  <thead className="text-slate-500 border-b border-slate-200">
                    <tr><th className="pb-1 text-left">Year</th><th className="pb-1 text-center">Registered</th><th className="pb-1 text-center">Passed</th><th className="pb-1 text-right">Pass %</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr><td className="py-1.5 font-medium">2023-24</td><td className="py-1.5 text-center">148</td><td className="py-1.5 text-center">148</td><td className="py-1.5 text-right font-bold text-emerald-700">100%</td></tr>
                    <tr><td className="py-1.5 font-medium">2024-25</td><td className="py-1.5 text-center">162</td><td className="py-1.5 text-center">162</td><td className="py-1.5 text-right font-bold text-emerald-700">100%</td></tr>
                    <tr><td className="py-1.5 font-medium">2025-26</td><td className="py-1.5 text-center">174</td><td className="py-1.5 text-center">174</td><td className="py-1.5 text-right font-bold text-emerald-700">100%</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-navy-800 mb-3">Class XII (All India Senior School Certificate Exam)</h3>
                <table className="w-full text-xs">
                  <thead className="text-slate-500 border-b border-slate-200">
                    <tr><th className="pb-1 text-left">Year</th><th className="pb-1 text-center">Registered</th><th className="pb-1 text-center">Passed</th><th className="pb-1 text-right">Pass %</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr><td className="py-1.5 font-medium">2023-24</td><td className="py-1.5 text-center">126</td><td className="py-1.5 text-center">126</td><td className="py-1.5 text-right font-bold text-emerald-700">100%</td></tr>
                    <tr><td className="py-1.5 font-medium">2024-25</td><td className="py-1.5 text-center">138</td><td className="py-1.5 text-center">138</td><td className="py-1.5 text-right font-bold text-emerald-700">100%</td></tr>
                    <tr><td className="py-1.5 font-medium">2025-26</td><td className="py-1.5 text-center">152</td><td className="py-1.5 text-center">152</td><td className="py-1.5 text-right font-bold text-emerald-700">100%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-navy-950 text-white flex justify-between items-center">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Certified CBSE Regulatory Document</span>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 printable-area">
              <div className="border-4 border-double border-navy-800 p-6 bg-amber-50/30 rounded-xl relative overflow-hidden">
                <div className="text-center pb-4 border-b border-navy-300 mb-4">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">{selectedDoc.authority}</p>
                  <h2 className="text-xl font-bold text-navy-800 font-heading mt-1">{selectedDoc.title}</h2>
                  <p className="text-xs text-slate-500 mt-1">Official Mandatory Public Document • {AGA_DATA.school.board}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                  <div><strong>Certificate / Order No:</strong> <span className="font-mono text-navy-800 font-bold">{selectedDoc.fileNo}</span></div>
                  <div><strong>Date of Issuance:</strong> <span>{selectedDoc.date}</span></div>
                  <div><strong>Issued In Favor Of:</strong> <span className="font-bold text-slate-800">{AGA_DATA.school.name}</span></div>
                  <div><strong>Status &amp; Validity:</strong> <span className="text-emerald-700 font-bold">{selectedDoc.validity}</span></div>
                </div>

                <div className="text-sm text-slate-700 leading-relaxed space-y-3 mb-6 bg-white p-5 rounded-lg border border-slate-200">
                  <p><strong>Compliance Summary:</strong></p>
                  <p>{selectedDoc.summary}</p>
                  <p className="text-xs text-slate-500 leading-normal">
                    This document complies with CBSE Mandatory Public Disclosure norms under Appendix-IX for RMS World School ({AGA_DATA.school.address}).
                  </p>
                </div>

                <div className="flex justify-between items-end border-t border-slate-200 pt-4">
                  <div className="text-center">
                    <div className="w-16 h-16 border-2 border-emerald-600 text-emerald-700 rounded-full flex flex-col items-center justify-center p-1 text-[8px] font-bold uppercase rotate-[-12deg] mx-auto bg-emerald-50">
                      <span>GOVT SEAL</span>
                      <span className="text-[7px]">VERIFIED</span>
                      <span className="text-[6px]">HARYANA</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Official Registry Stamp</p>
                  </div>

                  <div className="text-right">
                    <div className="inline-block p-1 bg-white border border-slate-200 rounded mb-1">
                      <div className="w-12 h-12 bg-slate-900 flex items-center justify-center text-white text-[9px] font-mono p-1">
                        CBSE QR
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">CBSE-VERIFIED-QR</p>
                  </div>
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
                Print Official Copy
              </button>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-navy-800 text-white hover:bg-navy-700 font-semibold rounded-lg text-xs transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
