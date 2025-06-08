"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./CallList.module.css";

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

const ratingTypes = [
  { class: "excelent", name: "Отлично" },
  { class: "good", name: "Хорошо" },
  { class: "bad", name: "Плохо" },
];

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
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Тип</th>
            <th>Время</th>
            <th>Сотрудник</th>
            <th>Звонок</th>
            <th>Источник</th>
            <th>Оценка</th>
            <th>Длительность</th>
          </tr>
        </thead>
        <tbody>
          {calls &&
            calls.length > 0 &&
            calls.map((call, index) => (
              <tr key={call.id}>
                <td>
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
                <td>
                  {new Date(call.date).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
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
                <td>{call.from_number}</td>
                <td className={styles.muted}>
                  {call.source ? call.source : "Не указан"}
                </td>
                <td>
                  <div
                    className={`${styles.rating} ${
                      styles[ratingTypes[index % ratingTypes.length].class]
                    }`}
                  >
                    {ratingTypes[index % ratingTypes.length].name}
                  </div>
                </td>
                <td className={styles.duration}>
                  {call.stages[0]?.duration || "00:00"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
