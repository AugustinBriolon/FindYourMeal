; import React, { useState, useEffect, useRef } from 'react';
import { TextField, Heading, Card, Text, Strong, Inset } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Link } from 'react-router-dom';

import { getAllIngredients, getMealByIngredient } from '../services/mealApi';
import transition from '../transition';

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
  const [isIngredientLoading, setIsIngredientLoading] = useState(true);
  const [isMealLoading, setIsMealLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const ingredientListRef = useRef<HTMLDivElement>(null);

  const filteredIngredients = search.length > 0
    ? ingredients.filter((ingredient) => ingredient.strIngredient.toLowerCase().startsWith(search.toLowerCase()))
    : [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchValue(e.target.value);
  }

  const handleSelectIngredient = (ingredient: string) => {
    setSelectedIngredient(ingredient);
    setSearch('');
    setSearchValue(ingredient);
  }

  const handleClear = () => {
    setSearch('');
    setSearchValue('');
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
      setIsIngredientLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedIngredient) {
      getMealByIngredient(selectedIngredient).then((data) => {
        setMeals(data);
        setIsMealLoading(false);
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
  }, [meals]);

  return (
    <section className="flex flex-col items-center justify-start sm:h-screen-header h-list-header w-full space-y-4 p-4 pt-12 relative">
      <button onClick={handleClear}>
        <Heading className="title3d text-6xl text-center">Find Your meal</Heading>
      </button>
      <div className='w-3/4 md:w-1/2 flex flex-col items-center justify-center space-y-2 relative'>
        <TextField.Root size="3" className="w-full">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder="Search for an ingredient..." onChange={handleSearch} value={searchValue} />
        </TextField.Root>
        {search.length > 0 && (
          <div
            ref={ingredientListRef}
            className="bg-white dark:!bg-black w-full max-h-60 h-fit overflow-x-scroll noscrollbar rounded border border-secondary divide-y divide-secondary absolute top-[40px] z-20"
          >
            {isIngredientLoading ? (
              <div className="text-center text-primary py-2">
                <p>Ingredient pending...</p>
              </div>
            ) : filteredIngredients.length === 0 ? (
              <div className="text-center text-primary py-2">
                <p>No ingredients found</p>
              </div>
            ) : (
              filteredIngredients.map((ingredient) => (
                <div
                  key={ingredient.idIngredient}
                  className="text-center text-primary dark:text-secondary py-2 hover:bg-tertiary dark:hover:bg-orange cursor-pointer"
                  onClick={() => handleSelectIngredient(ingredient.strIngredient)}
                >
                  <p>{ingredient.strIngredient}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
      {
        selectedIngredient && (
          <div className='w-full overflow-x-scroll noscrollbar flex flex-wrap gap-2 justify-center'>
            {isMealLoading ? (
              Array.from(Array(10).keys()).map((_, index) => (
                <Card key={index} size="2" style={{ width: 240 }}>
                  <Inset clip="padding-box" side="top" pb="current">
                    <div className="animate-pulse bg-gray-300 rounded h-40 w-full"></div>
                  </Inset>
                  <Text as="p" size="3" className="truncate animate-pulse bg-gray-300 rounded h-4 w-full">
                  </Text>
                </Card>
              ))
            ) : meals === null ? (
              <div className="text-center text-primary py-2">
                <p>No meals available at the moment... we're working on it !</p>
              </div>
            ) : (
              meals.map((meal) => (
                <Link to={`/meal/${meal.strMeal}`} key={meal.idMeal}>
                  <Card size="2" style={{ width: 240 }}>
                    <Inset clip="padding-box" side="top" pb="current">
                      <img
                        src={meal.strMealThumb}
                        alt="Bold typography"
                        className='block object-cover w-full h-full max-h-40'
                      />
                    </Inset>
                    <Text as="p" size="3" className="truncate">
                      <Strong>{meal.strMeal}</Strong>
                    </Text>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )
      }

    </section>
  );
}

export default transition(Home);