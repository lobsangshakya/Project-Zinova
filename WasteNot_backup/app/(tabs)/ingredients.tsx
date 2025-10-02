import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';
import { useIngredients } from '@/contexts/IngredientsContext';
import { router } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';

export default function IngredientsScreen() {
  const { ingredients, addIngredient, removeIngredient, clearAllIngredients } = useIngredients();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    category: 'Vegetables',
  });

  const categories = [
    { name: 'Vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop&auto=format', emoji: '🥕' },
    { name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=200&fit=crop&auto=format', emoji: '🍎' },
    { name: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop&auto=format', emoji: '🧀' },
    { name: 'Meat', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=200&fit=crop&auto=format', emoji: '🥩' },
    { name: 'Grains', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop&auto=format', emoji: '🌾' },
    { name: 'Other', image: 'https://images.unsplash.com/photo-1556909114-4f6e8cda40d7?w=300&h=200&fit=crop&auto=format', emoji: '🍳' }
  ];

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      Vegetables: { backgroundColor: '#228B22', pattern: 'circle' },
      Fruits: { backgroundColor: '#FF6347', pattern: 'circle' }, 
      Dairy: { backgroundColor: '#FFF8DC', pattern: 'square', border: '#DAA520' },
      Meat: { backgroundColor: '#8B4513', pattern: 'circle' },
      Grains: { backgroundColor: '#F5DEB3', pattern: 'square', border: '#DAA520' },
      Other: { backgroundColor: '#C0C0C0', pattern: 'circle' },
    };
    return icons[category] || icons.Other;
  };

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow camera access to take photos of your ingredients.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        setShowAddForm(true);
        
        const mockDetectedIngredients = [
          { name: 'Carrots', category: 'Vegetables' },
          { name: 'Chicken', category: 'Meat' },
          { name: 'Rice', category: 'Grains' }
        ];
        
        setTimeout(() => {
          mockDetectedIngredients.forEach(detected => {
            addIngredient({
              name: detected.name,
              quantity: '1 portion',
              category: detected.category,
              imageUri: result.assets[0].uri
            });
          });
          
          Alert.alert('Ingredients Detected!', 
            `Found: ${mockDetectedIngredients.map(i => i.name).join(', ')}. You can add more manually if needed.`);
          setShowAddForm(false);
        }, 1500);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to take photo. Please try again.');
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Please allow access to your photo library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0]) {
        setShowAddForm(true);
        
        const mockDetectedIngredients = [
          { name: 'Tomatoes', category: 'Vegetables' },
          { name: 'Pasta', category: 'Grains' },
          { name: 'Cheese', category: 'Dairy' }
        ];
        
        setTimeout(() => {
          mockDetectedIngredients.forEach(detected => {
            addIngredient({
              name: detected.name,
              quantity: '1 portion',
              category: detected.category,
              imageUri: result.assets[0].uri
            });
          });
          
          Alert.alert('Ingredients Detected!', 
            `Found: ${mockDetectedIngredients.map(i => i.name).join(', ')}. You can add more manually if needed.`);
          setShowAddForm(false);
        }, 1500);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to select image. Please try again.');
    }
  };

  const handleAddIngredient = () => {
    if (!newIngredient.name || !newIngredient.quantity) {
      Alert.alert('Missing Information', 'Please enter both ingredient name and quantity.');
      return;
    }

    addIngredient({
      name: newIngredient.name,
      quantity: newIngredient.quantity,
      category: newIngredient.category,
    });
    
    setNewIngredient({ name: '', quantity: '', category: 'Vegetables' });
    setShowAddForm(false);
    Alert.alert('Success!', 'Ingredient added to your kitchen list.');
  };

  const handleRemoveIngredient = (id: string) => {
    console.log('Attempting to remove ingredient with ID:', id);
    console.log('Current ingredients:', ingredients.map(ing => `${ing.name} (ID: ${ing.id})`));
    
    Alert.alert(
      'Remove Ingredient',
      'Are you sure you want to remove this ingredient from your kitchen?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            console.log('User confirmed removal for ID:', id);
            try {
              const success = removeIngredient(id);
              console.log('Remove operation result:', success);
              if (success !== false) {
                setTimeout(() => {
                  Alert.alert('Success!', 'Ingredient removed from your kitchen.');
                }, 100);
              } else {
                Alert.alert('Error', 'Could not find ingredient to remove.');
              }
            } catch (error) {
              console.error('Error removing ingredient:', error);
              Alert.alert('Error', 'Failed to remove ingredient. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    // Direct clear without confirmation for simplicity
    clearAllIngredients();
    console.log('All ingredients cleared immediately');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.backgroundGradient} />
      
      <AppHeader 
        title="Kitchen Ingredients" 
        subtitle="Add what you have in your kitchen to get recipe suggestions"
      />

      <View style={styles.photoSection}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=300&fit=crop&auto=format' }}
          style={styles.photoSectionImage}
          resizeMode="cover"
        />
        <View style={styles.photoSectionOverlay}>
          <Text style={styles.sectionTitle}>Add Kitchen Ingredients 🍅</Text>
          
          <View style={styles.photoButtons}>
            <Pressable style={styles.photoButton} onPress={takePhoto}>
              <View style={styles.photoIconContainer}>
                <Text style={styles.photoIcon}>📷</Text>
              </View>
              <Text style={styles.photoButtonText}>Take Photo</Text>
            </Pressable>
            
            <Pressable style={styles.photoButton} onPress={pickImage}>
              <View style={styles.photoIconContainer}>
                <Text style={styles.photoIcon}>🖼️</Text>
              </View>
              <Text style={styles.photoButtonText}>Choose Photo</Text>
            </Pressable>
          </View>
          
          <Text style={styles.orText}>or</Text>
          
          <Button
            onPress={() => setShowAddForm(!showAddForm)}
            variant="outline"
            style={styles.manualButton}
          >
            {showAddForm ? 'Cancel' : '✍️ Add Manually'}
          </Button>
        </View>
      </View>

      {showAddForm && (
        <View style={[commonStyles.card, styles.addForm]}>
          <Text style={styles.formTitle}>Add Ingredient Details</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ingredient Name</Text>
            <TextInput
              style={commonStyles.input}
              value={newIngredient.name}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, name: text })}
              placeholder="e.g., Carrots, Chicken, Rice"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={commonStyles.input}
              value={newIngredient.quantity}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, quantity: text })}
              placeholder="e.g., 2 pieces, 1 cup, 500g"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {categories.map((category) => (
                <Pressable
                  key={category.name}
                  style={[
                    styles.categoryButton,
                    newIngredient.category === category.name && styles.categoryButtonActive,
                  ]}
                  onPress={() => setNewIngredient({ ...newIngredient, category: category.name })}
                >
                  <Image 
                    source={{ uri: category.image }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                  <View style={styles.categoryIconContainer}>
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  </View>
                  <Text
                    style={[
                      styles.categoryText,
                      newIngredient.category === category.name && styles.categoryTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <Button onPress={handleAddIngredient} style={styles.submitButton}>
            Add Ingredient
          </Button>
        </View>
      )}

      <View style={styles.ingredientsList}>
        <Text style={styles.sectionTitle}>Your Kitchen Ingredients ({ingredients.length})</Text>
        
        {ingredients.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIconText}>KITCHEN</Text>
            </View>
            <Text style={styles.emptyText}>No ingredients yet</Text>
            <Text style={styles.emptySubtext}>
              Add your first ingredient using the photo feature or manual entry above!
            </Text>
          </View>
        ) : (
          <>
            {ingredients.map((ingredient) => (
              <View key={`ingredient-${ingredient.id}-${ingredient.name}`} style={styles.ingredientCard}>
                <View style={styles.ingredientHeader}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeEmoji}>
                      {categories.find(cat => cat.name === ingredient.category)?.emoji || '🍳'}
                    </Text>
                  </View>
                  <View style={styles.ingredientInfo}>
                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    <Text style={styles.ingredientDetails}>
                      {ingredient.quantity} • {ingredient.category}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      console.log('Remove button pressed for ingredient:', ingredient.name, 'with ID:', ingredient.id);
                      handleRemoveIngredient(ingredient.id);
                    }}
                    style={({ pressed }) => [
                      styles.removeButton,
                      pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] }
                    ]}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    accessibilityLabel={`Remove ${ingredient.name}`}
                    accessibilityRole="button"
                  >
                    <Text style={styles.removeButtonText}>🗑️ REMOVE</Text>
                  </Pressable>
                </View>
              </View>
            ))}
            
            {ingredients.length > 0 && (
              <View style={styles.actionHint}>
                <Text style={styles.hintText}>
                  You have {ingredients.length} ingredient{ingredients.length > 1 ? 's' : ''} in your kitchen!
                </Text>
                <View style={styles.buttonRow}>
                  <Button 
                    onPress={() => router.push('/recipes')}
                    variant="outline"
                    style={styles.halfButton}
                  >
                    Get Recipes
                  </Button>
                  <Button 
                    onPress={handleClearAll}
                    variant="filled"
                    style={styles.clearButton}
                  >
                    Clear All
                  </Button>
                </View>
              </View>
            )}
          </>
        )}
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
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    backgroundImage: 'linear-gradient(45deg, rgba(34, 139, 34, 0.1) 0%, rgba(255, 99, 71, 0.1) 25%, rgba(218, 165, 32, 0.1) 50%, rgba(255, 20, 147, 0.1) 75%, rgba(30, 144, 255, 0.1) 100%)',
    opacity: 0.3,
    zIndex: 0,
  },
  photoSection: {
    backgroundColor: colors.card,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  photoSectionImage: {
    width: '100%',
    height: 200,
  },
  photoSectionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 25,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
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
    backgroundColor: colors.light,
    borderRadius: 16,
    padding: 20,
    minWidth: 130,
    borderWidth: 2,
    borderColor: colors.kitchenWood,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photoIconContainer: {
    backgroundColor: colors.tertiary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.kitchenWood,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 24,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 4,
    position: 'relative',
  },
  galleryIcon: {
    width: 24,
    height: 20,
    backgroundColor: colors.secondary,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  photoIconText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.dark,
    letterSpacing: 1,
  },
  photoIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  photoEmojis: {
    fontSize: 12,
    letterSpacing: 1,
  },
  photoButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  orText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    fontWeight: '500',
  },
  manualButton: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
    minWidth: 140,
  },
  addForm: {
    marginBottom: 24,
    marginHorizontal: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  categoryScroll: {
    marginTop: 8,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 12,
    marginRight: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    minWidth: 100,
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
  categoryIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: colors.light,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  ingredientsList: {
    flex: 1,
    marginHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    backgroundColor: colors.kitchenWood,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  emptyIconText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.light,
    letterSpacing: 2,
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
  ingredientCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: colors.kitchenWood,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
    borderTopWidth: 2,
    borderTopColor: colors.steel,
  },
  ingredientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 12,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryBadgeEmoji: {
    fontSize: 20,
    textAlign: 'center',
  },
  categoryBadgeText: {
    fontSize: 18,
    textAlign: 'center',
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  ingredientDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  removeButton: {
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.light,
    minWidth: 70,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  removeButtonText: {
    color: colors.light,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  actionHint: {
    backgroundColor: colors.marble,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: colors.steel,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  recipeButton: {
    borderColor: colors.primary,
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  halfButton: {
    flex: 1,
    borderColor: colors.primary,
  },
  clearButton: {
    flex: 1,
    backgroundColor: colors.error,
  },
});
