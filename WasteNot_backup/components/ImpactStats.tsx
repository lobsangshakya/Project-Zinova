import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { AnimatedSection } from '@/components/AnimatedSection';

export const ImpactStats = () => {
  const stats = [
    {
      value: '1.2M+',
      label: 'Meals Distributed',
      description: 'Nutritious meals delivered to communities in need',
    },
    {
      value: '650T',
      label: 'Food Waste Prevented',
      description: 'Tons of surplus food redirected from landfills',
    },
    {
      value: '850+',
      label: 'Partner Organizations',
      description: 'Restaurants, farms, and NGOs in our network',
    },
    {
      value: '95%',
      label: 'User Satisfaction',
      description: 'Rated excellent by our community partners',
    },
  ];

  return (
    <AnimatedSection style={styles.container}>
      <Text style={styles.sectionTitle}>Our Social Impact</Text>
      <Text style={styles.sectionSubtitle}>
        Making a measurable difference in the fight against food waste and hunger
      </Text>
      
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statDescription}>{stat.description}</Text>
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1200,
  },
  statCard: {
    width: 250,
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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  statDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});