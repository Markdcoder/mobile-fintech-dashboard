import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../contexts/ThemeContext';
import Input from '../components/Input';
import Button from '../components/Button';

type AuthStackParamList = {
  Auth: undefined;
  Dashboard: {user: {email: string}};
};

type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Auth'>;

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const {colors, isDark} = useTheme();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email === 'markfleming196021@gmail.com' && password === 'Steelers1996') {
        navigation.navigate('Dashboard', {user: {email}});
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.logo, {backgroundColor: colors.primary}]}>
              <Text style={[styles.logoText, {color: colors.surface}]}>US</Text>
            </View>
            <Text style={[styles.title, {color: colors.text}]}>US Bank</Text>
            <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
              Sign in to continue to your dashboard
            </Text>
          </View>

          {/* Mode Tabs */}
          <View style={[styles.tabs, {borderColor: colors.border}]}>
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  backgroundColor:
                    mode === 'login' ? colors.primary : colors.surface,
                },
              ]}
              onPress={() => setMode('login')}>
              <Icon
                name="log-in"
                size={16}
                color={mode === 'login' ? colors.surface : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color: mode === 'login' ? colors.surface : colors.textSecondary,
                  },
                ]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  backgroundColor:
                    mode === 'signup' ? colors.primary : colors.surface,
                },
              ]}
              onPress={() => setMode('signup')}>
              <Icon
                name="user-plus"
                size={16}
                color={mode === 'signup' ? colors.surface : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      mode === 'signup' ? colors.surface : colors.textSecondary,
                  },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={[styles.form, {backgroundColor: colors.surface}]}>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              leftIcon="lock"
              rightIcon={showPassword ? 'eye-off' : 'eye'}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />
            <Button
              title={loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Create account'}
              onPress={handleSubmit}
              disabled={loading}
              style={styles.submitButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default AuthScreen;
