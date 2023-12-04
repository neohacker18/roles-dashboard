import { useState, SetStateAction, Dispatch } from "react";
import Header from "./components/containers/Header";
import MainListContainer from "./components/containers/MainListContainer";
import Footer from "./components/containers/Footer";
import "./App.css";

interface Element {
  id: string;
  name: string;
  email: string;
  role: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [listElements, setListElements] = useState<Element[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectElements, setSelectedElements] = useState<Set<string>>(
    new Set([])
  );
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<Element[]>([]);

  return (
    <div className="hero_container">
      <Header
        setListElements={setListElements}
        listElements={listElements}
        selectElements={selectElements}
        setSelectedElements={setSelectedElements}
        deleteClicked={deleteClicked}
        setDeleteClicked={setDeleteClicked}
        filterList={filterList}
        setFilterList={setFilterList}
        setTotalRows={setTotalRows as Dispatch<SetStateAction<number>>}
      />
      <MainListContainer
        deleteClicked={deleteClicked}
        setDeleteClicked={setDeleteClicked}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        listElements={listElements}
        setListElements={setListElements}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setTotalRows={setTotalRows}
        selectElements={selectElements}
        setSelectedElements={setSelectedElements}
      />
      <Footer
        selectAll={selectAll}
        deleteClicked={deleteClicked}
        setDeleteClicked={setDeleteClicked}
        setSelectAll={setSelectAll}
        listElements={listElements}
        setListElements={setListElements}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRows={totalRows}
        setTotalRows={setTotalRows}
        selectElements={selectElements}
        setSelectedElements={setSelectedElements}
      />
    </div>
  );
}

export default App;
