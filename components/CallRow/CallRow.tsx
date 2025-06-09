import Image from "next/image";
import styles from "./CallRow.module.css";
import { Call } from "@/components/CallList/CallList";
import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer/AudioPlayer";

interface CallRowProps {
  call: Call;
  index: number;
}

export const CallRow = ({ call, index }: CallRowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [record, setRecord] = useState<string | null>(null);
  const ratingTypes = [
    { class: "excelent", name: "Отлично" },
    { class: "good", name: "Хорошо" },
    { class: "bad", name: "Плохо" },
  ];

  const getRecord = async () => {
    if (!call.record) return;
    if (record) return;
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/getRecord?" +
        `record=${call.record}&partnership_id=${call.partnership_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
        },
      }
    );
    const data = new Blob([await response.blob()], { type: "audio/mpeg" });
    setRecord(URL.createObjectURL(data));
  };

  const handleMouseEnter = async () => {
    setIsHovered(true);
    await getRecord();
  };

  return (
    <tr
      key={call.id}
      className={styles.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <td>{call.in_out === 1 ? call.from_number : call.to_number}</td>
      <td className={styles.muted}>{call.source ? call.source : ""}</td>
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
        {isHovered && call.record ? (
          <AudioPlayer src={record || undefined} />
        ) : (
          <span>
            {call.time
              ? `${Math.floor(Number(call.time) / 60)}:${
                  Number(call.time) % 60 < 10
                    ? "0" + (Number(call.time) % 60)
                    : Number(call.time) % 60
                }`
              : ""}
          </span>
        )}
      </td>
    </tr>
  );
};
