import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FF6B6B',      // Fresh coral red
  secondary: '#4ECDC4',    // Mint green
  accent: '#45B7D1',       // Sky blue
  tertiary: '#96CEB4',     // Sage green
  quaternary: '#FFEAA7',   // Warm yellow
  background: '#FFFFFF',   // Pure white background
  backgroundAlt: '#F8FFFE', // Very light mint
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
  foodGradient: 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)', // Fresh food gradient
  kitchenGradient: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #96CEB4 100%)', // Modern kitchen gradient
  text: '#2D3748',         // Dark slate
  textSecondary: '#718096', // Gray
  textLight: '#A0AEC0',    // Light gray
  grey: '#E2E8F0',         // Very light gray
  card: '#FFFFFF',         // Pure white
  cardShadow: 'rgba(0, 0, 0, 0.08)', // Soft shadow
  border: '#E2E8F0',       // Light border
  success: '#48BB78',      // Fresh green
  warning: '#ED8936',      // Orange
  error: '#F56565',        // Red
  info: '#4299E1',         // Blue
  dark: '#1A202C',         // Very dark
  light: '#FFFFFF',        // White
  kitchenWood: '#8B4513',  // Keep original wood tone
  marble: '#F7FAFC',       // Light marble
  steel: '#CBD5E0',        // Light steel
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
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    fontSize: 300,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 400,
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
    boxShadow: '0px 3px 12px rgba(139, 69, 19, 0.15)',
    elevation: 4,
    borderTopWidth: 3,
    borderTopColor: colors.kitchenWood,
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
