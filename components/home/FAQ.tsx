'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: '¿Para qué tipo de mascotas es adecuada?',
    a: 'Es perfecta para gatos y perros de cualquier tamaño. La altura del recipiente y la corriente de agua son cómodas tanto para razas pequeñas como grandes. Muchos clientes la usan para múltiples mascotas al mismo tiempo.',
  },
  {
    q: '¿Con qué frecuencia debo cambiar el filtro?',
    a: 'Recomendamos cambiar el filtro cada 30 días con uso normal (1-2 mascotas). Si tienes 3 o más mascotas, cada 15-20 días. El filtro viene incluido y los repuestos están disponibles en nuestra tienda.',
  },
  {
    q: '¿Es realmente silenciosa?',
    a: 'Sí. La bomba trabaja a menos de 35 dB, que es similar al sonido de una biblioteca. La mayoría de nuestros clientes dice que no la escuchan ni en silencio total. Si tu bebedero hace ruido excesivo, contáctanos — lo resolvemos.',
  },
  {
    q: '¿Qué pasa si no le gusta a mi mascota?',
    a: 'Ofrecemos garantía de satisfacción de 30 días sin preguntas. Si tu mascota no se adapta al bebedero, te devolvemos el dinero completo. No pedimos razones ni explicaciones.',
  },
  {
    q: '¿Cuánto tiempo tarda en llegar?',
    a: 'Enviamos a todo México. Ciudades principales (CDMX, GDL, MTY): 1-3 días hábiles. Interior del país: 3-5 días hábiles. Recibirás un número de rastreo por email cuando salga tu pedido.',
  },
  {
    q: '¿Cuánta electricidad consume?',
    a: 'El consumo es mínimo: aproximadamente 2.5W, similar a una bombilla LED pequeña. Funcionar las 24 horas cuesta menos de $5 al mes en tu recibo de luz.',
  },
  {
    q: '¿Se puede usar con agua de filtro o solo embotellada?',
    a: 'Puedes usar agua de la llave, de filtro o embotellada. El filtro de carbón activado hace un trabajo adicional de purificación. Lo que sí recomendamos es limpiar el recipiente 1-2 veces por semana.',
  },
  {
    q: '¿Qué incluye el paquete?',
    a: 'Incluye: 1 fuente bebedero, 1 bomba de agua silenciosa, 1 filtro de carbón activado (dura ~30 días), cable USB tipo-C, y manual de instalación. Todo lo necesario para empezar el primer día.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-[#0891b2] mb-3"
          >
            Preguntas frecuentes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-extrabold text-[#0c4a6e]"
          >
            Resolvemos tus dudas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-gray-500"
          >
            Si tienes alguna pregunta adicional, escríbenos al chat o a nuestro email.
          </motion.p>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#f0f9ff] transition-colors"
              >
                <span className="font-semibold text-sm text-[#0c4a6e] pr-4">{faq.q}</span>
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0891b2]/10 flex items-center justify-center">
                  {open === i ? (
                    <Minus className="w-3.5 h-3.5 text-[#0891b2]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-[#0891b2]" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center p-6 rounded-3xl bg-[#f0f9ff] border border-[#0891b2]/10"
        >
          <p className="text-[#0c4a6e] font-semibold">¿Tienes otra pregunta?</p>
          <p className="text-sm text-gray-500 mt-1">Respondemos en menos de 2 horas en días hábiles.</p>
          <a
            href="mailto:hola@huellasco.mx"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-[#0891b2] text-white text-sm font-semibold hover:bg-[#0e7490] transition-colors"
          >
            ✉️ Contáctanos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
