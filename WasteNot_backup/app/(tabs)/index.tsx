import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { AppHeader } from '@/components/AppHeader';
import { AnimatedHero } from '@/components/AnimatedHero';
import { RecipeCards } from '@/components/RecipeCards';
import { CookingDiary } from '@/components/CookingDiary';
import { AnimatedCTA } from '@/components/AnimatedCTA';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.backgroundPattern} />
      
      <AppHeader 
        title="Project Zinova - Smart Kitchen" 
        subtitle="🍽️ Transform ingredients into culinary masterpieces with AI"
      />

      <AnimatedHero />
      
      <RecipeCards />
      
      <CookingDiary />
      
      <AnimatedCTA />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
  content: {
    paddingBottom: 20,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    opacity: 0.7,
    zIndex: 0,
  },
});