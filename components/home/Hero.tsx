'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/shopify/types';

const FALLBACK_HERO_IMAGE =
  'https://cdn.shopify.com/s/files/1/0827/0872/5976/files/1774735931photo_5186116145013000977_y-removebg-preview.png?v=1782766914';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SPRING = { type: 'spring', stiffness: 400, damping: 17 } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, duration: 0.58, ease: EASE },
  }),
};

const benefits = [
  'Agua en movimiento constante — activa el instinto de hidratación',
  'Filtración triple — elimina cloro, pelos y residuos',
  'Ultra silencioso — menos de 35 dB, no interrumpe el descanso',
  '110V / 60Hz — compatible con voltaje colombiano',
];

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
  const productImage =
    product?.featuredImage?.url ??
    product?.images?.nodes[0]?.url ??
    FALLBACK_HERO_IMAGE;
  const productTitle = product?.title ?? 'Fuente Bebedero HuellasCo';

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#F5E6C8] via-[#f0deb4] to-[#EDD9A3] overflow-hidden">

      {/* Animated background orbs for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-orb absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-[#C9973A]/14 blur-3xl" />
        <div className="animate-orb-slow absolute bottom-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#3D2314]/7 blur-3xl" />
        <div className="animate-orb absolute top-[50%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#C9973A]/8 blur-3xl" />
      </div>

      {/* Paw texture layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {pawPositions.map((p, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: p.top, left: p.left,
              width: p.size, height: p.size,
              animationDelay: p.delay,
              opacity: 0.055,
              transform: `rotate(${p.rot}deg)`,
            }}
          >
            <PawSVG color="#3D2314" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 w-full">

        {/* ── LEFT: Copy ── */}
        <div>
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9973A]/20 border border-[#C9973A]/40 mb-7 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
            <span className="text-sm font-bold text-[#C9973A]">Nuevo en Colombia 🇨🇴</span>
          </motion.div>

          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="text-5xl sm:text-6xl lg:text-[4.25rem] font-black text-[#3D2314] leading-[1.04] tracking-tight"
          >
            Tú trabajas<br />
            todo el día.
            <br />
            <span className="relative inline-block mt-2">
              <span className="text-[#C9973A]">Dale agua</span>
              <span className="text-[#3D2314]"> que lo cuide.</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 420 10" fill="none">
                <path d="M2 7C120 2 300 2 418 7" stroke="#C9973A" strokeWidth="2.5" strokeLinecap="round" opacity="0.35"/>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="mt-7 text-base sm:text-lg text-[#3D2314]/70 leading-relaxed max-w-lg"
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
            className="mt-9 flex flex-wrap gap-4"
          >
            {/* Primary CTA — spring hover + tap + attention glow */}
            <motion.a
              href="#producto"
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={SPRING}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#C9973A] text-white font-bold text-base shadow-xl shadow-[#C9973A]/35 animate-glow cursor-pointer"
            >
              Ver producto
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#por-que"
              whileHover={{ scale: 1.04, borderColor: '#C9973A', color: '#C9973A' }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-[#3D2314]/20 text-[#3D2314] font-bold text-base cursor-pointer"
            >
              ¿Por qué importa?
            </motion.a>
          </motion.div>

          <motion.p
            custom={5} variants={fadeUp} initial="hidden" animate="show"
            className="mt-5 text-xs text-[#3D2314]/50 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9973A]" />
            Garantía 30 días · Envío a toda Colombia · Pago 100% seguro
          </motion.p>
        </div>

        {/* ── RIGHT: Product card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
          className="relative flex justify-center items-center py-12 lg:py-16"
        >
          {/* Layered glow rings */}
          <div className="absolute w-[440px] h-[440px] lg:w-[520px] lg:h-[520px] rounded-full bg-[#C9973A]/12 blur-3xl animate-pulse" />
          <div className="absolute w-[320px] h-[320px] lg:w-[380px] lg:h-[380px] rounded-full bg-[#C9973A]/8 blur-2xl" />

          {/* Product card */}
          <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            className="relative z-10 w-full max-w-[440px] animate-float cursor-pointer"
          >
            {/* Main image */}
            <div className="relative w-full min-h-[400px] lg:min-h-[470px] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#F5E6C8] to-[#e8d49a] shadow-2xl shadow-[#3D2314]/25 border-2 border-[#C9973A]/30">
              <Image
                src={productImage}
                alt={productTitle}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 440px, 440px"
                className="object-cover object-center"
                priority
              />

              {/* Price overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3D2314]/90 via-[#3D2314]/45 to-transparent p-5 pt-14">
                <p className="text-white font-black text-2xl drop-shadow">$95.000 COP</p>
                <p className="text-white/70 text-sm font-semibold mt-0.5 truncate">{productTitle}</p>
              </div>
            </div>

            {/* Badge — Garantía (top right) */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
              whileHover={{ scale: 1.06 }}
              className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-[#F5E6C8]"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
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
              whileHover={{ scale: 1.06 }}
              className="absolute -bottom-5 -left-5 bg-[#3D2314] rounded-2xl shadow-xl px-4 py-3 text-white"
            >
              <p className="text-xs font-black">Envío a Colombia</p>
              <p className="text-[10px] opacity-70 mt-0.5">2-5 días hábiles</p>
            </motion.div>

            {/* Badge — vs. vet (right middle) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5, ease: EASE }}
              whileHover={{ scale: 1.06 }}
              className="absolute top-1/2 -right-7 -translate-y-1/2 bg-[#C9973A] rounded-2xl shadow-xl px-4 py-3 text-white"
            >
              <p className="text-[10px] font-bold opacity-90 leading-tight">vs. consulta vet.</p>
              <p className="text-sm font-black">$200k–$500k</p>
            </motion.div>
          </motion.div>
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
