type InputProps = {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  defaultValue?: string | number;
};

export default function Input({
  label,
  type,
  name,
  id,
  placeholder,
  onChange,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col mb-8">
      <label htmlFor={name} className="text-base mb-4">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="text-base bg-inherit border border-white/50 rounded-md p-3 focus:outline-none focus:ring focus:ring-[#C266FF]"
        placeholder={placeholder}
        onChange={onChange}
        required
        {...rest}
      />
    </div>
  );
}
