import { useEffect, useState } from "react";
import { db, auth } from "../DB/firebase";
import { ref, get, remove } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

interface FoodItem {
  name: string;
  cal: number;
}

interface FoodLog {
  id: string;
  date: string;
  items: FoodItem[];
}

const FoodLogHistory = () => {
  const [user] = useAuthState(auth);
  const [logs, setLogs] = useState<FoodLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) return;

      const userLogsRef = ref(db, `users/${user.uid}/foodLogs`);
      const snapshot = await get(userLogsRef);
      if (snapshot.exists()) {
        const logsArray: FoodLog[] = Object.entries(snapshot.val()).map(
          ([key, value]: any) => ({
            id: key,
            ...value,
          })
        );
        setLogs(logsArray.reverse()); // show latest logs first
      } else {
        setLogs([]);
      }
    };

    fetchLogs();
  }, [user]);

  const deleteLog = async (logId: string) => {
    if (!user) return;

    const logRef = ref(db, `users/${user.uid}/foodLogs/${logId}`);
    await remove(logRef);
    setLogs((prev) => prev.filter((log) => log.id !== logId));
  };

  const formatDate = (isoDate: string): string => {
    if (!isoDate) return "Unknown Date";

    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="text-white px-4 py-6 min-h-[85vh]">
      <h1 className="text-3xl font-bold mb-4">📜 Saved Food Logs</h1>

      {logs.length === 0 ? (
        <p className="text-lg">No logs saved yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {logs.map((log) => (
            <div
              key={log.id}
              className="border border-[#464646] rounded-lg p-4 bg-[#1e1e1e]"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">{formatDate(log.date)}</h2>
                <button
                  onClick={() => deleteLog(log.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

              <ul className="list-disc ml-5 text-lg space-y-1">
                {log.items?.map((item, index) => (
                  <li key={index}>
                    <span className="font-medium">{item.name}</span> -{" "}
                    <span className="text-yellow-300">{item.cal} cal</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodLogHistory;
