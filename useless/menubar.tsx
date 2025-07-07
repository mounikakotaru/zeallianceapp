import { useState } from "react";

function Test() {
  const [menubar, setmenubar] = useState(false);
  return (
    <>
      {" "}
      <div className="relative flex flex-col bg-black  h-screen w-screen">
        <div className="flex-1"></div>
        <div className="flex flex-col items-center relative ">
          {menubar && (
            <>
              <div
                className={`transition-transform duration-500 ease-out ${
                  menubar ? "animate-slideUp" : "opacity-0 translate-y-full"
                }  shadow-lg p-4 rounded-lg absolute bottom-10`}
              >
                <div className="flex gap-2 ">
                  <span className="px-2 py-1 border rounded-xl">1</span>
                  <span className="px-2 py-1 border rounded-xl">2</span>
                  <span className="px-2 py-1 border rounded-xl">3</span>
                  <span className="px-2 py-1 border rounded-xl">4</span>
                  <span className="px-2 py-1 border rounded-xl">4</span>
                  <span className="px-2 py-1 border rounded-xl">4</span>
                  <span className="px-2 py-1 border rounded-xl">4</span>
                </div>
              </div>{" "}
            </>
          )}
          <button
            className="border w-fit px-2 py-1 rounded-xl cusor-pointer"
            onClick={() => {
              setmenubar(!menubar);
            }}
          >
            menubar
          </button>
        </div>
      </div>
    </>
  );
}

export default Test;
