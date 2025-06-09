"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./CallList.module.css";
import { useFilter } from "@/hooks/useFilter";
import { IconArrow } from "../ui/icons";
import { CallRow } from "../CallRow/CallRow";

export interface Call {
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
  record: string;
  partnership_id: number;
}

export const CallList = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const { updateFilter } = useFilter();
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
    setTotal(data.total_rows);
  };

  useEffect(() => {
    getCalls();
  }, [searchParams]);

  const loadMore = async () => {
    const limit = searchParams.get("limit");
    if (limit) {
      updateFilter({ limit: (Number(limit) + 50).toString() });
    } else {
      updateFilter({ limit: "100" });
    }
  };

  const handleSort = (sort_by: "date" | "duration") => {
    const order = searchParams.get("order");
    if (order) {
      updateFilter({ sort_by, order: order === "ASC" ? "DESC" : "ASC" });
    } else {
      updateFilter({ sort_by, order: "ASC" });
    }
  };

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
            <th
              className={styles.timeHeader}
              onClick={() => handleSort("date")}
            >
              Время
              {searchParams.get("sort_by") === "date" && (
                <IconArrow
                  direction={
                    searchParams.get("order") === "ASC" ? "up" : "down"
                  }
                />
              )}
            </th>
            <th className={styles.employeeHeader}>Сотрудник</th>
            <th className={styles.callHeader}>Звонок</th>
            <th className={styles.sourceHeader}>Источник</th>
            <th className={styles.ratingHeader}>Оценка</th>
            <th
              className={styles.durationHeader}
              onClick={() => handleSort("duration")}
            >
              Длительность
              {searchParams.get("sort_by") === "duration" && (
                <IconArrow
                  direction={
                    searchParams.get("order") === "ASC" ? "up" : "down"
                  }
                />
              )}
            </th>
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
                <CallRow key={call.id} call={call} index={index} />
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      {total > calls.length && (
        <button onClick={loadMore} className={styles.loadMore}>
          Показать ещё
        </button>
      )}
    </div>
  );
};
