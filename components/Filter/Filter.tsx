import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import styles from "./Filter.module.css";

export const Filter = () => {
  return (
    <div className={styles.root}>
      <Select id="type" options={["Все типы", "Входящие", "Исходящие"]} />
      <DatePicker />
    </div>
  );
};
