import { useState, useEffect } from "react";
import { auth, fdb } from "../DB/firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "./inputwithlabel";

enum ActivityLevel {
  Sedentary = "sedentary",
  LightlyActive = "lightlyActive",
  ModeratelyActive = "moderatelyActive",
  VeryActive = "veryActive",
  ExtraActive = "extraActive",
}

interface UserParams {
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
}

interface CalorieNeeds {
  maintenanceCalories: number;
  mildWeightLossCalories: number;
  mildWeightGainCalories: number;
}

function calculateCalories({
  age,
  gender,
  weight,
  height,
  activityLevel,
}: UserParams): CalorieNeeds {
  let BMR: number;
  if (gender === "male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityFactors: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extraActive: 1.9,
  };

  const factor = activityFactors[activityLevel];
  const TDEE = BMR * factor;

  return {
    maintenanceCalories: Math.round(TDEE),
    mildWeightLossCalories: Math.round(TDEE - TDEE * 0.15),
    mildWeightGainCalories: Math.round(TDEE + TDEE * 0.15),
  };
}

const Bmi = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState<string | null>("input your data to check BMI");
  const [bmiCategory, setBmiCategory] = useState("Unknown");
  const [activity, setActivity] = useState<ActivityLevel>(ActivityLevel.Sedentary);
  const [added, setAdded] = useState(false);
  const [calorieNeeds, setCalorieNeeds] = useState<CalorieNeeds | null>(null);

  useEffect(() => {
    if (height && weight && age && gender) {
      const needs = calculateCalories({
        age: parseFloat(age),
        gender,
        weight: parseFloat(weight),
        height: parseFloat(height),
        activityLevel: activity,
      });
      setCalorieNeeds(needs);
    }
  }, [activity, height, weight, age, gender]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivity(e.target.value as ActivityLevel);
  };

  const handleGenderClick = (selected: "male" | "female") => {
    setGender(selected);
  };

  const calBmi = (e: React.FormEvent<HTMLFormElement>) => {
    setAdded(true);
    e.preventDefault();
    if (height && weight && age) {
      const heightMeters = parseFloat(height) / 100;
      const value = parseFloat(weight) / (heightMeters * heightMeters);
      setBmi(value.toFixed(1));

      const bmiVal = parseFloat(value.toFixed(1));
      setBmiCategory(
        bmiVal < 18.5
          ? "Underweight & suggested workoutplan: Beginner" 
          : bmiVal < 24.9
          ? "Normal Weight & suggested workoutplan: Advanced"
          : bmiVal < 29.9
          ? "Overweight & suggested workoutplan: intermediate"
          : "Obese & suggested workoutplan: Beginner"
      );
    }
  };

  const savedata = async () => {
    let currentdate = new Date().toISOString().slice(0, 10);
    const user = auth.currentUser;

    if (user) {
      try {
        const bmiCollectionRef = collection(fdb, "users", user.uid, "bmi");
        const bmidocRef = doc(bmiCollectionRef, currentdate);
        await setDoc(bmidocRef, {
          bmi,
          bmiCategory,
          height,
          weight,
          date: currentdate,
        });
        alert("✅ BMI saved successfully!");
      } catch (error) {
        console.error("❌ Error saving BMI:", error);
        alert("❌ Failed to save BMI. Please try again.");
      }
    } else {
      alert("⚠️ User not signed in.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-xl py-2 px-2 md:px-8 md:flex-row flex flex-col text-black md:gap-4 gap-2 w-full overflow-y-auto">
        {/* Left */}
        <div className="flex flex-col items-center px-2 py-2 md:px-6 md:py-10 md:w-[50%] w-full bg-[#dadee2]">
          <div className="md:text-6xl text-4xl font-extrabold">BMI Calculator</div>
          <form onSubmit={calBmi}>
            <div className="flex flex-col gap-7 md:text-3xl text-xl font-bold mt-8">
              <div className="grid grid-cols-2 text-center">
                <div
                  className={`border-2 border-black rounded-lg py-2 cursor-pointer ${
                    gender === "male" ? "bg-blue-500 text-white" : "bg-transparent"
                  }`}
                  onClick={() => handleGenderClick("male")}
                >
                  Male
                </div>
                <div
                  className={`border-2 border-black rounded-lg py-2 cursor-pointer ${
                    gender === "female" ? "bg-red-400 text-white" : "bg-transparent"
                  }`}
                  onClick={() => handleGenderClick("female")}
                >
                  Female
                </div>
              </div>
              <InputWithLabel
                type="number"
                placeholder="Age"
                label="Age"
                unit="yrs"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <InputWithLabel
                type="number"
                placeholder="Height"
                label="Height"
                unit="cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <InputWithLabel
                type="number"
                placeholder="Weight"
                label="Weight"
                unit="kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <button
                className="border-4 border-black rounded-full py-3 w-full hover:bg-[#c27a50] hover:text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right */}
        <div className="md:bg-[#dadee2] relative md:text-black text-white rounded-xl md:px-8 md:py-10 font-semibold px-2 py-2 text-xl md:w-[50%]">
          {!added ? (
            <div className="relative w-full h-full hidden md:block">
              <div className="absolute inset-0 bg-[url('https://images2.alphacoders.com/133/1335809.png')] bg-cover bg-center transform scale-x-[-1]"></div>
              <div className="hidden absolute inset-0 md:flex justify-center items-center bg-black bg-opacity-50 text-white text-4xl">
                Enter The Details to View the Info
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <div>
                  Gender: <strong>{gender}</strong>, Age: {age} yrs, Height: {height} cm, Weight: {weight} kg
                </div>
                <div>
                  Body Mass Index ={" "}
                  <span className="bg-yellow-200 px-2 font-bold text-black">{bmi}</span>
                </div>
                <div>
                  You are{" "}
                  <span className="bg-yellow-200 font-bold px-2 text-black">{bmiCategory}</span>
                </div>
              </div>

              {/* Calorie Info */}
              <div className="border-t-2 mt-4 flex flex-col gap-4">
                <div>Calorie Calculator</div>
                <label>Activity:</label>
                <select
                  className="text-white md:text-black bg-black md:bg-transparent border-2 md:border-black w-full"
                  value={activity}
                  onChange={handleSelectChange}
                >
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="lightlyActive">Light (1–3 days/week)</option>
                  <option value="moderatelyActive">Moderate (3–5 days/week)</option>
                  <option value="veryActive">Very (6–7 days/week)</option>
                  <option value="extraActive">Extra (twice/day workouts)</option>
                </select>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div>
                    <div className="border px-2">Maintenance</div>
                    <div className="border px-2 font-mono">
                      {calorieNeeds?.maintenanceCalories} cal
                    </div>
                  </div>
                  <div>
                    <div className="border px-2">Mild Weight Loss</div>
                    <div className="border px-2 font-mono">
                      {calorieNeeds?.mildWeightLossCalories} cal
                    </div>
                  </div>
                  <div>
                    <div className="border px-2">Mild Weight Gain</div>
                    <div className="border px-2 font-mono">
                      {calorieNeeds?.mildWeightGainCalories} cal
                    </div>
                  </div>
                </div>
              </div>

              {/* Save + View History Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={savedata}
                  className={`${
                    auth.currentUser ? "" : "opacity-50 pointer-events-none"
                  } bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600`}
                >
                  Save
                </button>

                <button
                  onClick={() => navigate("/bmi-history")}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  View BMI History
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bmi;
