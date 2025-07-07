import { createContext, useContext, useState, ReactNode } from "react";

interface Exercise {
  name: string;
  steps: string[];
  video: string;
}

interface WorkoutDetails {
  Title: string;
  NameArr: Exercise[];
}

interface SharedContextProps {
  isInfo: boolean;
  setIsInfo: (val: boolean) => void;
  workoutDetails: WorkoutDetails;
  setWorkoutDetails: (val: WorkoutDetails) => void;
  selectedTab: string | null;
  setSelectedTab: (val: string | null) => void;
}

const SharedContext = createContext<SharedContextProps | undefined>(undefined);

export const SharedStateProvider = ({ children }: { children: ReactNode }) => {
  const [isInfo, setIsInfo] = useState(true);
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails>({
    Title: "",
    NameArr: [],
  });
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  return (
    <SharedContext.Provider
      value={{
        isInfo,
        setIsInfo,
        workoutDetails,
        setWorkoutDetails,
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error("useSharedState must be used within SharedStateProvider");
  }
  return context;
};
