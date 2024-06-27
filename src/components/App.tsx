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
import { useJobItems } from "./lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("")
  const { isLoading, jobItems } = useJobItems(searchText);
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
            <ResultsCount />
            <Sorting />
          </SideBarTop>

          <JobList isLoading={isLoading} jobItems={jobItems} />
          <Pagination />

        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  )
}

export default App;
