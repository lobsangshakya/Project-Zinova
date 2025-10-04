import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Add Your Ingredients',
      description: 'Scan or manually input the ingredients you have available in your kitchen.',
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our intelligent system analyzes your ingredients and suggests perfect recipes.',
    },
    {
      number: '03',
      title: 'Cook & Enjoy',
      description: 'Follow step-by-step instructions to create delicious meals with minimal waste.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>How Project Zinova Works</Text>
      <Text style={styles.sectionSubtitle}>
        A simple process to transform your kitchen experience
      </Text>
      
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>{step.number}</Text>
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        ))}
      </View>
    </View>
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
  },
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1000,
  },
  stepCard: {
    width: 300,
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
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});