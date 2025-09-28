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

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      Vegetables: 'VEG',
      Fruits: 'FRUIT',
      Dairy: 'DAIRY',
      Meat: 'MEAT',
      Grains: 'GRAIN',
      Other: 'OTHER',
    };
    return icons[category] || 'OTHER';
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
            removeIngredient(id);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppHeader 
        title="Kitchen Ingredients" 
        subtitle="Add what you have in your kitchen to get recipe suggestions"
      />

      <View style={styles.photoSection}>
        <Text style={styles.sectionTitle}>Add Kitchen Ingredients</Text>
        
        <View style={styles.photoButtons}>
          <Pressable style={styles.photoButton} onPress={takePhoto}>
            <View style={styles.photoIconContainer}>
              <Text style={styles.photoIconText}>CAMERA</Text>
            </View>
            <Text style={styles.photoButtonText}>Take Photo</Text>
          </Pressable>
          
          <Pressable style={styles.photoButton} onPress={pickImage}>
            <View style={styles.photoIconContainer}>
              <Text style={styles.photoIconText}>GALLERY</Text>
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
                  <View style={styles.categoryIconContainer}>
                    <Text style={styles.categoryIcon}>{getCategoryIcon(category)}</Text>
                  </View>
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
              <View key={ingredient.id} style={styles.ingredientCard}>
                <View style={styles.ingredientHeader}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {getCategoryIcon(ingredient.category)}
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
                    style={styles.removeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.removeButtonText}>REMOVE</Text>
                  </Pressable>
                </View>
              </View>
            ))}
            
            {ingredients.length > 0 && (
              <View style={styles.actionHint}>
                <Text style={styles.hintText}>
                  You have {ingredients.length} ingredient{ingredients.length > 1 ? 's' : ''} in your kitchen!
                </Text>
                <Button 
                  onPress={() => router.push('/recipes')}
                  variant="outline"
                  style={styles.recipeButton}
                >
                  Get Kitchen Recipe Ideas
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
    backgroundColor: colors.marble,
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
    borderWidth: 2,
    borderColor: colors.steel,
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
  },
  photoIconText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.dark,
    letterSpacing: 1,
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
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.steel,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  categoryButtonActive: {
    backgroundColor: colors.kitchenWood,
    borderColor: colors.secondary,
  },
  categoryIconContainer: {
    backgroundColor: colors.tertiary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
  },
  categoryIcon: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.dark,
    textAlign: 'center',
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
    color: colors.light,
    fontWeight: '600',
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
    backgroundColor: colors.tertiary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.kitchenWood,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.dark,
    letterSpacing: 1,
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
});