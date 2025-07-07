import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const navigate = useNavigate();
  const LoginAuth = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMes(errorCode);
        console.log(errorMessage);
      });
  };
  return (
    <>
      {" "}
      <div className="w-full h-screen bg-[rgb(0,0,0,0.7)] ">
        <form className="flex flex-col justify-center items-center h-full  ">
          <div className="font-bold text-4xl mb-5 ">Login</div>
          <div className="flex flex-col gap-4 md:w-[20%]  text-black">
            <div className="">
              <input
                className="focus:outline-none rounded-lg px-1 w-full"
                type="email"
                placeholder="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <input
                className="focus:outline-none  px-1 rounded-lg w-full"
                type="password"
                placeholder="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              {errorMes && (
                <>
                  <span className="text-amber-400">error: {errorMes}</span>
                </>
              )}
            </div>
            <div className=" text-white px-2 py-1 justify-center flex  w-full">
              <button
                onClick={LoginAuth}
                className="w-[50%] border-2 rounded-xl border-white  hover:bg-gray-300 hover:text-black"
              >
                Login
              </button>
            </div>
            <div className="mt-4 border-dotted border-t-2 flex justify-center pt-2">
              <span className="text-white mr-1">Dont Have an Account ? </span>{" "}
              <span className="text-yellow-200">
                <Link to="/signup"> Register</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
