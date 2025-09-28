// Dynamic Recipe Generator for Leftover Ingredients
// This file contains logic to generate recipes based on user's actual ingredients

import { Recipe } from '@/contexts/IngredientsContext';

interface RecipeTemplate {
  namePattern: string;
  description: string;
  baseIngredients: string[];
  instructions: string[];
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  servings: string;
}

// Recipe templates that can be adapted to user ingredients
const RECIPE_TEMPLATES: RecipeTemplate[] = [
  {
    namePattern: '{ingredients} Stir Fry',
    description: 'A quick and delicious stir fry using your available ingredients',
    baseIngredients: ['Oil', 'Salt', 'Pepper'],
    instructions: [
      'Heat oil in a large pan or wok over medium-high heat',
      'Add harder ingredients first (root vegetables, proteins)',
      'Stir fry for 3-4 minutes until starting to soften',
      'Add softer ingredients (leafy greens, bell peppers)',
      'Continue cooking for 2-3 minutes until tender-crisp',
      'Season with salt, pepper, and any available sauces',
      'Serve immediately while hot'
    ],
    cookTime: '15 min',
    difficulty: 'Easy',
    category: 'Quick Meals',
    servings: '2-3',
  },
  {
    namePattern: 'Hearty {ingredients} Soup',
    description: 'A warming soup that makes great use of your leftover ingredients',
    baseIngredients: ['Water or broth', 'Salt', 'Herbs (if available)'],
    instructions: [
      'Chop all ingredients into bite-sized pieces',
      'Heat a large pot over medium heat',
      'Add harder vegetables first and cook for 5 minutes',
      'Pour in enough water or broth to cover ingredients by 2 inches',
      'Bring to a boil, then reduce heat and simmer',
      'Add softer ingredients and seasonings',
      'Simmer for 20-25 minutes until everything is tender',
      'Taste and adjust seasoning before serving'
    ],
    cookTime: '30 min',
    difficulty: 'Easy',
    category: 'Soup',
    servings: '4',
  },
  {
    namePattern: '{ingredients} Hash',
    description: 'A satisfying one-pan meal using your leftover ingredients',
    baseIngredients: ['Oil', 'Salt', 'Pepper'],
    instructions: [
      'Dice all ingredients into small, uniform pieces',
      'Heat oil in a large skillet over medium heat',
      'Add diced potatoes or root vegetables first if available',
      'Cook for 8-10 minutes until starting to brown',
      'Add other ingredients and seasonings',
      'Cook, stirring occasionally, for 10-15 minutes',
      'Create wells in the hash and crack eggs if available',
      'Cover and cook until eggs are set (optional)',
      'Serve hot with fresh herbs if available'
    ],
    cookTime: '25 min',
    difficulty: 'Medium',
    category: 'Main Course',
    servings: '2-3',
  },
  {
    namePattern: 'Quick {ingredients} Pasta',
    description: 'A simple pasta dish featuring your available ingredients',
    baseIngredients: ['Pasta', 'Oil', 'Garlic (if available)', 'Salt'],
    instructions: [
      'Cook pasta according to package directions until al dente',
      'While pasta cooks, heat oil in a large pan',
      'Add garlic and cook for 1 minute if available',
      'Add your ingredients, starting with harder ones',
      'Sauté until tender, about 5-8 minutes',
      'Drain pasta, reserving 1/2 cup pasta water',
      'Add pasta to the pan with ingredients',
      'Toss everything together, adding pasta water if needed',
      'Season with salt, pepper, and any available cheese'
    ],
    cookTime: '20 min',
    difficulty: 'Easy',
    category: 'Main Course',
    servings: '3-4',
  },
  {
    namePattern: '{ingredients} Frittata',
    description: 'A protein-rich egg dish perfect for using up leftovers',
    baseIngredients: ['Eggs', 'Oil or butter', 'Salt', 'Pepper'],
    instructions: [
      'Preheat oven to 375°F (190°C)',
      'Beat 6-8 eggs in a bowl with salt and pepper',
      'Heat oil in an oven-safe skillet over medium heat',
      'Add your ingredients and cook for 3-4 minutes',
      'Pour beaten eggs over the ingredients',
      'Cook on stovetop for 3-4 minutes until edges set',
      'Transfer skillet to oven for 12-15 minutes',
      'Remove when center is just set and golden on top',
      'Let cool for 5 minutes before slicing and serving'
    ],
    cookTime: '25 min',
    difficulty: 'Medium',
    category: 'Main Course',
    servings: '4-6',
  },
  {
    namePattern: '{ingredients} Rice Bowl',
    description: 'A nutritious rice bowl topped with your fresh ingredients',
    baseIngredients: ['Rice', 'Oil', 'Soy sauce (if available)', 'Salt'],
    instructions: [
      'Cook rice according to package directions',
      'Heat oil in a large pan over medium heat',
      'Add your ingredients and cook until tender',
      'Season with available sauces and spices',
      'Serve ingredients over warm rice',
      'Drizzle with any available sauce or dressing',
      'Garnish with fresh herbs if you have them'
    ],
    cookTime: '20 min',
    difficulty: 'Easy',
    category: 'Main Course',
    servings: '2',
  },
];

