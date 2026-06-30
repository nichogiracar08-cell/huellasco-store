'use client';

import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const placeholders = [
  { name: 'Cama Ortopédica Premium',  icon: '🛏️', color: 'from-[#F5E6C8] to-[#ecdcad]' },
  { name: 'Arnés Ergonómico',          icon: '🦺', color: 'from-[#fce8d5] to-[#f5d4b0]' },
  { name: 'Juguete Interactivo',       icon: '🎾', color: 'from-[#e8f0e8] to-[#d4e8d4]' },
  { name: 'Rascador Moderno',          icon: '🐱', color: 'from-[#F5E6C8] to-[#ecdcad]' },
  { name: 'Correa Retráctil',          icon: '🐕', color: 'from-[#fce8d5] to-[#f5d4b0]' },
  { name: 'Kit Higiene Completo',      icon: '✨', color: 'from-[#eee8f5] to-[#ddd4f0]' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function CatalogSection() {
  return (
    <section id="catalogo" className="py-20 bg-[#F5E6C8]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-black uppercase tracking-widest text-[#C9973A] mb-3"
          >
            Nuestro catálogo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl font-black text-[#3D2314] leading-tight"
          >
            Más productos en camino
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mt-3 text-[#3D2314]/60 max-w-md mx-auto"
          >
            Estamos curando la mejor selección de accesorios para tu mascota.
            Suscríbete para ser el primero en saber.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          {placeholders.map(({ name, icon, color }) => (
            <motion.div
              key={name}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="card-shimmer group relative rounded-2xl sm:rounded-3xl bg-white border-2 border-[#F5E6C8] hover:border-[#C9973A]/50 hover:shadow-2xl hover:shadow-[#C9973A]/15 transition-[border-color,box-shadow] duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image area */}
              <div className={`aspect-square bg-gradient-to-br ${color} flex flex-col items-center justify-center relative overflow-hidden`}>
                {/* Background paw watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                  <PawSVG />
                </div>

                {/* Product icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.4 }}
                  className="text-5xl sm:text-6xl relative z-10 drop-shadow-sm"
                >
                  {icon}
                </motion.div>

                {/* Coming soon badge */}
                <div className="absolute top-3 left-3 bg-[#3D2314] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                  Próximamente
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-xs font-black text-[#C9973A] uppercase tracking-wide mb-1">
                  Nuevo producto
                </p>
                <p className="text-sm font-bold text-[#3D2314] leading-snug">
                  {name}
                </p>
                <p className="text-xs text-[#3D2314]/50 mt-1.5 leading-relaxed">
                  Para tu mascota
                </p>

                {/* Notify button */}
                <motion.button
                  disabled
                  whileHover={{ scale: 1.02 }}
                  className="mt-3 w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-[#F5E6C8] text-[#3D2314]/60 cursor-not-allowed border border-[#e8d49a]"
                >
                  <Bell className="w-3 h-3" />
                  Notificarme cuando llegue
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-[#3D2314]/60">
            ¿Quieres saber cuándo llegan?{' '}
            <motion.a
              href="mailto:huellasco00@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="text-[#C9973A] font-bold hover:underline inline-block"
            >
              Escríbenos
            </motion.a>{' '}
            y te avisamos primero.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PawSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="#3D2314" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24">
      <ellipse cx="50" cy="63" rx="21" ry="19" />
      <ellipse cx="24" cy="44" rx="10" ry="8"  transform="rotate(-18 24 44)" />
      <ellipse cx="38" cy="34" rx="10" ry="8"  transform="rotate(-6  38 34)" />
      <ellipse cx="62" cy="34" rx="10" ry="8"  transform="rotate(6   62 34)" />
      <ellipse cx="76" cy="44" rx="10" ry="8"  transform="rotate(18  76 44)" />
    </svg>
  );
}
