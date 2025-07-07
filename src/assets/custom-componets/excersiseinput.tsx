// interface Props{
//     isreadonly="string";
// }

const Excersiseinput = () => {
  var Isreadonly = false;
  return (
    <div className="flex border border-black w-fit py-2 px-4 gap-4">
      <div>
        {" "}
        <div className="flex flex-col w-[100px] gap-2 ">
          {" "}
          <input className="w-full px-3" type="number" placeholder="weight" />
          <div className="">Weight</div>
        </div>
      </div>
      <div>
        <div className="flex flex-col w-[100px] gap-2  ">
          <input
            className="w-full px-3"
            type="number"
            placeholder="reps"
            readOnly={Isreadonly}
          />
          <div className="">Reps</div>
        </div>
      </div>
    </div>
  );
};

export default Excersiseinput;
