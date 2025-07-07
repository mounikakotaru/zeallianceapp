import React from "react";

interface Props {
  value1: string;
  id1: string;
  id2: string;
  label1: string;
  label2: string;
  value2: string;
  name: string;
}

const Radiogroup: React.FC<Props> = ({
  value1,
  value2,
  id1,
  id2,
  label1,
  label2,
  name,
}) => {
  return (
    <>
      <label htmlFor={name}> {name}</label>
      <div className="flex gap-4 ">
        <div mr-4>
          <input type="radio" name={name} id={id1} value={value1} />
          <label htmlFor={label1}> {label1}</label>
        </div>{" "}
        <div mr-4>
          <input type="radio" name={name} id={id2} value={value2} />
          <label htmlFor={label2}> {label2}</label>
        </div>{" "}
      </div>
    </>
  );
};

export default Radiogroup;
