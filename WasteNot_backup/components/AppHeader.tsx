import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { colors } from '@/styles/commonStyles';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title, 
  subtitle, 
  showLogo = true 
}) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop&auto=format' }}
      style={styles.header}
      resizeMode="cover"
    >
      <View style={styles.gradientOverlay} />
      <View style={styles.content}>
        {showLogo && (
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/WasteNot_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandText}>WasteNot Kitchen 😊</Text>
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 107, 107, 0.85)',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.light,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});