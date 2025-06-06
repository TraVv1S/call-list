import { CallList } from "@/components/CallList";
import { Filter } from "@/components/Filter";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Filter />
      <CallList />
    </div>
  );
}
