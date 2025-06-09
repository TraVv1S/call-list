import { useState, useEffect, useCallback } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Call } from "@/types/call";
import { PAGINATION_CONSTANTS } from "@/constants/pagination";

interface UseCallsReturn {
  calls: Call[];
  total: number;
  isLoading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
}

export const useCalls = (
  searchParams: ReadonlyURLSearchParams,
  updateFilter: (filters: Record<string, string>) => void
): UseCallsReturn => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCalls = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/calls?" + searchParams.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCalls(data.results || []);
      setTotal(data.total_rows || 0);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Произошла ошибка при загрузке звонков";
      setError(errorMessage);
      console.error("Error fetching calls:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  const loadMore = useCallback(async () => {
    const limit = searchParams.get("limit");
    if (limit) {
      updateFilter({
        limit: (Number(limit) + PAGINATION_CONSTANTS.STEP).toString(),
      });
    } else {
      updateFilter({
        limit: PAGINATION_CONSTANTS.DEFAULT_LIMIT.toString(),
      });
    }
  }, [searchParams, updateFilter]);

  useEffect(() => {
    getCalls();
  }, [getCalls]);

  return {
    calls,
    total,
    isLoading,
    error,
    loadMore,
  };
};
