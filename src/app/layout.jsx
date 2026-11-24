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
  metadataBase: new URL('https://aureliaglobal.edu.in'),
  title: {
    default: 'Aurelia Global Academy | Premier CBSE K-12 Institution | Gurugram, India',
    template: '%s | Aurelia Global Academy',
  },
  description: 'Aurelia Global Academy is a premier CBSE affiliated Senior Secondary school (Affiliation No. 531849) located in Sector 48, Gurugram. Admissions now open for academic session 2027-28.',
  keywords: [
    'Aurelia Global Academy',
    'CBSE School Gurugram',
    'Best School in Gurgaon',
    'Admissions 2027-28',
    'Senior Secondary CBSE School',
    'K-12 Education Gurugram',
    'STEM School Haryana',
  ],
  authors: [{ name: 'Aurelia Global Academy' }],
  creator: 'Aurelia Global Academy',
  publisher: 'Aurelia Global Academy',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aureliaglobal.edu.in',
    title: 'Aurelia Global Academy | Premier CBSE K-12 Institution',
    description: 'Nurturing Curiosity, Shaping Character. Admissions Open for 2027-28. CBSE Affiliation No. 531849.',
    siteName: 'Aurelia Global Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurelia Global Academy | Gurugram',
    description: 'Nurturing Curiosity, Shaping Character. CBSE Affiliation No. 531849. Admissions Open 2027-28.',
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
  themeColor: '#0F2547',
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
