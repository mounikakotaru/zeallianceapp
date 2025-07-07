import Excersicename from "./excersicename";

const Workoutnamesinfo = () => {
  return (
    <div className=" px-4 py-3 s border-4 flex flex-col ">
      <div className="  font-semibold text-xl ">Push</div>
      <Excersicename />
      <Excersicename />
      <Excersicename />
      <Excersicename />
      <Excersicename />

      <div className="relative h-[9px] mb-1">
        <svg
          className="absolute right-0 "
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Workoutnamesinfo;
