'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#3D2314] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Desktop: 3-column grid ── */}
        <div className="hidden md:grid grid-cols-3 items-center h-20">

          {/* Left nav */}
          <nav className="flex items-center gap-8">
            <Link href="/"         className="text-sm font-semibold text-[#F5E6C8]/80 hover:text-[#F5E6C8] transition-colors">Inicio</Link>
            <Link href="/catalogo" className="text-sm font-semibold text-[#F5E6C8]/80 hover:text-[#F5E6C8] transition-colors">Catálogo</Link>
          </nav>

          {/* Center: logo + brand name */}
          <Link href="/" className="flex items-center justify-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="HuellasCo"
              width={64}
              height={64}
              className="object-contain flex-shrink-0"
              priority
            />
            <span className="font-bold text-xl text-[#F5E6C8] group-hover:text-white transition-colors tracking-tight">
              Huellas<span className="text-[#C9973A]">Co</span>
            </span>
          </Link>

          {/* Right nav + CTA */}
          <nav className="flex items-center justify-end gap-6">
            <Link href="/nosotros" className="text-sm font-semibold text-[#F5E6C8]/80 hover:text-[#F5E6C8] transition-colors">Nosotros</Link>
            <Link href="/contacto" className="text-sm font-semibold text-[#F5E6C8]/80 hover:text-[#F5E6C8] transition-colors">Contacto</Link>
            <a
              href="#producto"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#C9973A] text-white text-sm font-bold hover:bg-[#a87a2b] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Ver producto
            </a>
          </nav>
        </div>

        {/* ── Mobile: centered logo + hamburger ── */}
        <div className="md:hidden flex items-center justify-between h-20">

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Menú"
          >
            {mobileOpen
              ? <X    className="w-6 h-6 text-[#F5E6C8]" />
              : <Menu className="w-6 h-6 text-[#F5E6C8]" />
            }
          </button>

          {/* Logo centered */}
          <Link href="/" className="flex items-center gap-2.5 group absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/logo.png"
              alt="HuellasCo"
              width={40}
              height={40}
              className="object-contain flex-shrink-0"
              style={{ filter: 'brightness(0) invert(1)' }}
              priority
            />
            <span className="font-bold text-lg text-[#F5E6C8] tracking-tight">
              Huellas<span className="text-[#C9973A]">Co</span>
            </span>
          </Link>

          {/* Spacer to balance hamburger */}
          <div className="w-10" />
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden transition-all duration-200 overflow-hidden ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-[#2d1a0e] border-t border-white/10 px-4 py-5 space-y-1">
          {[
            { href: '/',          label: 'Inicio'    },
            { href: '/catalogo',  label: 'Catálogo'  },
            { href: '/nosotros',  label: 'Nosotros'  },
            { href: '/contacto',  label: 'Contacto'  },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 rounded-xl text-sm font-semibold text-[#F5E6C8]/80 hover:text-[#F5E6C8] hover:bg-white/5 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#producto"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#C9973A] text-center hover:bg-[#a87a2b] transition-colors"
          >
            Ver producto
          </a>
        </div>
      </div>
    </header>
  );
}
