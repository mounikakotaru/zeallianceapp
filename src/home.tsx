import { Route, Routes } from "react-router-dom";
import Workoutinfo from "./WorkoutPlans/workoutplans";
import Bmi from "./Bmi/bmi";
import Workoutlog from "./WorkoutLog/workoutlog";
import Foodlog from "./Foodlog/foodlog";
import FoodLogHistory from "./Foodlog/FoodLogHistory"; // ✅ Import added
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Login from "./DB/Login";
import Signup from "./DB/signup";

function Home() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<Bmi />} />
          <Route path="/workoutinfo" element={<Workoutinfo />} />
          <Route path="/workoutlog" element={<Workoutlog />} />
          <Route path="/foodlog" element={<Foodlog />} />
          <Route path="/food-history" element={<FoodLogHistory />} /> {/* ✅ New route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </DndProvider>
    </>
  );
}

export default Home;
