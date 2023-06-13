import { PropsWithChildren } from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
}

function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className="bg-green-800 text-gray-100 rounded px-4 py-2 my-2 hover:bg-green-700"
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default Button;
