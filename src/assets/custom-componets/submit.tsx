import React from "react";
interface Props {
  placeholder: string;

  type: string;
}

const Submit: React.FC<Props> = ({ placeholder, type }) => {
  return (
    <div className="">
      <input
        className=" pl-4 pb-2 pt-1 h-8 rounded-2xl w-full hover:bg-slate-700 transition duration-200 ease-in-out hover:outline-2 focus:outline-white focus:outline-2  bg-background border  border-slate-600    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Submit;
