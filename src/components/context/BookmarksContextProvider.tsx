import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItem } from "../lib/types";


export type BookmarksContext = {
  bookmarkedIds: number[];
  bookmarkedJobItems: JobItem[]
  isLoading: boolean
  handleToggleBookmark: (id: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

type BookmarksContextProviderProps = {
  children: React.ReactNode
}

export default function BookmarksContextProvider({ children }: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>("bookmarkIds", [])

  const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter((item) => item !== id))
    } else {
      setBookmarkedIds(prev => [...prev, id])
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}

