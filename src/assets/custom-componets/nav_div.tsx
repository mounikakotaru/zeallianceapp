import React from "react";

interface Props {
  name: string;
  link: string;
}

const Navbox: React.FC<Props> = ({ name, link }) => {
  return (
    <div className="my-6  rounded  hover:bg-white font-semibold">
      <a className="p-6 " href={link}>
        {" "}
        {name}{" "}
      </a>{" "}
    </div>
  );
};

export default Navbox;
