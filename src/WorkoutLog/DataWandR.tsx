import Justinput from "./JustInput";
const DataWandR = () => {
  var Isreadonly = false;
  return (
    <div className="flex w-fit py-2 px-4 gap-4 ">
      <div>
        {" "}
        <div className="">
          {" "}
          <Justinput type="number" placeholder="Weight" readonly={Isreadonly} />
        </div>
      </div>
      <div>
        <div className=" ">
          <Justinput type="number" placeholder="Reps" readonly={Isreadonly} />
        </div>
      </div>
    </div>
  );
};

export default DataWandR;
