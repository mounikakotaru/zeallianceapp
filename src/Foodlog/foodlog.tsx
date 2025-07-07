import { useState } from "react";
import Foodbrowse from "./Foodbrowse";
import Caloriesfood from "./CaloriesFood";
import { ref, get } from "firebase/database";
import { db } from "../DB/firebase";

interface Food {
  id: number;
  name: string;
  cal: number;
}

const Foodlog = () => {
  const [hasElements, setHasElements] = useState<boolean>(false);
  const [space, setSpace] = useState<Food[]>([]);
  const [foodbrowse, setFoodbrowse] = useState<boolean>(false);

  const addfood = async (id: number) => {
    const foodData = await fetchFooddata(id);
    if (foodData) {
      setSpace((prevSpace) => {
        const newSpace = [...prevSpace, foodData];
        setHasElements(newSpace.length > 0);
        return newSpace;
      });
    }
  };

  const fetchFooddata = async (id: number): Promise<Food | null> => {
    try {
      const dbRef = ref(db, `foodItems/${id}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return (
    <div className="flex-col flex md:flex-row gap-4 px-2 py-6 justify-center">
      <div className="md:w-[48%] md:min-h-[82vh] w-full max-h-full min-h-[80vh]">
        <Caloriesfood
          foodbrowse={foodbrowse}
          setFoodbrowse={setFoodbrowse}
          space={space}
          setSpace={setSpace}
          setHasElements={setHasElements}
          hasElements={hasElements}
        />
      </div>

      <div className="md:flex md:w-[48%] h-full md:min-h-[82vh] hidden">
        <Foodbrowse
          foodbrowse={foodbrowse}
          setFoodbrowse={setFoodbrowse}
          addfood={addfood}
        />
      </div>

      {foodbrowse && (
        <div className="absolute inset-0 z-50 bg-[#16171b] md:hidden w-full h-full">
          <Foodbrowse
            foodbrowse={foodbrowse}
            setFoodbrowse={setFoodbrowse}
            addfood={addfood}
          />
        </div>
      )}
    </div>
  );
};

export default Foodlog;

