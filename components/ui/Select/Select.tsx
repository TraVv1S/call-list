import styles from "./Select.module.css";

interface SelectProps {
  id: string;
  options: string[];
}

export const Select = ({ id, options }: SelectProps) => {
  return (
    <select name={id} className={styles.root}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
