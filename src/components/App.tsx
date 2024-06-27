import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import Sidebar, { SideBarTop } from "./Sidebar";

function App() {
  const [searchText, setSearchText] = useState("")
  const [jobItems, setJobItems] = useState([])

  useEffect(() => {
    if (!setSearchText) return;
    const fetchData = async () => {
      const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`);
      const data = await response.json()
      setJobItems(data.jobItems)
    }
    fetchData();
  }, [searchText])
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

          <JobList jobItems={jobItems} />
          <Pagination />

        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  )
}

export default App;
