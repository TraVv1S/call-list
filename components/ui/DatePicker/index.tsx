import { Select } from "@/components/ui/Select";

export const DatePicker = () => {
  return (
    <div className="flex items-center gap-2">
      <Select
        id="date"
        options={["3 дня", "Неделя", "Месяц", "Год", "Указать даты"]}
      />
    </div>
  );
};
