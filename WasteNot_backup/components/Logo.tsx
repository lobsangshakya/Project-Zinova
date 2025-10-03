import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = false }) => {
  const logoSizes = {
    small: { width: 32, height: 32 },
    medium: { width: 48, height: 48 },
    large: { width: 80, height: 80 },
  };

  const textSizes = {
    small: 14,
    medium: 18,
    large: 24,
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/Zinova_logo.png')}
        style={[styles.logo, logoSizes[size]]}
        resizeMode="contain"
      />
      {showText && (
        <Text style={[styles.text, { fontSize: textSizes[size] }]}>
          Zinova
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginRight: 8,
  },
  text: {
    fontWeight: '700',
    color: colors.text,
  },
});