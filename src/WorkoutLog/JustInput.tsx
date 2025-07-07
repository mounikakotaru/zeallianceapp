interface Props {
  type: string;
  placeholder: string;
  readonly: boolean;
}
const Justinput = ({ type, placeholder, readonly }: Props) => {
  return (
    <>
      <input
        className="w-full py-1 text-lg font-medium px-4 placeholder:font-medium placeholder:text-lg focus:outline-none text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type={type}
        placeholder={placeholder}
        readOnly={readonly}
      />
    </>
  );
};

export default Justinput;
