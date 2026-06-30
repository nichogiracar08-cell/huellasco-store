'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Cart } from '@/lib/shopify/types';
import {
  createCart,
  addToCart,
  updateCartLine,
  removeCartLines,
  getCart,
} from '@/lib/shopify/client';

interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_ID_KEY = 'huellasco-cart-id';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      getCart(cartId)
        .then((c) => { if (c) setCart(c); })
        .catch(() => localStorage.removeItem(CART_ID_KEY));
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setIsLoading(true);
      try {
        let updatedCart: Cart;
        const cartId = localStorage.getItem(CART_ID_KEY);

        if (cartId) {
          updatedCart = await addToCart(cartId, [{ merchandiseId, quantity }]);
        } else {
          updatedCart = await createCart([{ merchandiseId, quantity }]);
          localStorage.setItem(CART_ID_KEY, updatedCart.id);
        }

        setCart(updatedCart);
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (!cartId) return;
      setIsLoading(true);
      try {
        const updatedCart = await updateCartLine(cartId, lineId, quantity);
        setCart(updatedCart);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (!cartId) return;
      setIsLoading(true);
      try {
        const updatedCart = await removeCartLines(cartId, [lineId]);
        setCart(updatedCart);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <CartContext.Provider
      value={{ cart, isOpen, isLoading, openCart, closeCart, addItem, updateItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
