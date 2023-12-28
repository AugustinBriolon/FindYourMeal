import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import { getMeals } from '../services/mealApi';


export default function Meal() {
  const [isLoading, setIsLoading] = useState(true);
  const { meal } = useParams<{ meal: string }>();
  const [mealData, setMealtData] = useState([]);


  useEffect(() => {
    getMeals(meal!).then((data) => {
      setMealtData(data);
      setIsLoading(false);
      console.log(data);
    });
  }, [meal]);

  return (
    <div>

    </div>
  )
}