import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/',         label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#3D2314] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#F5E6C8] flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="HuellasCo"
                  fill
                  sizes="40px"
                  className="object-contain p-1 mix-blend-multiply"
                />
              </div>
              <span className="font-black text-xl text-white group-hover:text-[#C9973A] transition-colors">
                Huellas<span className="text-[#C9973A]">Co</span>
              </span>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed mb-5">
              "Amor que 🐾 deja huella" — Productos de calidad para el bienestar de tus
              mascotas. Porque ellos se merecen lo mejor.
            </p>

            <a
              href="mailto:huellasco00@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-[#C9973A] hover:text-white transition-colors font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,12 2,6" />
              </svg>
              huellasco00@gmail.com
            </a>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9973A] transition-colors text-white/80 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#C9973A] mb-4">
              Navegación
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#C9973A] mb-4">
              Información
            </h3>
            <ul className="space-y-2.5">
              {[
                'Política de envíos',
                'Devoluciones y garantía',
                'Preguntas frecuentes',
                'Política de privacidad',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2025 HuellasCo. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span>🔒 Pago seguro</span>
            <span>·</span>
            <span>🚚 Envío a Colombia</span>
            <span>·</span>
            <span>🐾 Hecho con amor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
