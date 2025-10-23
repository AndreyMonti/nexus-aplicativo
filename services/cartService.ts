import { CartItem, DisplayCartItem, DisplayProduct, Cart } from '../constants/Types';
import { productService } from './productService';

/**
 * Static in-memory cart service.
 * Keeps a single cart in memory for UI testing.
 */

let _cartItems: DisplayCartItem[] = [];
let _nextCartItemId = 1;

export const cartService = {
  async getOrCreateCart(): Promise<Cart> {
    return Promise.resolve({
      id: 'static-cart-1',
      profile_id: 'static-user',
      status: 'open',
      created_at: new Date().toISOString(),
    } as any);
  },

  async getCartItems(): Promise<DisplayCartItem[]> {
    // return deep copy
    return Promise.resolve(_cartItems.map(i => ({ ...i })));
  },

  async addToCart(productId: number, quantity = 1): Promise<DisplayCartItem> {
    const product = await productService.getById(productId);
    if (!product) throw new Error('Product not found (static)');
    const existing = _cartItems.find(ci => ci.productId === productId);
    if (existing) {
      existing.quantity += quantity;
      return Promise.resolve({ ...existing });
    }
    const newItem: DisplayCartItem = {
      id: _nextCartItemId++,
      productId,
      product,
      quantity,
      addedAt: new Date().toISOString(),
    };
    _cartItems.push(newItem);
    return Promise.resolve({ ...newItem });
  },

  async updateQuantity(cartItemId: number, quantity: number): Promise<void> {
    const item = _cartItems.find(i => i.id === cartItemId);
    if (!item) throw new Error('Cart item not found (static)');
    item.quantity = quantity;
    return Promise.resolve();
  },

  async removeFromCart(cartItemId: number): Promise<void> {
    _cartItems = _cartItems.filter(i => i.id !== cartItemId);
    return Promise.resolve();
  },

  async clearCart(): Promise<void> {
    _cartItems = [];
    return Promise.resolve();
  },

  async refreshCart(): Promise<void> {
    // no-op in static mode
    return Promise.resolve();
  },

  async getCartTotal(): Promise<number> {
    const items = _cartItems;
    return Promise.resolve(items.reduce((s, it) => s + (it.product.price * it.quantity), 0));
  },
};
