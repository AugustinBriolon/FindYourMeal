const API_KEY = import.meta.env.VITE_API_ID;
const BASE_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/`;

export async function  getAllIngredients () {
  const response = await fetch(`${BASE_URL}list.php?i=list`);
  const data = await response.json();
  return data.meals;
}

export async function getMeals(meal: string) {
  const response = await fetch(`${BASE_URL}search.php?s=${meal}`);
  const data = await response.json();
  return data.meals;
}

export async function  getMealByIngredient(ingredient: string) {
  const response = await fetch(`${BASE_URL}filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals;
}

export async function  getIngredient() {
  const response = await fetch(`${BASE_URL}filter.php?i`);
  const data = await response.json();
  return data;
}