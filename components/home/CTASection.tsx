'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0891b2] via-[#0e7490] to-[#0c4a6e] relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/2 translate-y-1/2" />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${30 + i * 20}px`,
              height: `${30 + i * 20}px`,
              top: `${20 + i * 15}%`,
              right: `${5 + i * 5}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-400" />
          <span className="text-sm font-semibold text-white">Envío disponible ahora mismo</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-white leading-tight"
        >
          Dale a tu mascota
          <br />
          el regalo de hidratarse mejor
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg text-blue-100 max-w-xl mx-auto"
        >
          Únete a más de 2,400 dueños de mascotas que ya transformaron la salud de sus peludos con HuellasCo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#producto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#f97316] text-white font-bold text-lg hover:bg-[#ea580c] transition-all shadow-xl shadow-orange-900/30 hover:-translate-y-1"
          >
            Agregar al carrito
            <ArrowRight className="w-5 h-5" />
          </a>
          <div className="text-sm text-blue-200">
            ✅ Garantía 30 días · 🚚 Envío gratis · 🔒 Pago seguro
          </div>
        </motion.div>

        {/* Urgency */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30"
        >
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-sm font-medium text-amber-300">
            🔥 Más de 40 personas viendo este producto ahora
          </span>
        </motion.div>
      </div>
    </section>
  );
}
