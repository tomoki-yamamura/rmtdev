import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationProps = {
  currentPage: number;
  totalNumberOfPages: number;
  onClick: (direction: "next" | "previous") => void;
}

export default function Pagination({ onClick, currentPage, totalNumberOfPages }: PaginationProps) {
  return <section className="pagination">
    {
      currentPage > 1 && (
        <PagenationButton
          currentPage={currentPage}
          direction="previous"
          onClick={() => onClick("previous")}
        />
      )
    }
    {
      currentPage < totalNumberOfPages && (
        <PagenationButton
          currentPage={currentPage}
          direction="next"
          onClick={() => onClick("next")}
        />
      )
    }

  </section>;
}

type PagenationButtonProps = {
  direction: "previous" | "next";
  currentPage: number
  onClick: () => void;
}

function PagenationButton({ direction, currentPage, onClick }: PagenationButtonProps) {

  return (
    <button onClick={(e) => {
      onClick();
      e.currentTarget.blur()
    }} className={`pagination__button pagination__button--${direction}`}>
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