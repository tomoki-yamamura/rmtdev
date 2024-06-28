import { useState } from "react";
import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Logo from "./Logo";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SearchForm from "./SearchForm";
import Sidebar, { SideBarTop } from "./Sidebar";
import Sorting from "./SortingControls";
import { useDebounce, useJobItems } from "./lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "./lib/constants";
import { PageDirection, sortBy } from "./lib/types";

function App() {
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1)
  const totalNumberOfResuts = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResuts / 7;
  const [sortBy, setSortBy] = useState<sortBy>("relevant")
  const jobItemsSorted =
    [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore
      } else {
        return a.daysAgo - b.daysAgo
      }
    });
  const jobItemsSortedAndSliced =
    jobItemsSorted?.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ) || [];


  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage(prev => ++prev)
    } else if (direction === "previous") {
      setCurrentPage(prev => --prev)
    }
  }


  const handleChangeSortBy = (newSortBy: sortBy) => {
    setCurrentPage(1)
    setSortBy(newSortBy)
  }

  return (
    <>
      <Background />
      <Header >
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Header>

      <Container>
        <Sidebar>
          <SideBarTop>
            <ResultsCount totalNumberOfResuts={totalNumberOfResuts} />
            <Sorting sortBy={sortBy} onClick={handleChangeSortBy} />
          </SideBarTop>

          <JobList isLoading={isLoading} jobItems={jobItemsSortedAndSliced} />
          <Pagination
            currentPage={currentPage}
            onClick={handleChangePage}
            totalNumberOfPages={totalNumberOfPages}
          />

        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  )
}

export default App;
