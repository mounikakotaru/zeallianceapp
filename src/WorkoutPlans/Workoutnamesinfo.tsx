import { useSharedState } from "../context/sharedState";
import Excersicename from "./ExcersiseName";

const Workoutnamesinfo = () => {
  const { isInfo, workoutDetails } = useSharedState();

  if (isInfo) {
    return (
      <div className="h-[30vh] px-10 py-10 flex flex-col border-t-2 border-[#5fdaff]">
        <h2 className="text-2xl font-bold mb-2">Select a Workout Plan</h2>
        <p className="text-lg">
          Please select a workout level (Beginner, Intermediate, Advanced) from the tabs above.
        </p>
      </div>
    );
  }

  return (
    <div className="h-auto px-6 py-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">{workoutDetails.Title} Plan</h2>
      <div className="flex flex-col gap-4">
        {workoutDetails.NameArr.map((exercise, index) => (
          <Excersicename
            key={index}
            Name={exercise.name}
            Steps={exercise.steps}
            Video={exercise.video}
          />
        ))}
      </div>
    </div>
  );
};

export default Workoutnamesinfo;

