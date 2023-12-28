import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Heading, Inset, Card, Text, Strong } from "@radix-ui/themes";

import { getCategoryByName } from "../services/mealApi";
import transition from "../transition";

interface Category {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function Category() {
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams<{ category: string }>();

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getCategoryByName(category!).then((data) => {
      setCategoryData(data);
      setIsLoading(false);
    });
  }, [category]);

  return (
    <section className="flex flex-col h-screen-header p-4 space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <Heading className="title3d text-6xl text-start">
            {category}
          </Heading>

          <div className='w-full overflow-x-scroll noscrollbar flex flex-wrap gap-2 justify-center'>
            {categoryData.map((item: Category) => (
              <Link to={`/meal/${item.strMeal}`} key={item.idMeal}>
                <Card size="2" style={{ width: 240 }}>
                  <Inset clip="padding-box" side="top" pb="current">
                    <img
                      src={item.strMealThumb}
                      alt="Bold typography"
                      className="block object-cover w-full h-full max-h-full"
                    />
                  </Inset>
                  <Text as="p" size="3" className="truncate">
                    <Strong>{item.strMeal}</Strong>
                  </Text>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default transition(Category);
