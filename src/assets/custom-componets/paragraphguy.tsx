const Paragraphguy = () => {
  return (
    <div
      id="paragraph"
      className="flex flex-col  gap-5 text-pretty  border-b-2 border-black "
    >
      <div className="font-bold text-2xl">Calisthenics</div>
      <div>
        The term calisthenics comes from the Greek words ‘Kalos’ meaning beauty
        and ‘Stenos’ which translates as strength.{" "}
      </div>
      <div className="mb-4">
        {" "}
        Calisthenics is a form of strength training that utilizes an
        individual's body weight as resistance to perform multi-joint, compound
        movements with little or no equipment
      </div>
    </div>
  );
};

export default Paragraphguy;
