import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { DisplayCartItem } from '../constants/Types';
import { cartService } from '../services/cartService';

interface CartContextType {
  items: DisplayCartItem[];
  loading: boolean;
  itemCount: number;
  total: number;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<DisplayCartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const it = await cartService.getCartItems();
      setItems(it);
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = async () => {
    await loadCart();
  };

  const addToCart = async (productId: number, quantity = 1) => {
    setLoading(true);
    try {
      await cartService.addToCart(productId, quantity);
      const it = await cartService.getCartItems();
      setItems(it);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    setLoading(true);
    try {
      await cartService.updateQuantity(cartItemId, quantity);
      const it = await cartService.getCartItems();
      setItems(it);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    setLoading(true);
    try {
      await cartService.removeFromCart(cartItemId);
      const it = await cartService.getCartItems();
      setItems(it);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await cartService.clearCart();
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.quantity * i.product.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        itemCount,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
