
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  servings: string;
  instructions: string[];
}

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Quick Meals', 'Vegetarian', 'Soup', 'Salad', 'Main Course'];

  // Sample recipes - you can replace with real data or API calls
  const sampleRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Simple Vegetable Stir Fry',
      description: 'A quick and healthy way to use up any vegetables you have',
      ingredients: ['Mixed vegetables', 'Oil', 'Garlic', 'Soy sauce', 'Salt'],
      cookTime: '15 min',
      difficulty: 'Easy',
      category: 'Quick Meals',
      servings: '2-3',
      instructions: [
        'Heat oil in a large pan',
        'Add garlic and cook for 1 minute',
        'Add vegetables and stir fry for 5-8 minutes',
        'Season with soy sauce and salt',
        'Serve hot'
      ],
    },
    {
      id: '2',
      title: 'Fresh Garden Salad',
      description: 'Perfect for using up fresh vegetables and greens',
      ingredients: ['Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil', 'Lemon juice'],
      cookTime: '10 min',
      difficulty: 'Easy',
      category: 'Salad',
      servings: '2',
      instructions: [
        'Wash and chop all vegetables',
        'Mix greens in a large bowl',
        'Add chopped vegetables',
        'Drizzle with olive oil and lemon juice',
        'Toss and serve immediately'
      ],
    },
    {
      id: '3',
      title: 'Hearty Vegetable Soup',
      description: 'Warm and comforting soup using seasonal vegetables',
      ingredients: ['Mixed vegetables', 'Vegetable broth', 'Onion', 'Herbs', 'Salt'],
      cookTime: '30 min',
      difficulty: 'Easy',
      category: 'Soup',
      servings: '4',
      instructions: [
        'Chop all vegetables into bite-sized pieces',
        'Sauté onion until translucent',
        'Add vegetables and cook for 5 minutes',
        'Pour in broth and bring to boil',
        'Simmer for 20 minutes until tender',
        'Season with herbs and salt'
      ],
    },
  ];

  useEffect(() => {
    // In a real app, this would fetch recipes based on user's ingredients
    setRecipes(sampleRecipes);
  }, []);

  const filteredRecipes = selectedCategory === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return colors.success;
      case 'Medium': return colors.warning;
      case 'Hard': return colors.error;
      default: return colors.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipe Ideas</Text>
        <Text style={styles.subtitle}>
          Discover delicious recipes with what you have
        </Text>
      </View>

      <View style={styles.noIngredientsHint}>
        <Text style={styles.hintIcon}>💡</Text>
        <Text style={styles.hintText}>
          Add ingredients in "My Ingredients" to get personalized recipe suggestions!
        </Text>
        <Button 
          onPress={() => router.push('/ingredients')}
          variant="outline"
          size="sm"
          style={styles.addIngredientsButton}
        >
          Add Ingredients
        </Button>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.recipesList}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'All' ? 'All Recipes' : selectedCategory} ({filteredRecipes.length})
        </Text>
        
        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👨‍🍳</Text>
            <Text style={styles.emptyText}>No recipes found</Text>
            <Text style={styles.emptySubtext}>
              Try selecting a different category or add more ingredients!
            </Text>
          </View>
        ) : (
          filteredRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <View style={styles.recipeHeader}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.recipeMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>⏱️</Text>
                    <Text style={styles.metaText}>{recipe.cookTime}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaIcon}>👥</Text>
                    <Text style={styles.metaText}>{recipe.servings}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text 
                      style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(recipe.difficulty) }
                      ]}
                    >
                      {recipe.difficulty}
                    </Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.recipeDescription}>
                {recipe.description}
              </Text>
              
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Ingredients needed:</Text>
                <View style={styles.ingredientsTags}>
                  {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                    <View key={index} style={styles.ingredientTag}>
                      <Text style={styles.ingredientTagText}>{ingredient}</Text>
                    </View>
                  ))}
                  {recipe.ingredients.length > 4 && (
                    <View style={styles.ingredientTag}>
                      <Text style={styles.ingredientTagText}>+{recipe.ingredients.length - 4} more</Text>
                    </View>
                  )}
                </View>
              </View>
              
              <Pressable style={styles.viewRecipeButton}>
                <Text style={styles.viewRecipeText}>View Full Recipe</Text>
                <Text style={styles.viewRecipeArrow}>→</Text>
              </Pressable>
            </View>
          ))
        )}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  noIngredientsHint: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  hintIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  addIngredientsButton: {
    marginTop: 8,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryScrollContent: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: colors.background,
    fontWeight: '600',
  },
  recipesList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  recipeCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  recipeMeta: {
    alignItems: 'flex-end',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  recipeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  ingredientsContainer: {
    marginBottom: 16,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  ingredientsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientTag: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ingredientTagText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  viewRecipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  viewRecipeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
    marginRight: 8,
  },
  viewRecipeArrow: {
    fontSize: 14,
    color: colors.background,
    fontWeight: '600',
  },
});
