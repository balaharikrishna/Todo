import './home.scss';
import Addlist from '../AddList/Addlist';
import React, { useState } from 'react';
import Task  from '../Task/task';
import List from '../List/List';
import AddTask from '../AddTask/AddTask';
import DeletePopup from '../DeletePopup/DeletePopup';
import { ToastContainer } from 'react-toastify';
import CompletedTasks from '../CompletedTasks/CompletedTasks.js';

const Home = () => {
  const [show, setShow] = useState(false);
  const [showTask,setTaskShow] = useState(false);
  const [EditListid,setEditListid] = useState();
  const [listId,setListId] = useState(0);
  const [editTaskId , setEditTaskId] = useState(0);
  const [showDelete,setShowDelete] = useState(false);
  const [deleteListId,setDeleteListId] = useState();
  const [deleteTaskId,setDeleteTaskId] = useState();
  const [ListsUpdated,setListsUpdated] = useState(0);
  const [TasksUpdated,setTasksUpdated] = useState(0);
  const [showSubmittedTasks,setshowSubmittedTasks ] = useState(false);
    
                                              //Lists//


  const doListsUpdated = (value) => {
    setListsUpdated(value);
    getListid();
  }

  const changeShowState = () => {
    setShow(!show);
  }
  const getEditListid = (id) =>{
    setEditListid(id);
  }

  const clearAllFields = () =>{
    setEditListid(0);
    changeShowState();
  }
  const changeShowDelete = (deletelistid) =>{
    setShowDelete(!showDelete);
    deletelistid > 0 ? setDeleteListId(deletelistid) : setDeleteListId();
  }

                                          ///Tasks///

  const getListid = (e) =>{
    setListId(e);
  }

 const changeShowStateTask = () => {
  setTaskShow(!showTask);
 }
 const geteditTaskid = (taskid) =>{
  setEditTaskId(taskid);
 }
 const clearTaskfields = () =>{
  setEditTaskId(0);
  changeShowStateTask();
 }
 const doTasksUpdated = (value) =>{
  setTasksUpdated(value);
 }

 const getDeleteTaskId = (deltaskid) =>{
  setDeleteTaskId(deltaskid);
 }

 const changeShowDeleteTask = () =>{
  setShowDelete(!showDelete)
 }

                                            ///Submitted Tasks////

  const changeShowSubmittedTasks = () =>{
   setshowSubmittedTasks(!showSubmittedTasks)
  }

  return (
    <div className='container'>
      <div className='col-12'>
        <div className='row'>
        <div className='title'>
          <p>Todo List<img src="images/todoimage.png" alt="todapp image" width="70px" height="70px" /></p>
        </div>
        <div>
          <button type="button" className="btn btn-primary addlistButton" onClick={clearAllFields}><i className='fa fa-plus' aria-hidden="true">&nbsp;Add List</i></button> 

         {localStorage.getItem("tododata") && listId >=0  ? <button  type="button" className="btn btn-primary CompletedTasksButton" onClick={changeShowSubmittedTasks}><i className='fa fa-check' aria-hidden="true">&nbsp;Completed Tasks</i></button> :"" } 
        </div>
        </div>
        <Addlist show={show} changeShowState={changeShowState}   editListid={EditListid} doListsUpdated={doListsUpdated} ListsUpdated={ListsUpdated}/>
        <AddTask showAddTask={showTask} changeShowStateTask={changeShowStateTask} listid = {listId} editTaskId = {editTaskId} doTasksUpdated={doTasksUpdated} TasksUpdated={TasksUpdated} ListsUpdated={ListsUpdated} geteditTaskid={geteditTaskid}/>
        <DeletePopup showDelete={showDelete} changeShowDelete={changeShowDelete} deleteListId ={deleteListId} listId={listId} deleteTaskId = {deleteTaskId}
         doListsUpdated={doListsUpdated} doTasksUpdated={doTasksUpdated} ListsUpdated={ListsUpdated} TasksUpdated={TasksUpdated} getDeleteTaskId = {getDeleteTaskId}/>
        <CompletedTasks showSubmittedTasks={showSubmittedTasks} changeShowSubmittedTasks={changeShowSubmittedTasks} listId = {listId} doTasksUpdated={doTasksUpdated} TasksUpdated={TasksUpdated} ListsUpdated={ListsUpdated}/>
        <ToastContainer />
        <div className='col-12'>
          <div className='row'>
            <div className='col-4  '>
            <p className='listsHeading'><span className='listsHeading'>Lists</span><span className='actionsListsHeading'>Actions</span></p>
              <div className=' mr-2 HomeLeftGrid'>
              <List show={show} changeShowState={changeShowState} geteditListid = {getEditListid} getListid = {getListid} changeShowDelete={changeShowDelete} ListsUpdated={ListsUpdated}/>  
              </div>
            </div> 
            <div className='col-8'>
            <p className='TasksMainHeading'><span className='CompletedHeading'>Completed?</span><span className='taskHeading'>Tasks</span><span className='priorityHeading'>Priority</span><span className='actionsTasksHeading'>Actions</span></p>
              <div className='HomeRightGrid'>
              <Task changeShowStateTask={changeShowStateTask} listid = {listId} geteditTaskid= {geteditTaskid}  clearTaskfields={clearTaskfields} TasksUpdated={TasksUpdated} changeShowDeleteTask={changeShowDeleteTask} getDeleteTaskId={getDeleteTaskId} ListsUpdated={ListsUpdated} doTasksUpdated={doTasksUpdated}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;