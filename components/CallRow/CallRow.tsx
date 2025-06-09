import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import styles from "./CallRow.module.css";
import { Call } from "@/types/call";
import { useAudioRecord } from "@/hooks/useAudioRecord";
import { formatDuration } from "@/utils/formatTime";
import { getCallNumber, getRatingByIndex } from "@/utils/callHelpers";
import { AudioPlayer } from "@/components/AudioPlayer";

interface CallRowProps {
  call: Call;
  index: number;
}

export const CallRow = ({ call, index }: CallRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { record, isLoading, error, fetchRecord, clearRecord } =
    useAudioRecord();

  const rating = useMemo(() => getRatingByIndex(index), [index]);
  const callIcon = useMemo(() => {
    if (call.in_out === 1) {
      return call.status === "Дозвонился"
        ? "/icons/incoming.svg"
        : "/icons/incoming_missed.svg";
    } else {
      return call.status === "Дозвонился"
        ? "/icons/outgoing.svg"
        : "/icons/outgoing_missed.svg";
    }
  }, [call.in_out, call.status]);
  const callNumber = useMemo(() => getCallNumber(call), [call]);
  const formattedTime = useMemo(() => {
    return new Date(call.date).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [call.date]);
  const formattedDuration = useMemo(
    () => formatDuration(call.time),
    [call.time]
  );

  const handleMouseEnter = useCallback(async () => {
    setIsHovered(true);
    if (call.record && call.partnership_id) {
      await fetchRecord(call.record, call.partnership_id);
    }
  }, [call.record, call.partnership_id, fetchRecord]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const renderDurationCell = () => {
    if (isHovered && call.record) {
      if (isLoading) {
        return <span className={styles.loading}>Загрузка...</span>;
      }
      if (error) {
        return <span className={styles.error}>Ошибка</span>;
      }
      if (record) {
        return <AudioPlayer src={record} />;
      }
    }
    return <span>{formattedDuration}</span>;
  };

  return (
    <tr
      key={call.id}
      className={styles.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <td>
        <Image src={callIcon} alt="call direction" width={24} height={24} />
      </td>
      <td>{formattedTime}</td>
      <td>
        <Image
          src={call.person_avatar || "/icons/user_avatar.svg"}
          alt="user avatar"
          width={32}
          height={32}
          className={styles.avatar}
        />
      </td>
      <td>{callNumber}</td>
      <td className={styles.muted}>{call.source || ""}</td>
      <td>
        <div className={`${styles.rating} ${styles[rating.class]}`}>
          {rating.name}
        </div>
      </td>
      <td className={styles.duration}>{renderDurationCell()}</td>
    </tr>
  );
};
