import { useEffect, useState } from "react";
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
  const [jobItems, isLoading] = useJobItems(searchText);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {

    const handlerHashChange = () => {
      const id = +window.location.hash.slice(1)
      setActiveId(id);
    }

    window.addEventListener("hashchange", handlerHashChange)

    return () => {
      window.removeEventListener("hashchange", handlerHashChange)
    }
  }, [])

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
