import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Heading, Inset, Card, Text, Strong } from "@radix-ui/themes";

import { getAreaByName } from "../services/mealApi";
import transition from "../transition";

interface Area {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function area() {
  const [isLoading, setIsLoading] = useState(true);
  const { area } = useParams<{ area: string }>();

  const [areaData, setAreaData] = useState([]);

  useEffect(() => {
    getAreaByName(area!).then((data) => {
      setAreaData(data);
      setIsLoading(false);
    });
  }, [area]);

  return (
    <section className="flex flex-col h-screen-header p-4 space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <Heading className="title3d text-6xl text-start">
            {area}
          </Heading>

          <div className='w-full overflow-x-scroll noscrollbar flex flex-wrap gap-2 justify-center'>
            {areaData.map((item: Area) => (
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

export default transition(area);
