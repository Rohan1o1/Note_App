import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<Props> = ({ id,label, ...props }) => {
  return (
    <div className="mb-4 mt-4 relative">
      
      {/* <label className="block text-sm font-medium mb-1">{label}</label> */}

      <input
        {...props}
        // className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
        id={id} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg   border-2  appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-1 focus:ring-2 focus:border-blue-600 peer" placeholder=" " 
      />
<label htmlFor={id} className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{label}</label>


      
    </div>
  );
};

export default Input;
