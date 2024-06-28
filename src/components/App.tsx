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

function App() {
  const [searchText, setSearchText] = useState("")
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1)
  const totalNumberOfResuts = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResuts / 7;
  const jobItemsSliced = jobItems?.slice(currentPage * 7 - 7, currentPage * 7) || [];

  const handleChangePage = (direction: "next" | "previous") => {
    if(direction === "next") {
      setCurrentPage(prev => ++prev)
    } else if (direction === "previous"){
      setCurrentPage(prev => --prev)
    }
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
            <Sorting />
          </SideBarTop>

          <JobList isLoading={isLoading} jobItems={jobItemsSliced} />
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
