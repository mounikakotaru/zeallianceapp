const Diary = () => {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const longDateString = `${day} ${month} ${year}`;
  return (
    <>
      <div className="w-full h-full bg-[#f4a261] rounded-xl flex flex-col gap-8 py-6  px-12 ">
        <div className="flex gap-4 w-full px-5">
          <div className=" flex justify-center items-center rounded-xl bg-white py-5 grow text-2xl font-extrabold relative">
            <div className="absolute left-5  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </div>{" "}
            {longDateString}
            <div className="absolute right-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
          </div>
          <div className="flex  justify-center items-center  rounded-xl bg-white mr-4">
            <svg
              className="w-fit px-5"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
              <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
            </svg>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-4  rounded-xl px-6  bg-[#f4a261] ">
          <div className="flex   ">
            <div className="grow flex items-center  justify-center">
              <svg
                className="bg-white border border-black rounded-xl"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="40"
                viewBox="0 0 24 24"
              >
                <path d="M6 5v14h3v-6h6v6h3V5h-3v6H9V5zM3 15a1 1 0 0 0 1 1h1V8H4a1 1 0 0 0-1 1v2H2v2h1v2zm18-6a1 1 0 0 0-1-1h-1v8h1a1 1 0 0 0 1-1v-2h1v-2h-1V9z"></path>
              </svg>
            </div>
            <div className="grow flex items-center justify-center">
              <svg
                className="bg-white border border-black rounded-xl"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="40"
                viewBox="0 0 24 24"
              >
                <path d="M21 10H3a1 1 0 0 0-1 1 10 10 0 0 0 5 8.66V21a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.34A10 10 0 0 0 22 11a1 1 0 0 0-1-1zM9 9V7.93a4.51 4.51 0 0 0-1.28-3.15A2.49 2.49 0 0 1 7 3V2H5v1a4.51 4.51 0 0 0 1.28 3.17A2.49 2.49 0 0 1 7 7.93V9zm4 0V7.93a4.51 4.51 0 0 0-1.28-3.15A2.49 2.49 0 0 1 11 3V2H9v1a4.51 4.51 0 0 0 1.28 3.15A2.49 2.49 0 0 1 11 7.93V9zm4 0V7.93a4.51 4.51 0 0 0-1.28-3.15A2.49 2.49 0 0 1 15 3V2h-2v1a4.51 4.51 0 0 0 1.28 3.15A2.49 2.49 0 0 1 15 7.93V9z"></path>
              </svg>
            </div>
          </div>
          <div className="px-5 py-3 bg-white rounded-xl border-2 border-black  ">
            <Excercisedata />
          </div>
        </div>
      </div>
    </>
  );
};

export default Diary;

//---------------------------------------------------Excercise Data-------------------------------------------------------------------->

// interface Props {
//   Name: String;
//   w1: String;
//   w2: String;
//   w3: String;
//   r1: String;
//   r2: String;
//   r3: String;
//   prw: string;
//   prr: string;
//  }
// function Excercisedata(props: Props) {
//   const { Name, w1, w2, w3, r1, r2, r3, prw, prr } = props;

function Excercisedata({}) {
  return (
    <div className=" relative flex border-2 border-[#000000] w-full my-6 py-5 px-4 rounded-xl text-xl font-bold  ">
      <div>Name : ww / rr , ww / rr , ww / rr , PR: ww / rr</div>
      <div className=" absolute right-5">
        {" "}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAcUlEQVR4nO2Q0QmAMAxEXxcpxQ38cf8JdAIpnUQRIkiJhWr6l/cVyHG5HDjOaIKRRmUGNmBqaCKwAkuveRDzA8hAUjRJdodouz+50u1iUKpPWrvfR6KVuVZFrmatuk/ER2qz5G9Hygjzm2RZi+M42HACwpMfy6qL1P4AAAAASUVORK5CYII="
          alt="My Image"
        />
      </div>
    </div>
  );
}
