const Paragraphguy = () => {
  return (
    <div className="flex flex-col md:py-2 md:px-4 text-pretty">
      <div className="font-bold md:text-4xl text-2xl">Workout Plans</div>
      <div className="md:text-xl font-medium mt-2 text-medium">
        <p>Choose your fitness level and follow a guided workout routine.</p>
        <p className="hidden md:block">
          Each plan contains targeted exercises with video and step-by-step instructions.
        </p>
      </div>
    </div>
  );
};

export default Paragraphguy;
