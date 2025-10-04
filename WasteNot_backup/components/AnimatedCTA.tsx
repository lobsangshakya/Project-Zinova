import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/commonStyles';

export const AnimatedCTA = () => {
  const pulseValue = useRef(new Animated.Value(1)).current;
  const bounceValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation for the button glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Bounce animation for the container
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1.03,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePress = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.ctaContainer, 
          { 
            transform: [{ scale: bounceValue }],
          }
        ]}
      >
        <Text style={styles.ctaTitle}>Ready to Transform Your Kitchen?</Text>
        <Text style={styles.ctaSubtitle}>
          Join thousands of home cooks reducing waste and creating amazing meals
        </Text>
        
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <Animated.View 
            style={[
              styles.ctaButton, 
              { 
                transform: [{ scale: pulseValue }],
              }
            ]}
          >
            <Text style={styles.buttonText}>🍳 Start Cooking with Zinova</Text>
          </Animated.View>
        </TouchableOpacity>
        
        <Text style={styles.ctaDescription}>
          No credit card required • Free forever • Join our community today
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaContainer: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: colors.tertiary,
    borderRadius: 25,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 26,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.light,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});