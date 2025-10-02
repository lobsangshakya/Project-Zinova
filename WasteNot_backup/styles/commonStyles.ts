import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FF8A80',      // Soft coral pink - more approachable
  secondary: '#81C784',    // Gentle green - friendly and natural
  accent: '#90CAF9',       // Light blue - calming
  tertiary: '#C8E6C9',     // Very light green - soothing
  quaternary: '#FFF9C4',   // Soft yellow - warm and inviting
  background: '#FAFAFA',   // Warm off-white - easier on eyes
  backgroundAlt: '#F1F8E9', // Very light green tint
  backgroundGradient: 'linear-gradient(135deg, #FFE0B2 0%, #FFCCBC 100%)', // Warm peach gradient
  foodGradient: 'linear-gradient(45deg, #FF8A80 0%, #81C784 50%, #90CAF9 100%)', // Soft food gradient
  kitchenGradient: 'linear-gradient(135deg, #FF8A80 0%, #81C784 50%, #C8E6C9 100%)', // Gentle kitchen gradient
  text: '#424242',         // Softer dark gray
  textSecondary: '#757575', // Medium gray - better readability
  textLight: '#BDBDBD',    // Light gray
  grey: '#F5F5F5',         // Very light gray
  card: '#FFFFFF',         // Pure white
  cardShadow: 'rgba(0, 0, 0, 0.05)', // Very soft shadow
  border: '#E8F5E8',       // Very light green border
  success: '#66BB6A',      // Friendly green
  warning: '#FFB74D',      // Warm orange
  error: '#EF5350',        // Gentle red
  info: '#42A5F5',         // Friendly blue
  dark: '#37474F',         // Softer dark
  light: '#FFFFFF',        // White
  kitchenWood: '#8D6E63',  // Warmer brown tone
  marble: '#FAFAFA',       // Light marble
  steel: '#E0E0E0',        // Soft steel
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
