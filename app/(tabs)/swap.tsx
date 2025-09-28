import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';

interface LeftoverRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: string;
  instructions: string[];
}

export default function LeftoverMagicScreen() {
  const [leftoverIngredients, setLeftoverIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [recommendedRecipes, setRecommendedRecipes] = useState<LeftoverRecipe[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sample leftover recipes
  const sampleLeftoverRecipes: LeftoverRecipe[] = [
    {
      id: '1',
      title: 'Everything Fried Rice',
      description: 'Perfect way to use up any leftover vegetables, meat, and rice',
      ingredients: ['Leftover rice', 'Any vegetables', 'Eggs', 'Soy sauce', 'Oil'],
      cookTime: '15 min',
      difficulty: 'Easy',
      servings: '2-3',
      instructions: [
        'Heat oil in a large pan or wok',
        'Add any leftover vegetables and cook for 2-3 minutes',
        'Add cold leftover rice, breaking up clumps',
        'Push rice to one side, scramble eggs on the other',
        'Mix everything together with soy sauce',
        'Cook for 2-3 more minutes until heated through'
      ],
    },
    {
      id: '2',
      title: 'Quick Vegetable Soup',
      description: 'Turn any leftover vegetables into a warming soup',
      ingredients: ['Mixed leftover vegetables', 'Broth or water', 'Onion', 'Garlic', 'Salt'],
      cookTime: '20 min',
      difficulty: 'Easy',
      servings: '3-4',
      instructions: [
        'Chop onion and garlic, sauté until fragrant',
        'Add any leftover vegetables, chopped',
        'Pour in broth or water to cover',
        'Bring to boil, then simmer for 15 minutes',
        'Season with salt and pepper',
        'Blend if desired for smooth soup'
      ],
    },
    {
      id: '3',
      title: 'Leftover Pasta Frittata',
      description: 'Transform leftover pasta into a delicious egg dish',
      ingredients: ['Leftover pasta', 'Eggs', 'Any cheese', 'Leftover vegetables', 'Oil'],
      cookTime: '25 min',
      difficulty: 'Medium',
      servings: '4',
      instructions: [
        'Preheat oven to 375°F (190°C)',
        'Beat eggs in a bowl, mix in pasta and vegetables',
        'Heat oil in oven-safe pan',
        'Pour in egg mixture, cook on stove for 5 minutes',
        'Sprinkle cheese on top',
        'Transfer to oven for 15-20 minutes until set'
      ],
    },
  ];

  const takePhotoOfLeftovers = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow camera access to take photos of your leftover food.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        setIsAnalyzing(true);
        
        // Simulate AI analysis
        setTimeout(() => {
          const mockAnalyzedIngredients = ['Rice', 'Carrots', 'Chicken', 'Green beans'];
          setLeftoverIngredients([...leftoverIngredients, ...mockAnalyzedIngredients]);
          generateRecipeRecommendations([...leftoverIngredients, ...mockAnalyzedIngredients]);
          setIsAnalyzing(false);
          Alert.alert('Photo Analyzed!', 'We detected some ingredients in your photo. Check the list below and add any we missed!');
        }, 2000);
      }
    } catch (error) {
      setIsAnalyzing(false);
      Alert.alert('Error', 'Unable to take photo. Please try again.');
    }
  };

  const pickImageOfLeftovers = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow access to your photo library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        setIsAnalyzing(true);
        
        // Simulate AI analysis
        setTimeout(() => {
          const mockAnalyzedIngredients = ['Pasta', 'Tomatoes', 'Bell peppers', 'Cheese'];
          setLeftoverIngredients([...leftoverIngredients, ...mockAnalyzedIngredients]);
          generateRecipeRecommendations([...leftoverIngredients, ...mockAnalyzedIngredients]);
          setIsAnalyzing(false);
          Alert.alert('Photo Analyzed!', 'We detected some ingredients in your photo. Check the list below and add any we missed!');
        }, 2000);
      }
    } catch (error) {
      setIsAnalyzing(false);
      Alert.alert('Error', 'Unable to select image. Please try again.');
    }
  };

  const addIngredientManually = () => {
    if (newIngredient.trim()) {
      const updatedIngredients = [...leftoverIngredients, newIngredient.trim()];
      setLeftoverIngredients(updatedIngredients);
      generateRecipeRecommendations(updatedIngredients);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = leftoverIngredients.filter((_, i) => i !== index);
    setLeftoverIngredients(updatedIngredients);
    generateRecipeRecommendations(updatedIngredients);
  };

  const generateRecipeRecommendations = (ingredients: string[]) => {
    if (ingredients.length > 0) {
      // In a real app, this would call an AI API to generate recipes based on ingredients
      setRecommendedRecipes(sampleLeftoverRecipes);
    } else {
      setRecommendedRecipes([]);
    }
  };

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
        <Text style={styles.title}>Leftover Magic ✨</Text>
        <Text style={styles.subtitle}>
          Turn your leftover ingredients into amazing meals
        </Text>
      </View>

      <View style={styles.photoSection}>
        <Text style={styles.sectionTitle}>What leftovers do you have?</Text>
        
        <View style={styles.photoButtons}>
          <Pressable 
            style={[styles.photoButton, isAnalyzing && styles.photoButtonDisabled]} 
            onPress={takePhotoOfLeftovers}
            disabled={isAnalyzing}
          >
            <Text style={styles.photoIcon}>📷</Text>
            <Text style={styles.photoButtonText}>
              {isAnalyzing ? 'Analyzing...' : 'Take Photo'}
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.photoButton, isAnalyzing && styles.photoButtonDisabled]} 
            onPress={pickImageOfLeftovers}
            disabled={isAnalyzing}
          >
            <Text style={styles.photoIcon}>🖼️</Text>
            <Text style={styles.photoButtonText}>
              {isAnalyzing ? 'Analyzing...' : 'Choose Photo'}
            </Text>
          </Pressable>
        </View>
        
        {isAnalyzing && (
          <View style={styles.analyzingContainer}>
            <Text style={styles.analyzingText}>🔍 Analyzing your photo...</Text>
            <Text style={styles.analyzingSubtext}>This may take a moment</Text>
          </View>
        )}
      </View>

      <View style={styles.manualInputSection}>
        <Text style={styles.sectionTitle}>Or add ingredients manually</Text>
        
        <View style={styles.inputRow}>
          <TextInput
            style={[commonStyles.input, styles.ingredientInput]}
            value={newIngredient}
            onChangeText={setNewIngredient}
            placeholder="Type ingredient name..."
            placeholderTextColor={colors.textSecondary}
            onSubmitEditing={addIngredientManually}
          />
          <Button 
            onPress={addIngredientManually}
            variant="filled"
            size="sm"
            style={styles.addButton}
          >
            Add
          </Button>
        </View>
      </View>

      {leftoverIngredients.length > 0 && (
        <View style={styles.ingredientsSection}>
          <Text style={styles.sectionTitle}>Your Leftover Ingredients ({leftoverIngredients.length})</Text>
          
          <View style={styles.ingredientsList}>
            {leftoverIngredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientChip}>
                <Text style={styles.ingredientChipText}>{ingredient}</Text>
                <Pressable 
                  onPress={() => removeIngredient(index)}
                  style={styles.removeChipButton}
                >
                  <Text style={styles.removeChipText}>×</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      )}

      {recommendedRecipes.length > 0 && (
        <View style={styles.recipesSection}>
          <Text style={styles.sectionTitle}>🍽️ Recipe Recommendations</Text>
          
          {recommendedRecipes.map((recipe) => (
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
              
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>Quick Instructions:</Text>
                {recipe.instructions.slice(0, 3).map((instruction, index) => (
                  <Text key={index} style={styles.instructionText}>
                    {index + 1}. {instruction}
                  </Text>
                ))}
                {recipe.instructions.length > 3 && (
                  <Text style={styles.moreInstructions}>
                    +{recipe.instructions.length - 3} more steps...
                  </Text>
                )}
              </View>
              
              <Pressable style={styles.viewFullRecipeButton}>
                <Text style={styles.viewFullRecipeText}>View Full Recipe</Text>
                <Text style={styles.viewFullRecipeArrow}>→</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {leftoverIngredients.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🍽️</Text>
          <Text style={styles.emptyText}>No leftovers added yet</Text>
          <Text style={styles.emptySubtext}>
            Take a photo or add ingredients manually to get personalized leftover recipes!
          </Text>
        </View>
      )}
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
  photoSection: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  photoButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    minWidth: 120,
    borderWidth: 1,
    borderColor: colors.border,
  },
  photoButtonDisabled: {
    opacity: 0.6,
  },
  photoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  photoButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  analyzingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  analyzingText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 4,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  manualInputSection: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  ingredientInput: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    paddingHorizontal: 20,
  },
  ingredientsSection: {
    marginBottom: 24,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 4,
    paddingVertical: 6,
  },
  ingredientChipText: {
    fontSize: 14,
    color: colors.background,
    fontWeight: '500',
    marginRight: 8,
  },
  removeChipButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeChipText: {
    fontSize: 14,
    color: colors.background,
    fontWeight: '600',
  },
  recipesSection: {
    marginBottom: 24,
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
  instructionsContainer: {
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 4,
  },
  moreInstructions: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
    marginTop: 4,
  },
  viewFullRecipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  viewFullRecipeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
    marginRight: 8,
  },
  viewFullRecipeArrow: {
    fontSize: 14,
    color: colors.background,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
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
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});