import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../hooks/useAuth';
import { ThemedView } from '../../components/ThemedView';
import { Header } from '../../components/Header';
import { ProductCard } from '../../components/ProductCard';
import { Colors } from '../../constants/Colors';

const categories = [
  { id: '', name: 'All', icon: 'grid-outline' },
  { id: 'Electronics', name: 'Tech', icon: 'laptop-outline' },
  { id: 'Accessories', name: 'Accessories', icon: 'phone-portrait-outline' },
  { id: 'Fitness', name: 'Fitness', icon: 'fitness-outline' },
  { id: 'Food & Beverage', name: 'Food', icon: 'restaurant-outline' },
  { id: 'Home & Office', name: 'Home', icon: 'home-outline' },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { 
    filteredProducts, 
    loading, 
    selectedCategory, 
    setSelectedCategory,
    refreshProducts 
  } = useProducts();
  const insets = useSafeAreaInsets();

  const handleProductPress = (productId: number) => {
    router.push(`/product/${productId}` as any);
  };

  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard 
      product={item} 
      onPress={() => handleProductPress(item.id)}
    />
  );

  return (
    <ThemedView style={styles.container}>
      <Header showSearch showCart />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={refreshProducts}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Welcome back,
          </Text>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.name || 'Explorer'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Discover amazing products from verified sellers
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Categories
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: selectedCategory === category.id 
                      ? Colors.primary 
                      : colors.surface,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons
                  name={category.icon as any}
                  size={24}
                  color={selectedCategory === category.id ? 'white' : Colors.primary}
                />
                <Text style={[
                  styles.categoryText,
                  {
                    color: selectedCategory === category.id ? 'white' : colors.text
                  }
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.name} Products` : 'Featured Products'}
            </Text>
            <Text style={[styles.productCount, { color: colors.textSecondary }]}>
              {filteredProducts.length} items
            </Text>
          </View>

          {/* Products Grid */}
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.productsContainer}
          />
        </View>

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  productCount: {
    fontSize: 14,
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',        // ícone + texto na mesma linha
    alignItems: 'center',       // alinhamento vertical
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 80,
    marginRight: 12,            // espaçamento entre itens
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    marginLeft: 8,              // distância do ícone
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
});