import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { ThemedView } from '../components/ThemedView';
import { Colors } from '../constants/Colors';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, register } = useAuth();
  const { colors, theme, toggleTheme } = useTheme();
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

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      showWebAlert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name, userType);
      }
      router.replace('/(tabs)');
    } catch (error) {
      showWebAlert('Error', error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.themeButton}
              onPress={toggleTheme}
            >
              <Ionicons 
                name={theme === 'light' ? 'moon' : 'sunny'} 
                size={24} 
                color={Colors.primary} 
              />
            </TouchableOpacity>
          </View>

          {/* Logo & Welcome */}
          <View style={styles.logoSection}>
            <Text style={[styles.logo, { color: Colors.primary }]}>NexusStore</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              The Future of Commerce
            </Text>
            <Text style={[styles.welcome, { color: colors.text }]}>
              {isLogin ? 'Welcome Back!' : 'Join the Revolution'}
            </Text>
          </View>

          {/* Demo Credentials */}
          <View style={[styles.demoBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.demoTitle, { color: Colors.primary }]}>Demo Credentials</Text>
            <Text style={[styles.demoText, { color: colors.textSecondary }]}>
              Buyer: user@example.com / test1234{'\n'}
              Seller: seller@example.com / seller123
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Toggle Login/Register */}
            <View style={[styles.toggleContainer, { backgroundColor: colors.surface }]}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  isLogin && { backgroundColor: Colors.primary }
                ]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[
                  styles.toggleText,
                  { color: isLogin ? 'white' : colors.textSecondary }
                ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  !isLogin && { backgroundColor: Colors.primary }
                ]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[
                  styles.toggleText,
                  { color: !isLogin ? 'white' : colors.textSecondary }
                ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* User Type Selection (Register only) */}
            {!isLogin && (
              <View style={[styles.typeContainer, { backgroundColor: colors.surface }]}>
                <Text style={[styles.typeLabel, { color: colors.text }]}>I am a:</Text>
                <View style={styles.typeButtons}>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      userType === 'buyer' && { backgroundColor: Colors.primary },
                      { borderColor: Colors.primary }
                    ]}
                    onPress={() => setUserType('buyer')}
                  >
                    <Ionicons 
                      name="person" 
                      size={20} 
                      color={userType === 'buyer' ? 'white' : Colors.primary} 
                    />
                    <Text style={[
                      styles.typeButtonText,
                      { color: userType === 'buyer' ? 'white' : Colors.primary }
                    ]}>
                      Buyer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      userType === 'seller' && { backgroundColor: Colors.primary },
                      { borderColor: Colors.primary }
                    ]}
                    onPress={() => setUserType('seller')}
                  >
                    <Ionicons 
                      name="storefront" 
                      size={20} 
                      color={userType === 'seller' ? 'white' : Colors.primary} 
                    />
                    <Text style={[
                      styles.typeButtonText,
                      { color: userType === 'seller' ? 'white' : Colors.primary }
                    ]}>
                      Seller
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Name Input (Register only) */}
            {!isLogin && (
              <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Full Name"
                  placeholderTextColor={colors.textSecondary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            {/* Email Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email Address"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: Colors.primary }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitText}>
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Web Alert Modal */}
      {Platform.OS === 'web' && (
        <Modal visible={alertConfig.visible} transparent animationType="fade">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, minWidth: 280 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{alertConfig.title}</Text>
              <Text style={{ fontSize: 16, marginBottom: 20 }}>{alertConfig.message}</Text>
              <TouchableOpacity 
                style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 4, alignItems: 'center' }}
                onPress={() => {
                  alertConfig.onOk?.();
                  setAlertConfig(prev => ({ ...prev, visible: false }));
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>OK</Text>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  themeButton: {
    padding: 8,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
  },
  demoBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    gap: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 21,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  typeContainer: {
    padding: 16,
    borderRadius: 12,
  },
  typeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 12,
    gap: 8,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});