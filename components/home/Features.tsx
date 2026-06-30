'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '🔬',
    title: 'Filtro triple de carbón activado',
    desc: 'Elimina cloro, metales pesados, pelos y residuos. Agua siempre limpia y con buen sabor para que tu mascota beba más.',
    color: 'from-cyan-50 to-blue-50',
    border: 'border-cyan-100',
    tag: 'Salud',
    tagColor: 'bg-cyan-100 text-cyan-700',
  },
  {
    icon: '🔇',
    title: 'Motor ultra silencioso',
    desc: 'Menos de 35 dB de operación. Ni tú ni tu mascota lo notarán. Funciona toda la noche sin interrumpir el descanso.',
    color: 'from-purple-50 to-indigo-50',
    border: 'border-purple-100',
    tag: 'Tranquilidad',
    tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: '💧',
    title: 'Flujo ajustable de agua',
    desc: 'Tres modos: cascada suave, burbuja o flujo corriente. Los gatos aman el movimiento del agua — perfecto para incentivar la hidratación.',
    color: 'from-teal-50 to-cyan-50',
    border: 'border-teal-100',
    tag: 'Versatilidad',
    tagColor: 'bg-teal-100 text-teal-700',
  },
  {
    icon: '🧼',
    title: 'Fácil de limpiar',
    desc: 'Diseño desmontable en 5 segundos. Todas las piezas son aptas para lavar a mano. Sin rincones difíciles.',
    color: 'from-green-50 to-emerald-50',
    border: 'border-green-100',
    tag: 'Practicidad',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    icon: '📏',
    title: 'Capacidad 2.5 litros',
    desc: 'Suficiente agua para 2-3 días sin rellenar. Ideal para hogares con múltiples mascotas o si trabajas fuera de casa.',
    color: 'from-orange-50 to-amber-50',
    border: 'border-orange-100',
    tag: 'Autonomía',
    tagColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: '✅',
    title: 'Material libre de BPA',
    desc: 'Plástico alimenticio grado médico. Sin toxinas, sin bisfenol. La salud de tu mascota es lo primero.',
    color: 'from-pink-50 to-rose-50',
    border: 'border-pink-100',
    tag: 'Seguridad',
    tagColor: 'bg-pink-100 text-pink-700',
  },
];

export default function Features() {
  return (
    <section id="beneficios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-[#0891b2] mb-3"
          >
            Por qué elegirnos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#0c4a6e]"
          >
            Todo lo que tu mascota
            <br />
            <span className="text-[#0891b2]">necesita hidratarse</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-gray-500 max-w-xl mx-auto"
          >
            Los veterinarios lo recomiendan: los animales beben más cuando el agua está en movimiento.
            Nuestra fuente los mantiene activos y saludables.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative p-7 rounded-3xl bg-gradient-to-br ${f.color} border ${f.border} hover:shadow-lg transition-shadow duration-300 group`}
            >
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-4 ${f.tagColor}`}>
                {f.tag}
              </span>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h3 className="font-bold text-base text-[#0c4a6e] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            href="#producto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0891b2] text-white font-bold hover:bg-[#0e7490] transition-all shadow-lg shadow-cyan-200 hover:-translate-y-1"
          >
            Ver el bebedero completo →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
