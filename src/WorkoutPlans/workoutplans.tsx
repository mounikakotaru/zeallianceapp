import { SharedStateProvider } from "../context/sharedState";
import { ref, get } from "firebase/database";
import { db } from "../DB/firebase";
import Paragraphguy from "./Paragraphguy";
import Workoutnames from "./Workoutnames";
import Workoutnamesinfo from "./Workoutnamesinfo";
import { useEffect, useState } from "react";

const Workoutinfo = () => {
  const [ismenubar, setIsmenubar] = useState(false);
  const [workoutinfodata, setWorkoutinfodata] = useState([]);

  useEffect(() => {
    const getVariations = async () => {
      try {
        const dbRef = ref(db, "workouts");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setWorkoutinfodata(Object.values(data));
        } else {
          console.log("No workout data found.");
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    getVariations();
  }, []);

  return (
    <div className="flex flex-col px-4">
      <Paragraphguy />
      <SharedStateProvider>
        <div className="md:w-full flex border md:h-[60vh] h-[68vh] mt-2 flex-col relative items-center md:items-stretch pb-3">
          <div className="md:flex hidden items-stretch">
            {workoutinfodata.map((workout, index) => (
              <Workoutnames
                key={index}
                Title={workout.Title}
                NameArr={workout.NameArr}
              />
            ))}
          </div>

          {ismenubar && (
            <div
              onClick={() => setIsmenubar(!ismenubar)}
              className="z-50 flex flex-wrap p-4 rounded-lg absolute bottom-14 bg-gray-800 text-white"
            >
              {workoutinfodata.map((workout, index) => (
                <Workoutnames
                  key={index}
                  Title={workout.Title}
                  NameArr={workout.NameArr}
                />
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto w-full">
            <Workoutnamesinfo />
          </div>

          <div
            className="flex border bg-slate-300 font-bold text-lg text-black mt-10 w-fit px-2 py-1 rounded-full cursor-pointer md:hidden gap-2 justify-center items-center"
            onClick={() => setIsmenubar(!ismenubar)}
          >
            <button>Plans</button>
          </div>
        </div>
      </SharedStateProvider>
    </div>
  );
};

export default Workoutinfo;
