import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://rmsworldschool.edu.in'),
  title: {
    default: 'RMS World School | CBSE Norms & Curriculum | Sulkha, Haryana',
    template: '%s | RMS World School',
  },
  description: 'RMS World School at 11th Milestone, Rewari-Shahjahanpur Road, Sulkha (Haryana) — CBSE Norms & Curriculum K-12 Institution. Admissions & Faculty Walk-In Interviews Open.',
  keywords: [
    'RMS World School',
    'CBSE School Sulkha Haryana',
    'CBSE School Rewari Shahjahanpur Road',
    'Admissions 2027-28',
    'Faculty Recruitment RMS World School',
    'Senior Secondary CBSE School Haryana',
    'K-12 Education Haryana',
  ],
  authors: [{ name: 'RMS World School' }],
  creator: 'RMS World School',
  publisher: 'RMS World School',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rmsworldschool.edu.in',
    title: 'RMS World School | CBSE Norms & Curriculum',
    description: 'Nurturing Curiosity, Shaping Character. 11th Milestone, Rewari-Shahjahanpur Road, Sulkha (Haryana).',
    siteName: 'RMS World School',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RMS World School | Sulkha, Haryana',
    description: 'Nurturing Curiosity, Shaping Character. CBSE Norms & Curriculum. Contact: +91 9728035202, +91 7988720175.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#0B2545',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-white text-slate-800 antialiased selection:bg-gold-500 selection:text-white flex flex-col min-h-screen">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
