import { Product, DisplayProduct, ProductImage } from '../constants/Types';


const defaultImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
];

let _products: DisplayProduct[] = [
  {
    id: 1,
    title: 'Static Running Shoes',
    description: 'Lightweight shoes for testing UI.',
    price: 129.99,
    images: [defaultImages[0]],
    rating: 4.5,
    reviewCount: 24,
    category: 'Fitness',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Static Fitness Band',
    description: 'A fitness band used as placeholder.',
    price: 49.9,
    images: [defaultImages[1]],
    rating: 4.2,
    reviewCount: 12,
    category: 'Accessories',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Static Protein Powder',
    description: 'Tasty protein powder for demos.',
    price: 59.0,
    images: [defaultImages[2]],
    rating: 4.8,
    reviewCount: 40,
    category: 'Food & Beverage',
    createdAt: new Date().toISOString(),
  },
];

export const productService = {
  async getAll(): Promise<DisplayProduct[]> {
    // emulate network delay
    return new Promise(resolve => setTimeout(() => resolve(_products.slice()), 300));
  },

  async getById(id: number): Promise<DisplayProduct | null> {
    const p = _products.find((x) => x.id === id) || null;
    return Promise.resolve(p);
  },

  async create(product: Partial<DisplayProduct>): Promise<DisplayProduct> {
    const id = Math.max(0, ..._products.map(p => p.id)) + 1;
    const newProduct: DisplayProduct = {
      id,
      title: product.title || 'Untitled product',
      description: product.description || '',
      price: product.price || 0,
      images: product.images || [defaultImages[Math.floor(Math.random() * defaultImages.length)]],
      rating: product.rating ?? 0,
      reviewCount: product.reviewCount ?? 0,
      category: product.category || 'Misc',
      createdAt: new Date().toISOString(),
    };
    _products.push(newProduct);
    return Promise.resolve(newProduct);
  },

  async update(id: number, changes: Partial<DisplayProduct>): Promise<DisplayProduct> {
    const idx = _products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Product not found (static)');
    _products[idx] = { ..._products[idx], ...changes };
    return Promise.resolve(_products[idx]);
  },

  async delete(id: number): Promise<void> {
    _products = _products.filter(p => p.id !== id);
    return Promise.resolve();
  },

  // helper for contexts/components
  async getCategories(): Promise<string[]> {
    const cats = Array.from(new Set(_products.map(p => p.category)));
    return Promise.resolve(cats);
  },
};
