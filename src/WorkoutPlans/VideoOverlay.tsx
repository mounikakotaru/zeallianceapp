interface VideoOverlayProps {
  setInfo: React.Dispatch<React.SetStateAction<boolean>>;
  Name: string;
  Steps: string[];
  Video: string;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({
  setInfo,
  Name,
  Steps,
  Video,
}) => {
  return (
    <div
      onClick={() => setInfo(false)}
      className="h-full w-full bg-gray-900 bg-opacity-80 flex justify-center items-center fixed inset-0 z-50"
    >
      <div
        className="md:w-[75%] md:h-[70%] bg-[#16171b] p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center text-white text-2xl font-bold mb-4">{Name}</div>

        <div className="flex md:flex-row flex-col gap-4">
          {/* Video */}
          <div className="flex-1 aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src={Video}
              title="Workout Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Steps */}
          <div className="flex-1 text-white">
            <h3 className="text-xl font-semibold mb-2">Steps:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {Steps.map((step, index) => (
                <li key={index} className="text-base">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;


