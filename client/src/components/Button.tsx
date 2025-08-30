import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<Props> = ({ text, ...props }) => {
  return (
    <button
      {...props}
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
    >
      {text}
    </button>
  );
};

export default Button;
