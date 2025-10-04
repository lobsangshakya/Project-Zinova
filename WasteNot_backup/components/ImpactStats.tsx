import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';

export const ImpactStats = () => {
  const stats = [
    {
      value: '2.4M+',
      label: 'Meals Created',
      description: 'Delicious recipes made by our users',
    },
    {
      value: '850T',
      label: 'Food Waste Prevented',
      description: 'Tons of food saved from landfills',
    },
    {
      value: '150K+',
      label: 'Active Users',
      description: 'Home cooks using Project Zinova',
    },
    {
      value: '98%',
      label: 'User Satisfaction',
      description: 'Rated excellent by our community',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Our Global Impact</Text>
      <Text style={styles.sectionSubtitle}>
        Making a difference, one kitchen at a time
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