"use client";

import { useMemo, useCallback, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./CallList.module.css";
import { useFilter } from "@/hooks/useFilter";
import { useCalls } from "@/hooks/useCalls";
import { groupCallsByDate } from "@/utils/groupCallsByDate";
import { IconArrow } from "../ui/icons";
import { CallRow } from "../CallRow/CallRow";

export type { Call } from "@/types/call";

export const CallList = () => {
  const searchParams = useSearchParams();
  const { updateFilter } = useFilter();

  const { calls, total, isLoading, error, loadMore } = useCalls(
    searchParams,
    updateFilter
  );

  const groupedCalls = useMemo(() => {
    return groupCallsByDate(calls);
  }, [calls]);

  const handleSort = useCallback(
    (sort_by: "date" | "duration") => {
      const order = searchParams.get("order");
      if (order) {
        updateFilter({ sort_by, order: order === "ASC" ? "DESC" : "ASC" });
      } else {
        updateFilter({ sort_by, order: "ASC" });
      }
    },
    [searchParams, updateFilter]
  );

  if (error) {
    return (
      <div className={styles.root}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (isLoading && calls.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.loading}>Загрузка звонков...</div>
      </div>
    );
  }

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
        <button
          onClick={loadMore}
          className={styles.loadMore}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Показать ещё"}
        </button>
      )}
    </div>
  );
};
