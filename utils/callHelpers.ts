import { Call } from "@/types/call";

const RATING_TYPES = [
  { class: "excelent", name: "Отлично" },
  { class: "good", name: "Хорошо" },
  { class: "bad", name: "Плохо" },
] as const;

export const getCallNumber = (call: Call): string => {
  return call.in_out === 1 ? call.from_number : call.to_number;
};

export const getRatingByIndex = (index: number) => {
  return RATING_TYPES[index % RATING_TYPES.length];
};
