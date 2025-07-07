import { useEffect, useState } from "react";
import { auth, fdb } from "../DB/firebase";
import { collection, getDocs } from "firebase/firestore";

interface BmiEntry {
  bmi: string;
  bmiCategory: string;
  height: string;
  weight: string;
  date: string;
}

const getSuggestion = (category: string) => {
  switch (category) {
    case "Underweight":
      return "Focus on strength training and high-calorie intake workouts.";
    case "Normal Weight":
      return "Maintain with balanced cardio and strength workouts.";
    case "Overweight":
      return "Focus on cardio (walking, cycling) and low-impact strength training.";
    case "Obese":
      return "Start with light walking, swimming, or doctor-advised workouts.";
    default:
      return "No suggestion available.";
  }
};

const BmiHistory = () => {
  const [bmiData, setBmiData] = useState<BmiEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBMIData = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in");
        return;
      }

      try {
        const bmiCollection = collection(fdb, "users", user.uid, "bmi");
        const snapshot = await getDocs(bmiCollection);
        const data: BmiEntry[] = snapshot.docs.map((doc) => doc.data() as BmiEntry);
        const sortedData = data.sort((a, b) => (a.date < b.date ? 1 : -1)); // latest first
        setBmiData(sortedData);
      } catch (error) {
        console.error("Error fetching BMI history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBMIData();
  }, []);

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 BMI History</h1>
      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : bmiData.length === 0 ? (
        <div className="text-center text-lg text-gray-600">No BMI records found.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {bmiData.map((entry, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50"
            >
              <div className="font-semibold">📅 Date: {entry.date}</div>
              <div>📐 BMI: <strong>{entry.bmi}</strong> ({entry.bmiCategory})</div>
              <div>📏 Height: {entry.height} cm</div>
              <div>⚖️ Weight: {entry.weight} kg</div>
              <div className="mt-2 text-green-700">
                💡 Suggestion: {getSuggestion(entry.bmiCategory)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BmiHistory;
