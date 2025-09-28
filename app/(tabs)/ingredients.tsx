
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Pressable } from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Button } from '@/components/button';

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  expiryDate: string;
  category: string;
}

export default function IngredientsScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: '1',
      name: 'Tomatoes',
      quantity: '3 pieces',
      expiryDate: '2024-01-15',
      category: 'Vegetables',
    },
    {
      id: '2',
      name: 'Bread',
      quantity: '1 loaf',
      expiryDate: '2024-01-12',
      category: 'Bakery',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    category: 'Vegetables',
  });

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Bakery', 'Other'];

  const addIngredient = () => {
    if (!newIngredient.name || !newIngredient.quantity) {
      Alert.alert('Error', 'Please fill in name and quantity');
      return;
    }

    const ingredient: Ingredient = {
      id: Date.now().toString(),
      ...newIngredient,
    };

    setIngredients([...ingredients, ingredient]);
    setNewIngredient({ name: '', quantity: '', expiryDate: '', category: 'Vegetables' });
    setShowAddForm(false);
    Alert.alert('Success', 'Ingredient added successfully!');
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
      Vegetables: '🥬',
      Fruits: '🍎',
      Dairy: '🥛',
      Meat: '🥩',
      Bakery: '🍞',
      Other: '📦',
    };
    return emojis[category] || '📦';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>My Ingredients</Text>
        <Text style={styles.subtitle}>
          Manage your food items and reduce waste
        </Text>
      </View>

      <Button
        onPress={() => setShowAddForm(!showAddForm)}
        style={styles.addButton}
      >
        {showAddForm ? 'Cancel' : '+ Add Ingredient'}
      </Button>

      {showAddForm && (
        <View style={[commonStyles.card, styles.addForm]}>
          <Text style={styles.formTitle}>Add New Ingredient</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={commonStyles.input}
              value={newIngredient.name}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, name: text })}
              placeholder="e.g., Tomatoes"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={commonStyles.input}
              value={newIngredient.quantity}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, quantity: text })}
              placeholder="e.g., 3 pieces"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Expiry Date (Optional)</Text>
            <TextInput
              style={commonStyles.input}
              value={newIngredient.expiryDate}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, expiryDate: text })}
              placeholder="YYYY-MM-DD"
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
        {ingredients.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyText}>No ingredients yet</Text>
            <Text style={styles.emptySubtext}>
              Add your first ingredient to get started!
            </Text>
          </View>
        ) : (
          ingredients.map((ingredient) => (
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
                  {ingredient.expiryDate && (
                    <Text style={styles.expiryDate}>
                      Expires: {ingredient.expiryDate}
                    </Text>
                  )}
                </View>
                <Pressable
                  onPress={() => removeIngredient(ingredient.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </Pressable>
              </View>
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
  addButton: {
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  addForm: {
    marginBottom: 20,
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
    marginBottom: 6,
  },
  categoryScroll: {
    marginTop: 8,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 12,
    marginRight: 12,
    borderRadius: 8,
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
  },
  categoryTextActive: {
    color: colors.background,
    fontWeight: '500',
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
    marginBottom: 2,
  },
  ingredientDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  expiryDate: {
    fontSize: 12,
    color: colors.warning,
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
});
