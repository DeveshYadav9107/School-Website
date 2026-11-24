'use client';

import React, { useState } from 'react';
import { AGA_DATA } from '@/data/academyData';
import { useToast } from '@/context/ToastContext';
import { X, Printer } from 'lucide-react';

export function ParentErpModal({ isOpen, onClose }) {
  const { showToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeReceipt, setActiveReceipt] = useState(null);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setUsername(AGA_DATA.erpDemoUser.username);
    setPassword(AGA_DATA.erpDemoUser.password);
    showToast('Demo parent credentials filled. Click "Sign In" to enter.', 'info');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      showToast('Please enter Parent ID and Password or click "Fill Demo Credentials".', 'error');
      return;
    }
    setIsLoggedIn(true);
    showToast(`Welcome back, Sharma family! Accessing ${AGA_DATA.erpDemoUser.student.name}'s records.`, 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Successfully logged out of Parent ERP.', 'info');
  };

  const handlePayFee = (term, amount) => {
    showToast(`Initiating secure payment gateway for ${amount}...`, 'info');
    setTimeout(() => {
      showToast(`Payment of ${amount} for ${term} successful! Receipt generated.`, 'success');
    }, 1200);
  };

  const stu = AGA_DATA.erpDemoUser.student;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 bg-navy-950 text-white flex justify-between items-center border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy-800 border border-gold-400 flex items-center justify-center text-gold-400 font-bold text-xs">
              ERP
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading">Aurelia Parent ERP Portal</h3>
              <p className="text-[11px] text-slate-400">Edunext Academic & Fee Management System</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="p-6 sm:p-10 flex-1 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <span className="px-3 py-1 bg-gold-100 text-gold-800 text-xs font-bold rounded-full uppercase">Demo Access Available</span>
                <h2 className="text-2xl font-bold text-navy-800 font-heading mt-2">Sign In to Parent Portal</h2>
                <p className="text-xs text-slate-500 mt-1">Access real-time attendance, quarterly fee ledger, exam marks & teacher remarks.</p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-900 block">Want to test the parent experience?</span>
                  <span className="text-amber-700 text-[11px]">Click to pre-fill test student (Aarav Sharma, Grade VIII-A)</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors flex-shrink-0"
                >
                  Fill Demo Credentials
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent User ID / Admission No *</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. aarav.sharma@parent.aga"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Portal Password *</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-navy-800 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-navy-800 hover:bg-navy-900 text-white font-bold rounded-xl text-xs transition-colors shadow"
                >
                  Sign In to Parent ERP
                </button>
              </form>

              <p className="text-[11px] text-center text-slate-400">
                For password reset assistance, contact IT Helpdesk at <span className="text-slate-600 font-medium">erp-support@aureliaglobal.edu.in</span>.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white p-5 rounded-2xl border border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={stu.avatar}
                  alt={stu.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-gold-400 shadow"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold font-heading text-white">{stu.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold-500 text-navy-950">{stu.grade}</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5 space-x-2">
                    <span>Adm No: <strong className="text-white">{stu.admissionNo}</strong></span>
                    <span>•</span>
                    <span>Roll No: <strong className="text-white">{stu.rollNo}</strong></span>
                    <span>•</span>
                    <span className="text-gold-300">{stu.house}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 bg-navy-700 hover:bg-navy-600 text-slate-200 text-xs font-semibold rounded-lg border border-navy-600 transition-colors"
              >
                Sign Out
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Year-to-Date Attendance</span>
                <div className="text-xl font-extrabold text-emerald-700 mt-1">
                  {stu.attendancePercent}% ({stu.presentDays}/{stu.totalWorkingDays} Days)
                </div>
                <span className="text-[11px] text-slate-400">Target &gt; 85% CBSE Minimum</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Mid-Term Academic GPA</span>
                <div className="text-xl font-extrabold text-navy-800 mt-1">{stu.gpa}</div>
                <span className="text-[11px] text-slate-400">Rank: 3rd in Section A</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Class Teacher Mentor</span>
                <div className="text-sm font-bold text-slate-800 mt-1">{stu.classTeacher}</div>
                <span className="text-[11px] text-slate-400">TGT Mathematics</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider">Fee Ledger 2026-27</h4>
                <span className="text-[11px] text-slate-500">Term 1, 2, 3 Paid • Term 4 Due Jan 15</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="py-2.5 px-3">Term / Installment</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Receipt Ref</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {AGA_DATA.erpDemoUser.feeHistory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{item.term}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{item.amount}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            item.status.includes('Paid') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 font-mono">{item.receiptNo}</td>
                        <td className="py-2.5 px-3 text-right">
                          {item.status.includes('Paid') ? (
                            <button
                              type="button"
                              onClick={() => setActiveReceipt({ receiptNo: item.receiptNo, term: item.term, amount: item.amount })}
                              className="text-xs font-semibold text-navy-800 hover:text-gold-600 underline"
                            >
                              View Receipt
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handlePayFee(item.term, item.amount)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors"
                            >
                              Pay Online
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider">Mid-Term Examination Scores</h4>
                <span className="text-[11px] text-emerald-700 font-semibold">Agg: 92.8% (Distinction)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="py-2 px-3">Subject</th>
                      <th className="py-2 px-3 text-center">Score (Max 100)</th>
                      <th className="py-2 px-3 text-center">CBSE Grade</th>
                      <th className="py-2 px-3">Subject Teacher</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {AGA_DATA.erpDemoUser.grades.map((g, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 font-medium text-slate-800">{g.subject}</td>
                        <td className="py-2 px-3 text-center font-bold text-navy-800">{g.midTerm} / {g.max}</td>
                        <td className="py-2 px-3 text-center font-bold text-emerald-700">{g.grade}</td>
                        <td className="py-2 px-3 text-slate-500">{g.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider">Mentor & Faculty Remarks</h4>
              <div className="space-y-3">
                {AGA_DATA.erpDemoUser.remarks.map((r, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-navy-800">{r.author}</span>
                      <span className="text-[11px] text-slate-400">{r.date}</span>
                    </div>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gold-100 text-gold-800 mb-1.5">{r.tag}</span>
                    <p className="text-xs text-slate-700 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-navy-950 text-white flex justify-between items-center no-print">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Electronic Fee Receipt</span>
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 printable-area">
              <div className="flex items-center justify-between border-b-2 border-navy-800 pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-navy-800">{AGA_DATA.school.name}</h2>
                  <p className="text-xs text-slate-500">{AGA_DATA.school.address}</p>
                  <p className="text-[11px] text-slate-500">CBSE Affiliation No: {AGA_DATA.school.affiliationNo}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">Official Receipt</span>
                  <p className="text-xs font-mono font-bold text-slate-700 mt-2">Receipt No: {activeReceipt.receiptNo}</p>
                  <p className="text-[11px] text-slate-500">Date: {new Date().toLocaleDateString('en-IN')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4">
                <div><strong>Student Name:</strong> {stu.name}</div>
                <div><strong>Admission No:</strong> {stu.admissionNo}</div>
                <div><strong>Grade & Section:</strong> {stu.grade}</div>
                <div><strong>Parent Name:</strong> Dr. Vikramaditya Sharma</div>
              </div>

              <table className="w-full text-xs border border-slate-200 mb-4">
                <thead className="bg-navy-800 text-white">
                  <tr>
                    <th className="py-2 px-3 text-left">Description</th>
                    <th className="py-2 px-3 text-right">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2 px-3">Tuition Fee ({activeReceipt.term})</td>
                    <td className="py-2 px-3 text-right font-medium">₹ 35,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Development & IT Charges</td>
                    <td className="py-2 px-3 text-right font-medium">₹ 6,500</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">GPS Transport Fee (Zone 1)</td>
                    <td className="py-2 px-3 text-right font-medium">₹ 7,000</td>
                  </tr>
                  <tr className="bg-slate-100 font-bold text-slate-900">
                    <td className="py-2.5 px-3">Total Amount Paid</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700">{activeReceipt.amount}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-xs text-slate-500">
                <div>
                  <p>Payment Mode: Digital Online Transaction (Success)</p>
                  <p className="text-[10px] text-slate-400 mt-1">Computer-generated receipt, no physical signature required.</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">Accounts Department</p>
                  <p className="text-[10px]">Aurelia Global Academy</p>
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
                Print Receipt
              </button>
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-2 bg-navy-800 text-white hover:bg-navy-700 font-semibold rounded-lg text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
