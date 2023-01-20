import { useEffect, useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AddList.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addlist = ({ show, changeShowState, editListid, doListsUpdated,ListsUpdated}) => {

  const [listName, setListName] = useState("");   
  let localData = JSON.parse(localStorage.getItem("tododata"));

  let ArrObjsLen = localData? localData.length - 1: 0;
  let listid = localData == null ||localData== undefined ||localData== "" ?  0 : localData[ArrObjsLen].id;
  
  useEffect(()=>{
    localData = JSON.parse(localStorage.getItem("tododata"));
  },[ListsUpdated])

  useEffect(() => {
   localData = JSON.parse(localStorage.getItem("tododata"));
    const list = localData == null || undefined || "" ? "" : localData.find(x => x.id == editListid);
      setListName(list ? list.listName : "");
  },[editListid]); 

  const HandleListInput = (e) =>{
    let value =  e.target.value;
    setListName(value);
  }

  const saveData = (dataFromAddlist) => {
    localData = JSON.parse(localStorage.getItem("tododata"));
    let newData = localData ? [...localData, Object.assign({listName:dataFromAddlist}, { id: listid + 1 }, {tasks: []})] : [{listName:dataFromAddlist,id: listid + 1,tasks: []}];
    localStorage.setItem("tododata", JSON.stringify(newData));
    console.log(newData);
    localData = JSON.parse(localStorage.getItem("tododata"));
    listid = listid+1;
    setListName("");
    doListsUpdated(Math.random());
    notify("Record Added Successfully");
  };

  const addlist = (e) => {
    e.preventDefault();
    saveData(listName);
  };

  const updatelist = (e) => {
    e.preventDefault();
    const editListid = e.target.id.value;
    let index = localData.findIndex(x => x.id == editListid);
    localData[index].listName = listName;
    localStorage.setItem("tododata", JSON.stringify(localData));
    doListsUpdated(Math.random()); 
    notify("Record Updated Successfully");
  };

  const notify = (note) => {
    toast(note, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
  }
  
  return (
    <div className="container">
      <Modal show={show} onHide={changeShowState}>
        <form onSubmit={editListid > 0 ? updatelist : addlist }>
          <Modal.Header closeButton className="addlistheader">
            <Modal.Title className="addlistheading">{editListid > 0 ? "Update List" : "Add List"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-3 ">
                <label className="namelabel">Name:</label>
              </div>
              <div className="col-7 ">
                <input
                  type="text"
                  id="listName"
                  name="listName"
                  value={listName}
                  onChange={HandleListInput}
                  className="ListNameInputBox"
                  placeholder="Please Enter List Name"
                  autoComplete="off"
                  required
                />
                <input type="hidden" name="id" value={editListid ? editListid : ""} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={changeShowState}>
            <i class="fa fa-times" aria-hidden="true">&nbsp;Close</i>
            </Button>
            <Button variant="success" type="submit" onClick={listName.length > 0 ? changeShowState : ""}>
              {editListid > 0 ? <i class="fa fa-pencil" aria-hidden="true">&nbsp;Update</i> : <i class="fa fa-plus" aria-hidden="true">&nbsp;Add</i>}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Addlist;
