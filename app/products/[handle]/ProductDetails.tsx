'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, CheckCircle2,
  Droplets, Volume2, Timer, Zap, Maximize, ShieldCheck,
  Truck, CreditCard, RotateCcw, Star, Minus, Plus,
} from 'lucide-react';
import type { Product, ProductVariant } from '@/lib/shopify/types';
import { createCart } from '@/lib/shopify/client';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function formatCOP(amount: string) {
  return '$' + Math.round(parseFloat(amount)).toLocaleString('es-CO');
}

function getDiscount(price: string, compareAt: string) {
  const p = parseFloat(price), c = parseFloat(compareAt);
  return c > p ? Math.round(((c - p) / c) * 100) : 0;
}

const features = [
  { icon: <Droplets className="w-5 h-5" />, title: 'Filtro de carbón activado', desc: 'Elimina cloro, pelos y residuos. Agua limpia y sin olores las 24h.' },
  { icon: <Volume2  className="w-5 h-5" />, title: 'Motor ultra silencioso',    desc: 'Menos de 35 dB de operación. No interrumpe el descanso de tu mascota.' },
  { icon: <Timer    className="w-5 h-5" />, title: 'Filtro dura 4–6 semanas',   desc: 'Repuesto fácil de conseguir y económico. Limpieza sencilla en 5 piezas.' },
  { icon: <Zap      className="w-5 h-5" />, title: '110V / 60Hz colombiano',    desc: 'Compatible con el voltaje colombiano. No necesitas adaptador.' },
  { icon: <Maximize className="w-5 h-5" />, title: '2.5L de capacidad',         desc: 'Ideal para perros y gatos de todos los tamaños. Un llenado dura días.' },
];

const faqs = [
  { q: '¿Es fácil de limpiar?',       a: 'Sí. Se desmonta en 5 piezas y se lava a mano en minutos. Sin rincones difíciles.' },
  { q: '¿Hace ruido?',                 a: 'No. El motor opera a menos de 35 dB — más silencioso que un susurro.' },
  { q: '¿Cuánto dura el filtro?',      a: '4 a 6 semanas. Los filtros de repuesto son económicos y fáciles de conseguir.' },
  { q: '¿Funciona con 110V/60Hz?',     a: 'Sí. Diseñado específicamente para el voltaje colombiano. Sin adaptador.' },
  { q: '¿Para qué mascotas sirve?',    a: 'Perros y gatos de todos los tamaños. La capacidad de 2.5L aguanta varios días.' },
];

const trust = [
  { icon: <ShieldCheck className="w-6 h-6" />, label: 'Garantía 30 días',        sub: 'Sin preguntas' },
  { icon: <Truck        className="w-6 h-6" />, label: 'Envío a toda Colombia',   sub: '2-5 días hábiles' },
  { icon: <CreditCard   className="w-6 h-6" />, label: 'Pago 100% seguro',        sub: 'PSE · Nequi · Bancolombia' },
  { icon: <RotateCcw    className="w-6 h-6" />, label: 'Devolución fácil',        sub: '30 días sin preguntas' },
];

