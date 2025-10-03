import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Project Zinova Brand Colors - Modern & Fresh
  primary: '#2B7A78',      // Teal/Turquoise - modern and fresh
  secondary: '#17A2B8',    // Bright cyan - vibrant accent
  accent: '#3AAFA9',       // Seafoam green - natural and calming
  tertiary: '#DEF2F1',     // Light mint - fresh background
  quaternary: '#FEFFFF',   // Pure white - clean canvas
  background: '#F8FCFC',   // Off-white with hint of mint - clean modern
  backgroundAlt: '#F4F9F9', // Subtle mint tint - sophisticated
  backgroundGradient: 'linear-gradient(135deg, #DEF2F1 0%, #FEFFFF 100%)', // Fresh gradient
  foodGradient: 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)', // Vibrant food gradient
  zinovaGradient: 'linear-gradient(135deg, #2B7A78 0%, #17A2B8 50%, #3AAFA9 100%)', // Brand gradient
  text: '#2D3748',         // Charcoal - professional and readable
  textSecondary: '#4A5568', // Medium grey - subtle secondary text
  textLight: '#718096',    // Light grey - supporting text
  grey: '#E2E8F0',         // Light grey - borders and dividers
  card: '#FFFFFF',         // Pure white - clean cards
  cardShadow: 'rgba(43, 122, 120, 0.1)', // Teal shadow - brand consistent
  border: '#3AAFA9',       // Seafoam border - subtle brand presence
  success: '#48BB78',      // Fresh green - positive actions
  warning: '#ED8936',      // Warm orange - attention
  error: '#F56565',        // Coral red - friendly error
  info: '#4299E1',         // Sky blue - informational
  dark: '#1A202C',         // Deep charcoal - strong contrast
  light: '#FFFFFF',        // Pure white
  modernTeal: '#2B7A78',   // Primary brand color
  freshMint: '#DEF2F1',    // Fresh accent
  cleanWhite: '#FEFFFF',   // Clean backgrounds
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
    borderTopColor: colors.modernTeal,
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
