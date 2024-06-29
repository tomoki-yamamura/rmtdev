import JobList from "./JobList";
import { useBookmarksContext } from "./lib/hooks";

export default function BookmarksPopover() {
  const { bookmarkedIds} = useBookmarksContext();
  
  return <div className="bookmarks-popover">
    <JobList jobItems={[]} isLoading={false} />
  </div>;
}
