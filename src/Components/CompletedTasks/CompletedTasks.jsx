import { useEffect, useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CompletedTasks.scss";
import { toast } from 'react-toastify';

const CompletedTasks = ({listId ,showSubmittedTasks, changeShowSubmittedTasks,doTasksUpdated,tasksUpdated,listsUpdated}) =>{
  const [finishedTasks, setFinishedTasks] = useState();
  const [listName,setListName] = useState();

  let localData = JSON.parse(localStorage.getItem("tododata"));

  if (listId == 0 || listId == undefined) {
    listId = localData?.length>0 ? localData[0].id : 0;
  }
  let listIndex = localData ? localData.findIndex((x) => x.id == listId) : 0;


  useEffect(() => {
    localData = JSON.parse(localStorage.getItem("tododata"));
    if(localData && localData !== null ){
      setFinishedTasks(
        localData[listIndex]?.tasks?.filter((i) => i.isChecked === true)
      );
      setListName(localData.find((x) => x.id == listId).listName);
    }
  }, [tasksUpdated,listId,listsUpdated]);

  const undoTask = (taskId) => {
    localData = JSON.parse(localStorage.getItem("tododata"));
    listIndex = localData.findIndex((x) => x.id == listId);
    let taskIndex = localData[listIndex].tasks.findIndex((x) => x.id == taskId);
    localData[listIndex].tasks[taskIndex].isChecked = false;
    localStorage.setItem("tododata", JSON.stringify(localData));
    doTasksUpdated(Math.random());
    setFinishedTasks(
      localData[listIndex]?.tasks?.filter((i) => i.isChecked === true)
    );
    changeShowSubmittedTasks(!showSubmittedTasks);
    notify();
  };

  const notify = () => {
    toast("Task Undo Successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
  };

  const taskColors = {
    P1: "lightpink",
    P2: "#F7DC6F",
    P3: "#FFFACD",
  };

  function tasksCompare(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }

  return (
    <div className="container mainDiv">
      <Modal
        show={showSubmittedTasks}
        onHide={changeShowSubmittedTasks}
        className="modalSubmittedTasks"
      >
        <Modal.Header closeButton className="completedTasksHeader">
          <Modal.Title className="completedTasksHeading">
            {finishedTasks?.length > 0 ? (
              <p className="submitTasksMainHeading">
                <div className="row">
                <div className="col-6">
                <span className="submittedTaskHeading">Tasks</span>
                </div>
                <div className="col-3">
                <span className="submittedPriorityHeading">Priority</span>
                </div>
                <div className="col-3">
                <span className="submittedTasksActions">Actions</span>
                </div>
                </div>
              </p>
            ) : (
              <p className="submitTasksHeading">Submitted Tasks</p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="submittedTasksBody" id="submittedTasksBody">
          <div>
            {listId > 0 &&
            localData &&
            localData[localData.findIndex((x) => x.id == listId)]?.tasks
              .length > 0 &&
            finishedTasks?.length != 0 ? (
              <div>
                {finishedTasks?.length > 0 &&
                  finishedTasks?.sort(tasksCompare).map((x) => {
                    return (
                      <div
                        className="card taskCardSubmitted"
                        style={{ backgroundColor: taskColors[x.priority] }}
                      >
                        <div className="card-body ">
                          <div className="row">
                            <div className="col-6 col-sm-6 col-lg-6 col-md-6 col-xl-6 col-xxl-6">
                              <p className="card-title">{x.taskName}</p>
                            </div>
                            <div className="col-3 col-sm-4 col-lg-4 col-md-4 col-xl-4 col-xxl-4">
                              <p className="card-title">{x.priority}</p>
                            </div>
                            <div className="col-3 col-sm-2 col-lg-2 col-md-2 col-xl-2 col-xxl-2">
                              <button
                                type="button"
                                className="btn  completedTasksButton"
                                onClick={() => undoTask(x.id)}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Undo"
                              >
                                <i
                                  className="fa fa-undo"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="row">
                <div className="alert noTasksSubmitted" role="alert">
                    {listName
                    ? `No Completed Tasks Available for ${listName}...`  
                    : "No Tasks Available.."}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footerCompletedTasks">
          <Button variant="secondary" onClick={changeShowSubmittedTasks}>
            <i class="fa fa-times" aria-hidden="true">
              &nbsp;Close
            </i>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompletedTasks