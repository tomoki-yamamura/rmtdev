import { useEffect, useState } from "react";
import { BASE_API_URL } from "./constants";
import { JobItem, JobItemExpanded } from "./types";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

async function fetchJobItems(searchText: string): Promise<JobItemsApiResponse> {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.description)
  }
  
  const data = await response.json();
  return data;
}
export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => {
        handleError(error)
      },
    }
  );

  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
  } as const;
}
// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!searchText) return;
//     const fetchData = async () => {
//       setIsLoading(true);
//       const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItems(data.jobItems);
//     };
//     fetchData();
//   }, [searchText]);

//   return [jobItems, isLoading ] as const;
// }

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

  if(!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.description)
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
        handleError(error)
      },
    }
  );

  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
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
