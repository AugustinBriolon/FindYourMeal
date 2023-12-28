import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heading, Box, Tabs, Button } from "@radix-ui/themes";
import transition from "../transition";

import { getMeals } from '../services/mealApi';

interface Meal {
  idMeal: string;
  strMeal: string;
  ingredients: string[];
  measure: string[];
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
  strCategory: string;
  strArea: string;
}

function Meal() {
  const [isLoading, setIsLoading] = useState(true);
  const { meal } = useParams<{ meal: string }>();

  const [mealData, setMealtData] = useState<Meal>({
    idMeal: "",
    strMeal: "",
    ingredients: [],
    measure: [],
    strMealThumb: "",
    strInstructions: "",
    strYoutube: "",
    strCategory: "",
    strArea: "",
  });

  const getIngredients = (meal: Meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}` as keyof Meal]) {
        ingredients.push(meal[`strIngredient${i}` as keyof Meal]);
      }
    }
    return ingredients;
  };

  const getMeasure = (meal: Meal) => {
    const measure = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strMeasure${i}` as keyof Meal]) {
        measure.push(meal[`strMeasure${i}` as keyof Meal]);
      }
    }
    return measure;
  }

  const formatIngredients = (ingredients: string[], measure: string[]) => {
    return ingredients.map((ingredient, index) => (
      <li key={index} className="capitalize">
        <p className="font-bold">{ingredient}</p>
        <p className="text-gray-500">{measure[index]}</p>
      </li>
    ));
  }

  const formatInstructions = (instructions: string) => {
    return instructions.split(".").map((sentence) => (
      <p key={sentence}>{sentence}.</p>
    ));
  }

  useEffect(() => {
    getMeals(meal!).then((data) => {
      setMealtData(data[0]);
      setIsLoading(false);
      console.log(data[0]);
    });
  }, [meal]);

  return (
    <section>
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <div className="p-4 pt-12 space-y-12">
          <Heading className="title3d text-6xl text-start">
            {mealData.strMeal}
          </Heading>
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="w-full flex flex-col md:flex-row items-start justify-center space-y-4 md:space-y-0 md:space-x-4">
              <img src={mealData.strMealThumb} alt={mealData.strMeal} className="w-1/2 md:w-1/4 rounded-md" />
              <div className="space-y-4 w-3/4">
                <h2 className="text-2xl">Ingredients List</h2>
                <ul className="grid grid-cols-list gap-2">
                  {formatIngredients(getIngredients(mealData) as string[], getMeasure(mealData) as string[])}
                </ul>
              </div>
            </div>
            <div className="w-full md:mr-4">
              <Tabs.Root defaultValue="instruction">
                <Tabs.List>
                  <Tabs.Trigger value="instruction">Instruction</Tabs.Trigger>
                  {
                    mealData.strYoutube !== "" &&
                    <Tabs.Trigger value="tuto">Tuto</Tabs.Trigger>
                  }
                  <Tabs.Trigger value="extra">Extra</Tabs.Trigger>
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                  <Tabs.Content value="instruction">
                    <div className="space-y-4">
                      <h2 className="text-2xl">Instructions :</h2>
                      <div className="space-y-2">
                        {formatInstructions(mealData.strInstructions)}
                      </div>
                    </div>
                  </Tabs.Content>

                  {
                    mealData.strYoutube !== "" &&
                    <Tabs.Content value="tuto">
                      <div className="space-y-4">
                        <h2 className="text-2xl">Tuto :</h2>
                        <div className="space-y-2">
                          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${mealData.strYoutube.slice(-11)}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        </div>
                      </div>
                    </Tabs.Content>
                  }

                  <Tabs.Content value="extra">
                    <div className="space-y-4">
                      <h2 className="text-2xl">Extra infos</h2>
                      <div className="space-x-2">
                        <Link to={`/category/${mealData.strCategory}`}>
                          <Button className="bg-primary text-white hover:bg-secondary">Category : {mealData.strCategory}</Button>
                        </Link>
                        <Link to={`/area/${mealData.strArea}`}>
                          <Button className="bg-primary text-white hover:bg-secondary">Area : {mealData.strArea}</Button>
                        </Link>
                      </div>
                    </div>
                  </Tabs.Content>
                </Box>
              </Tabs.Root>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default transition(Meal);