import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [passworddontmatch, setPassworddontmatch] = useState(false);
  const [errorMes, setErrorMes] = useState("");
  const navigate = useNavigate();

  const signupAuth = async (e) => {
    setPassworddontmatch(false);

    e.preventDefault();
    if (password !== cpassword) {
      setPassworddontmatch(true);

      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        setErrorMes(errorMessage);
      });
  };
  return (
    <>
      {" "}
      <div className="w-full h-screen bg-[rgb(0,0,0,0.7)] ">
        <form className="flex flex-col justify-center items-center h-full  ">
          <div className="font-bold text-4xl mb-5">Sign Up</div>
          <div className="flex flex-col gap-4 md:w-[20%]  text-black">
            <div className="">
              <input
                required
                className="focus:outline-none rounded-lg px-1 w-full"
                type="email"
                placeholder="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <input
                required
                className="focus:outline-none  px-1 rounded-lg w-full"
                type="password"
                placeholder="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <input
                required
                className="focus:outline-none rounded-lg px-1 w-full"
                type="password"
                placeholder="confirm password"
                onChange={(event) => setCpassword(event.target.value)}
              />
              {passworddontmatch && (
                <>
                  <span className="text-white text-sm">
                    {"Passwords dont match"}
                  </span>
                </>
              )}
              {errorMes && (
                <>
                  <span className="text-white text-sm">{errorMes}</span>
                </>
              )}
            </div>
            <div className="text-white">
              <input className="focus:outline-none" type="checkbox" />{" "}
              <span className="text-orange-200">
                i agree to the terms and conditions
              </span>
            </div>
            <div className="   text-white px-2 py-1 justify-center flex  w-full">
              <button
                onClick={signupAuth}
                className="w-[50%] border-2 rounded-xl border-white hover:bg-gray-300 hover:text-black"
              >
                Sign up
              </button>
            </div>{" "}
            <div className="mt-4 border-t-2 border-dotted pt-2 flex justify-center items-center ">
              <span className="text-white mr-1">
                Already Have an Account ?{" "}
              </span>{" "}
              <span className="text-yellow-200">
                <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
