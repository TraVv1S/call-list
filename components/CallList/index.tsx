"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Call {
  id: number;
  in_out: 1 | 0;
  date: string;
  person_id: number;
  from_number: string;
  source: string;
  stages: {
    duration: string;
  }[];
}

const cellStyles = "h-[65px] text-[15px]";
const ratingTypes = ["Отлично", "Хорошо", "Плохо"];
const ratingStyles = {
  Отлично:
    "bg-[var(--ui-light-green)] text-[var(--text-green)] border border-[var(--ui-green)]",
  Хорошо:
    "bg-[var(--ui-secondary)] text-[var(--text-primary)] border border-[var(--ui-icon)]",
  Плохо:
    "bg-[var(--ui-light-red)] text-[var(--ui-red)] border border-[var(--ui-red)]",
};

export const CallList = () => {
  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/getList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => setCalls(data.results));
  }, []);

  return (
    <div className="bg-white rounded-lg px-6 py-10">
      <table className="w-full">
        <thead className="text-sm font-normal leading-[148%] text-[var(--text-secondary)]">
          <tr>
            <th className="font-normal py-5">Тип</th>
            <th className="font-normal py-5">Время</th>
            <th className="font-normal py-5">Сотрудник</th>
            <th className="font-normal py-5">Звонок</th>
            <th className="font-normal py-5">Источник</th>
            <th className="font-normal py-5">Оценка</th>
            <th className="font-normal py-5">Длительность</th>
          </tr>
        </thead>
        <tbody>
          {calls &&
            calls.length > 0 &&
            calls.map((call, index) => (
              <tr key={call.id} className="border-b border-[var(--ui-border)]">
                <td className={cellStyles}>
                  <Image
                    src={
                      call.in_out === 1
                        ? "/icons/incoming.svg"
                        : "/icons/outgoing.svg"
                    }
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </td>
                <td className={cellStyles}>
                  {new Date(call.date).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className={cellStyles}>
                  {call.person_id ? (
                    <Image
                      src="/icons/user_avatar.svg"
                      alt="user"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src="/icons/user_avatar.svg"
                      alt="user"
                      width={32}
                      height={32}
                    />
                  )}
                </td>
                <td className={cellStyles}>{call.from_number}</td>
                <td className={`${cellStyles} text-[var(--text-secondary)]`}>
                  {call.source ? call.source : "Не указан"}
                </td>
                <td className={cellStyles}>
                  <div
                    className={`${
                      ratingStyles[
                        ratingTypes[
                          index % ratingTypes.length
                        ] as keyof typeof ratingStyles
                      ]
                    } rounded-lg flex items-center justify-center w-[70px] h-[26px] text-[13px]`}
                  >
                    {ratingTypes[index % ratingTypes.length]}
                  </div>
                </td>
                <td className={cellStyles}>
                  {call.stages[0]?.duration || "00:00"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
