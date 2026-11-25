import React from 'react';

export function Emblem({ className = 'w-12 h-12' }) {
  return (
    <div className={`${className} relative drop-shadow-md flex items-center justify-center`}>
      <svg viewBox="0 0 100 106" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="rmsShieldGrad" x1="15%" y1="5%" x2="85%" y2="95%">
            <stop offset="0%" stopColor="#122F5D" />
            <stop offset="55%" stopColor="#0B2545" />
            <stop offset="100%" stopColor="#071A33" />
          </linearGradient>
          <linearGradient id="rmsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E3C68A" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#A07B36" />
          </linearGradient>
        </defs>

        {/* Outer Classic Shield in Dark Navy (#0B2545) & Antique Gold (#C5A059) */}
        <path
          d="M50 4 L88 15 V48 C88 73 50 93 50 93 C50 93 12 73 12 48 V15 L50 4 Z"
          fill="url(#rmsShieldGrad)"
          stroke="url(#rmsGoldGrad)"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Inner Fine Crest Border */}
        <path
          d="M50 9.5 L82.5 19 V47.5 C82.5 68.5 50 86.5 50 86.5 C50 86.5 17.5 68.5 17.5 47.5 V19 L50 9.5 Z"
          stroke="#C5A059"
          strokeWidth="1"
          strokeOpacity="0.65"
          fill="none"
        />

        {/* 5 Small Stars Arching Above the Open Book */}
        {/* Leftmost Star */}
        <polygon points="27,22 28.1,24.4 30.7,24.7 28.8,26.5 29.3,29.1 27,27.8 24.7,29.1 25.2,26.5 23.3,24.7 25.9,24.4" fill="#E3C68A" />
        {/* Inner Left Star */}
        <polygon points="38,18.5 39.1,20.9 41.7,21.2 39.8,23 40.3,25.6 38,24.3 35.7,25.6 36.2,23 34.3,21.2 36.9,20.9" fill="#E3C68A" />
        {/* Center Apex Star */}
        <polygon points="50,15.5 51.2,18.2 54.1,18.5 51.9,20.5 52.5,23.4 50,21.9 47.5,23.4 48.1,20.5 45.9,18.5 48.8,18.2" fill="#F7EED9" />
        {/* Inner Right Star */}
        <polygon points="62,18.5 63.1,20.9 65.7,21.2 63.8,23 64.3,25.6 62,24.3 59.7,25.6 60.2,23 58.3,21.2 60.9,20.9" fill="#E3C68A" />
        {/* Rightmost Star */}
        <polygon points="73,22 74.1,24.4 76.7,24.7 74.8,26.5 75.3,29.1 73,27.8 70.7,29.1 71.2,26.5 69.3,24.7 71.9,24.4" fill="#E3C68A" />

        {/* Open Book Directly Under the 5 Stars */}
        <path
          d="M50 35.5 C44 31 35 30.5 28 32.5 V45 C35 43.2 44 43.8 50 48 C56 43.8 65 43.2 72 45 V32.5 C65 30.5 56 31 50 35.5 Z"
          fill="#FFFFFF"
          stroke="#C5A059"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Book Center Spine & Page Lines */}
        <path d="M50 35.5 V48" stroke="#0B2545" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M32 36.5 Q39 35.5 46 38 M32 40.5 Q39 39.5 46 42" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
        <path d="M68 36.5 Q61 35.5 54 38 M68 40.5 Q61 39.5 54 42" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" opacity="0.85" />

        {/* Subtle Gold Accent Divider Line */}
        <line x1="27" y1="52" x2="73" y2="52" stroke="#C5A059" strokeWidth="0.9" strokeOpacity="0.6" />

        {/* Bold Serif "RMS" Lettering Inside the Shield */}
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fill="url(#rmsGoldGrad)"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="900"
          fontSize="21.5"
          letterSpacing="1.8"
        >
          RMS
        </text>

        {/* Gold Ribbon Banner Folded Back Ends at Base */}
        <path d="M7 83 L20 81 V94 L11 94 L14.5 88.5 Z" fill="#85662D" />
        <path d="M93 83 L80 81 V94 L89 94 L85.5 88.5 Z" fill="#85662D" />

        {/* Main Curved Gold Ribbon Banner at Base */}
        <path
          d="M17 79 Q50 85 83 79 L83 92 Q50 98 17 92 Z"
          fill="url(#rmsGoldGrad)"
          stroke="#0B2545"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Ribbon Inner Highlight & Lettering */}
        <text
          x="50"
          y="89.5"
          textAnchor="middle"
          fill="#0B2545"
          fontFamily="sans-serif"
          fontWeight="800"
          fontSize="6.7"
          letterSpacing="1"
        >
          WORLD SCHOOL
        </text>
      </svg>
    </div>
  );
}
