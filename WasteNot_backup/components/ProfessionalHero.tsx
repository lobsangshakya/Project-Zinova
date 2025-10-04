import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { AnimatedSection } from '@/components/AnimatedSection';

export const ProfessionalHero = () => {
  return (
    <AnimatedSection style={styles.heroContainer}>
      <View style={styles.heroContent}>
        <Text style={styles.tagline}>Transforming Kitchens with Intelligent Technology</Text>
        <Text style={styles.title}>Project Zinova: Smart Kitchen Solutions</Text>
        <Text style={styles.description}>
          Our AI-powered platform helps you reduce food waste, discover delicious recipes, 
          and elevate your cooking experience through innovative technology.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroVisual}>
        <View style={styles.visualElement} />
      </View>
    </AnimatedSection>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    flexDirection: 'row',
    padding: 40,
    backgroundColor: colors.card,
    borderRadius: 16,
    margin: 20,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 30,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 20,
    lineHeight: 42,
  },
  description: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 30,
    lineHeight: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginRight: 16,
  },
  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 30,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  heroVisual: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualElement: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.tertiary,
    borderWidth: 2,
    borderColor: colors.border,
  },
});