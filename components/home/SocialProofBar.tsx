'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '2,400+', label: 'mascotas felices', icon: '🐾' },
  { value: '4.9★', label: 'calificación promedio', icon: '⭐' },
  { value: '30 días', label: 'garantía sin preguntas', icon: '🛡️' },
  { value: '98%', label: 'clientes satisfechos', icon: '💙' },
];

export default function SocialProofBar() {
  return (
    <section className="bg-[#0891b2] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-0 md:divide-x md:divide-white/20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2.5 px-6"
            >
              <span className="text-xl">{stat.icon}</span>
              <div>
                <p className="font-extrabold text-white text-base leading-none">{stat.value}</p>
                <p className="text-[11px] text-blue-100 mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
