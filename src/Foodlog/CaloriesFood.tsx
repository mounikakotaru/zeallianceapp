import React, { useEffect, useState } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { ref, get, set } from "firebase/database";
import { db, auth } from "../DB/firebase";
import Fooddata from "./FoodData";

interface Food {
  id: number;
  name: string;
  cal: number;
}
interface CaloriesfoodProps {
  space: Food[];
  setSpace: React.Dispatch<React.SetStateAction<Food[]>>;
  foodbrowse: boolean;
  setFoodbrowse: React.Dispatch<React.SetStateAction<boolean>>;
  setHasElements: React.Dispatch<React.SetStateAction<boolean>>;
  hasElements?: boolean;
}

const Caloriesfood: React.FC<CaloriesfoodProps> = ({
  space,
  setSpace,
  foodbrowse,
  setFoodbrowse,
  setHasElements,
  hasElements,
}) => {
  const [Ltcal, setLtcal] = useState("");
  const [tcal, setTcal] = useState<number>(0);
  const [sumCal, setSumCal] = useState<number>(0);

  useEffect(() => {
    const newSumCal = space.reduce((sum, item) => sum + item.cal, 0);
    setSumCal(newSumCal);
  }, [space]);

  useEffect(() => {
    const fetchUserLog = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const today = new Date().toISOString().split("T")[0];
      const logRef = ref(db, `users/${uid}/foodLogs/${today}`);
      const snapshot = await get(logRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSpace(data.items || []);
        setTcal(data.targetCalories || 0);
        setHasElements((data.items || []).length > 0);
      }
    };
    fetchUserLog();
  }, []);

  const [, drop] = useDrop(() => ({
    accept: "food",
    drop: async (item: { id: number }) => {
      const Fooddata = await fetchFooddata(item.id);
      if (Fooddata) {
        setSpace((prev) => {
          const newSpace = [...prev, Fooddata];
          setHasElements(newSpace.length > 0);
          return newSpace;
        });
      }
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const fetchFooddata = async (id: number) => {
    try {
      const dbRef = ref(db, `foodItems/${id}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) return snapshot.val();
      return null;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const deleteFood = (index: number) => {
    const updatedItems = [...space];
    updatedItems.splice(index, 1);
    setSpace(updatedItems);
    setHasElements(updatedItems.length > 0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTcal(+Ltcal);
    setLtcal("");
  };

  const saveToFirebase = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert("User not logged in");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const logRef = ref(db, `users/${uid}/foodLogs/${today}`);

    const foodLog = {
      targetCalories: tcal,
      totalCalories: sumCal,
      items: space,
      date: new Date().toISOString(), // Save current date
    };

    try {
      await set(logRef, foodLog);
      alert("Food log saved!");
    } catch (error) {
      console.error("Error saving log:", error);
      alert("Failed to save.");
    }
  };

  const diffCal = tcal - sumCal;

  return (
    <div className="relative h-[80vh] max-h-full md:h-full">
      <div className="rounded-[8px] md:py-4 py-1 px-2 md:px-4 border-[#464646] border-4 flex flex-col w-full h-full">
        <div className="justify-center flex items-center md:text-3xl text-2xl font-bold mb-2">
          Log Your Food
        </div>

        <div className="flex md:flex-row flex-col py-3 font-semibold">
          <div className="flex border justify-center items-center">
            <span className="md:px-4">{tcal}</span>
            <span>/</span>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Enter Target Calories"
                value={Ltcal}
                className="md:pl-4 w-fit outline-none bg-transparent"
                onChange={(e) => setLtcal(e.target.value)}
              />
            </form>
            <button className="md:ml-2" onClick={handleSubmit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26px"
                width="26px"
                viewBox="0 -960 960 960"
                fill="#75FBFD"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
              </svg>
            </button>
          </div>

          <div className="md:px-2 flex flex-wrap py-1">
            <span className="md:px-2">Calories left -</span>
            <span className={`${diffCal < 0 && "text-red-700 font-bold"}`}>
              {diffCal}
            </span>
            <span className="ml-auto">Total Calories - {sumCal}</span>
          </div>
        </div>

        <div className="mt-2 flex-1 relative" ref={drop}>
          {!hasElements && (
            <p className="absolute inset-0 hidden md:flex justify-center items-center opacity-20 bg-white text-black md:text-2xl font-bold">
              Release to drop
            </p>
          )}
          <div className="rounded-xl md:px-8 flex flex-col gap-4 my-2">
            {space.map((food, index) => (
              <Fooddata
                key={food.id}
                name={food.name}
                isx={true}
                id={food.id}
                cal={food.cal}
                handleClick={() => deleteFood(index)}
              />
            ))}
          </div>
        </div>

        {/* ✅ Save Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={saveToFirebase}
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
          >
            Save Food Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default Caloriesfood;
