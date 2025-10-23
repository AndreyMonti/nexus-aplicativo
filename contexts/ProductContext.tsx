import React, { createContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { DisplayProduct } from '../constants/Types';
import { productService } from '../services/productService';

interface ProductContextType {
  products: DisplayProduct[];
  loading: boolean;
  searchQuery: string;
  selectedCategory: string;
  filteredProducts: DisplayProduct[];
  refreshProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  getProductById: (id: number) => DisplayProduct | null;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    refreshProducts();
  }, []);

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data || []);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const getProductById = (id: number) => products.find((p) => p.id === id) || null;

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        searchQuery,
        selectedCategory,
        filteredProducts,
        refreshProducts,
        setSearchQuery,
        setSelectedCategory,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
