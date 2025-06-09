import { Call } from "@/types/call";

export interface GroupedCall {
  date: string;
  calls: Call[];
}

export const groupCallsByDate = (calls: Call[]): GroupedCall[] => {
  if (!calls || calls.length === 0) {
    return [];
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groups = calls.reduce((acc, call) => {
    const callDate = new Date(call.date);
    const dateKey = callDate.toLocaleDateString("en-US");

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(call);
    return acc;
  }, {} as Record<string, Call[]>);

  return Object.entries(groups).map(([date, calls]) => {
    const callDate = new Date(calls[0].date);
    let label = date;

    const todayDateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const yesterdayDateOnly = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate()
    );
    const callDateOnly = new Date(
      callDate.getFullYear(),
      callDate.getMonth(),
      callDate.getDate()
    );

    if (callDateOnly.getTime() === todayDateOnly.getTime()) {
      label = "Сегодня";
    } else if (callDateOnly.getTime() === yesterdayDateOnly.getTime()) {
      label = "Вчера";
    } else {
      label = date;
    }

    return { date: label, calls };
  });
};
