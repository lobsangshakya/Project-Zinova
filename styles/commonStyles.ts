import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FF6B6B',      // Vibrant coral red
  secondary: '#4ECDC4',    // Turquoise
  accent: '#45B7D1',       // Sky blue
  tertiary: '#96CEB4',     // Mint green
  quaternary: '#FFEAA7',   // Soft yellow
  background: '#FDFDFD',   // Pure white
  backgroundAlt: '#F8F9FA', // Very light grey
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
  text: '#2D3436',         // Dark charcoal
  textSecondary: '#636E72', // Medium grey
  textLight: '#B2BEC3',    // Light grey
  grey: '#DDD6FE',         // Lavender grey
  card: '#FFFFFF',         // Pure white
  cardShadow: 'rgba(0, 0, 0, 0.1)', // Soft shadow
  border: '#E17055',       // Coral border
  success: '#00B894',      // Emerald green
  warning: '#FDCB6E',      // Golden yellow
  error: '#E84393',        // Pink red
  info: '#6C5CE7',         // Purple
  dark: '#2D3436',         // Dark grey
  light: '#FFFFFF',        // White
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.background,
    color: colors.text,
    width: '100%',
    marginBottom: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.text,
  },
});
