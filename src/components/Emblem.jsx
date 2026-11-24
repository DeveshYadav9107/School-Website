import React from 'react';

export function Emblem({ className = "w-12 h-12" }) {
  return (
    <div className={`${className} relative drop-shadow-md`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50 4 L88 20 V52 C88 76 50 96 50 96 C50 96 12 76 12 52 V20 L50 4Z" fill="#0F2547" stroke="#D99B26" strokeWidth="3"/>
        <path d="M50 10 L82 24 V50 C82 70 50 88 50 88 C50 88 18 70 18 50 V24 L50 10Z" fill="#0A1830" stroke="#D99B26" strokeWidth="1.2" strokeDasharray="2 2"/>
        <circle cx="50" cy="30" r="10" fill="#D99B26"/>
        <path d="M50 14 V18 M38 18 L41 21 M62 18 L59 21 M34 30 H38 M62 30 H66" stroke="#FAF3DD" strokeWidth="2" strokeLinecap="round"/>
        <path d="M26 40 C28 44 26 50 24 54 C26 58 28 62 32 66" stroke="#D99B26" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="25" cy="42" r="2" fill="#D99B26"/>
        <circle cx="23" cy="50" r="2" fill="#D99B26"/>
        <circle cx="28" cy="60" r="2" fill="#D99B26"/>
        <path d="M74 40 C72 44 74 50 76 54 C74 58 72 62 68 66" stroke="#D99B26" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="75" cy="42" r="2" fill="#D99B26"/>
        <circle cx="77" cy="50" r="2" fill="#D99B26"/>
        <circle cx="72" cy="60" r="2" fill="#D99B26"/>
        <path d="M34 52 C42 48 48 50 50 54 C52 50 58 48 66 52 V68 C58 64 52 66 50 70 C48 66 42 64 34 68 Z" fill="#FFFFFF" stroke="#0F2547" strokeWidth="1.5"/>
        <path d="M50 54 V70" stroke="#D99B26" strokeWidth="2"/>
        <polygon points="50,78 52,83 57,83 53,86 55,91 50,88 45,91 47,86 43,83 48,83" fill="#D99B26"/>
      </svg>
    </div>
  );
}
