import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { ThemedView } from '../../components/ThemedView';
import { Header } from '../../components/Header';

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const data = [{ "title": "Sales Today", "subtitle": "R$ 1,234.00" }, { "title": "Orders Pending", "subtitle": "3 orders" }];

  return (
    <ThemedView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header title="Seller Dashboard" />
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
            {item.subtitle && <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>}
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    marginTop: 6,
  },
});
