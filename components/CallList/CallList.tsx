"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./CallList.module.css";

interface Call {
  id: number;
  in_out: 1 | 0;
  date: string;
  person_id: number;
  person_avatar: string;
  from_number: string;
  to_number: string;
  source: string;
  partner_data: {
    id: string;
    name: string;
    phone: string;
  };
  time: string;
  duration: string;
  status: "Дозвонился" | "Не дозвонился";
}

const ratingTypes = [
  { class: "excelent", name: "Отлично" },
  { class: "good", name: "Хорошо" },
  { class: "bad", name: "Плохо" },
];

export const CallList = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const searchParams = useSearchParams();

  const groupedCalls = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups = calls?.reduce((acc, call) => {
      const callDate = new Date(call.date);
      const dateKey = callDate.toLocaleDateString("en-US");

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(call);
      return acc;
    }, {} as Record<string, Call[]>);

    return Object.entries(groups || {}).map(([date, calls]) => {
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
        label = `Сегодня`;
      } else if (callDateOnly.getTime() === yesterdayDateOnly.getTime()) {
        label = `Вчера`;
      } else {
        label = date;
      }

      return { date: label, calls };
    });
  }, [calls]);

  const getCalls = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/getList?" +
        searchParams.toString(),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    const data = await response.json();
    setCalls(data.results);
  };

  useEffect(() => {
    getCalls();
  }, [searchParams]);

  if (!calls || calls.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>Нет звонков за выбранный период</div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.typeHeader}>Тип</th>
            <th className={styles.timeHeader}>Время</th>
            <th className={styles.employeeHeader}>Сотрудник</th>
            <th className={styles.callHeader}>Звонок</th>
            <th className={styles.sourceHeader}>Источник</th>
            <th className={styles.ratingHeader}>Оценка</th>
            <th className={styles.durationHeader}>Длительность</th>
          </tr>
        </thead>
        <tbody>
          {groupedCalls.map((group) => (
            <Fragment key={group.date}>
              {group.date !== "Сегодня" && (
                <tr key={group.date} className={styles.dateGroup}>
                  <td colSpan={7} className={styles.dateHeader}>
                    {group.date !== "Вчера"
                      ? new Date(group.date).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                        })
                      : group.date}
                    <sup>{group.calls.length}</sup>
                  </td>
                </tr>
              )}
              {group.calls.map((call, index) => (
                <tr key={call.id}>
                  <td>
                    <Image
                      src={
                        call.in_out === 1
                          ? call.status === "Дозвонился"
                            ? "/icons/incoming.svg"
                            : "/icons/incoming_missed.svg"
                          : call.status === "Дозвонился"
                          ? "/icons/outgoing.svg"
                          : "/icons/outgoing_missed.svg"
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
                    {call.person_avatar ? (
                      <Image
                        src={call.person_avatar}
                        alt="user"
                        width={32}
                        height={32}
                        className={styles.avatar}
                      />
                    ) : (
                      <Image
                        src="/icons/user_avatar.svg"
                        alt="user"
                        width={32}
                        height={32}
                        className={styles.avatar}
                      />
                    )}
                  </td>
                  <td>
                    {call.in_out === 1 ? call.from_number : call.to_number}
                  </td>
                  <td className={styles.muted}>
                    {call.source ? call.source : ""}
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
                    {call.time
                      ? `${Math.floor(Number(call.time) / 60)}:${
                          Number(call.time) % 60 < 10
                            ? "0" + (Number(call.time) % 60)
                            : Number(call.time) % 60
                        }`
                      : ""}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
