import { useEffect, useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AddTask.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = ({ showAddTask, changeShowStateTask,editTaskId,listId,doTasksUpdated,tasksUpdated,listsUpdated,getEditTaskId}) => {

  const [taskName, setTaskName] = useState(""); 
  const [priority, setPriority] = useState("");

 let localData = JSON.parse(localStorage.getItem("tododata"))

 useEffect(()=>{
  localData = JSON.parse(localStorage.getItem("tododata"))
 },[tasksUpdated,listsUpdated])

  useEffect(() => {
    localData = JSON.parse(localStorage.getItem("tododata"));
    if(listId == 0 || listId == undefined || listId == ""){
      listId = localData ? localData[0].id : "";
      let listDataIndex = localData ? localData.findIndex(x => x.id == listId) : "";
      let task = localData? localData[listDataIndex].tasks.find(x => x.id == editTaskId) : "";
      setTaskName(task ? task.taskName : "");
      setPriority(task ? task.priority : "");  
    }
    else if(listId && editTaskId == 0){
      setTaskName("");
      setPriority("");
    }
    else if(listId && editTaskId !==0 ){
      let listDataIndex = localData.findIndex(x => x.id == listId);
     let task =  localData[listDataIndex].tasks.find(x => x.id == editTaskId)
      setTaskName(task ? task.taskName : "");
      setPriority(task ? task.priority : "");
    }
  },[listId,editTaskId,listsUpdated]); 

  const handleTask = (e) =>{
    let value =  e.target.value;
    setTaskName(value);
  }

  const handlePriority = (e) =>{
    let value =  e.target.value;
    setPriority(value);
  }

 const addTask = (e) =>{
  e.preventDefault(); 
  localData = JSON.parse(localStorage.getItem("tododata"))
  
  if(listId==0 || listId == undefined ){
    listId = localData[0].id;
  }
   var listDataIndex = localData.findIndex(x => x.id == listId);
    const newTask = [...localData[listDataIndex].tasks,{
        id:localData[listDataIndex].tasks[localData[listDataIndex].tasks.length - 1] ? localData[listDataIndex].tasks[localData[listDataIndex].tasks.length - 1].id+1 : 1,
        taskName : taskName,
        priority : priority ? priority : "P3" ,
        isChecked : false
        }]
        localData[listDataIndex].tasks = newTask;
   localStorage.setItem("tododata",JSON.stringify(localData)) ;
   setTaskName("");
   setPriority("P3");
   doTasksUpdated(Math.random());
   notify("Task Added Successfully");
 }

 const updateTask = (e) =>{
  e.preventDefault();
  localData = JSON.parse(localStorage.getItem("tododata"));
  
  if(listId==0 || listId == undefined || listId == ""){
    listId =  localData[0].id
  }
  let listDataIndex = localData.findIndex(x => x.id == listId);
  let taskIndex = localData[listDataIndex].tasks.findIndex(x => x.id == editTaskId);
  localData[listDataIndex].tasks[taskIndex].taskName = taskName;
  localData[listDataIndex].tasks[taskIndex].priority = priority;
  localStorage.setItem("tododata", JSON.stringify(localData));
  doTasksUpdated(Math.random());
  notify("Task Updated Successfully");
  getEditTaskId(0);
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
                <label className="nameLabel">Task Name:</label>
              </div>
              <div className="col-7 ">
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={taskName}
                  onChange={handleTask}
                  className="taskNameInputBox"
                  placeholder="Please Enter Task Name"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="row priorityField">
              <div className="col-3 ">
                <label  className="priorityLabel" >Priority:</label>
              </div>
              <div className="col-7 ">
                <select name="priority" value={priority} onChange={handlePriority}>
                <option value="P3">P3</option>
                <option value="P2">P2</option>
                <option value="P1">P1</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer-addTask">
            <Button variant="secondary" onClick={changeShowStateTask}>
            <i class="fa fa-times" aria-hidden="true">&nbsp;Close</i>
            </Button>
            <Button variant="success" type="submit" onClick={taskName.length > 0 ? changeShowStateTask : ""}>
              {editTaskId > 0 ? <i class="fa fa-pencil" aria-hidden="true">&nbsp;Update</i> : <i class="fa fa-plus" aria-hidden="true">&nbsp;Add</i>}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
