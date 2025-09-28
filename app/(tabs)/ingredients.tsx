import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  category: string;
  imageUri?: string;
}

export default function IngredientsScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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
        // For now, just show the add form with the image
        setShowAddForm(true);
        Alert.alert('Photo Taken!', 'Please add the ingredient details below.');
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
        Alert.alert('Image Selected!', 'Please add the ingredient details below.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to select image. Please try again.');
    }
  };

  const addIngredient = () => {
    if (!newIngredient.name || !newIngredient.quantity) {
      Alert.alert('Missing Information', 'Please enter both ingredient name and quantity.');
      return;
    }

    const ingredient: Ingredient = {
      id: Date.now().toString(),
      ...newIngredient,
    };

    setIngredients([...ingredients, ingredient]);
    setNewIngredient({ name: '', quantity: '', category: 'Vegetables' });
    setShowAddForm(false);
    Alert.alert('Success!', 'Ingredient added to your list.');
  };

  const removeIngredient = (id: string) => {
    Alert.alert(
      'Remove Ingredient',
      'Are you sure you want to remove this ingredient?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setIngredients(ingredients.filter(item => item.id !== id)),
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
      <View style={styles.header}>
        <Text style={styles.title}>My Ingredients</Text>
        <Text style={styles.subtitle}>
          Add what you have to get recipe suggestions
        </Text>
      </View>

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

          <Button onPress={addIngredient} style={styles.submitButton}>
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
                    onPress={() => removeIngredient(ingredient.id)}
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
                  💡 Go to "Recipe Ideas" to see what you can make with these ingredients!
                </Text>
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
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    minWidth: 120,
    borderWidth: 1,
    borderColor: colors.border,
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
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
  },
  hintText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 20,
  },
});