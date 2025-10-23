import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { ThemedView } from '../../components/ThemedView';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/Colors';

export default function ProfileScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const { user, isSeller, logout } = useAuth();
  const insets = useSafeAreaInsets();

  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onOk?: () => void;
  }>({ visible: false, title: '', message: '' });

  const showWebAlert = (title: string, message: string, onOk?: () => void) => {
    if (Platform.OS === 'web') {
      setAlertConfig({ visible: true, title, message, onOk });
    } else {
      console.log(title, message);
    }
  };

  // Adicionado: helper para normalizar rota, chamar router.push e tratar erros
  const navigateToRoute = (route: string) => {
    const normalized = route.startsWith('/') ? route : `/${route}`;
    try {
      router.push(normalized);
    } catch (e) {
      console.warn('Navigation error', e, normalized);
      showWebAlert('Navigation Error', `Unable to navigate to ${normalized}: ${String(e)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const menuItems = [
    {
      icon: 'bag-outline' as const,
      title: 'Order History',
      subtitle: 'View your past orders',
      onPress: () => navigateToRoute('/order-history'),
    },
    {
      icon: 'heart-outline' as const,
      title: 'Wishlist',
      subtitle: 'Your saved products',
      onPress: () => navigateToRoute('/wishlist'),
    },
    {
      icon: 'location-outline' as const,
      title: 'Addresses',
      subtitle: 'Manage delivery addresses',
      onPress: () => navigateToRoute('/addresses'),
    },
    {
      icon: 'card-outline' as const,
      title: 'Payment Methods',
      subtitle: 'Manage payment options',
      onPress: () => navigateToRoute('/payment-methods'),
    },
  ];

  const sellerMenuItems = [
    {
      icon: 'analytics-outline' as const,
      title: 'Dashboard',
      subtitle: 'Sales analytics & insights',
      onPress: () => navigateToRoute('/seller/dashboard'),
    },
    {
      icon: 'cube-outline' as const,
      title: 'My Products',
      subtitle: 'Manage your inventory',
      onPress: () => navigateToRoute('/seller/products'),
    },
    {
      icon: 'receipt-outline' as const,
      title: 'Orders',
      subtitle: 'View customer orders',
      onPress: () => navigateToRoute('/seller/orders'),
    },
    {
      icon: 'storefront-outline' as const,
      title: 'Store Settings',
      subtitle: 'Configure your store',
      onPress: () => navigateToRoute('/seller/settings'),
    },
  ];

  const currentMenuItems = isSeller ? sellerMenuItems : menuItems;

  return (
    <ThemedView style={styles.container}>
      <Header title={isSeller ? 'Seller Hub' : 'Profile'} />
      
      <ScrollView
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
          <View style={styles.profileImageContainer}>
            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={styles.profileImage}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.profileImagePlaceholder, { backgroundColor: Colors.primary }]}>
                <Ionicons name="person" size={40} color="white" />
              </View>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.name || 'User'}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {user?.email || 'user@example.com'}
            </Text>
            <View style={styles.userTypeBadge}>
              <Ionicons
                name={isSeller ? 'storefront' : 'person'}
                size={16}
                color={Colors.primary}
              />
              <Text style={[styles.userTypeText, { color: Colors.primary }]}>
                {isSeller ? 'Seller Account' : 'Buyer Account'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats (Seller only) */}
        {isSeller && (
          <View style={styles.statsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Quick Stats
            </Text>
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.statValue, { color: Colors.primary }]}>5</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Products</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.statValue, { color: Colors.primary }]}>24</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Orders</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.statValue, { color: Colors.primary }]}>4.8</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rating</Text>
              </View>
            </View>
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {isSeller ? 'Seller Tools' : 'Account'}
          </Text>
          {currentMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={24} color={Colors.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
                  {item.subtitle}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Settings
          </Text>
          
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={toggleTheme}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons
                name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
                size={24}
                color={Colors.primary}
              />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>
                Theme
              </Text>
              <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
                {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem, { backgroundColor: colors.card, borderColor: Colors.error }]}
            onPress={handleLogout}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="log-out-outline" size={24} color={Colors.error} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: Colors.error }]}>
                Logout
              </Text>
              <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
                Sign out of your account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Web Alert Modal */}
      {Platform.OS === 'web' && (
        <Modal visible={alertConfig.visible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{alertConfig.title}</Text>
              <Text style={styles.modalMessage}>{alertConfig.message}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  alertConfig.onOk?.();
                  setAlertConfig(prev => ({ ...prev, visible: false }));
                }}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  userTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userTypeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  logoutItem: {
    marginTop: 8,
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    minWidth: 280,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});