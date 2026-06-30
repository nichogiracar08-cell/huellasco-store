'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  CheckCircle2, Droplets, Volume2, Timer, Zap, Maximize,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { Product, ShopifyImage } from '@/lib/shopify/types';

interface Props {
  product: Product | null;
}

const FALLBACK_IMAGES: ShopifyImage[] = [
  {
    url: 'https://cdn.shopify.com/s/files/1/0827/0872/5976/files/1774735931photo_5186116145013000977_y-removebg-preview.png?v=1782766914',
    altText: 'Fuente Bebedero HuellasCo — sin fondo',
    width: 832, height: 832,
  },
  {
    url: 'https://cdn.shopify.com/s/files/1/0827/0872/5976/files/ChatGPT_Image_Jun_29_2026_04_02_13_PM.png?v=1782766940',
    altText: 'Fuente Bebedero HuellasCo — vista general',
    width: 832, height: 832,
  },
  {
    url: 'https://cdn.shopify.com/s/files/1/0827/0872/5976/files/fg.png?v=1782766966',
    altText: 'Fuente Bebedero HuellasCo — detalle',
    width: 832, height: 832,
  },
];

const features = [
  { icon: <Droplets className="w-4 h-4" />, text: 'Filtro de carbón activado — agua limpia y sin olores' },
  { icon: <Volume2  className="w-4 h-4" />, text: 'Motor ultra silencioso — menos de 35 dB de operación' },
  { icon: <Timer    className="w-4 h-4" />, text: 'Filtro dura 4–6 semanas — repuesto fácil de conseguir' },
  { icon: <Zap      className="w-4 h-4" />, text: '110V / 60Hz — funciona con voltaje colombiano' },
  { icon: <Maximize className="w-4 h-4" />, text: '2.5L de capacidad — para perros y gatos de todos los tamaños' },
];

const objections = [
  { q: '¿Es fácil de limpiar?',   a: 'Sí. Se desmonta en 5 piezas y se lava a mano en minutos. Sin rincones difíciles.' },
  { q: '¿Hace ruido?',             a: 'No. El motor opera a menos de 35 dB — más silencioso que un susurro.' },
  { q: '¿Cuánto dura el filtro?',  a: '4 a 6 semanas. Los filtros de repuesto son económicos y fáciles de conseguir.' },
  { q: '¿Voltaje colombiano?',     a: 'Sí. Funciona perfectamente con 110V / 60Hz. No necesitas adaptador.' },
];

function formatCOP(amount: string): string {
  return '$' + Math.round(parseFloat(amount)).toLocaleString('es-CO');
}

function getDiscount(price: string, compareAt: string): number {
  const p = parseFloat(price);
  const c = parseFloat(compareAt);
  return c > p ? Math.round(((c - p) / c) * 100) : 0;
}

