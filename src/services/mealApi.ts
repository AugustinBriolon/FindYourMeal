const API_KEY = import.meta.env.VITE_API_ID;
const BASE_URL = `https://www.themealdb.com/api/json/v2/${API_KEY}/`;

export async function getAllIngredients() {
  const response = await fetch(`${BASE_URL}list.php?i=list`);
  const data = await response.json();
  return data.meals;
}

export async function getMeals(meal: string) {
  const response = await fetch(`${BASE_URL}search.php?s=${meal}`);
  const data = await response.json();
  return data.meals;
}

export async function getIngredient() {
  const response = await fetch(`${BASE_URL}filter.php?i`);
  const data = await response.json();
  return data;
}

export async function getMealByIngredient(ingredient: string) {
  const response = await fetch(`${BASE_URL}filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals;
}

export async function getAllAreas() {
  const response = await fetch(`${BASE_URL}list.php?a=list`);
  const data = await response.json();
  return data.meals;
}

export async function getAllCategories() {
  const response = await fetch(`${BASE_URL}list.php?c=list`);
  const data = await response.json();
  return data.meals;
}

export async function getAreaByName(area: string) {
  const response = await fetch(`${BASE_URL}filter.php?a=${area}`);
  const data = await response.json();
  return data.meals;
}

export async function getCategoryByName(category: string) {
  const response = await fetch(`${BASE_URL}filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
}

export async function getRandomMeal() {
  const response = await fetch(`${BASE_URL}random.php`);
  const data = await response.json();
  return data.meals[0];
}