import Excercisedata from "./ExcersiceData";

interface Exercise {
  name: string;
  sets: { weight: string; reps: string }[];
  prw: string;
  prr: string;
}

interface DatacountProps {
  workouts: Exercise[];
}

const Datacount: React.FC<DatacountProps> = ({ workouts }) => {
  return (
    <>
      {workouts.map((workout, index) => (
        <Excercisedata key={index} workout={workout} />
      ))}
    </>
  );
};

export default Datacount;

