// app/product/[id].tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';

const staticProduct = {
  id: 1,
  name: 'Fone de Ouvido Sem Fio',
  price: 299.90,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
  description: 'Experimente a liberdade de ouvir música sem fios com nossos fones de ouvido Bluetooth de alta qualidade. Com cancelamento de ruído ativo, bateria de longa duração e design ergonômico, eles são perfeitos para qualquer ocasião, seja no trabalho, na academia ou em casa.',
  rating: 4.5,
  reviews: 128,
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: staticProduct.image }} style={styles.productImage} />

        <View style={styles.detailsContainer}>
          <Text style={[styles.productName, { color: colors.text }]}>
            {staticProduct.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color={Colors.primary} />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {staticProduct.rating} ({staticProduct.reviews} reviews)
            </Text>
          </View>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {staticProduct.description}
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <View>
          <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Preço</Text>
          <Text style={[styles.price, { color: colors.text }]}>
            R$ {staticProduct.price.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  productImage: {
    width: '100%',
    height: 400,
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
  },
  priceLabel: {
    fontSize: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});