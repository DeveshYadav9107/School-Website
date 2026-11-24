import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Aurelia Global Academy | CBSE Affiliated K-12 Institution | Gurugram, India',
  description: 'Aurelia Global Academy is a premier CBSE affiliated K-12 school in Gurugram, India (Affiliation No. 531849). Admissions open for academic session 2027-28.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-white text-slate-800 antialiased selection:bg-gold-500 selection:text-white flex flex-col min-h-screen">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
