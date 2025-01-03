import { GoArrowRight, GoArrowLeft } from "react-icons/go";

interface IButtonProps {
  direction?: "left" | "right";
  onClick: () => void;
}

const Button = ({ direction = "left", onClick }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      {direction === "left" ? (
        <GoArrowLeft className="inline-block h-10 w-10" />
      ) : (
        <GoArrowRight className="inline-block h-10 w-10" />
      )}
    </button>
  );
};

export default Button;
