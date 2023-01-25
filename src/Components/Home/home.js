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
  const [showTask, setTaskShow] = useState(false);
  const [editListId, setEditListId] = useState();
  const [listId, setListId] = useState(0);
  const [editTaskId, setEditTaskId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteListId, setDeleteListId] = useState();
  const [deleteTaskId, setDeleteTaskId] = useState();
  const [listsUpdated, setListsUpdated] = useState(0);
  const [tasksUpdated, setTasksUpdated] = useState(0);
  const [showSubmittedTasks, setshowSubmittedTasks] = useState(false);
  const [enableTaskBtn,setEnableTaskBtn]=useState(false);

  //Lists//

  const doListsUpdated = (value) => {
    setListsUpdated(value);
    getListId();
  };

  const changeShowState = () => {
    setShow(!show);
  };

  const getEditListId = (id) => {
    setEditListId(id);
  };

  const clearAllFields = () => {
    setEditListId(0);
    changeShowState();
  };
  const changeShowDelete = (id) => {
    setShowDelete(!showDelete);
    id > 0 ? setDeleteListId(id) : setDeleteListId();
  };

  ///Tasks///

  const getListId = (e) => {
    setListId(e);
  };

  const changeShowStateTask = () => {
    setTaskShow(!showTask);
  };
  const getEditTaskId = (id) => {
    setEditTaskId(id);
  };
  const clearTaskFields = () => {
    setEditTaskId(0);
    changeShowStateTask();
  };
  const doTasksUpdated = (value) => {
    setTasksUpdated(value);
  };

  const getDeleteTaskId = (id) => {
    setDeleteTaskId(id);
  };

  const changeShowDeleteTask = () => {
    setShowDelete(!showDelete);
  };

  ///Submitted Tasks////

  const changeShowSubmittedTasks = () => {
    setshowSubmittedTasks(!showSubmittedTasks);
  };

  return (
    <div className="container">
      <div className="col-12">
        <div className="row">
          <div className="title">
            <p>
              Todo List
              <img
                src="images/todoimage.png"
                alt="todapp image"
                width="70px"
                height="70px"
              />
            </p>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary addListButton"
              onClick={clearAllFields}
            >
              <i className="fa fa-plus" aria-hidden="true">
                &nbsp;Add List
              </i>
            </button>

            {localStorage.getItem("tododata") && listId >= 0 ? (
              <button
                type="button"
                className="btn btn-primary completedTasksButton"
                onClick={changeShowSubmittedTasks}
              >
                <i className="fa fa-check" aria-hidden="true">
                  &nbsp;Completed Tasks
                </i>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <Addlist
          show={show}
          changeShowState={changeShowState}
          editListId={editListId}
          doListsUpdated={doListsUpdated}
          listsUpdated={listsUpdated}
        />
        <AddTask
          showAddTask={showTask}
          changeShowStateTask={changeShowStateTask}
          listId={listId}
          editTaskId={editTaskId}
          doTasksUpdated={doTasksUpdated}
          tasksUpdated={tasksUpdated}
          listsUpdated={listsUpdated}
          getEditTaskId={getEditTaskId}
        />
        <DeletePopup
          showDelete={showDelete}
          changeShowDelete={changeShowDelete}
          deleteListId={deleteListId}
          listId={listId}
          deleteTaskId={deleteTaskId}
          doListsUpdated={doListsUpdated}
          doTasksUpdated={doTasksUpdated}
          listsUpdated={listsUpdated}
          tasksUpdated={tasksUpdated}
          getDeleteTaskId={getDeleteTaskId}
        />
        <CompletedTasks
          showSubmittedTasks={showSubmittedTasks}
          changeShowSubmittedTasks={changeShowSubmittedTasks}
          listId={listId}
          doTasksUpdated={doTasksUpdated}
          tasksUpdated={tasksUpdated}
          listsUpdated={listsUpdated}
        />
        <ToastContainer />
        <div className="col-12 twoGrids">
          <div className="row">
            <div className="col-4  ">
              <p className="listsHeading">
                <span className="listsHeading">Lists</span>
                <span className="actionsListsHeading">Actions</span>
              </p>
              <div className=" mr-2 homeLeftGrid">
                <List
                  show={show}
                  changeShowState={changeShowState}
                  getEditListId={getEditListId}
                  getListId={getListId}
                  changeShowDelete={changeShowDelete}
                  listsUpdated={listsUpdated}
                />
              </div>
            </div>
            <div className="col-8">
              <p className="tasksMainHeading">
                <span className="completedHeading">Completed?</span>
                <span className="taskHeading">Tasks</span>
                <span className="priorityHeading">Priority</span>
                <span className="actionsTasksHeading">Actions</span>
              </p>
              <div className="homeRightGrid">
                <Task
                  setEnableTaskBtn={setEnableTaskBtn}
                  changeShowStateTask={changeShowStateTask}
                  listId={listId}
                  getEditTaskId={getEditTaskId}
                  clearTaskFields={clearTaskFields}
                  tasksUpdated={tasksUpdated}
                  changeShowDeleteTask={changeShowDeleteTask}
                  getDeleteTaskId={getDeleteTaskId}
                  listsUpdated={listsUpdated}
                  doTasksUpdated={doTasksUpdated}
                />
              </div>
              { enableTaskBtn &&
                <div className="addMoreTasks">
                  <button
                    type="button"
                    className="btn btn-primary addTaskFloatingButton"
                    onClick={clearTaskFields}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;