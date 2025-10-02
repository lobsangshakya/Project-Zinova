
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
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

  const categories = [
    { name: 'All', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=120&fit=crop&auto=format' },
    { name: 'Quick Meals', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=120&fit=crop&auto=format' },
    { name: 'Main Course', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&h=120&fit=crop&auto=format' },
    { name: 'Soup', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=120&fit=crop&auto=format' },
    { name: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=120&fit=crop&auto=format' }
  ];

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

  const getRecipeImage = (title: string) => {
    const recipeImages: { [key: string]: string } = {
      'Veggie Stir Fry': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format',
      'Chicken Rice Bowl': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format',
      'Tomato Pasta': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&auto=format',
      'Fruit Smoothie': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&auto=format',
      'Cheese Omelette': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&auto=format',
      'Fresh Garden Salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format',
      'Beef Stew': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
      'Vegetable Soup': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop&auto=format',
      'default': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format'
    };
    return recipeImages[title] || recipeImages['default'];
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.backgroundPattern}>
        <Text style={styles.backgroundEmoji}>🍲</Text>
        <Text style={styles.backgroundEmoji}>🍝</Text>
        <Text style={styles.backgroundEmoji}>🍳</Text>
        <Text style={styles.backgroundEmoji}>🍽️</Text>
      </View>
      
      <AppHeader 
        title="Kitchen Recipe Ideas" 
        subtitle="Discover delicious recipes with what you have in your kitchen"
      />

      {ingredients.length === 0 ? (
        <View style={styles.noIngredientsHint}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop&auto=format' }}
            style={styles.hintImage}
            resizeMode="cover"
          />
          <View style={styles.hintContent}>
            <Text style={styles.hintIcon}>💡</Text>
            <Text style={styles.hintText}>
              Add ingredients in "Kitchen Ingredients" to get personalized recipe suggestions!
            </Text>
            <Button 
              onPress={() => router.push('/ingredients')}
              variant="outline"
              size="sm"
              style={styles.addIngredientsButton}
            >
              📷 Add Kitchen Ingredients
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.personalizedHint}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=150&fit=crop&auto=format' }}
            style={styles.personalizedImage}
            resizeMode="cover"
          />
          <View style={styles.personalizedContent}>
            <Text style={styles.hintIcon}>👨‍🍳</Text>
            <Text style={styles.hintText}>
              {getRecommendedRecipes().length > 0 
                ? `Found ${getRecommendedRecipes().length} recipes using your kitchen ingredients!`
                : 'Here are some great recipes to try with any ingredients from your kitchen.'
              }
            </Text>
          </View>
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
            key={category.name}
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <Image 
              source={{ uri: category.image }}
              style={styles.categoryImage}
              resizeMode="cover"
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name && styles.categoryTextActive,
              ]}
            >
              {category.name}
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
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIconText}>👨‍🍳</Text>
              <Text style={styles.foodDisplayEmojis}>🍲🍝🍳</Text>
            </View>
            <Text style={styles.emptyText}>No recipes found</Text>
            <Text style={styles.emptySubtext}>
              Try selecting a different category or add more ingredients to your kitchen!
            </Text>
          </View>
        ) : (
          filteredRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <Image 
                source={{ uri: getRecipeImage(recipe.title) }}
                style={styles.recipeImage}
                resizeMode="cover"
              />
              <View style={styles.recipeContent}>
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
    position: 'relative',
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    bottom: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0.04,
    zIndex: 0,
  },
  backgroundEmoji: {
    fontSize: 80,
    color: colors.primary,
    margin: 40,
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
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  hintImage: {
    width: '100%',
    height: 120,
  },
  hintContent: {
    padding: 16,
    alignItems: 'center',
  },
  personalizedHint: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  personalizedImage: {
    width: '100%',
    height: 100,
  },
  personalizedContent: {
    padding: 16,
    alignItems: 'center',
  },
  hintIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  hintIconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  foodDisplayEmojis: {
    fontSize: 20,
    marginTop: 5,
    letterSpacing: 3,
  },
  chefEmojis: {
    fontSize: 18,
    marginTop: 3,
    letterSpacing: 2,
  },
  emptyIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIconText: {
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    minWidth: 120,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryImage: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    marginBottom: 8,
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
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeContent: {
    padding: 20,
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
