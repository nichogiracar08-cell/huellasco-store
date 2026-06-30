import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HuellasCo — Fuente Bebedero para Mascotas',
  description:
    'La fuente bebedero automática que mantiene el agua en movimiento y cuida la salud renal de tu perro o gato. Envío a toda Colombia. Garantía 30 días.',
  keywords: [
    'bebedero mascotas colombia',
    'fuente agua gatos colombia',
    'bebedero perros colombia',
    'accesorios mascotas bogota',
    'fuente automatica mascotas',
  ],
  openGraph: {
    title: 'HuellasCo — Amor que 🐾 deja huella',
    description: 'Agua fresca, limpia y en movimiento. Porque el amor también se demuestra en los detalles.',
    type: 'website',
    locale: 'es_CO',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${nunito.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
