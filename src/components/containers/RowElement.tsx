import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { FaRegEdit, FaCheckCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "../../App.css";

interface Element {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface RowElementProps {
  id: number;
  currentPage: number;
  name: string;
  email: string;
  role: string;
  listElements: Element[]
  setListElements: Dispatch<SetStateAction<Element[]>>; 
  selectElements: Set<number>;
  deleteClicked: boolean;
  setSelectedElements: Dispatch<SetStateAction<Set<number>>>;
  setDeleteClicked: Dispatch<SetStateAction<boolean>>;
}
const RowElement = (props:RowElementProps) => {
  
  const [checkedStatus, setCheckedStatus] = useState<boolean>(false);
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);

  const { listElements, setListElements } = props;
  useEffect(() => {
    if(props.selectElements.has(props.id)){
      setCheckedStatus(true)
    }else{
      setCheckedStatus(false)
    }
  }, [props.selectElements]);

  useEffect(() => {}, [listElements,props.deleteClicked]);


  const handleElementDeletedInline = () => {
    props.setDeleteClicked(true)
    const newList=[]
    // const newList = listElements.filter((element) => element.id != props.id);
    // let i;
    for (let i = 0; i < listElements.length; i++) {
      if(Number(listElements[i].id)==Number(props.id)){

      }else{
        newList.push(listElements[i])
      }
    }
    for(let i=0;i<newList.length;i++){
      newList[i].id=`${i+1}`
    }
    console.log(newList)
    setListElements(newList);
    props.setDeleteClicked(false)
  };

  const handleElementEditInline = () => {
    setEditClicked(1 - editClicked);
    setCheckedStatus(1 - checkedStatus);
  };
  
  if (props.id % 10 != 0 && props.currentPage != Math.floor(props.id / 10) + 1)
  return <></>;
  else if (props.id % 10 === 0 && props.currentPage != props.id / 10)
  return <></>;

  return (
    <>
      {editClicked ? (
        <>
          <tr className={`${checkedStatus ? `row_element_selected` : ``}`}>
            <td>
              <input
                type="checkbox"
                name=""
                id=""
                style={{ width: 18, height: 18 }}
                checked={checkedStatus}
                onClick={() => {
                  setCheckedStatus(true);
                  const newSelectList = props.selectElements(
                    (element) => element.id != props.id
                  );
                  props.setSelectedElements(newSelectList);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </td>
            <td>{props.role}</td>
            <td>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button
                  className="check_button"
                  onClick={() => handleElementEditInline()}
                >
                  <FaCheckCircle className="check_icon" />
                </button>
                <button
                  className="delete_button"
                  onClick={() => handleElementDeletedInline()}
                >
                  <MdDeleteOutline className="delete_icon" />
                </button>
              </div>
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr className={`${checkedStatus ? `row_element_selected` : ``}`}>
            <td>
              <input
                type="checkbox"
                name=""
                id=""
                style={{ width: 18, height: 18 }}
                checked={checkedStatus}
                onClick={() => {
                  if (checkedStatus) {
                    setCheckedStatus(false);
                    const list=new Set([...props.selectElements]);
                    list.delete(props.id)
                    props.setSelectedElements(list)
                  } else {
                    setCheckedStatus(true);
                    const newList=new Set([...props.selectElements])
                    newList.add(props.id)
                    props.setSelectedElements(newList)
                  }
                }}
              />
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{props.role}</td>
            <td>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button
                  className="edit_button"
                  onClick={() => handleElementEditInline()}
                >
                  <FaRegEdit className="edit_icon" />
                </button>
                <button
                  className="delete_button"
                  onClick={() => handleElementDeletedInline()}
                >
                  <MdDeleteOutline className="delete_icon" />
                </button>
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default RowElement;