export default function ProductDetails({ product }: { product: Product }) {
  const images   = product.images.nodes;
  const variants = product.variants.nodes;

  const [activeImg,      setActiveImg]      = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);
  const [quantity,        setQuantity]        = useState(1);
  const [loading,         setLoading]         = useState(false);
  const [openFaq,         setOpenFaq]         = useState<number | null>(null);

  const price      = selectedVariant.price.amount;
  const currency   = selectedVariant.price.currencyCode;
  const compareAt  = selectedVariant.compareAtPrice?.amount;
  const discount   = compareAt ? getDiscount(price, compareAt) : 0;
  const priceLabel = currency === 'COP' ? formatCOP(price) : price;
  const compareLabel = compareAt && currency === 'COP' ? formatCOP(compareAt) : undefined;

  async function handleBuyNow() {
    setLoading(true);
    try {
      const cart = await createCart([{ merchandiseId: selectedVariant.id, quantity }]);
      window.location.href = cart.checkoutUrl;
    } catch {
      setLoading(false);
    }
  }

  const prevImg = () => setActiveImg(i => (i - 1 + images.length) % images.length);
  const nextImg = () => setActiveImg(i => (i + 1) % images.length);

  return (
    <div className="bg-white">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-sm text-[#3D2314]/50">
          <Link href="/" className="hover:text-[#C9973A] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-[#C9973A] transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-[#3D2314] font-semibold truncate max-w-[200px]">{product.title}</span>
        </nav>
      </div>

      {/* Main product grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="lg:sticky lg:top-24"
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#F5E6C8] to-[#ecdcad] border-2 border-[#C9973A]/20 shadow-xl">
              {images.length > 0 ? (
                <>
                  <Image
                    src={images[activeImg].url}
                    alt={images[activeImg].altText ?? product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-all duration-500"
                    priority
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImg}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft className="w-5 h-5 text-[#3D2314]" />
                      </button>
                      <button
                        onClick={nextImg}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                        aria-label="Imagen siguiente"
                      >
                        <ChevronRight className="w-5 h-5 text-[#3D2314]" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">💧</div>
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
                    onClick={() => setActiveImg(idx)}
                    className={`relative flex-shrink-0 w-18 h-18 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === activeImg
                        ? 'border-[#C9973A] shadow-md scale-105'
                        : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                    style={{ width: 72, height: 72 }}
                  >
                    <Image src={img.url} alt={img.altText ?? ''} fill sizes="72px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust row under gallery */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {trust.map((t) => (
                <div key={t.label} className="flex items-center gap-2 bg-[#F5E6C8]/50 rounded-xl px-3 py-2.5">
                  <span className="text-[#C9973A] flex-shrink-0">{t.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-[#3D2314] leading-tight">{t.label}</p>
                    <p className="text-[10px] text-[#3D2314]/55">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="space-y-6"
          >
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9973A] text-[#C9973A]" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#3D2314]">4.9</span>
              <span className="text-sm text-[#3D2314]/50">(127 reseñas)</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#3D2314] leading-tight">
                {product.title}
              </h1>
              {product.description && (
                <p className="mt-3 text-[#3D2314]/65 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3 p-4 bg-[#F5E6C8]/40 rounded-2xl border border-[#C9973A]/20">
              <span className="text-4xl font-black text-[#C9973A]">{priceLabel}</span>
              <span className="text-base font-bold text-[#3D2314]/50">COP</span>
              {compareLabel && (
                <span className="text-xl text-[#3D2314]/35 line-through">{compareLabel}</span>
              )}
              {discount > 0 && (
                <span className="ml-auto text-sm font-black px-3 py-1.5 rounded-full bg-red-500 text-white">
                  Ahorras {discount}%
                </span>
              )}
              <span className="w-full text-xs text-green-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Envío incluido a toda Colombia
              </span>
            </div>

            {/* Variant selector — only show if more than 1 */}
            {variants.length > 1 && (
              <div>
                <p className="text-sm font-black text-[#3D2314] mb-2 uppercase tracking-wider">Variante</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.availableForSale}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                        v.id === selectedVariant.id
                          ? 'border-[#C9973A] bg-[#C9973A] text-white'
                          : v.availableForSale
                          ? 'border-[#3D2314]/20 text-[#3D2314] hover:border-[#C9973A]'
                          : 'border-[#3D2314]/10 text-[#3D2314]/30 cursor-not-allowed line-through'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm font-black text-[#3D2314] mb-2 uppercase tracking-wider">Cantidad</p>
              <div className="inline-flex items-center border-2 border-[#3D2314]/15 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-[#F5E6C8] transition-colors text-[#3D2314]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-black text-[#3D2314] text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-[#F5E6C8] transition-colors text-[#3D2314]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stock urgency */}
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1 flex-shrink-0">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-2.5 h-2 rounded-sm ${i < 3 ? 'bg-[#C9973A]' : 'bg-[#3D2314]/12'}`} />
                ))}
              </div>
              <p className="text-xs font-bold text-[#3D2314]/70">
                ¡Solo quedan <span className="text-[#C9973A]">3 unidades</span> disponibles!
              </p>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                disabled={loading || !selectedVariant.availableForSale}
                className="w-full py-5 rounded-2xl bg-[#C9973A] text-white font-black text-lg hover:bg-[#a87a2b] transition-all shadow-xl shadow-[#C9973A]/30 hover:shadow-[#C9973A]/40 hover:-translate-y-1 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                    </svg>
                    Procesando...
                  </span>
                ) : !selectedVariant.availableForSale ? (
                  'Agotado'
                ) : (
                  '🐾 Comprar ahora'
                )}
              </button>
              <p className="text-center text-xs text-[#3D2314]/45">
                🔒 Pago seguro · 🚚 Envío a toda Colombia · 🛡️ Garantía 30 días
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-gradient-to-b from-white to-[#F5E6C8]/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs font-black uppercase tracking-widest text-[#C9973A] mb-2">Por qué funciona</p>
            <h2 className="text-3xl font-black text-[#3D2314]">Diseñado para el mercado colombiano</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-[#F5E6C8] shadow-sm hover:shadow-md hover:border-[#C9973A]/30 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#C9973A]/12 flex items-center justify-center text-[#C9973A] flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-black text-[#3D2314] text-sm">{f.title}</p>
                  <p className="text-xs text-[#3D2314]/60 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F5E6C8]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs font-black uppercase tracking-widest text-[#C9973A] mb-2">Resolvemos tus dudas</p>
            <h2 className="text-3xl font-black text-[#3D2314]">Preguntas frecuentes</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-[#F5E6C8] overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-bold text-[#3D2314] text-sm">{faq.q}</span>
                  <span className={`text-[#C9973A] transition-transform flex-shrink-0 ml-3 ${openFaq === i ? 'rotate-45' : ''}`}>
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-[#3D2314]/65 leading-relaxed border-t border-[#F5E6C8]">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA banner */}
      <section className="bg-[#3D2314] py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#C9973A] text-sm font-black uppercase tracking-widest mb-3">Oferta limitada</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Solo <span className="text-[#C9973A]">{priceLabel} COP</span>
          </h2>
          {compareLabel && (
            <p className="text-white/50 text-lg line-through mb-4">{compareLabel} COP</p>
          )}
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Menos que una sola consulta veterinaria. Tu mascota merece agua limpia todos los días.
          </p>
          <button
            onClick={handleBuyNow}
            disabled={loading}
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-[#C9973A] text-white font-black text-lg hover:bg-[#a87a2b] transition-all shadow-2xl shadow-[#C9973A]/30 hover:-translate-y-1 active:translate-y-0 disabled:opacity-60"
          >
            {loading ? 'Procesando...' : '🐾 Quiero la fuente bebedero'}
          </button>
          <p className="mt-4 text-white/40 text-xs">
            🛡️ Garantía 30 días · 🚚 Envío a toda Colombia · 🔒 Pago seguro
          </p>
        </div>
      </section>
    </div>
  );
}
