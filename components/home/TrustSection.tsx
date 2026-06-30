'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Lock } from 'lucide-react';

const blocks = [
  {
    icon: <Truck className="w-7 h-7" />,
    title: 'Envío a toda Colombia',
    desc: 'Despachamos desde Bogotá a cualquier ciudad del país. Llegada estimada: 2 a 5 días hábiles.',
    detail: 'Envío gratis en pedidos desde $95.000 COP',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: 'Garantía 30 días',
    desc: 'Si el producto no cumple tus expectativas, te hacemos la devolución completa. Sin preguntas, sin complicaciones.',
    detail: '100% de reembolso garantizado',
  },
  {
    icon: <Lock className="w-7 h-7" />,
    title: 'Pago 100% seguro',
    desc: 'Tus datos están protegidos. Aceptamos tarjetas de crédito, débito, PSE y pagos en efectivo.',
    detail: 'Encriptación SSL en todos los pagos',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-[#3D2314]">
            Tu satisfacción, nuestra prioridad
          </h2>
        </motion.div>

        {/* Blocks */}
        <div className="grid sm:grid-cols-3 gap-6">
          {blocks.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.015 }}
              style={{ willChange: 'transform' }}
              className="card-shimmer flex flex-col items-center text-center p-8 rounded-xl bg-[#F5E6C8]/50 border border-[#F5E6C8] hover:border-[#C9973A]/40 hover:shadow-2xl hover:shadow-[#C9973A]/12 transition-[border-color,box-shadow] duration-300 group overflow-hidden cursor-default"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-14 h-14 rounded-2xl bg-[#C9973A]/15 flex items-center justify-center text-[#C9973A] mb-5 group-hover:bg-[#C9973A] group-hover:text-white transition-colors duration-300"
              >
                {b.icon}
              </motion.div>

              <h3 className="font-black text-[#3D2314] text-base mb-2">{b.title}</h3>
              <p className="text-sm text-[#3D2314]/65 leading-relaxed mb-3">{b.desc}</p>
              <p className="text-xs font-bold text-[#C9973A]">{b.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-2xl font-black text-[#3D2314]">
            "Amor que deja <span className="text-[#C9973A]">huella</span>"
          </p>
          <motion.a
            href="#producto"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            className="inline-flex items-center gap-2 mt-6 px-8 py-4 rounded-2xl bg-[#3D2314] text-white font-black text-base shadow-xl shadow-[#3D2314]/30 cursor-pointer"
          >
            Quiero la fuente bebedero →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
