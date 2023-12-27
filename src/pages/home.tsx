import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import { getAllIngredients } from '../services/mealApi.ts';

import { TextField, Heading } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface Ingredient {
  strIngredient: string;
  strDescription: string;
  strType: string;
  idIngredient: string;
}

export default function Home() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState('');

  const filteredIngredients = ingredients.filter((ingredient) => {
    return ingredient.strIngredient.toLowerCase().startsWith(search.toLowerCase());
  });

  console.log(filteredIngredients);

  useEffect(() => {
    const response = fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((response) => response.json())
      .then((data) => setIngredients(data.meals));
  }, []);


  return (
    <div className="flex flex-col items-center justify-start h-screen w-full space-y-4">
      <Heading className="title3d text-6xl">Get your meal</Heading>
      <div className='w-1/2 flex flex-col items-center justify-center'>
        <TextField.Root size="3" className="w-full">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder="Search for an ingredient..." onChange={(e) => setSearch(e.target.value)} />
        </TextField.Root>
        <div className='w-full h-60 overflow-x-scroll rounded border border-slate-300 border-t-0 divide-y'>
          {
            filteredIngredients.map((ingredient) => {
              return (
                <div key={ingredient.idIngredient} className='text-center py-4'>
                  <p className="">{ingredient.strIngredient}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}