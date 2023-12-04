import { useState, Dispatch, SetStateAction } from "react";
import "../../App.css";
import { FaSearch } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

interface Element {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface HeaderProps {
  setListElements: Dispatch<SetStateAction<Element[]>>;
  listElements: Element[];
  selectElements: Set<string>;
  setSelectedElements: Dispatch<SetStateAction<Set<string>>>;
  deleteClicked: boolean;
  setDeleteClicked: Dispatch<SetStateAction<boolean>>;
  setTotalRows: Dispatch<SetStateAction<number>>;
}

const Header = (props: HeaderProps) => {
  const {
    setListElements,
    listElements,
    selectElements,
    setSelectedElements,
    deleteClicked,
    setDeleteClicked,
  } = props;

  const handleDeleteAllButton = () => {
    setDeleteClicked(true);
    const newList: Element[] = [];
    for (let i = 0; i < listElements.length; i++) {
      if (!selectElements.has(listElements[i].id)) {
        newList.push(listElements[i]);
      }
    }
    if (newList.length !== 0) {
      newList[0].id = "1";
      for (let i = 1; i < newList.length; i++) {
        newList[i].id = `${Number(newList[i - 1].id) + 1}`;
      }
    }
    setListElements(newList);
    setDeleteClicked(false);
  };

  const handleFilterSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    axios
      .get<Element[]>(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        const { data } = res;
        for (let i = 0; i < data.length; i++) {
          data[i].id = `${i + 1}`;
        }
        setListElements(data);
        props.setTotalRows(data.length);
      })
      .catch((err) => console.log(err));

    const textWithin = (
      document.getElementById("search_element") as HTMLInputElement
    ).value.toLowerCase();
    const newList = listElements.filter((item) =>
      item.name.toLowerCase().includes(textWithin)
    );
    setListElements(newList);
  };

  return (
    <div className={"header_container_div"}>
      <div className="search_box_div">
        <input
          type="search"
          name=""
          id="search_element"
          className="search_box"
          placeholder="Search"
        />
        <button className="search_button" onClick={handleFilterSearch}>
          <FaSearch className="search_icon" />
        </button>
      </div>
      <button className="delete_button" onClick={handleDeleteAllButton}>
        <MdDeleteOutline className="delete_icon" />
      </button>
    </div>
  );
};

export default Header;
