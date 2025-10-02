import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';
import { AppHeader } from '@/components/AppHeader';

export default function HomeScreen() {
  const mainActions = [
    {
      title: 'Add Your Ingredients',
      description: 'Take a photo or add ingredients you have available',
      icon: '📸',
      color: colors.primary,
      bgColor: '#E8F5E8',
      action: () => router.push('/ingredients'),
    },
    {
      title: 'Leftover Magic',
      description: 'Transform your leftover ingredients into amazing meals',
      icon: '✨',
      color: colors.secondary,
      bgColor: '#FFF8E8',
      action: () => router.push('/swap'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.backgroundImage} />
      
      <AppHeader 
        title="Your Kitchen Assistant" 
        subtitle="Turn your ingredients into delicious meals and reduce food waste"
      />

      <View style={styles.heroSection}>
        <View style={styles.foodImageContainer}>
          <View style={styles.vegetablePattern} />
          <View style={styles.fruitPattern} />
          <View style={styles.grainPattern} />
        </View>
        <View style={styles.kitchenIcon}>
          <Text style={styles.kitchenIconText}>✨ KITCHEN MAGIC ✨</Text>
        </View>
        <Text style={styles.heroText}>
          Transform your ingredients into delicious meals and reduce food waste with AI-powered recipe suggestions! 🍽️
        </Text>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        
        {mainActions.map((action, index) => (
          <Pressable
            key={index}
            style={[styles.actionCard, { borderLeftColor: action.color, backgroundColor: action.bgColor }]}
            onPress={action.action}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: action.color }]}>
              <Text style={styles.actionIcon}>{action.icon}</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDescription}>{action.description}</Text>
            </View>
            <View style={styles.actionArrowContainer}>
              <Text style={styles.actionArrow}>→</Text>
            </View>
          </Pressable>
        ))}
        
        <Pressable
          style={styles.recipeButton}
          onPress={() => router.push('/recipes')}
        >
          <Text style={styles.recipeButtonText}>Browse All Kitchen Recipes</Text>
        </Pressable>
      </View>

      <View style={styles.howItWorks}>
        <Text style={styles.sectionTitle}>How Your Kitchen Assistant Works</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <Text style={styles.stepText}>Add or photograph your available ingredients</Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <Text style={styles.stepText}>Get personalized recipe suggestions from your kitchen</Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <Text style={styles.stepText}>Cook delicious meals and reduce food waste</Text>
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
    position: 'relative',
  },
  content: {
    paddingBottom: 20,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(245, 222, 179, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(210, 105, 30, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)',
    opacity: 0.7,
    zIndex: 0,
  },
  heroSection: {
    alignItems: 'center',
    backgroundColor: colors.marble,
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    marginBottom: 32,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 6,
    borderWidth: 2,
    borderColor: colors.steel,
    position: 'relative',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(245, 222, 179, 0.3)',
    borderRadius: 18,
  },
  foodImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  vegetablePattern: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#228B22',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fruitPattern: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6347',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  grainPattern: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DAA520',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  kitchenIcon: {
    backgroundColor: colors.kitchenWood,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  kitchenIconText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.light,
    letterSpacing: 2,
    textAlign: 'center',
  },
  heroIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  heroText: {
    fontSize: 18,
    color: colors.dark,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  actionsSection: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 24,
    marginBottom: 16,
    borderLeftWidth: 6,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopWidth: 2,
    borderTopColor: colors.steel,
  },
  actionIconContainer: {
    backgroundColor: colors.tertiary,
    borderRadius: 12,
    padding: 12,
    marginRight: 20,
    borderWidth: 2,
    borderColor: colors.kitchenWood,
    minWidth: 50,
    alignItems: 'center',
  },
  actionIconText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.dark,
    letterSpacing: 1,
  },
  actionIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  actionEmojis: {
    fontSize: 16,
    marginTop: 2,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  actionDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  actionArrowContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  actionArrow: {
    fontSize: 20,
    color: colors.light,
    fontWeight: '700',
  },
  recipeButton: {
    backgroundColor: colors.tertiary,
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.dark,
  },
  howItWorks: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingHorizontal: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },
  stepNumberContainer: {
    backgroundColor: colors.kitchenWood,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 3,
    borderColor: colors.secondary,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.light,
    textAlign: 'center',
  },
  stepText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    fontWeight: '500',
    lineHeight: 22,
  },
});