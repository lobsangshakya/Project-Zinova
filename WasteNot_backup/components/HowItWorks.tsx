import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { AnimatedSection } from '@/components/AnimatedSection';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Real-Time Surplus Detection',
      description: 'AI identifies surplus food from restaurants and farms through smart inventory tracking.',
      icon: '🤖',
    },
    {
      number: '02',
      title: 'Smart Matching Algorithm',
      description: 'Our AI matches surplus food with nearby NGOs and communities in need.',
      icon: '🔗',
    },
    {
      number: '03',
      title: 'Blockchain Verification',
      description: 'Transparent tracking ensures food safety and quality from source to recipient.',
      icon: '🔒',
    },
    {
      number: '04',
      title: 'Efficient Logistics',
      description: 'Azure Maps optimizes delivery routes for maximum efficiency and freshness.',
      icon: '🗺️',
    },
  ];

  return (
    <AnimatedSection style={styles.container}>
      <Text style={styles.sectionTitle}>How Project Zinova Works</Text>
      <Text style={styles.sectionSubtitle}>
        Our technology platform connects the entire food redistribution ecosystem
      </Text>
      
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <Text style={styles.stepIcon}>{step.icon}</Text>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>{step.number}</Text>
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        ))}
      </View>
    </AnimatedSection>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
    maxWidth: 700,
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1200,
  },
  stepCard: {
    width: 280,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 30,
    margin: 15,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    alignItems: 'center',
  },
  stepIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  stepNumberContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
});