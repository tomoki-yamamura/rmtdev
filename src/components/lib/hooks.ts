import { useEffect, useState } from "react";
import { BASE_API_URL } from "./constants";
import { JobItem, JobItemExpanded } from "./types";
import { useQuery } from "@tanstack/react-query";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);

  return [jobItemsSliced, isLoading, jobItems.length] as const;
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
  const data = await response.json();
  return data;
}

export function useJobItem(activeId: number | null) {
  const { data, isLoading } = useQuery(
    ["job-item", activeId],
    () => (activeId ? fetchJobItem(activeId) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(activeId),
      onError: () => {},
    }
  );

  const jobItem = data?.jobItem;

  return { jobItem, isLoading } as const;
}
// export function useJobItem(activeId: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!activeId) return;
//     const fetchDetailItem = async () => {
//       setIsLoading(true);
//       const response = await fetch(`${BASE_API_URL}/${activeId}`);
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItem(data.jobItem);
//     };
//     fetchDetailItem();
//   }, [activeId]);

//   return [jobItem, isLoading] as const;
// }

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
