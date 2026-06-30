'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCart();
  const lines = cart?.lines.nodes ?? [];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" style={{ color: '#0891b2' }} />
            <h2 className="font-bold text-lg text-[#0c4a6e]">Tu carrito</h2>
            {cart && cart.totalQuantity > 0 && (
              <span className="bg-[#f97316] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#f0f9ff] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-[#0891b2]" />
              </div>
              <div>
                <p className="font-semibold text-[#0c4a6e]">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500 mt-1">¡Tu mascota está esperando!</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#0891b2] text-white text-sm font-semibold hover:bg-[#0e7490] transition-colors"
              >
                Ver productos
              </button>
            </div>
          ) : (
            lines.map((line) => (
              <div key={line.id} className="flex gap-3 p-3 rounded-xl bg-[#f0f9ff]">
                {line.merchandise.product.featuredImage && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                    <Image
                      src={line.merchandise.product.featuredImage.url}
                      alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[#0c4a6e] truncate">
                    {line.merchandise.product.title}
                  </p>
                  {line.merchandise.selectedOptions.some(o => o.value !== 'Default Title') && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {line.merchandise.selectedOptions.map(o => o.value).join(' / ')}
                    </p>
                  )}
                  <p className="text-sm font-bold text-[#0891b2] mt-1">
                    {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-white rounded-full border border-gray-200">
                      <button
                        onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                        disabled={isLoading}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <Minus className="w-3 h-3 text-[#0c4a6e]" />
                      </button>
                      <span className="text-sm font-semibold text-[#0c4a6e] w-6 text-center">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-3 h-3 text-[#0c4a6e]" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div className="border-t border-gray-100 p-5 space-y-4">
            {/* Free shipping progress */}
            <div className="bg-[#f0f9ff] rounded-xl p-3">
              <div className="flex justify-between text-xs text-[#0891b2] font-medium mb-1.5">
                <span>🚚 Envío gratis desde $699</span>
                <span>{formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}</span>
              </div>
              <div className="h-1.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0891b2] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (parseFloat(cart.cost.subtotalAmount.amount) / 699) * 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-[#0c4a6e]">
                {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>

            <a
              href={cart.checkoutUrl}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-base transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Finalizar compra
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </a>

            <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
              <span>🔒 Pago 100% seguro</span>
              <span>·</span>
              <span>💳 Visa, MC, AMEX</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
