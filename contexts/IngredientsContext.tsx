import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  category: string;
  imageUri?: string;
  dateAdded: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  servings: string;
  instructions: string[];
  imageUri?: string;
}

interface IngredientsContextType {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Omit<Ingredient, 'id' | 'dateAdded'>) => void;
  removeIngredient: (id: string) => void;
  clearAllIngredients: () => void;
  getRecommendedRecipes: () => Recipe[];
  getAllRecipes: () => Recipe[];
}

const IngredientsContext = createContext<IngredientsContextType | null>(null);

// Sample recipes database
const RECIPES_DATABASE: Recipe[] = [
  {
    id: '1',
    title: 'Simple Vegetable Stir Fry',
    description: 'A quick and healthy way to use up any vegetables you have',
    ingredients: ['Vegetables', 'Oil', 'Garlic', 'Soy sauce', 'Salt'],
    cookTime: '15 min',
    difficulty: 'Easy',
    category: 'Quick Meals',
    servings: '2-3',
    instructions: [
      'Heat 2 tablespoons of oil in a large pan over medium-high heat',
      'Add minced garlic and cook for 1 minute until fragrant',
      'Add chopped vegetables starting with harder ones (carrots, broccoli)',
      'Stir fry for 5-8 minutes until vegetables are tender-crisp',
      'Add softer vegetables (bell peppers, zucchini) in the last 2-3 minutes',
      'Season with soy sauce and salt to taste',
      'Serve immediately over rice or noodles'
    ],
  },
  {
    id: '2',
    title: 'Fresh Garden Salad',
    description: 'Perfect for using up fresh vegetables and greens',
    ingredients: ['Greens', 'Tomatoes', 'Cucumber', 'Olive oil', 'Lemon juice'],
    cookTime: '10 min',
    difficulty: 'Easy',
    category: 'Salad',
    servings: '2',
    instructions: [
      'Wash and dry all fresh greens thoroughly',
      'Chop tomatoes into bite-sized pieces',
      'Slice cucumber into rounds or half-moons',
      'Place greens in a large bowl',
      'Add chopped vegetables on top',
      'Drizzle with olive oil and fresh lemon juice',
      'Season with salt and pepper',
      'Toss gently and serve immediately'
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
      'Dice onion and sauté in a large pot until translucent (5 minutes)',
      'Chop all vegetables into uniform bite-sized pieces',
      'Add harder vegetables first (carrots, potatoes, celery)',
      'Cook for 5 minutes, stirring occasionally',
      'Pour in vegetable broth to cover vegetables by 2 inches',
      'Bring to a boil, then reduce heat and simmer',
      'Add herbs (thyme, bay leaves, parsley) and season with salt',
      'Simmer for 20-25 minutes until vegetables are tender',
      'Taste and adjust seasoning before serving'
    ],
  },
  {
    id: '4',
    title: 'Everything Fried Rice',
    description: 'Perfect way to use up any leftover vegetables, meat, and rice',
    ingredients: ['Rice', 'Vegetables', 'Eggs', 'Soy sauce', 'Oil'],
    cookTime: '15 min',
    difficulty: 'Easy',
    category: 'Main Course',
    servings: '2-3',
    instructions: [
      'Use day-old rice for best results (freshly cooked rice will be too sticky)',
      'Heat oil in a large wok or pan over high heat',
      'Add any leftover vegetables and cook for 2-3 minutes',
      'Push vegetables to one side of the pan',
      'Scramble eggs on the empty side until just set',
      'Add cold rice, breaking up any clumps with a spatula',
      'Mix everything together and stir-fry for 3-4 minutes',
      'Add soy sauce and any seasonings',
      'Cook for 2 more minutes until heated through'
    ],
  },
  {
    id: '5',
    title: 'Quick Pasta with Vegetables',
    description: 'Simple pasta dish that works with any vegetables',
    ingredients: ['Pasta', 'Vegetables', 'Garlic', 'Olive oil', 'Cheese'],
    cookTime: '20 min',
    difficulty: 'Easy',
    category: 'Main Course',
    servings: '3-4',
    instructions: [
      'Cook pasta according to package directions until al dente',
      'While pasta cooks, heat olive oil in a large pan',
      'Add minced garlic and cook for 1 minute',
      'Add vegetables, starting with harder ones',
      'Sauté until vegetables are tender, about 8-10 minutes',
      'Drain pasta, reserving 1/2 cup of pasta water',
      'Add pasta to the pan with vegetables',
      'Toss with cheese and a splash of pasta water if needed',
      'Season with salt, pepper, and fresh herbs if available'
    ],
  },
  {
    id: '6',
    title: 'Fruit Smoothie Bowl',
    description: 'Healthy breakfast using any fruits you have',
    ingredients: ['Fruits', 'Yogurt', 'Milk', 'Honey', 'Granola'],
    cookTime: '5 min',
    difficulty: 'Easy',
    category: 'Quick Meals',
    servings: '1',
    instructions: [
      'Choose a mix of fresh or frozen fruits',
      'Add fruits to a blender with yogurt and a splash of milk',
      'Blend until smooth and creamy',
      'Add honey to taste if needed for sweetness',
      'Pour into a bowl',
      'Top with granola, fresh fruit slices, or nuts',
      'Serve immediately for best texture'
    ],
  }
];

export function IngredientsProvider({ children }: { children: React.ReactNode }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      const stored = await AsyncStorage.getItem('user_ingredients');
      if (stored) {
        setIngredients(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading ingredients:', error);
    }
  };

  const saveIngredients = async (newIngredients: Ingredient[]) => {
    try {
      await AsyncStorage.setItem('user_ingredients', JSON.stringify(newIngredients));
    } catch (error) {
      console.log('Error saving ingredients:', error);
    }
  };

  const addIngredient = (ingredientData: Omit<Ingredient, 'id' | 'dateAdded'>) => {
    const newIngredient: Ingredient = {
      ...ingredientData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };
    
    const updatedIngredients = [...ingredients, newIngredient];
    setIngredients(updatedIngredients);
    saveIngredients(updatedIngredients);
  };

  const removeIngredient = (id: string) => {
    const updatedIngredients = ingredients.filter(item => item.id !== id);
    setIngredients(updatedIngredients);
    saveIngredients(updatedIngredients);
  };

  const clearAllIngredients = () => {
    setIngredients([]);
    saveIngredients([]);
  };

  const getRecommendedRecipes = (): Recipe[] => {
    if (ingredients.length === 0) {
      return [];
    }

    const userIngredientNames = ingredients.map(ing => 
      ing.name.toLowerCase().trim()
    );

    // Score recipes based on ingredient matches
    const scoredRecipes = RECIPES_DATABASE.map(recipe => {
      let score = 0;
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      
      userIngredientNames.forEach(userIng => {
        recipeIngredients.forEach(recipeIng => {
          if (recipeIng.includes(userIng) || userIng.includes(recipeIng)) {
            score += 1;
          }
        });
      });

      return { recipe, score };
    });

    // Return recipes with at least one ingredient match, sorted by score
    return scoredRecipes
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.recipe);
  };

  const getAllRecipes = (): Recipe[] => {
    return RECIPES_DATABASE;
  };

  return (
    <IngredientsContext.Provider value={{
      ingredients,
      addIngredient,
      removeIngredient,
      clearAllIngredients,
      getRecommendedRecipes,
      getAllRecipes,
    }}>
      {children}
    </IngredientsContext.Provider>
  );
}

export function useIngredients() {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error('useIngredients must be used within an IngredientsProvider');
  }
  return context;
}