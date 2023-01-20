import { useEffect, useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AddTask.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = ({ showAddTask, changeShowStateTask,editTaskId,listid,doTasksUpdated,TasksUpdated,ListsUpdated,geteditTaskid}) => {

  const [TaskName, setTaskName] = useState(""); 
  const [Priority, setPriority]  = useState("");

 let savedItems = JSON.parse(localStorage.getItem("tododata"))

 useEffect(()=>{
  savedItems = JSON.parse(localStorage.getItem("tododata"))
 },[TasksUpdated,ListsUpdated])

  useEffect(() => {
    savedItems = JSON.parse(localStorage.getItem("tododata"));
    if(listid == 0 || listid == undefined || listid == ""){
      listid = savedItems ? savedItems[0].id : "";
      let listDataIndex = savedItems ? savedItems.findIndex(x => x.id == listid) : "";
      let task = savedItems? savedItems[listDataIndex].tasks.find(x => x.id == editTaskId) : "";
      setTaskName(task ? task.taskName : "");
      setPriority(task ? task.priority : "");  
    }
    else if(listid && editTaskId == 0){
      setTaskName("");
      setPriority("");
    }
    else if(listid && editTaskId !==0 ){
      let listDataIndex = savedItems.findIndex(x => x.id == listid);
     let task =  savedItems[listDataIndex].tasks.find(x => x.id == editTaskId)
      setTaskName(task ? task.taskName : "");
      setPriority(task ? task.priority : "");
    }
  },[listid,editTaskId,ListsUpdated]); 

  const handleTask = (e) =>{
    let value =  e.target.value;
    setTaskName(value);
  }

  const handlePriority = (e) =>{
    let value =  e.target.value;
    setPriority(value);
  }

 const addTask = (e) =>{
  savedItems = JSON.parse(localStorage.getItem("tododata"))
  e.preventDefault(); 

  if(listid==0 || listid == undefined ){
    listid = savedItems[0].id;
  }
   var listDataIndex = savedItems.findIndex(x => x.id == listid);
    const newTask = [...savedItems[listDataIndex].tasks,{
        id:savedItems[listDataIndex].tasks[savedItems[listDataIndex].tasks.length - 1] ? savedItems[listDataIndex].tasks[savedItems[listDataIndex].tasks.length - 1].id+1 : 1,
        taskName : TaskName,
        priority : Priority ? Priority : "P3" ,
        isChecked : false
        }]
        savedItems[listDataIndex].tasks = newTask;
   localStorage.setItem("tododata",JSON.stringify(savedItems)) ;
   setTaskName("");
   setPriority("P3");
   doTasksUpdated(Math.random());
   notify("Task Added Successfully");
 }

 const updateTask = (e) =>{
  savedItems = JSON.parse(localStorage.getItem("tododata"));
  e.preventDefault();
  if(listid==0 || listid == undefined || listid == ""){
    listid =  savedItems[0].id
  }
  let listDataIndex = savedItems.findIndex(x => x.id == listid);
  let taskIndex = savedItems[listDataIndex].tasks.findIndex(x => x.id == editTaskId);
  savedItems[listDataIndex].tasks[taskIndex].taskName = TaskName;
  savedItems[listDataIndex].tasks[taskIndex].priority = Priority;
  localStorage.setItem("tododata", JSON.stringify(savedItems));
  doTasksUpdated(Math.random());
  notify("Task Updated Successfully");
  geteditTaskid(0);
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

  return (
    <div className="container">
      <Modal show={showAddTask} onHide={changeShowStateTask}>
        <form onSubmit={editTaskId > 0 ? updateTask : addTask}>
          <Modal.Header closeButton className="addTaskHeader">
            <Modal.Title className="addTaskHeading">
              {editTaskId > 0 ? "Update Task" : "Add Task"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-3 ">
                <label className="namelabel">Task Name:</label>
              </div>
              <div className="col-7 ">
                <input
                  type="text"
                  id="TaskName"
                  name="TaskName"
                  value={TaskName}
                  onChange={handleTask}
                  className="TaskNameInputBox"
                  placeholder="Please Enter Task Name"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="row priorityField">
              <div className="col-3 ">
                <label  className="prioritylabel" >Priority:</label>
              </div>
              <div className="col-7 ">
                <select name="Priority" value={Priority} onChange={handlePriority}>
                <option value="P3">P3</option>
                <option value="P2">P2</option>
                <option value="P1">P1</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={changeShowStateTask}>
            <i class="fa fa-times" aria-hidden="true">&nbsp;Close</i>
            </Button>
            <Button variant="success" type="submit" onClick={TaskName.length > 0 ? changeShowStateTask : ""}>
              {editTaskId > 0 ? <i class="fa fa-pencil" aria-hidden="true">&nbsp;Update</i> : <i class="fa fa-plus" aria-hidden="true">&nbsp;Add</i>}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
