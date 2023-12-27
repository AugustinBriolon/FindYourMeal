; import React, { useState, useEffect, useRef } from 'react';
import { TextField, Heading, Card, Text, Strong, Inset } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { getAllIngredients, getMealByIngredient } from '../services/mealApi';
import transition from '../transition';
import DarkMode from '../components/DarkMode';

interface Ingredient {
  strIngredient: string;
  strDescription: string;
  strType: string;
  idIngredient: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Home: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const ingredientListRef = useRef<HTMLDivElement>(null);

  const filteredIngredients = search.length > 0
    ? ingredients.filter((ingredient) => ingredient.strIngredient.toLowerCase().startsWith(search.toLowerCase()))
    : [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleSelectIngredient = (ingredient: string) => {
    setSearch('');
    setSelectedIngredient(ingredient);
  }

  const handleClear = () => {
    setSearch('');
    setSelectedIngredient('');
    setMeals([]);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (ingredientListRef.current && !ingredientListRef.current.contains(event.target as Node)) {
      setSearch('');
    }
  }

  useEffect(() => {
    getAllIngredients().then((data) => {
      setIngredients(data);
    });
  }, []);

  useEffect(() => {
    if (selectedIngredient) {
      getMealByIngredient(selectedIngredient).then((data) => {
        setMeals(data);
      });
    }
  }, [selectedIngredient]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  useEffect(() => {
    console.log(meals);
  }, [meals]);

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full space-y-4 p-4 relative">
      <DarkMode />
      <button onClick={handleClear}>
        <Heading className="title3d text-6xl text-center">Get your meal</Heading>
      </button>
      <div className='w-3/4 md:w-1/2 flex flex-col items-center justify-center space-y-2 relative'>
        <TextField.Root size="3" className="w-full">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder="Search for an ingredient..." onChange={handleSearch} value={search} />
        </TextField.Root>
        {search.length > 0 && (
          <div ref={ingredientListRef} className='w-full max-h-60 h-fit overflow-x-scroll noscrollbar rounded border border-secondary divide-y divide-secondary absolute top-[40px] z-20 bg-white dark:bg-black'>
            {filteredIngredients.length === 0 && (
              <div className='text-center text-primary py-2'>
                <p className="">No ingredients found</p>
              </div>
            )}
            {filteredIngredients.map((ingredient) => (
              <div key={ingredient.idIngredient} className='text-center text-primary hover:text-white py-2 hover:bg-secondary' onClick={() => handleSelectIngredient(ingredient.strIngredient)}>
                <p className="">{ingredient.strIngredient}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {
        selectedIngredient && (
          <div className='w-full flex flex-wrap gap-2 justify-center'>
            {
              meals.map((meal) => (
                <Card size="2" style={{ width: 240 }} key={meal.idMeal}>
                  <Inset clip="padding-box" side="top" pb="current">
                    <img
                      src={meal.strMealThumb}
                      alt="Bold typography"
                      className='block object-cover w-full h-full max-h-40'
                    />
                  </Inset>
                  <Text as="p" size="3">
                    <Strong>{meal.strMeal}</Strong>
                  </Text>
                </Card>
              ))
            }
          </div>
        )
      }
    </div>
  );
}

export default transition(Home);