import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { colors } from '@/styles/commonStyles';

export const AnimatedHero = () => {
  const steamPosition = useRef(new Animated.Value(0)).current;
  const spoonRotation = useRef(new Animated.Value(0)).current;
  const ingredientBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Steam animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(steamPosition, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(steamPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Spoon rotation animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(spoonRotation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(spoonRotation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Ingredient bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(ingredientBounce, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(ingredientBounce, {
          toValue: 0,
          duration: 1500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const steamTranslateY = steamPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const spoonRotate = spoonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const ingredientTranslateY = ingredientBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <View style={styles.heroContainer}>
      <View style={styles.heroBackground}>
        {/* Animated steam elements */}
        <Animated.View 
          style={[
            styles.steamBubble, 
            { 
              transform: [{ translateY: steamTranslateY }],
              left: '20%',
              opacity: 0.7,
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.steamBubble, 
            { 
              transform: [{ translateY: steamTranslateY }],
              left: '30%',
              opacity: 0.5,
              delay: 500,
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.steamBubble, 
            { 
              transform: [{ translateY: steamTranslateY }],
              left: '70%',
              opacity: 0.6,
              delay: 1000,
            }
          ]} 
        />
        
        {/* Animated cooking pot */}
        <View style={styles.cookingPot}>
          <View style={styles.potBody} />
          <View style={styles.potLid} />
          <View style={styles.potHandle} />
        </View>
        
        {/* Animated spoon */}
        <Animated.View 
          style={[
            styles.spoon, 
            { 
              transform: [{ rotate: spoonRotate }],
            }
          ]} 
        >
          <View style={styles.spoonBowl} />
          <View style={styles.spoonHandle} />
        </Animated.View>
        
        {/* Animated ingredients */}
        <Animated.View 
          style={[
            styles.ingredient, 
            { 
              backgroundColor: '#FF6B6B',
              top: '60%',
              left: '15%',
              transform: [{ translateY: ingredientTranslateY }],
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.ingredient, 
            { 
              backgroundColor: '#4ECDC4',
              top: '55%',
              left: '25%',
              transform: [{ translateY: ingredientTranslateY }],
              delay: 300,
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.ingredient, 
            { 
              backgroundColor: '#FFE66D',
              top: '65%',
              left: '80%',
              transform: [{ translateY: ingredientTranslateY }],
              delay: 600,
            }
          ]} 
        />
      </View>
      
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>🍳 Project Zinova</Text>
        <Text style={styles.heroSubtitle}>Transform Your Kitchen Into a Culinary Wonderland</Text>
        <Text style={styles.heroDescription}>
          Discover delicious recipes, reduce food waste, and elevate your cooking experience with our AI-powered kitchen assistant.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    height: 500,
    backgroundColor: colors.tertiary,
    borderRadius: 20,
    margin: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  heroBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backgroundGradient,
    justifyContent: 'center',
    alignItems: 'center',
  },
  steamBubble: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    top: '30%',
  },
  cookingPot: {
    position: 'absolute',
    top: '40%',
    width: 120,
    height: 100,
    alignItems: 'center',
  },
  potBody: {
    width: 100,
    height: 60,
    backgroundColor: '#8B4513',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 3,
    borderTopColor: '#A0522D',
  },
  potLid: {
    width: 120,
    height: 15,
    backgroundColor: '#A0522D',
    borderRadius: 8,
    marginBottom: 2,
  },
  potHandle: {
    position: 'absolute',
    right: -15,
    top: 20,
    width: 20,
    height: 30,
    backgroundColor: '#A0522D',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  spoon: {
    position: 'absolute',
    top: '35%',
    left: '60%',
  },
  spoonBowl: {
    width: 25,
    height: 25,
    backgroundColor: '#C0C0C0',
    borderRadius: 15,
    marginBottom: 2,
  },
  spoonHandle: {
    width: 5,
    height: 40,
    backgroundColor: '#C0C0C0',
    marginLeft: 10,
  },
  ingredient: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  heroContent: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
  },
  heroDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
});