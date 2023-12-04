import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "../../App.css";

interface Element {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface FooterProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalRows: number;
  listElements: Element[]
  selectElements: Set<string>;
  setTotalRows: Dispatch<SetStateAction<number>>;
}

const Footer = (props) => {
  const { currentPage, setCurrentPage } = props;
  const [pages, setPages] = useState<number>(1);
  const [rowSelected, setRowSelected] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(
    Math.floor(props.totalRows / 10) + 1
  );

  useEffect(() => {
    props.setTotalRows(props.listElements.length);
    setTotalPages(Math.floor(props.totalRows / 10) + 1);
  }, [props.totalRows, props.listElements]);

  useEffect(() => {
    setRowSelected(props.selectElements.size);
  }, [props.selectElements]);

  const handleOnPageButtonClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="footer_container_div">
      <div className="footer_rows_selected_div">
        <p>
          {rowSelected} of {props.totalRows} row(s) selected.
        </p>
      </div>
      <div className="footer_pages_div">
        <p style={{ marginTop: 5 }}>
          Page {currentPage} of {totalPages}
        </p>
        <button
          className={`page_buttons${currentPage===1?`_disabled`:``}`}
          onClick={(e) => {
            setCurrentPage(1);
            setPages(1);
          }}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        <button
          className={`page_buttons${currentPage===1?`_disabled`:``}`}
          onClick={(e) => {
            setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
            if ((currentPage + 3) % 5 === 0) {
              setPages(pages === 1 ? 1 : pages - 1);
            }
          }}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        {pages <= totalPages ? (
          <button
            className={`page_buttons${
              currentPage === pages ? "_highlight" : ""
            }`}
            onClick={() => handleOnPageButtonClick(pages)}
          >
            {pages}
          </button>
        ) : (
          <></>
        )}
        {pages + 1 <= totalPages ? (
          <button
            className={`page_buttons${
              currentPage === pages + 1 ? "_highlight" : ""
            }`}
            onClick={() => handleOnPageButtonClick(pages + 1)}
          >
            {pages + 1}
          </button>
        ) : (
          <></>
        )}
        {pages + 2 <= totalPages ? (
          <button
            className={`page_buttons${
              currentPage === pages + 2 ? "_highlight" : ""
            }`}
            onClick={() => handleOnPageButtonClick(pages + 2)}
          >
            {pages + 2}
          </button>
        ) : (
          <></>
        )}
        {pages + 3 <= totalPages ? (
          <button
            className={`page_buttons${
              currentPage === pages + 3 ? "_highlight" : ""
            }`}
            onClick={() => handleOnPageButtonClick(pages + 3)}
          >
            {pages + 3}
          </button>
        ) : (
          <></>
        )}
        {pages + 4 <= totalPages ? (
          <button
            className={`page_buttons${
              currentPage === pages + 4 ? "_highlight" : ""
            }`}
            onClick={() => handleOnPageButtonClick(pages + 4)}
          >
            {pages + 4}
          </button>
        ) : (
          <></>
        )}
        <button
          className={`page_buttons${currentPage===totalPages?`_disabled`:``}`}
          disabled={currentPage===totalPages}
          onClick={(e) => {
            setCurrentPage(
              currentPage === totalPages ? totalPages : currentPage + 1
            );
            if (currentPage % 5 === 0) {
              setPages(pages + 1);
            }
          }}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button
        disabled={currentPage===totalPages}
          className={`page_buttons${currentPage===totalPages?`_disabled`:``}`}
          onClick={(e) => {
            setCurrentPage(totalPages);
            setPages(totalPages - 4);
          }}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Footer;
