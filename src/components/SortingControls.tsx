import { sortBy } from "./lib/types";

type SortingProps = {
  onClick: (sortBy: sortBy) => void;
  sortBy: string;
}

export default function Sorting({ onClick, sortBy }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => onClick("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>

      <SortingButton
        onClick={() => onClick("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function SortingButton({ onClick, isActive, children }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent 
        ${isActive && "sorting__button--active"}`}
    >
      {children}
    </button>
  );
}