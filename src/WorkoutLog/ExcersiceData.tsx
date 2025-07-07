import { useState } from "react";
import DataWandR from "./DataWandR";

interface Exercise {
  name: string;
  sets: { weight: string; reps: string }[];
  prw: string;
  prr: string;
}

const Excercisedata: React.FC<{ workout: Exercise }> = ({ workout }) => {
  const [info, setInfo] = useState(true);
  const handleClick = () => setInfo((prev) => !prev);

  return (
    <div
      className={`relative flex border-2 w-full my-6 py-5 px-4 rounded-xl text-xl font-bold gap-2 ${
        info ? "border-[#464646]" : "border-amber-300"
      }`}
    >
      {info ? (
        <>
          <div>
            {workout.name} :{" "}
            {workout.sets
              .map((set) => `${set.weight} / ${set.reps}`)
              .join(" , ")}{" "}
            , PR: {workout.prw} / {workout.prr}
          </div>
          <div className="absolute right-5 cursor-pointer">
            <svg
              onClick={handleClick}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <div className="text-nowrap">Exercise Name</div>
            <div className="absolute right-20 flex gap-2">
              <div className="px-3 py-1 bg-blue-500 cursor-pointer">Save</div>
              <svg
                className="absolute bottom-0"
                onClick={handleClick}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#e8eaed"
              >
                <path d="m280-400 200-200 200 200H280Z" />
              </svg>
            </div>
            <div className="flex flex-wrap gap-6">
              {workout.sets.map((_, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <h1 className="mt-3 text-nowrap">Set-{idx + 1}</h1>
                  <DataWandR />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Excercisedata;

