import { useRef, useState } from "react";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import styles from "./Filter.module.css";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useFilter } from "@/hooks/useFilter";

export const Filter = () => {
  const [type, setType] = useState("Все типы");
  const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
  const [date, setDate] = useState("3 дня");
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const { updateFilter } = useFilter();

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    if (isTypeSelectOpen) {
      setIsTypeSelectOpen(false);
    }
  });

  const onTypeChange = (value: string) => {
    setType(value);
    setIsTypeSelectOpen(false);
    if (value !== "Все типы") {
      updateFilter({ in_out: value === "Входящие" ? "1" : "0", limit: "" });
    } else {
      updateFilter({ in_out: "", limit: "" });
    }
  };

  const onDateChange = (value: string) => {
    let date_start, date_end;
    const today = new Date();
    switch (value) {
      case "3 дня":
        date_end = today.toISOString().split("T")[0];
        date_start = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        break;
      case "Неделя":
        date_end = today.toISOString().split("T")[0];
        date_start = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        break;
      case "Месяц":
        date_end = today.toISOString().split("T")[0];
        date_start = date_end.slice(0, 8) + "01";

        break;
      case "Год":
        date_end = today.toISOString().split("T")[0];
        date_start = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        break;
      default:
        date_start = "";
        date_end = "";
        break;
    }
    updateFilter({ date_start, date_end, limit: "" });
    setDate(value);
    setIsDateSelectOpen(false);
  };

  return (
    <div className={styles.root} ref={ref}>
      <Select
        options={["Все типы", "Входящие", "Исходящие"]}
        value={type}
        select={onTypeChange}
        isOpen={isTypeSelectOpen}
        setIsOpen={setIsTypeSelectOpen}
      />
      <DatePicker
        options={["3 дня", "Неделя", "Месяц", "Год"]}
        value={date}
        select={onDateChange}
        isOpen={isDateSelectOpen}
        setIsOpen={setIsDateSelectOpen}
      />
    </div>
  );
};
