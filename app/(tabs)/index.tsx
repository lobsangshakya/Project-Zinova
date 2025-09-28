
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';

export default function HomeScreen() {
  const mainActions = [
    {
      title: 'Add Your Ingredients',
      description: 'Take a photo or add ingredients you have',
      icon: '📸',
      color: colors.primary,
      action: () => router.push('/ingredients'),
    },
    {
      title: 'Leftover Food Recipe',
      description: 'Get recipes for your leftover ingredients',
      icon: '🔄',
      color: colors.accent,
      action: () => router.push('/swap'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Waste Recipe</Text>
        <Text style={styles.subtitle}>
          Turn your ingredients into delicious meals
        </Text>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroIcon}>🍽️</Text>
        <Text style={styles.heroText}>
          Reduce food waste by discovering recipes that use the ingredients you already have!
        </Text>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        
        {mainActions.map((action, index) => (
          <Pressable
            key={index}
            style={[styles.actionCard, { borderLeftColor: action.color }]}
            onPress={action.action}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDescription}>{action.description}</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </Pressable>
        ))}
        
        <Pressable
          style={styles.recipeButton}
          onPress={() => router.push('/recipes')}
        >
          <Text style={styles.recipeButtonText}>Browse All Recipe Ideas</Text>
        </Pressable>
      </View>

      <View style={styles.howItWorks}>
        <Text style={styles.sectionTitle}>How it works</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Add or photograph your ingredients</Text>
          </View>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Get personalized recipe suggestions</Text>
          </View>
          
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Cook delicious meals & reduce waste</Text>
          </View>
        </View>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  heroText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
  },
  actionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actionArrow: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '600',
  },
  recipeButton: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recipeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  howItWorks: {
    marginBottom: 32,
  },
  stepContainer: {
    paddingHorizontal: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    color: colors.background,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 40,
    marginRight: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
});
