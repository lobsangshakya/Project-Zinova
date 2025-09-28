import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';
import { useIngredients } from '@/contexts/IngredientsContext';
import { router } from 'expo-router';
import { AppHeader } from '@/components/AppHeader';

export default function IngredientsScreen() {
  const { ingredients, addIngredient, removeIngredient } = useIngredients();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    category: 'Vegetables',
  });

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Grains', 'Other'];

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
        // Simulate AI ingredient detection
        setShowAddForm(true);
        
        // Mock detected ingredients
        const mockDetectedIngredients = [
          { name: 'Carrots', category: 'Vegetables' },
          { name: 'Chicken', category: 'Meat' },
          { name: 'Rice', category: 'Grains' }
        ];
        
        // Add detected ingredients automatically
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
        // Simulate AI ingredient detection
        setShowAddForm(true);
        
        // Mock detected ingredients
        const mockDetectedIngredients = [
          { name: 'Tomatoes', category: 'Vegetables' },
          { name: 'Pasta', category: 'Grains' },
          { name: 'Cheese', category: 'Dairy' }
        ];
        
        // Add detected ingredients automatically
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
    Alert.alert('Success!', 'Ingredient added to your list.');
  };

  const handleRemoveIngredient = (id: string) => {
    Alert.alert(
      'Remove Ingredient',
      'Are you sure you want to remove this ingredient?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeIngredient(id),
        },
      ]
    );
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      Vegetables: '🥕',
      Fruits: '🍎',
      Dairy: '🥛',
      Meat: '🥩',
      Grains: '🌾',
      Other: '📦',
    };
    return emojis[category] || '📦';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppHeader 
        title="My Ingredients" 
        subtitle="Add what you have to get recipe suggestions"
      />

      <View style={styles.photoSection}>
        <Text style={styles.sectionTitle}>Add Ingredients</Text>
        
        <View style={styles.photoButtons}>
          <Pressable style={styles.photoButton} onPress={takePhoto}>
            <Text style={styles.photoIcon}>📷</Text>
            <Text style={styles.photoButtonText}>Take Photo</Text>
          </Pressable>
          
          <Pressable style={styles.photoButton} onPress={pickImage}>
            <Text style={styles.photoIcon}>🖼️</Text>
            <Text style={styles.photoButtonText}>Choose Photo</Text>
          </Pressable>
        </View>
        
        <Text style={styles.orText}>or</Text>
        
        <Button
          onPress={() => setShowAddForm(!showAddForm)}
          variant="outline"
          style={styles.manualButton}
        >
          {showAddForm ? 'Cancel' : 'Add Manually'}
        </Button>
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
                  key={category}
                  style={[
                    styles.categoryButton,
                    newIngredient.category === category && styles.categoryButtonActive,
                  ]}
                  onPress={() => setNewIngredient({ ...newIngredient, category })}
                >
                  <Text style={styles.categoryEmoji}>{getCategoryEmoji(category)}</Text>
                  <Text
                    style={[
                      styles.categoryText,
                      newIngredient.category === category && styles.categoryTextActive,
                    ]}
                  >
                    {category}
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
        <Text style={styles.sectionTitle}>Your Ingredients ({ingredients.length})</Text>
        
        {ingredients.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyText}>No ingredients yet</Text>
            <Text style={styles.emptySubtext}>
              Add your first ingredient using the photo feature or manual entry above!
            </Text>
          </View>
        ) : (
          <>
            {ingredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.ingredientCard}>
                <View style={styles.ingredientHeader}>
                  <Text style={styles.categoryEmoji}>
                    {getCategoryEmoji(ingredient.category)}
                  </Text>
                  <View style={styles.ingredientInfo}>
                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    <Text style={styles.ingredientDetails}>
                      {ingredient.quantity} • {ingredient.category}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handleRemoveIngredient(ingredient.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </Pressable>
                </View>
              </View>
            ))}
            
            {ingredients.length > 0 && (
              <View style={styles.actionHint}>
                <Text style={styles.hintText}>
                  💡 You have {ingredients.length} ingredient{ingredients.length > 1 ? 's' : ''}!
                </Text>
                <Button 
                  onPress={() => router.push('/recipes')}
                  variant="outline"
                  style={styles.recipeButton}
                >
                  Get Recipe Ideas
                </Button>
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
  },
  content: {
    paddingBottom: 20,
  },
  photoSection: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 6,
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
    borderColor: colors.primary,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photoIcon: {
    fontSize: 36,
    marginBottom: 10,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: colors.background,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  ingredientsList: {
    flex: 1,
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
  ingredientCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: colors.secondary,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },
  ingredientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientInfo: {
    flex: 1,
    marginLeft: 12,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
  actionHint: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
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
});