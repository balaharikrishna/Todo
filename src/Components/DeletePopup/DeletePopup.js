import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./DeletePopup.scss";

const DeletePopup = ({showDelete,changeShowDelete,deleteListId,deleteTaskId,listId,tasksUpdated,listsUpdated,doListsUpdated,doTasksUpdated,getDeleteTaskId}) =>{

  const [savedItems,setSavedItems] = useState(JSON.parse(localStorage.getItem("tododata")))

  if(listId==0){
    listId = savedItems && savedItems.length >0 ? savedItems[0].id : 0;
  }
  
  useEffect(()=>{
    setSavedItems(JSON.parse(localStorage.getItem("tododata")));
  },[tasksUpdated,listsUpdated])

  const deleteList = (e) => {
    e.preventDefault();
    let filteredData = savedItems.filter((i) => i.id !== deleteListId);
    let filteredJsonData = JSON.stringify(filteredData);
    localStorage.setItem("tododata", filteredJsonData);
    setSavedItems(JSON.parse(localStorage.getItem("tododata")));
    notify("List Deleted Succesfully");
    changeShowDelete();
    doListsUpdated(Math.random());
    if(JSON.parse(localStorage.getItem("tododata"))?.length==0){
      localStorage.clear();
      doListsUpdated(Math.random());
    }
  };

  const deleteTask = (e) =>{
    e.preventDefault();
    if (listId == 0) {
      listId = savedItems[0].id;
    }
    let listIndex = savedItems.findIndex((x) => x.id == listId);
    savedItems[listIndex].tasks = savedItems[listIndex].tasks.filter(
      (i) => i.id !== deleteTaskId
    );
    localStorage.setItem("tododata", JSON.stringify(savedItems));
    setSavedItems(JSON.parse(localStorage.getItem("tododata")));
    notify("Task Deleted Succesfully");
    getDeleteTaskId(0);
    doTasksUpdated(Math.random());
    changeShowDelete();
  }
 

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

  return(<div className="container">
  <Modal show={showDelete} onHide={changeShowDelete} className="deleteModel">
    <form >
      <Modal.Body className="modalBody">
        <div className="row">
          <div className="col-12 ">
           <label className="namelabel">Delete {deleteListId > 0 && !deleteTaskId > 0 ? savedItems.find(x => x.id == deleteListId).listName : "" } Permanently?</label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={changeShowDelete} >
        <i class="fa fa-times" aria-hidden="true"></i> Close
        </Button>
        <Button variant="danger" type="submit" onClick={ listId > 0  && deleteTaskId > 0 ? deleteTask : deleteList } >
        <i class="fa fa-trash" aria-hidden="true"></i> Delete
        </Button>
      </Modal.Footer>
    </form>
  </Modal>
</div>);
}
export default DeletePopup