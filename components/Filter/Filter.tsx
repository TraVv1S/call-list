import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import styles from "./Filter.module.css";

export const Filter = () => {
  const [type, setType] = useState("Все типы");
  const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
  const [date, setDate] = useState("3 дня");
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);

  const onTypeChange = (value: string) => {
    setType(value);
    setIsTypeSelectOpen(false);
  };

  const onDateChange = (value: string) => {
    setDate(value);
    setIsDateSelectOpen(false);
  };

  return (
    <div className={styles.root}>
      <Select
        options={["Все типы", "Входящие", "Исходящие"]}
        value={type}
        select={onTypeChange}
        isOpen={isTypeSelectOpen}
        setIsOpen={setIsTypeSelectOpen}
      />
      {/* <DatePicker /> */}
      <DatePicker
        options={["3 дня", "Неделя", "Месяц", "Год", "Указать даты"]}
        value={date}
        select={onDateChange}
        isOpen={isDateSelectOpen}
        setIsOpen={setIsDateSelectOpen}
      />
    </div>
  );
};
