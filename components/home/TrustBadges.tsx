'use client';

import { motion } from 'framer-motion';

const badges = [
  { icon: '🔒', title: 'Pago 100% Seguro', desc: 'SSL encriptado · Visa, MC, AMEX' },
  { icon: '🚚', title: 'Envío Gratis', desc: 'En pedidos mayores a $699' },
  { icon: '🛡️', title: 'Garantía 30 días', desc: 'Devolución sin preguntas' },
  { icon: '🎁', title: 'Empaque Premium', desc: 'Listo para regalar' },
];

export default function TrustBadges() {
  return (
    <section className="py-14 bg-[#0c4a6e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-2.5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span className="text-3xl">{b.icon}</span>
              <p className="font-bold text-white text-sm">{b.title}</p>
              <p className="text-xs text-blue-200">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
