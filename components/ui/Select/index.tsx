interface SelectProps {
  id: string;
  options: string[];
}

export const Select = ({ id, options }: SelectProps) => {
  return (
    <select
      name={id}
      className="text-sm font-normal leading-[148%] text-[var(--text-secondary)]"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
