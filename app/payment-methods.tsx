import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { ThemedView } from '../components/ThemedView';
import { Header } from '../components/Header';

export default function PaymentMethodsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <Header title="Payment Methods" canGoBack />
      
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 20, padding: 16 }}>
        <View style={[styles.paymentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="card-outline" size={24} color={colors.text} />
          <View style={styles.paymentInfo}>
            <Text style={[styles.paymentTitle, { color: colors.text }]}>Visa **** 4321</Text>
            <Text style={[styles.paymentText, { color: colors.textSecondary }]}>
              Expires 12/2028
            </Text>
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
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  paymentInfo: {
    marginLeft: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentText: {
    fontSize: 14,
    marginTop: 4,
  },
});