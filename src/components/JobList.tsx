import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { useActivId } from "./lib/hooks";
import { JobItem } from "./lib/types";

type JobListProps = {
  jobItems: JobItem[]
  isLoading: boolean;
}

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActivId();
  
  return <ul className="job-list">
    {isLoading && <Spinner />}
    {!isLoading &&
      jobItems.map(jobItem => (
        <JobListItem key={jobItem.id} jobItem={jobItem} isActive={jobItem.id === activeId} />
      ))}
  </ul>;
}

export default JobList;
