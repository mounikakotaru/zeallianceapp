import { useDrag } from "react-dnd";

interface FProps {
  isx: boolean;
  name: string;
  id: number;
  cal: number;
  handleClick: () => void;
}

const Fooddata: React.FC<FProps> = ({ isx, name, id, handleClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "food",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    //this should be dragged

    <div
      ref={drag}
      draggable
      className="md:px-4 px-2 py-1  rounded-[6px] font-bold text-lg md:py-2 flex relative border-2  "
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div>{name}</div>
      {isx && (
        <div className="absolute right-5 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
            onClick={handleClick}
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
      )}
    </div>
  );
};
export default Fooddata;
