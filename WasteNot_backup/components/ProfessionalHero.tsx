import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { AnimatedSection } from '@/components/AnimatedSection';

export const ProfessionalHero = () => {
  return (
    <AnimatedSection style={styles.heroContainer}>
      <View style={styles.heroContent}>
        <Text style={styles.tagline}>TACKLING FOOD WASTE & HUNGER</Text>
        <Text style={styles.title}>Project Zinova: Intelligent Food Redistribution</Text>
        <Text style={styles.description}>
          Connecting farmers, restaurants, and NGOs through AI and blockchain to ensure 
          surplus food reaches communities in need. Together, we're building a sustainable 
          future with zero food waste.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>Join the Movement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>See How It Works</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroVisual}>
        <View style={styles.connectionLines} />
        <View style={[styles.visualElement, styles.farmerElement]}>
          <Text style={styles.visualEmoji}>👨‍🌾</Text>
        </View>
        <View style={[styles.visualElement, styles.restaurantElement]}>
          <Text style={styles.visualEmoji}>🍽️</Text>
        </View>
        <View style={[styles.visualElement, styles.ngoElement]}>
          <Text style={styles.visualEmoji}>🤝</Text>
        </View>
        <View style={[styles.visualElement, styles.communityElement]}>
          <Text style={styles.visualEmoji}>👨‍👩‍👧‍👦</Text>
        </View>
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
    fontWeight: '700',
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
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginRight: 16,
    marginBottom: 10,
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
    marginBottom: 10,
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
    position: 'relative',
  },
  connectionLines: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 100,
  },
  visualElement: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.tertiary,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualEmoji: {
    fontSize: 30,
  },
  farmerElement: {
    top: 0,
    left: '30%',
  },
  restaurantElement: {
    top: '20%',
    right: 0,
  },
  ngoElement: {
    bottom: '20%',
    right: 0,
  },
  communityElement: {
    bottom: 0,
    left: '30%',
  },
});