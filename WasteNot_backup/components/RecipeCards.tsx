import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/commonStyles';

interface RecipeCardProps {
  title: string;
  description: string;
  prepTime: string;
  difficulty: string;
  imageColor: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  title, 
  description, 
  prepTime, 
  difficulty,
  imageColor 
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '5deg'],
  });

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      style={{ margin: 10 }}
    >
      <Animated.View 
        style={[
          styles.recipeCard, 
          { 
            transform: [{ scale: scaleValue }, { rotate: rotateInterpolate }],
          }
        ]}
      >
        <View style={[styles.recipeImage, { backgroundColor: imageColor }]}>
          <Text style={styles.recipeEmoji}>🍽️</Text>
        </View>
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{title}</Text>
          <Text style={styles.recipeDescription}>{description}</Text>
          <View style={styles.recipeDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>⏱️</Text>
              <Text style={styles.detailText}>{prepTime}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>🔥</Text>
              <Text style={styles.detailText}>{difficulty}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const RecipeCards = () => {
  const recipes = [
    {
      title: "Mediterranean Quinoa Bowl",
      description: "A healthy and colorful bowl packed with fresh vegetables and Mediterranean flavors.",
      prepTime: "25 mins",
      difficulty: "Easy",
      imageColor: "#4ECDC4",
    },
    {
      title: "Spicy Thai Basil Chicken",
      description: "Authentic Thai stir-fry with aromatic basil and perfectly balanced spices.",
      prepTime: "20 mins",
      difficulty: "Medium",
      imageColor: "#FF6B6B",
    },
    {
      title: "Creamy Mushroom Risotto",
      description: "Rich and creamy Italian classic with seasonal mushrooms and parmesan.",
      prepTime: "40 mins",
      difficulty: "Hard",
      imageColor: "#FFE66D",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Recipes</Text>
      <Text style={styles.sectionSubtitle}>Discover our chef-curated collection</Text>
      
      <View style={styles.cardsContainer}>
        {recipes.map((recipe, index) => (
          <RecipeCard 
            key={index}
            title={recipe.title}
            description={recipe.description}
            prepTime={recipe.prepTime}
            difficulty={recipe.difficulty}
            imageColor={recipe.imageColor}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  recipeCard: {
    width: 300,
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
    margin: 10,
  },
  recipeImage: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeEmoji: {
    fontSize: 60,
  },
  recipeContent: {
    padding: 20,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  recipeDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 15,
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    marginRight: 5,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
});