export default function FeaturedProduct({ product }: Props) {
  const images     = (product?.images.nodes ?? []).length > 0
    ? product!.images.nodes
    : FALLBACK_IMAGES;
  const variant    = product?.variants.nodes[0];
  const [active, setActive] = useState(0);

  const price         = variant?.price.amount ?? '95000';
  const currency      = variant?.price.currencyCode ?? 'COP';
  const compareAt     = variant?.compareAtPrice?.amount;
  const discount      = compareAt ? getDiscount(price, compareAt) : 0;
  const priceLabel    = currency === 'COP' ? formatCOP(price) : price;
  const compareLabel  = compareAt && currency === 'COP' ? formatCOP(compareAt) : undefined;
  const productTitle  = product?.title ?? 'Fuente Bebedero Automática';
  const productHref   = product ? `/products/${product.handle}` : '#producto';

  return (
    <section id="producto" className="py-20 bg-gradient-to-b from-white to-[#F5E6C8]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-black uppercase tracking-widest text-[#C9973A]"
          >
            Producto estrella
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Image gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative aspect-square max-w-md mx-auto">

              {/* Main image */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#F5E6C8] to-[#ecdcad] border-2 border-[#C9973A]/20 shadow-2xl shadow-[#3D2314]/10">
                <Image
                  src={images[active].url}
                  alt={images[active].altText ?? productTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover transition-all duration-500"
                  priority
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
                      aria-label="Imagen anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#3D2314]" />
                    </button>
                    <button
                      onClick={() => setActive((i) => (i + 1) % images.length)}
                      aria-label="Imagen siguiente"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-[#3D2314]" />
                    </button>
                  </>
                )}

                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-full shadow-lg">
                    -{discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActive(idx)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === active
                          ? 'border-[#C9973A] shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.altText ?? ''}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-[#3D2314] text-white rounded-2xl px-4 py-2.5 shadow-xl">
                <p className="text-xs font-bold opacity-80">Más vendido</p>
                <p className="text-sm font-black">⭐ 4.9/5</p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#C9973A] text-white rounded-2xl px-4 py-2.5 shadow-xl">
                <p className="text-xs font-bold opacity-90">Solo</p>
                <p className="text-base font-black">{priceLabel}</p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#3D2314] leading-tight">
                {productTitle}
                <br />
                <span className="text-[#C9973A]">HuellasCo</span>
              </h2>
              <p className="mt-3 text-[#3D2314]/65 leading-relaxed">
                {product?.description ||
                  'La única fuente bebedero diseñada para el mercado colombiano. Mantiene el agua en movimiento constante, filtra impurezas y cuida la salud renal de tu perro o gato las 24 horas del día.'}
              </p>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-4xl font-black text-[#C9973A]">{priceLabel}</span>
              <span className="text-base font-bold text-[#3D2314]/50">COP</span>
              {compareLabel && (
                <span className="text-lg text-[#3D2314]/40 line-through">{compareLabel}</span>
              )}
              <span className="text-sm px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-bold">
                Envío incluido
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#C9973A]/15 flex items-center justify-center text-[#C9973A] flex-shrink-0 mt-0.5">
                    {f.icon}
                  </span>
                  <span className="text-sm text-[#3D2314]/80 leading-relaxed pt-1.5">{f.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="space-y-3 pt-2">
              <div className="relative">
                {/* Attention pulse ring behind button */}
                <div className="absolute inset-0 rounded-2xl animate-glow pointer-events-none" />
                <motion.a
                  href={productHref}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                  className="relative flex items-center justify-center gap-2 w-full py-5 rounded-2xl bg-[#C9973A] text-white font-black text-lg shadow-xl shadow-[#C9973A]/35 cursor-pointer"
                >
                  Lo quiero ahora →
                </motion.a>
              </div>
              <p className="text-center text-xs text-[#3D2314]/50 flex items-center justify-center gap-3">
                <span>Garantía 30 días</span>
                <span className="w-1 h-1 rounded-full bg-[#3D2314]/30 inline-block" />
                <span>Pago seguro</span>
                <span className="w-1 h-1 rounded-full bg-[#3D2314]/30 inline-block" />
                <span>Envío Colombia</span>
              </p>
            </div>

            {/* Stock urgency */}
            <div className="flex items-center gap-3 bg-[#F5E6C8] rounded-2xl px-4 py-3">
              <div className="flex gap-1 flex-shrink-0">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2 rounded-sm ${i < 3 ? 'bg-[#C9973A]' : 'bg-[#3D2314]/15'}`}
                  />
                ))}
              </div>
              <p className="text-xs font-bold text-[#3D2314]/70">
                ¡Solo quedan <span className="text-[#C9973A]">3 unidades</span> disponibles!
              </p>
            </div>

            {/* Objections FAQ */}
            <div className="border-t border-[#F5E6C8] pt-6 space-y:4">
              <p className="text-xs font-black uppercase tracking-widest text-[#3D2314]/50 mb-4">
                Preguntas frecuentes
              </p>
              {objections.map((o) => (
                <div key={o.q} className="flex gap-3 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-[#C9973A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#3D2314]">{o.q}</p>
                    <p className="text-sm text-[#3D2314]/60 mt-0.5">{o.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PawSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="#3D2314" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="50" cy="63" rx="21" ry="19" />
      <ellipse cx="24" cy="44" rx="10" ry="8" transform="rotate(-18 24 44)" />
      <ellipse cx="38" cy="34" rx="10" ry="8" transform="rotate(-6 38 34)" />
      <ellipse cx="62" cy="34" rx="10" ry="8" transform="rotate(6 62 34)" />
      <ellipse cx="76" cy="44" rx="10" ry="8" transform="rotate(18 76 44)" />
    </svg>
  );
}
