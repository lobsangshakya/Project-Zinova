
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';

export default function WelcomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={[commonStyles.title, styles.title]}>
          🌱 FoodSwap
        </Text>
        <Text style={[commonStyles.subtitle, styles.subtitle]}>
          Reduce Food Waste Together
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🍎</Text>
          <Text style={styles.featureTitle}>Share Ingredients</Text>
          <Text style={styles.featureText}>
            Upload your leftover food items and connect with nearby users
          </Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>👨‍🍳</Text>
          <Text style={styles.featureTitle}>Get Recipe Ideas</Text>
          <Text style={styles.featureText}>
            Discover delicious recipes based on your available ingredients
          </Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🏆</Text>
          <Text style={styles.featureTitle}>Earn Points</Text>
          <Text style={styles.featureText}>
            Get rewarded for reducing food waste and helping your community
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => router.push('/(auth)/register')}
          style={styles.primaryButton}
        >
          Get Started
        </Button>
        
        <Button
          onPress={() => router.push('/(auth)/login')}
          variant="outline"
          style={styles.secondaryButton}
        >
          I already have an account
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  feature: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    borderColor: colors.primary,
  },
});