export function generateLeftoverRecipes(userIngredients: string[]): Recipe[] {
  if (userIngredients.length === 0) {
    return [];
  }

  const recipes: Recipe[] = [];

  // Generate recipes based on templates
  RECIPE_TEMPLATES.forEach((template, index) => {
    // Create ingredient list combining user ingredients with base ingredients
    const allIngredients = [...new Set([...userIngredients, ...template.baseIngredients])];
    
    // Create a natural-sounding recipe name
    const ingredientList = userIngredients.slice(0, 3).join(', ');
    const recipeName = template.namePattern.replace('{ingredients}', ingredientList);
    
    // Adapt instructions to mention user's specific ingredients
    const adaptedInstructions = template.instructions.map(instruction => {
      if (instruction.includes('your ingredients') || instruction.includes('ingredients')) {
        return instruction;
      }
      return instruction;
    });

    const recipe: Recipe = {
      id: `leftover-${index}`,
      title: recipeName,
      description: template.description,
      ingredients: allIngredients,
      cookTime: template.cookTime,
      difficulty: template.difficulty,
      category: template.category,
      servings: template.servings,
      instructions: adaptedInstructions,
    };

    recipes.push(recipe);
  });

  // Sort recipes by how many user ingredients they can use
  return recipes.sort((a, b) => {
    const aMatches = a.ingredients.filter(ing => 
      userIngredients.some(userIng => 
        ing.toLowerCase().includes(userIng.toLowerCase()) || 
        userIng.toLowerCase().includes(ing.toLowerCase())
      )
    ).length;
    
    const bMatches = b.ingredients.filter(ing => 
      userIngredients.some(userIng => 
        ing.toLowerCase().includes(userIng.toLowerCase()) || 
        userIng.toLowerCase().includes(ing.toLowerCase())
      )
    ).length;
    
    return bMatches - aMatches;
  });
}

export function generateSpecificRecipe(ingredients: string[]): Recipe | null {
  if (ingredients.length === 0) return null;

  // Create a custom recipe based on the exact ingredients provided
  const mainIngredients = ingredients.slice(0, 3);
  const ingredientList = mainIngredients.join(' & ');
  
  return {
    id: `custom-${Date.now()}`,
    title: `${ingredientList} Special`,
    description: `A custom recipe designed specifically for your ${ingredientList.toLowerCase()}`,
    ingredients: [...ingredients, 'Salt', 'Pepper', 'Oil'],
    cookTime: '20 min',
    difficulty: 'Easy',
    category: 'Custom',
    servings: '2-3',
    instructions: [
      'Prepare all your ingredients by washing and chopping as needed',
      `Start by heating oil in a large pan over medium heat`,
      `Add your ${ingredients[0]} and cook for 3-4 minutes`,
      ingredients.length > 1 ? `Add ${ingredients.slice(1).join(' and ')} to the pan` : '',
      'Cook everything together, stirring occasionally, for 8-10 minutes',
      'Season with salt and pepper to taste',
      'Adjust cooking time based on your ingredients\' tenderness',
      'Serve hot and enjoy your custom creation!'
    ].filter(Boolean),
  };
}