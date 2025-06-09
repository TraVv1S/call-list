import { useState, useCallback, useEffect } from "react";

interface UseAudioRecordReturn {
  record: string | null;
  isLoading: boolean;
  error: string | null;
  fetchRecord: (recordId: string, partnershipId: number) => Promise<void>;
  clearRecord: () => void;
}

export const useAudioRecord = (): UseAudioRecordReturn => {
  const [record, setRecord] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecord = useCallback(
    async (recordId: string, partnershipId: number) => {
      if (!recordId || record) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/getRecord?" +
            `record=${recordId}&partnership_id=${partnershipId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = new Blob([await response.blob()], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(data);
        setRecord(audioUrl);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ошибка загрузки записи";
        setError(errorMessage);
        console.error("Error fetching audio record:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [record]
  );

  const clearRecord = useCallback(() => {
    if (record) {
      URL.revokeObjectURL(record);
      setRecord(null);
    }
    setError(null);
  }, [record]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (record) {
        URL.revokeObjectURL(record);
      }
    };
  }, [record]);

  return {
    record,
    isLoading,
    error,
    fetchRecord,
    clearRecord,
  };
};
