'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/shopify/types';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, duration: 0.55, ease: EASE },
  }),
};

const benefits = [
  'Agua en movimiento constante — activa el instinto de hidratación',
  'Filtración triple — elimina cloro, pelos y residuos',
  'Ultra silencioso — menos de 35 dB, no interrumpe el descanso',
  '110V / 60Hz — compatible con voltaje colombiano',
];

/* Paw positions scattered across the hero background */
const pawPositions = [
  { top: '8%',  left: '5%',  size: 36, delay: '0s',    rot: -15 },
  { top: '22%', left: '2%',  size: 22, delay: '0.6s',  rot: 10  },
  { top: '55%', left: '4%',  size: 28, delay: '1.4s',  rot: -8  },
  { top: '78%', left: '7%',  size: 18, delay: '2s',    rot: 20  },
  { top: '6%',  left: '88%', size: 24, delay: '0.3s',  rot: 12  },
  { top: '35%', left: '93%', size: 20, delay: '1s',    rot: -20 },
  { top: '68%', left: '90%', size: 30, delay: '1.8s',  rot: 5   },
  { top: '88%', left: '85%', size: 16, delay: '0.9s',  rot: -10 },
  { top: '42%', left: '50%', size: 14, delay: '1.2s',  rot: 30  },
  { top: '15%', left: '40%', size: 12, delay: '2.2s',  rot: -25 },
];

interface Props {
  product: Product | null;
}

export default function Hero({ product }: Props) {
  const productImage = product?.featuredImage?.url ?? product?.images?.nodes[0]?.url ?? null;
  const productTitle = product?.title ?? 'Fuente Bebedero HuellasCo';

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#F5E6C8] via-[#f0deb4] to-[#EDD9A3]">

      {/* Paw texture layer — opacity 5% */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {pawPositions.map((p, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              opacity: 0.05,
              transform: `rotate(${p.rot}deg)`,
            }}
          >
            <PawSVG color="#3D2314" />
          </div>
        ))}
        {/* Soft background glows */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#C9973A]/12 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#3D2314]/6 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 w-full">

        {/* ── LEFT: Copy ── */}
        <div>
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9973A]/20 border border-[#C9973A]/40 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#C9973A] animate-pulse" />
            <span className="text-sm font-bold text-[#C9973A]">Nuevo en Colombia 🇨🇴</span>
          </motion.div>

          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#3D2314] leading-[1.08] tracking-tight"
          >
            Tú trabajas todo el día.
            <br />
            <span className="relative inline-block mt-1">
              <span className="text-[#C9973A]">Dale agua que lo cuide.</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none">
                <path d="M2 7C80 2 220 2 298 7" stroke="#3D2314" strokeWidth="2.5" strokeLinecap="round" opacity="0.25"/>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="mt-6 text-base sm:text-lg text-[#3D2314]/70 leading-relaxed max-w-lg"
          >
            Tu mascota te espera sola en casa. La{' '}
            <strong className="text-[#3D2314] font-bold">Fuente Bebedero HuellasCo</strong>{' '}
            mantiene el agua en movimiento constante, activa su instinto de hidratación y
            cuida sus riñones — todo por <strong className="text-[#C9973A]">$95.000 COP</strong>,{' '}
            menos que una sola consulta veterinaria.
          </motion.p>

          <motion.ul
            custom={3} variants={fadeUp} initial="hidden" animate="show"
            className="mt-6 space-y-2.5"
          >
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-[#3D2314]/80">
                <CheckCircle2 className="w-4 h-4 text-[#C9973A] flex-shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </motion.ul>

          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="show"
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#producto"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#C9973A] text-white font-bold text-base hover:bg-[#a87a2b] transition-all shadow-xl shadow-[#C9973A]/30 hover:shadow-[#C9973A]/40 hover:-translate-y-1 active:translate-y-0"
            >
              Ver producto
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#por-que"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-[#3D2314]/20 text-[#3D2314] font-bold text-base hover:border-[#C9973A] hover:text-[#C9973A] transition-all"
            >
              ¿Por qué importa?
            </a>
          </motion.div>

          <motion.p
            custom={5} variants={fadeUp} initial="hidden" animate="show"
            className="mt-5 text-xs text-[#3D2314]/50 flex items-center gap-1.5"
          >
            <span>🛡️</span> Garantía de devolución 30 días · Envío a toda Colombia · Pago 100% seguro
          </motion.p>
        </div>

        {/* ── RIGHT: Product card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="relative flex justify-center items-center py-12 lg:py-16"
        >
          {/* Glow ring behind card */}
          <div className="absolute w-[420px] h-[420px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#C9973A]/15 blur-2xl animate-pulse" />

          {/* Product card */}
          <div className="relative z-10 w-full max-w-[440px] animate-float">

            {/* Main image */}
            <div className="relative w-full min-h-[400px] lg:min-h-[460px] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#F5E6C8] to-[#e8d49a] shadow-2xl shadow-[#3D2314]/25 border-2 border-[#C9973A]/30">
              {productImage ? (
                <Image
                  src={productImage}
                  alt={productTitle}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 440px, 440px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="text-8xl mb-4">💧</div>
                  <p className="text-xl font-black text-[#3D2314]">Fuente Bebedero</p>
                  <p className="text-sm text-[#3D2314]/60 mt-1 font-semibold">HuellasCo · 2.5L</p>
                </div>
              )}

              {/* Price overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3D2314]/85 via-[#3D2314]/40 to-transparent p-5 pt-12">
                <p className="text-white font-black text-2xl drop-shadow">$95.000 COP</p>
                <p className="text-white/70 text-sm font-semibold mt-0.5 truncate">{productTitle}</p>
              </div>
            </div>

            {/* Badge — Garantía (top right) */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
              className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-[#F5E6C8]"
            >
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="text-xs font-black text-[#3D2314] leading-tight">Garantía 30 días</p>
                <p className="text-[10px] text-[#3D2314]/50 mt-0.5">Sin preguntas</p>
              </div>
            </motion.div>

            {/* Badge — Envío (bottom left) */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5, ease: EASE }}
              className="absolute -bottom-5 -left-5 bg-[#3D2314] rounded-2xl shadow-xl px-4 py-3 text-white"
            >
              <p className="text-xs font-black">🚚 Envío a Colombia</p>
              <p className="text-[10px] opacity-70 mt-0.5">2-5 días hábiles</p>
            </motion.div>

            {/* Badge — vs. vet (right middle) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5, ease: EASE }}
              className="absolute top-1/2 -right-6 -translate-y-1/2 bg-[#C9973A] rounded-2xl shadow-xl px-4 py-3 text-white"
            >
              <p className="text-[10px] font-bold opacity-90 leading-tight">vs. consulta vet.</p>
              <p className="text-sm font-black">$200k–$500k</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#3D2314]/40">
        <span className="text-[10px] font-bold uppercase tracking-widest">Descubrir</span>
        <div className="w-6 h-10 rounded-full border-2 border-[#3D2314]/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-[#C9973A] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function PawSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="50" cy="63" rx="21" ry="19" />
      <ellipse cx="24" cy="44" rx="10" ry="8"  transform="rotate(-18 24 44)" />
      <ellipse cx="38" cy="34" rx="10" ry="8"  transform="rotate(-6  38 34)" />
      <ellipse cx="62" cy="34" rx="10" ry="8"  transform="rotate(6   62 34)" />
      <ellipse cx="76" cy="44" rx="10" ry="8"  transform="rotate(18  76 44)" />
    </svg>
  );
}
