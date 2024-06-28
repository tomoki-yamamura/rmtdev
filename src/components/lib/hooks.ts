import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_API_URL}?search=${searchText}`
      );
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);

  return [jobItemsSliced, isLoading] as const;
}

export function useActivId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {

    const handlerHashChange = () => {
      const id = +window.location.hash.slice(1)
      console.log(id);
      
      setActiveId(id);
    }

    window.addEventListener("hashchange", handlerHashChange)

    return () => {
      window.removeEventListener("hashchange", handlerHashChange)
    }
  }, [])

  return activeId;
}

export function useJobItem(activeId: number | null) {
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(() => {
    if(!activeId) return
    const fetchDetailItem = async () => {
      setIsLoading(true)
      const response = await fetch(`${BASE_API_URL}/${activeId}`)
      const data = await response.json()
      setIsLoading(false)
      setJobItem(data.jobItem)
    }
    fetchDetailItem();
  }, [activeId])

  return [jobItem, isLoading] as const
}