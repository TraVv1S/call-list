import { Filter } from "@/components/Filter";
import { CallList } from "@/components/CallList";
import styles from "./CallsPage.module.css";

export const CallsPage = () => {
  return (
    <div className={styles.root}>
      <Filter />
      <CallList />
    </div>
  );
};
