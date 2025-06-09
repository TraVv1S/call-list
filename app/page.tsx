import { Suspense } from "react";
import { CallsPage } from "@/components/pages/CallsPage";

export default function Home() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CallsPage />
    </Suspense>
  );
}
