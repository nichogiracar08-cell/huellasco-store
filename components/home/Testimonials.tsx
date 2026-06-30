'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Laura M.',
    pet: 'Mamá de Mochi 🐈',
    rating: 5,
    text: '¡Mi gata Mochi literalmente no se separa de la fuente! Antes apenas bebía agua, ahora la veo tomando constantemente. El veterinario me dijo que sus riñones están mucho mejor. 100% recomendado.',
    date: 'Hace 3 días',
    verified: true,
  },
  {
    name: 'Carlos R.',
    pet: 'Papá de Bruno 🐕',
    rating: 5,
    text: 'Tengo dos perros golden y esta fuente aguanta perfectamente. El sonido es mínimo, no escucho nada desde mi cuarto. La instalación fue facilísima, en 5 minutos lista.',
    date: 'Hace 1 semana',
    verified: true,
  },
  {
    name: 'Sofía G.',
    pet: 'Mamá de Luna y Thor 🐾',
    rating: 5,
    text: 'Lo que más me gustó fue lo fácil que es de limpiar. Con mi gato anterior usaba un bebedero normal y siempre terminaba lleno de babas. Este lo desarmo, lavo todo en 2 minutos y listo.',
    date: 'Hace 2 semanas',
    verified: true,
  },
  {
    name: 'Andrés P.',
    pet: 'Papá de Kira 🐈',
    rating: 5,
    text: 'El diseño es elegante, combina perfecto con mi cocina. Mi esposa que era escéptica ahora es la que más lo cuida jaja. Y Kira bebe el doble que antes.',
    date: 'Hace 3 semanas',
    verified: true,
  },
  {
    name: 'Valeria T.',
    pet: 'Mamá de Coco 🐶',
    rating: 5,
    text: 'Coco tenía problemas urinarios y el vet me recomendó que bebiera más agua. Después de una semana con la fuente ya era otro perro. Vale cada peso que cuesta, de verdad.',
    date: 'Hace 1 mes',
    verified: true,
  },
  {
    name: 'Diego F.',
    pet: 'Papá de Max y Lola 🐕🐕',
    rating: 5,
    text: 'Pedí con algo de duda pero llegó super bien empacado y en 3 días. Lo armé, lo llené y mis perritos se acercaron solos al ver el agua moverse. El servicio al cliente también excelente.',
    date: 'Hace 1 mes',
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section id="resenas" className="py-24 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-[#0891b2] mb-3"
          >
            Opiniones reales
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold text-[#0c4a6e]"
          >
            Lo que dicen nuestros
            <br />
            <span className="text-[#0891b2]">clientes felices</span>
          </motion.h2>
          {/* Aggregate rating */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-5"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-[#0c4a6e] text-lg">4.9</span>
            <span className="text-gray-500 text-sm">· 847 reseñas verificadas</span>
          </motion.div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-700 leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[#0c4a6e]">{r.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.pet}</p>
                </div>
                <div className="text-right">
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Verificado
                    </span>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">{r.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more indicator */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">Mostrando 6 de 847 reseñas</p>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-6 bg-[#0891b2]' : 'w-1.5 bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
