import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';
import { AppHeader } from '@/components/AppHeader';

export default function HomeScreen() {
  const mainActions = [
    {
      title: '📸 Add Your Ingredients',
      description: 'Snap a quick photo or tell us what\'s in your kitchen',
      icon: '🥗',
      image: 'https://images.unsplash.com/photo-1506368083636-6defb67639a7?w=400&h=300&fit=crop&auto=format',
      color: colors.primary,
      bgColor: 'rgba(255, 138, 128, 0.08)',
      action: () => router.push('/ingredients'),
    },
    {
      title: '✨ Create Magic Meals',
      description: 'Turn your ingredients into something delicious!',
      icon: '🍳',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&auto=format',
      color: colors.secondary,
      bgColor: 'rgba(129, 199, 132, 0.08)',
      action: () => router.push('/swap'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.backgroundImage} />
      
      <AppHeader 
        title="Welcome to Your Kitchen! 🏠" 
        subtitle="Let's cook something amazing together"
      />

      <View style={styles.heroSection}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop&auto=format' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <View style={styles.kitchenIcon}>
            <Text style={styles.kitchenIconText}>✨ KITCHEN MAGIC ✨</Text>
          </View>
          <Text style={styles.heroText}>
            Transform your ingredients into delicious meals and reduce food waste with AI-powered recipe suggestions! 🍽️
          </Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        
        {mainActions.map((action, index) => (
          <Pressable
            key={index}
            style={[styles.actionCard, { borderLeftColor: action.color, backgroundColor: action.bgColor }]}
            onPress={action.action}
          >
            <Image 
              source={{ uri: action.image }}
              style={styles.actionImage}
              resizeMode="cover"
            />
            <View style={styles.actionContent}>
              <View style={[styles.actionIconContainer, { backgroundColor: action.color }]}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
              </View>
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
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop&auto=format' }}
            style={styles.recipeButtonImage}
            resizeMode="cover"
          />
          <View style={styles.recipeButtonOverlay}>
            <Text style={styles.recipeButtonText}>🍳 Browse All Kitchen Recipes</Text>
          </View>
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
    backgroundColor: colors.card,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 32,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  kitchenIcon: {
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  kitchenIconText: {
    fontSize: 12,
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
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  actionImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  actionIconContainer: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
    minWidth: 40,
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actionArrowContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  actionArrow: {
    fontSize: 20,
    color: colors.light,
    fontWeight: '700',
  },
  recipeButton: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginTop: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  recipeButtonImage: {
    width: '100%',
    height: 80,
  },
  recipeButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 107, 107, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.light,
    textAlign: 'center',
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