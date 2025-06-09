import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const useFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getFilter = () => {
    return searchParams.toString();
  };

  const createQueryString = useCallback(
    (parameters: { [key: string]: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(parameters).forEach(([name, value]) => {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const updateFilter = useCallback(
    (parameters: { [key: string]: string }) => {
      const queryString = createQueryString(parameters);
      router.push(`${pathname}?${queryString}`, { scroll: false });
    },
    [createQueryString, pathname, router]
  );

  return { getFilter, createQueryString, updateFilter };
};
