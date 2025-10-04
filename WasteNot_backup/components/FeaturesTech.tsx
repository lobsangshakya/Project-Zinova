import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';

export const FeaturesTech = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Recommendations',
      description: 'Advanced machine learning algorithms suggest recipes based on your ingredients and preferences.',
    },
    {
      icon: '📊',
      title: 'Smart Dashboards',
      description: 'Track your cooking habits, waste reduction, and nutritional intake with intuitive analytics.',
    },
    {
      icon: '🔗',
      title: 'Blockchain Integration',
      description: 'Securely track food sources and ensure quality with our blockchain-based verification system.',
    },
    {
      icon: '📱',
      title: 'Mobile & Web Platforms',
      description: 'Access your kitchen assistant anywhere with our responsive apps for all devices.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Cutting-Edge Technology</Text>
      <Text style={styles.sectionSubtitle}>
        Powerful features designed to revolutionize your kitchen experience
      </Text>
      
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: colors.backgroundAlt,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  featureCard: {
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
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
});