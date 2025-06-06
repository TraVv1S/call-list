import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";

export const Filter = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <Select id="type" options={["Все типы", "Входящие", "Исходящие"]} />
      <DatePicker />
    </div>
  );
};
