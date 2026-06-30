'use client';

import { motion } from 'framer-motion';

const placeholders = [
  'Cama Ortopédica Premium',
  'Arnés Ergonómico',
  'Juguete Interactivo',
  'Rascador Moderno',
  'Correa Retráctil',
  'Kit Higiene Completo',
];

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
            Estamos curado la mejor selección de accesorios para tu mascota.
            Suscríbete para ser el primero en saber.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {placeholders.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="group relative rounded-2xl sm:rounded-3xl bg-white border-2 border-[#F5E6C8] hover:border-[#C9973A]/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Image area */}
              <div className="aspect-square bg-gradient-to-br from-[#F5E6C8] to-[#ecdcad] flex items-center justify-center relative">
                {/* Paw watermark */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
                  <PawSVG />
                </div>
                {/* Coming soon badge */}
                <div className="absolute top-3 left-3 bg-[#3D2314] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
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
                  Para tu mascota 🐾
                </p>

                {/* Notify button */}
                <button
                  disabled
                  className="mt-3 w-full py-2 rounded-xl text-xs font-bold bg-[#F5E6C8] text-[#3D2314]/60 cursor-not-allowed border border-[#F5E6C8]"
                >
                  Notificarme cuando llegue
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-[#3D2314]/60">
            ¿Quieres saber cuándo llegan?{' '}
            <a
              href="mailto:huellasco00@gmail.com"
              className="text-[#C9973A] font-bold hover:underline"
            >
              Escríbenos
            </a>{' '}
            y te avisamos primero.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PawSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="#3D2314" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="50" cy="63" rx="21" ry="19" />
      <ellipse cx="24" cy="44" rx="10" ry="8"  transform="rotate(-18 24 44)" />
      <ellipse cx="38" cy="34" rx="10" ry="8"  transform="rotate(-6  38 34)" />
      <ellipse cx="62" cy="34" rx="10" ry="8"  transform="rotate(6   62 34)" />
      <ellipse cx="76" cy="44" rx="10" ry="8"  transform="rotate(18  76 44)" />
    </svg>
  );
}
