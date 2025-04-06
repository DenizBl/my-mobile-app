import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { theme } from '../utils/theme';
import { loginUser } from '../utils/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('member'); // 'member' or 'admin'
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const user = await loginUser(email, password);
      
      if (user.userType !== loginType) {
        throw new Error(`Please login as a ${user.userType}`);
      }

      // Navigate to appropriate dashboard based on user type
      navigation.replace(user.userType === 'admin' ? 'AdminDashboard' : 'MemberDashboard');
    } catch (error) {
      Alert.alert('Error', error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>Library Management</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

            <View style={styles.loginTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.loginTypeButton,
                  loginType === 'member' && styles.loginTypeButtonActive,
                ]}
                onPress={() => setLoginType('member')}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.loginTypeText,
                    loginType === 'member' && styles.loginTypeTextActive,
                  ]}
                >
                  Member
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.loginTypeButton,
                  loginType === 'admin' && styles.loginTypeButtonActive,
                ]}
                onPress={() => setLoginType('admin')}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.loginTypeText,
                    loginType === 'admin' && styles.loginTypeTextActive,
                  ]}
                >
                  Administrator
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />

              <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.registerLink}
                onPress={() => navigation.navigate('Register')}
                disabled={isLoading}
              >
                <Text style={styles.registerText}>
                  Don't have an account? <Text style={styles.registerTextBold}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  loginTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  loginTypeButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  loginTypeButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  loginTypeText: {
    ...theme.typography.body,
    color: theme.colors.primary,
  },
  loginTypeTextActive: {
    color: theme.colors.white,
  },
  form: {
    gap: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    ...theme.typography.body,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray,
  },
  buttonText: {
    color: theme.colors.white,
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  registerText: {
    color: theme.colors.text,
    ...theme.typography.body,
  },
  registerTextBold: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen; 