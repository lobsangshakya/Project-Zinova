import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#8B4513',      // Kitchen wood brown
  secondary: '#D2691E',    // Warm copper
  accent: '#CD853F',       // Sandy brown
  tertiary: '#F5DEB3',     // Wheat/cream
  quaternary: '#FFF8DC',   // Kitchen cream
  background: '#FFF8F0',   // Warm cream background
  backgroundAlt: '#F7F5F3', // Warm off-white
  backgroundGradient: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)', // Warm gradient
  foodGradient: 'linear-gradient(45deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)', // Food gradient
  kitchenGradient: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #F5DEB3 100%)', // Kitchen gradient
  text: '#2F1B14',         // Dark brown
  textSecondary: '#5D4E37', // Medium brown
  textLight: '#8B7355',    // Light brown
  grey: '#D3D3D3',         // Light grey
  card: '#FFFFFF',         // Pure white
  cardShadow: 'rgba(139, 69, 19, 0.1)', // Warm brown shadow
  border: '#D2691E',       // Copper border
  success: '#228B22',      // Forest green
  warning: '#DAA520',      // Golden rod
  error: '#B22222',        // Fire brick red
  info: '#4682B4',         // Steel blue
  dark: '#2F1B14',         // Dark brown
  light: '#FFFFFF',        // White
  kitchenWood: '#8B4513',  // Kitchen cabinet wood
  marble: '#FAF0E6',       // Linen/marble countertop
  steel: '#C0C0C0',        // Stainless steel
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
