'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    icon: '🚱',
    tag: 'El problema',
    tagColor: 'bg-red-100 text-red-700',
    title: 'El agua estática los enferma en silencio',
    desc: 'Los perros y gatos tienen un instinto ancestral: desconfían del agua quieta porque en la naturaleza podría estar contaminada. Con un tazón estático beben lo mínimo, generando deshidratación crónica y daño renal silencioso.',
    stat: '$200k–$500k',
    statLabel: 'cuesta una consulta veterinaria renal',
    accent: '#ef4444',
  },
  {
    icon: '💧',
    tag: 'La solución',
    tagColor: 'bg-[#C9973A]/15 text-[#a87a2b]',
    title: 'El movimiento activa su instinto natural',
    desc: 'La Fuente Bebedero HuellasCo mantiene el agua circulando con un flujo suave y constante. Esto activa el instinto natural de los animales y los impulsa a beber hasta 3× más agua al día, manteniendo sus riñones saludables.',
    stat: '3×',
    statLabel: 'más agua beben con la fuente vs. tazón',
    accent: '#C9973A',
  },
  {
    icon: '❤️',
    tag: 'Paz mental',
    tagColor: 'bg-green-100 text-green-700',
    title: 'Tú trabajas tranquilo. Ellos están bien.',
    desc: 'Mientras estás fuera de casa, tu mascota tiene agua fresca, filtrada y en movimiento las 24 horas. Filtro de carbón activado incluido, motor silencioso, y compatible con 110V colombiano. Todo por $95.000 COP.',
    stat: '$95.000',
    statLabel: 'COP · menos que una sola consulta',
    accent: '#22c55e',
  },
];

export default function ProblemSolution() {
  return (
    <section id="por-que" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-black uppercase tracking-widest text-[#C9973A] mb-3"
          >
            ¿Por qué importa?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3D2314] leading-tight"
          >
            Un detalle que puede cambiar<br />
            <span className="text-[#C9973A]">la salud de tu mascota</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mt-4 text-[#3D2314]/60 max-w-xl mx-auto text-base"
          >
            Los veterinarios llevan años diciendo que la principal causa de enfermedades
            renales en mascotas domésticas es la deshidratación. Y la causa de la
            deshidratación es… el agua estática.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.015 }}
              style={{ willChange: 'transform' }}
              className="card-shimmer relative flex flex-col p-7 rounded-3xl bg-[#F5E6C8]/50 border border-[#F5E6C8] hover:border-[#C9973A]/50 hover:shadow-2xl hover:shadow-[#C9973A]/12 transition-[border-color,box-shadow] duration-300 group overflow-hidden cursor-default"
            >
              {/* Tag */}
              <span className={`self-start text-xs font-bold px-3 py-1 rounded-full mb-5 ${c.tagColor}`}>
                {c.tag}
              </span>

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: [-4, 4, 0] }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl mb-4 inline-block"
              >
                {c.icon}
              </motion.div>

              {/* Text */}
              <h3 className="font-black text-base text-[#3D2314] mb-2 leading-tight">
                {c.title}
              </h3>
              <p className="text-sm text-[#3D2314]/65 leading-relaxed flex-1">
                {c.desc}
              </p>

              {/* Stat */}
              <div className="mt-5 pt-5 border-t border-[#3D2314]/10">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-2xl font-black"
                  style={{ color: c.accent }}
                >
                  {c.stat}
                </motion.p>
                <p className="text-xs text-[#3D2314]/50 mt-0.5 font-semibold">
                  {c.statLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
