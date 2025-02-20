import clsx from "clsx";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

interface IButtonProps {
  direction?: "left" | "right";
  className?: string;
  onClick: () => void;
}

const Button = ({ direction = "left", onClick, className }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "mx-2 flex size-14 items-center justify-center rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20",
        className,
      )}
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
