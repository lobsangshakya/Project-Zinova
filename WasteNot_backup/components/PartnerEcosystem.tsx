import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { AnimatedSection } from '@/components/AnimatedSection';

export const PartnerEcosystem = () => {
  const partners = [
    {
      type: 'Farmers & Producers',
      description: 'Surplus crops and products redirected to communities',
      icon: '👨‍🌾',
    },
    {
      type: 'Restaurants & Hotels',
      description: 'Unused prepared food and ingredients shared daily',
      icon: '🍽️',
    },
    {
      type: 'Non-Profit Organizations',
      description: 'Community groups distributing food to those in need',
      icon: '🤝',
    },
    {
      type: 'Logistics Partners',
      description: 'Transportation services ensuring fresh delivery',
      icon: '🚚',
    },
  ];

  return (
    <AnimatedSection style={[styles.container, styles.altBackground]}>
      <Text style={styles.sectionTitle}>Partner Ecosystem</Text>
      <Text style={styles.sectionSubtitle}>
        A collaborative network driving sustainable food redistribution
      </Text>
      
      <View style={styles.partnersContainer}>
        {partners.map((partner, index) => (
          <View key={index} style={styles.partnerCard}>
            <Text style={styles.partnerIcon}>{partner.icon}</Text>
            <Text style={styles.partnerType}>{partner.type}</Text>
            <Text style={styles.partnerDescription}>{partner.description}</Text>
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
  altBackground: {
    backgroundColor: colors.backgroundAlt,
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
  partnersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  partnerCard: {
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
    alignItems: 'center',
  },
  partnerIcon: {
    fontSize: 40,
    marginBottom: 20,
  },
  partnerType: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  partnerDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
});