import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { ThemedView } from '../components/ThemedView';
import { Header } from '../components/Header';

export default function AddressesScreen() {
  const { colors } = useTheme() ?? {};
  const insets = useSafeAreaInsets();

  // Fallbacks caso useTheme não retorne cores
  const bg = colors?.background ?? (Platform.OS === 'android' ? '#f8f8f8' : '#ffffff');
  const card = colors?.card ?? '#ffffff';
  const border = colors?.border ?? '#e0e0e0';
  const text = colors?.text ?? '#000000';
  const textSecondary = colors?.textSecondary ?? '#666666';

  return (
    // ThemedView pode já aplicar background; aqui garantimos com style também
    <ThemedView style={[styles.container, { backgroundColor: bg }]}>
      <Header title="Addresses" canGoBack />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: (insets.bottom ?? 0) + 20,
          padding: 16,
        }}
      >
        <View style={[styles.addressCard, { backgroundColor: card, borderColor: border }]}>
          <Ionicons name="home-outline" size={24} color={text} />

          <View style={styles.addressInfo}>
            <Text style={[styles.addressTitle, { color: text }]}>Home</Text>
            <Text style={[styles.addressText, { color: textSecondary }]}>
              123 Main Street, Anytown, USA
            </Text>

            <Image
              source={require('../assets/images/maps.jpg')}
              style={styles.addressImage}
              resizeMode="cover"
              accessibilityLabel="Mapa do endereço"
              onError={(e) => console.warn('Erro ao carregar imagem:', e.nativeEvent)}
            />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  addressInfo: {
    marginLeft: 16,
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    marginTop: 4,
  },
  addressImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    // opcional: se quiser uma borda que acompanhe o card
    // borderWidth: 1,
    // borderColor: '#eee'
  },
});
