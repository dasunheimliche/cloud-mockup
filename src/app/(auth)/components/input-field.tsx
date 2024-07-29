interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "text" | "password" | "email";
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type,
}) => (
  <div className="mt-4">
    <label
      className="block mb-2 text-sm font-medium text-slate-600 dark:text-gray-200"
      htmlFor={id}
    >
      {label}
    </label>
    <input
      id={id}
      className="block w-full px-4 py-2 text-slate-700 bg-white border rounded-none dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default InputField;
