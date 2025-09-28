
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';
import { useIngredients, Recipe } from '@/contexts/IngredientsContext';
import { RecipeDetailModal } from '@/components/RecipeDetailModal';
import { AppHeader } from '@/components/AppHeader';

export default function RecipesScreen() {
  const { ingredients, getRecommendedRecipes, getAllRecipes } = useIngredients();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const categories = ['All', 'Quick Meals', 'Main Course', 'Soup', 'Salad'];

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  useEffect(() => {
    // Load recipes based on whether user has ingredients
    if (ingredients.length > 0) {
      const recommended = getRecommendedRecipes();
      if (recommended.length > 0) {
        setRecipes(recommended);
      } else {
        // If no matches, show all recipes
        setRecipes(getAllRecipes());
      }
    } else {
      setRecipes(getAllRecipes());
    }
  }, [ingredients, getRecommendedRecipes, getAllRecipes]);

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
      <AppHeader 
        title="Recipe Ideas" 
        subtitle="Discover delicious recipes with what you have"
      />

      {ingredients.length === 0 ? (
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
      ) : (
        <View style={styles.personalizedHint}>
          <Text style={styles.hintIcon}>✨</Text>
          <Text style={styles.hintText}>
            {getRecommendedRecipes().length > 0 
              ? `Found ${getRecommendedRecipes().length} recipes using your ingredients!`
              : 'Here are some great recipes to try with any ingredients.'
            }
          </Text>
        </View>
      )}

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
              
              <Pressable 
                style={styles.viewRecipeButton}
                onPress={() => handleViewRecipe(recipe)}
              >
                <Text style={styles.viewRecipeText}>View Full Recipe</Text>
                <Text style={styles.viewRecipeArrow}>→</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
      
      <RecipeDetailModal
        recipe={selectedRecipe}
        visible={showRecipeModal}
        onClose={() => {
          setShowRecipeModal(false);
          setSelectedRecipe(null);
        }}
      />
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
  personalizedHint: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
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
