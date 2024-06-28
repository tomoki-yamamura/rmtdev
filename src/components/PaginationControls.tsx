import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationProps = {
  currentPage: number;
  onClick: (direction: "next" | "previous") => void;
}

export default function Pagination({ onClick, currentPage }: PaginationProps) {
  return <section className="pagination">
    <PagenationButton
      currentPage={currentPage}
      direction="previous"
      onClick={() => onClick("previous")}
    />
    <PagenationButton
      currentPage={currentPage}
      direction="next"
      onClick={() => onClick("next")}
    />
  </section>;
}

type PagenationButtonProps = {
  direction: "previous" | "next";
  currentPage: number
  onClick: () => void;
}

function PagenationButton({ direction, currentPage, onClick }: PagenationButtonProps) {

  return (
    <button onClick={onClick} className="pagination__button">
      {
        direction === "previous" && (
          <>
            <ArrowLeftIcon />
            Page {currentPage - 1}
          </>
        )}
      {(
        direction === "next" && (
          <>
            Page {currentPage + 1}
            <ArrowRightIcon />
          </>
        )
      )}
    </button>
  )
}