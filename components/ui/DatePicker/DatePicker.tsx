import { IconArrow } from "@/components/ui/icons/IconArrow";
import { IconCalendar } from "@/components/ui/icons/IconCalendar";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  options: string[];
  value: string;
  select: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const DatePicker = ({
  options,
  value,
  select,
  isOpen,
  setIsOpen,
}: DatePickerProps) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          disabled={options.indexOf(value) === 0}
          onClick={() => select(options[options.indexOf(value) - 1])}
        >
          <IconArrow direction="left" color="var(--ui-icon)" />
        </button>
        <button
          className={`${styles.button} ${isOpen ? styles.open : ""}`}
          onClick={handleClick}
        >
          <IconCalendar color="var(--ui-icon)" />
          {value}
        </button>
        <button
          className={styles.button}
          disabled={options.indexOf(value) === options.length - 1}
          onClick={() => select(options[options.indexOf(value) + 1])}
        >
          <IconArrow direction="right" color="var(--ui-icon)" />
        </button>
      </div>

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
