import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "text" | "password" | "email";
}

const PasswordInputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type,
}) => {
  const [passVisible, setPassVisible] = useState<boolean>(false);

  return (
    <div className="mt-4">
      <label
        className="block mb-2 text-sm font-medium text-slate-600 dark:text-gray-200"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="w-full relative flex justify-center items-center">
        <input
          id={id}
          className="block w-full px-4 py-2 text-slate-700 bg-white border rounded-none dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
          type={passVisible ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {!passVisible && (
          <IoMdEyeOff
            className="absolute right-3 text-[1.2rem] text-opacity-80 text-green-950 cursor-pointer"
            onClick={() => setPassVisible(true)}
          />
        )}
        {passVisible && (
          <IoMdEye
            className="absolute right-3 text-[1.2rem] text-opacity-80 text-green-950 cursor-pointer"
            onClick={() => setPassVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInputField;
