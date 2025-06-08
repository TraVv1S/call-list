import { IconArrow } from "@/components/ui/icons/IconArrow";
import styles from "./Select.module.css";

interface SelectProps {
  options: string[];
  value: string;
  select: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Select = ({
  options,
  value,
  select,
  isOpen,
  setIsOpen,
}: SelectProps) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <button
        className={`${styles.button} ${isOpen ? styles.open : ""}`}
        onClick={handleClick}
      >
        {value}
        <IconArrow direction={isOpen ? "up" : "down"} color="var(--ui-icon)" />
      </button>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option}
              value={option}
              onClick={() => select(option)}
              className={option === value ? styles.active : ""}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
