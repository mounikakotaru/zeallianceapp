import { Link } from "react-router-dom";
import { auth } from "../DB/firebase";
import { useEffect, useState } from "react";

const Header = () => {
  const [nuser, setNuser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setNuser(user);
    });
    return () => unsubscribe();
  }, []);

  const Logout = async (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("signed out");
      setNuser(null);
    });
  };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const longDateString = `${day} ${month} ${year}`;

  return (
    <>
      <nav
        id="nav"
        className="text-xl font-semibold bg-[#16171b] w-full flex items-center z-50 px-6 border-[#464646] sticky top-0 py-6"
      >

        <div className="text-4xl font-bold order-2 flex-1 text-center">
          <Link to="/">Zeallience</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden order-3 ml-auto relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
              }
            ></path>
          </svg>
        </button>

        {/* Navigation Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center justify-center md:order-3 md:w-auto md:space-x-4 order-4 md:static absolute top-full right-0 md:bg-transparent bg-[#16171b] rounded-xl md:my-0 my-1 md:py-0 py-2 transition-all ease-in-out duration-300`}
        >
          <div className="flex flex-col md:flex-row md:gap-0 gap-2 text-nowrap justify-center items-center px-2 md:px-0 md:w-full">
            <div className="order-3 md:px-4 md:mx-2 px-2">
              <Link className="underline-animation" to="/workoutinfo">
                Workout Plans
              </Link>
            </div>
            <div className="order-4 md:px-4 md:mx-2 px-2">
              <Link className="underline-animation" to="/workoutlog">
                Workout Log
              </Link>
            </div>
            <div className="order-5 md:px-4 md:mx-2 px-2">
              <Link className="underline-animation" to="/foodlog">
                Food Log
              </Link>
            </div>

            {/* ✅ New Saved Logs Button */}
            <div className="order-6 md:px-4 md:mx-2 px-2">
              <Link className="underline-animation" to="/food-history">
                Saved Logs
              </Link>
            </div>

            {nuser ? (
              <>
                <div className="hidden order-7 md:flex justify-center items-center rounded-full border-2 border-[#464646]">
                  <img
                    src="https://i.pinimg.com/564x/e3/92/1a/e3921a9e19d508c55dd3c217b9d68db2.jpg"
                    alt="profile"
                    width="40"
                    className="rounded-full"
                  />
                </div>
                <div className="order-8 ml-3 rounded-xl border-[#464646] border-2 px-2 py-1 hover:bg-gray-600">
                  <button onClick={Logout}>Logout</button>
                </div>
              </>
            ) : (
              <div className="mx-auto order-7 rounded-xl border-[#464646] border-2 md:px-2 md:py-1 hover:bg-gray-600 flex justify-center items-center md:w-full w-[60%]">
                <button>
                  <Link to="/login">Login</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
