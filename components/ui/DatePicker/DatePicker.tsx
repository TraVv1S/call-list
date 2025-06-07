import { Select } from "@/components/ui/Select";
import styles from "./DatePicker.module.css";

export const DatePicker = () => {
  return (
    <div className={styles.root}>
      <Select
        id="date"
        options={["3 дня", "Неделя", "Месяц", "Год", "Указать даты"]}
      />
    </div>
  );
};
