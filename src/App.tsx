import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Header_Footer/footer";
import Header from "./Header_Footer/head";
import Workoutinfo from "./WorkoutPlans/workoutplans";
import Bmi from "./Bmi/bmi";
import BmiHistory from "./Bmi/BmiHistory";
import Workoutlog from "./WorkoutLog/workoutlog";
import Foodlog from "./Foodlog/foodlog";
import Login from "./DB/Login";
import Signup from "./DB/signup";
import FoodLogHistory from "./Foodlog/FoodLogHistory";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  return (
    <BrowserRouter>
      <div className="md:min-h-screen flex-col relative">
        <div className="sticky top-0 z-50">
          <Header />
        </div>

        <div className="md:min-h-[86vh]">
          <DndProvider backend={HTML5Backend}>
            <Routes>
              <Route path="/" element={<Bmi />} />
              <Route path="/bmi-history" element={<BmiHistory />} />
              <Route path="/workoutinfo" element={<Workoutinfo />} />
              <Route path="/workoutlog" element={<Workoutlog />} />
              <Route path="/foodlog" element={<Foodlog />} />
              <Route path="/food-history" element={<FoodLogHistory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </DndProvider>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
