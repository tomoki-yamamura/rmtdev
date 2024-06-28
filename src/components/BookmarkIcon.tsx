import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "./context/BookmarksContextProvider";

type BookmarkIconProps = {
  id: number
}

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const {
    value: bookmarkedIds,
    setValue: setBookmarkedIds
  } = useContext(BookmarksContext)

  return (
    <button onClick={(e) => {
      handleToggleBookmark(id)
      e.stopPropagation()
      e.preventDefault();
    }} className="bookmark-btn">
      <BookmarkFilledIcon
        className={`
        ${bookmarkedIds.includes(id) ? "filled" : ""}
      `} />
    </button>
  );
}
