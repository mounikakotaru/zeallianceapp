import { useEffect, useState } from "react";
import { ref, set, onValue, update, remove } from "firebase/database";
import { auth, db } from "../DB/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface WorkoutEntry {
  id: string;
  exerciseName: string;
  weight: string;
  reps: string;
  completed: boolean;
  timestamp: number;
}

const Workoutlog = () => {
  const [user] = useAuthState(auth);
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState<WorkoutEntry[]>([]);

  useEffect(() => {
    if (user) {
      const logsRef = ref(db, `workoutLogs/${user.uid}`);
      onValue(logsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data).map(([key, val]: any) => ({
            id: key,
            ...val,
          }));
          const sorted = entries.sort((a, b) => b.timestamp - a.timestamp);
          setLogs(sorted);
        } else {
          setLogs([]);
        }
      });
    }
  }, [user]);

  const saveWorkoutLog = async () => {
    if (!user) {
      setError("User not logged in");
      return;
    }

    if (!exerciseName || !weight || !reps) {
      setError("Please fill in all fields");
      return;
    }

    const logRef = ref(db, `workoutLogs/${user.uid}/${Date.now()}`);
    try {
      await set(logRef, {
        exerciseName,
        weight,
        reps,
        completed: false,
        timestamp: Date.now(),
      });
      setError("");
      setExerciseName("");
      setWeight("");
      setReps("");
    } catch (err) {
      console.error("Error saving workout log:", err);
      setError("Failed to save workout log");
    }
  };

  const toggleCompleted = async (log: WorkoutEntry) => {
    const entryRef = ref(db, `workoutLogs/${user?.uid}/${log.id}`);
    try {
      await update(entryRef, { completed: !log.completed });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const deleteWorkout = async (logId: string) => {
    const logRef = ref(db, `workoutLogs/${user?.uid}/${logId}`);
    try {
      await remove(logRef);
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-10 py-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Workout Log</h2>

      {/* Input Row */}
      <div className="flex flex-wrap md:flex-nowrap gap-4 items-center mb-6 border border-gray-600 p-4 rounded-xl bg-[#1f1f1f]">
        <input
          type="text"
          placeholder="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-white text-black focus:outline-none"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-28 px-4 py-2 rounded-md bg-white text-black focus:outline-none"
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-24 px-4 py-2 rounded-md bg-white text-black focus:outline-none"
        />
        <button
          onClick={saveWorkoutLog}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Save
        </button>
      </div>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      {/* Logs Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Saved Workouts</h3>
        {logs.length === 0 ? (
          <p className="text-gray-400">No workout logs yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between border border-gray-700 p-4 rounded-md bg-[#2a2a2a]"
              >
                <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                  <p className="font-bold">{log.exerciseName}</p>
                  <p>{log.weight} kg</p>
                  <p>{log.reps} reps</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-300">Completed</label>
                  <input
                    type="checkbox"
                    checked={log.completed}
                    onChange={() => toggleCompleted(log)}
                    className="w-4 h-4"
                  />
                  <button
                    onClick={() => deleteWorkout(log.id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workoutlog;


