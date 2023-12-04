import React, { useEffect, Dispatch, SetStateAction } from "react";
import "../../App.css";
import RowElement from "./RowElement";
import axios from "axios";

interface Element {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MainListContainerProps {
  listElements: Element[];
  setListElements: Dispatch<SetStateAction<Element[]>>;
  selectElements: Set<string>;
  setSelectedElements: Dispatch<SetStateAction<Set<string>>>;
  deleteClicked: boolean;
  setDeleteClicked: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  setTotalRows: Dispatch<SetStateAction<number>>;
  selectAll: boolean;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
}

const MainListContainer = (props: MainListContainerProps) => {
  const {listElements,setListElements,setSelectedElements,selectElements,deleteClicked,setDeleteClicked}=props
  useEffect(() => {
    axios
      .get<Element[]>(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        const { data } = res;
        for (let i = 0; i < data.length; i++) {
          data[i].id = `${i + 1}`;
        }
        props.setListElements(data);
        props.setTotalRows(data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("Deleted Successfully.");
  }, [props.deleteClicked]);

  const { selectAll, setSelectAll } = props;

  return (
    <div className={"main_list_container_div"}>
      <div className="table_container">
        <table style={{ height: 20, width: "100%" }}>
          <tr>
            <th style={{ height: 20, width: 20 }}>
              <input
                type="checkbox"
                name="Select_All_Checkbox"
                id=""
                style={{ width: 18, height: 18 }}
                onClick={() => {
                  if (!selectAll) {
                    setSelectAll(true);
                    const newList = new Set([]);
                    for (
                      let i = 0;
                      i < Math.min(listElements.length, 10);
                      i++
                    ) {
                      newList.add(listElements[i].id);
                    }
                    setSelectedElements(newList);
                  } else {
                    setSelectAll(false);
                    setSelectedElements(new Set([]));
                  }
                }}
              />
            </th>
            <th style={{ height: 20, width: "30%" }}>Name</th>
            <th style={{ height: 20, width: "30%" }}>Email</th>
            <th style={{ height: 20, width: 20 }}>Role</th>
            <th style={{ height: 20, width: 20, paddingLeft: "3%" }}>
              Actions
            </th>
          </tr>
          {listElements.map((element) => (
            <RowElement
              key={element.id}
              name={element.name}
              email={element.email}
              role={element.role}
              id={element.id}
              currentPage={props.currentPage}
              selectAll={selectAll}
              listElements={listElements}
              setListElements={setListElements}
              setSelectedElements={setSelectedElements}
              selectElements={selectElements}
              deleteClicked={deleteClicked}
              setDeleteClicked={setDeleteClicked}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default MainListContainer;
