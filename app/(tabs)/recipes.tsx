
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Quick Meals', 'Vegetarian', 'Soup', 'Salad', 'Dessert'];

  const mockRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Tomato Bread Bruschetta',
      description: 'A delicious way to use up tomatoes and bread',
      ingredients: ['Tomatoes', 'Bread', 'Garlic', 'Olive Oil'],
      cookTime: '15 min',
      difficulty: 'Easy',
      category: 'Quick Meals',
    },
    {
      id: '2',
      title: 'Fresh Tomato Soup',
      description: 'Warm and comforting soup made with fresh tomatoes',
      ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Vegetable Broth'],
      cookTime: '30 min',
      difficulty: 'Easy',
      category: 'Soup',
    },
    {
      id: '3',
      title: 'Bread Pudding',
      description: 'Sweet dessert that transforms stale bread',
      ingredients: ['Bread', 'Milk', 'Eggs', 'Sugar', 'Vanilla'],
      cookTime: '45 min',
      difficulty: 'Medium',
      category: 'Dessert',
    },
    {
      id: '4',
      title: 'Caprese Salad',
      description: 'Simple and fresh salad with tomatoes',
      ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil'],
      cookTime: '10 min',
      difficulty: 'Easy',
      category: 'Salad',
    },
  ];

  useEffect(() => {
    // Simulate API call to get recipes based on user's ingredients
    setRecipes(mockRecipes);
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
        <Text style={styles.title}>Recipe Suggestions</Text>
        <Text style={styles.subtitle}>
          Based on your available ingredients
        </Text>
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
        {filteredRecipes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👨‍🍳</Text>
            <Text style={styles.emptyText}>No recipes found</Text>
            <Text style={styles.emptySubtext}>
              Add more ingredients to discover new recipes!
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
                <Text style={styles.ingredientsTitle}>Ingredients:</Text>
                <View style={styles.ingredientsTags}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientTag}>
                      <Text style={styles.ingredientTagText}>{ingredient}</Text>
                    </View>
                  ))}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
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
  },
  recipesList: {
    flex: 1,
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '600',
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
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  recipeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  ingredientsContainer: {
    marginBottom: 16,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: '500',
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
  },
  ingredientTagText: {
    fontSize: 12,
    color: colors.text,
  },
  viewRecipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
  },
  viewRecipeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.background,
    marginRight: 8,
  },
  viewRecipeArrow: {
    fontSize: 14,
    color: colors.background,
  },
});
