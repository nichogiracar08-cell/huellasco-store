'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, RotateCcw, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/shopify/types';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product;
}

export default function ProductSpotlight({ product }: Props) {
  const { addItem, isLoading } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.nodes[0]
  );
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const images = product.images.nodes;

  const discount = selectedVariant.compareAtPrice
    ? getDiscountPercentage(selectedVariant.price.amount, selectedVariant.compareAtPrice.amount)
    : 0;

  async function handleAddToCart() {
    await addItem(selectedVariant.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function nextImage() {
    setActiveImage((prev) => (prev + 1) % images.length);
  }
  function prevImage() {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <section id="producto" className="py-24 bg-gradient-to-b from-white to-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-[#0891b2]">Producto estrella</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Gallery */}
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#f0f9ff] shadow-xl">
                {images.length > 0 ? (
                  <Image
                    src={images[activeImage]?.url}
                    alt={images[activeImage]?.altText ?? product.title}
                    fill
                    className="object-cover transition-all duration-500"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#0891b2]">
                    <span className="text-9xl">💧</span>
                    <p className="mt-4 font-semibold text-[#0c4a6e]">{product.title}</p>
                  </div>
                )}

                {/* Discount badge */}
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-[#f97316] text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    -{discount}% OFF
                  </div>
                )}

                {/* Nav arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#0c4a6e]" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-[#0c4a6e]" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === activeImage
                          ? 'border-[#0891b2] shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0c4a6e]">4.9</span>
              <span className="text-sm text-gray-400">· 847 reseñas</span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c4a6e] leading-tight">
                {product.title}
              </h2>
              {product.description && (
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">{product.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-[#0891b2]">
                {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
              </span>
              {selectedVariant.compareAtPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(
                    selectedVariant.compareAtPrice.amount,
                    selectedVariant.compareAtPrice.currencyCode
                  )}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-bold text-[#f97316] bg-orange-50 px-2 py-0.5 rounded-full">
                  Ahorras {discount}%
                </span>
              )}
            </div>

            {/* Variants */}
            {product.options
              .filter((opt) => opt.values.length > 1)
              .map((opt) => (
                <div key={opt.id}>
                  <p className="text-sm font-semibold text-[#0c4a6e] mb-2">{opt.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((val) => {
                      const matchingVariant = product.variants.nodes.find((v) =>
                        v.selectedOptions.some(
                          (o) => o.name === opt.name && o.value === val
                        )
                      );
                      const isSelected = selectedVariant.selectedOptions.some(
                        (o) => o.name === opt.name && o.value === val
                      );
                      return (
                        <button
                          key={val}
                          onClick={() => {
                            if (matchingVariant) setSelectedVariant(matchingVariant);
                          }}
                          disabled={!matchingVariant?.availableForSale}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                            isSelected
                              ? 'border-[#0891b2] bg-[#0891b2] text-white shadow-lg shadow-cyan-200'
                              : 'border-gray-200 text-gray-700 hover:border-[#0891b2] hover:text-[#0891b2]'
                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Stock urgency */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex gap-0.5">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-2 rounded-sm ${i < 5 ? 'bg-[#0891b2]' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-[#f97316] font-semibold">¡Solo quedan 5 en stock!</span>
            </div>

            {/* Add to cart */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant.availableForSale || isLoading}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-200 relative overflow-hidden ${
                  selectedVariant.availableForSale
                    ? 'bg-[#f97316] hover:bg-[#ea580c] text-white shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-1 active:translate-y-0'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Agregando...
                  </span>
                ) : added ? (
                  <span className="flex items-center justify-center gap-2">✅ ¡Agregado al carrito!</span>
                ) : selectedVariant.availableForSale ? (
                  <span className="flex items-center justify-center gap-2">
                    🛒 Agregar al carrito
                    <Zap className="w-5 h-5" />
                  </span>
                ) : (
                  'Agotado'
                )}
              </button>

              <a
                href={`/products/${product.handle}`}
                className="block w-full py-4 rounded-2xl border-2 border-[#0891b2] text-[#0891b2] font-bold text-center hover:bg-[#f0f9ff] transition-colors"
              >
                Ver todos los detalles
              </a>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: <ShieldCheck className="w-5 h-5" />, text: 'Garantía 30 días' },
                { icon: <Truck className="w-5 h-5" />, text: 'Envío gratis' },
                { icon: <RotateCcw className="w-5 h-5" />, text: 'Devolución fácil' },
              ].map((g) => (
                <div key={g.text} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#f0f9ff] text-center">
                  <span className="text-[#0891b2]">{g.icon}</span>
                  <span className="text-[10px] font-semibold text-[#0c4a6e]">{g.text}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
