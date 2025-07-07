import React from "react";
import { useSharedState } from "../context/sharedState";

interface ExerciseName {
  name: string;
  steps: string[];
  video: string;
}

interface WorkoutnamesProps {
  Title: string;
  NameArr: ExerciseName[];
}

const Workoutnames: React.FC<WorkoutnamesProps> = ({ Title, NameArr }) => {
  const { setIsInfo, setWorkoutDetails, selectedTab, setSelectedTab } =
    useSharedState();

  const isSelected = selectedTab === Title;

  return (
    <div
      className={`md:px-4 md:py-3 cursor-pointer text-center md:w-[15%] ${
        isSelected
          ? "text-[#5fdaff] bg-slate-800 border-b-2 border-[#5fdaff]"
          : ""
      }`}
      onClick={() => {
        setIsInfo(false);
        setWorkoutDetails({ Title, NameArr });
        setSelectedTab(Title);
      }}
    >
      <div className="font-semibold text-xl whitespace-nowrap">{Title}</div>
    </div>
  );
};

export default Workoutnames;

