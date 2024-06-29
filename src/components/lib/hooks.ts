import { useQueries, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { BookmarksContext } from "../context/BookmarksContextProvider";
import { BASE_API_URL } from "./constants";
import { JobItem, JobItemExpanded } from "./types";
import { handleError } from "./utils";

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

async function fetchJobItems(searchText: string): Promise<JobItemsApiResponse> {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
}
export function useSarchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => {
        handleError(error);
      },
    }
  );

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
  } as const;
}
export function useActivId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handlerHashChange = () => {
      const id = +window.location.hash.slice(1);
      console.log(id);

      setActiveId(id);
    };

    window.addEventListener("hashchange", handlerHashChange);

    return () => {
      window.removeEventListener("hashchange", handlerHashChange);
    };
  }, []);

  return activeId;
}

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

async function fetchJobItem(
  activeId: number | null
): Promise<JobItemApiResponse> {
  const response = await fetch(`${BASE_API_URL}/${activeId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
}

export function useJobItem(activeId: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", activeId],
    () => (activeId ? fetchJobItem(activeId) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(activeId),
      onError: (error) => {
        handleError(error);
      },
    }
  );

  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading } as const;
}

export function useDebounce<T>(searchText: T, delay = 500): T {
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, delay);

    return () => clearTimeout(timeId);
  }, [searchText, delay]);

  return debouncedSearchText;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarkIcon must be used within a BookmarksContextProvider"
    )
  }
  return context
}

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map(id => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }))
  })

  const jobItems = results.map(result => result.data?.jobItem)
  return jobItems
}