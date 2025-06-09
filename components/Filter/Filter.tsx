import { useCallback, useRef, useState } from "react";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import styles from "./Filter.module.css";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Filter = () => {
  const [type, setType] = useState("Все типы");
  const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
  const [date, setDate] = useState("3 дня");
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (parameters: { [key: string]: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(parameters).forEach(([name, value]) => {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

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
      router.push(
        `${pathname}?${createQueryString({
          in_out: value === "Входящие" ? "1" : "0",
        })}`
      );
    } else {
      router.push(`${pathname}?${createQueryString({ in_out: "" })}`);
    }
  };

  const onDateChange = (value: string) => {
    let date_start, date_end;
    const today = new Date();
    switch (value) {
      case "Неделя":
        date_end = today.toISOString().split("T")[0];
        date_start = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        break;
      case "Месяц":
        date_end = today.toISOString().split("T")[0];
        date_start = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

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
    router.push(`${pathname}?${createQueryString({ date_start, date_end })}`);
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
