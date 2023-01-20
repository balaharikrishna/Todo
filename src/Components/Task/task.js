import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import "./Task.scss";

const Task = ({
  changeShowStateTask,
  listid,
  geteditTaskid,
  clearTaskfields,
  changeShowDeleteTask,
  getDeleteTaskId,
  ListsUpdated,
  TasksUpdated,
  doTasksUpdated
}) => {
  const [listName, setListName] = useState("");
  const [taskdata, setTaskData] = useState(
    JSON.parse(localStorage.getItem("tododata"))
      ? [
          JSON.parse(localStorage.getItem("tododata"))?.findIndex(
            (x) => x.id == listid
          ),
        ]
      : "".tasks?.filter((i) => i.isChecked === false)
  );
 
  let localData = JSON.parse(localStorage.getItem("tododata"));

  if (listid == 0 || listid == undefined || listid == "") {
    listid = localData && localData[0] ? localData[0].id : 0;
  }

  useEffect(() => {
    if (listid == 0 || listid == undefined || listid == "") {
      listid = localData ? localData[0].id : 0;
      localData = JSON.parse(localStorage.getItem("tododata"));
    } else if (listid > 0 )  {
      localData = JSON.parse(localStorage.getItem("tododata"));
      const list = localData?.find((x) => x.id == listid);
      setListName(list ? list.listName : "");
    }
  }, [listid, ListsUpdated]);

  let listIndex = localData ? localData.findIndex((x) => x.id == listid) : "";
  
  useEffect(() => {
    setTaskData(
      localData && localData[listIndex]
        ? listid != 0 && localData[listIndex].tasks
          ? localData[listIndex].tasks.filter((i) => i.isChecked === false)
          : localData[0].tasks.filter((i) => i.isChecked !== true)
        : ""
    );
  }, []);

  useEffect(() => {
    localData = JSON.parse(localStorage.getItem("tododata"));
    if (localData && listid > 0 && listid != "") {
      let listIndex = localData.findIndex((x) => x.id == listid);
      setTaskData(
        localData[listIndex].tasks.filter((i) => i.isChecked === false)
      );
      
    } else {
      setTaskData(
        localData ? localData[0].tasks.filter((i) => i.isChecked !== true) : ""
      );
    }
  }, [TasksUpdated, ListsUpdated, listid]);

  const editTask = (taskid) => {
    changeShowStateTask();
    geteditTaskid(taskid);
  };

  const deleteTask = (taskid) => {
    changeShowDeleteTask();
    getDeleteTaskId(taskid);
  };

  const notify = () => {
    toast("Task Submit Successful", {
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
                                                ///checkbox////

  const handleCheckBox = (id) => {
    localData = JSON.parse(localStorage.getItem("tododata"));
    localData.forEach((list) => {
      list.tasks.forEach((task) => {
        if (task.id == id) {
          task.isChecked = true;
        }
      });
    });

    localStorage.setItem("tododata", JSON.stringify(localData));
    const taskData = localData.find(list => list.id == listid)?.tasks.filter(task => !task.isChecked);
    setTaskData(taskData);
    doTasksUpdated(Math.random());
    notify();
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
    <div>
      {localData && listid > 0 &&
      localData[listIndex] &&
      localData[localData.findIndex((x) => x.id == listid)]?.tasks.length > 0 &&
      taskdata.length != 0 ? (
        <div>
          {taskdata.sort(tasksCompare).map((x) => {
            return (
              <div
                className="card taskcard "
                style={{ backgroundColor: taskColors[x.priority] }}
              >
                <div className="card-body Taskcardbody">
                  <div className="row">
                    <div className="col-3">
                      <input
                        type="checkbox"
                        label=""
                        checked={x.isChecked}
                        className="taskCheckBoxStatus"
                        onChange={() => handleCheckBox(x.id)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="col-4">
                      <p className="card-title">{x.taskName}</p>
                    </div>
                    <div className="col-3">
                      <p className="card-title">{x.priority}</p>
                    </div>
                    <div className="col-2">
                      <div className="row">
                        <div className="col-6">
                          <i
                            className="fa fa-pencil editoption"
                            onClick={() => editTask(x.id)}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-6">
                          <i
                            className="fa fa-trash deleteoption"
                            onClick={() => deleteTask(x.id)}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="addMoreTasks">
          <button
              type="button"
              className="btn btn-primary addTaskFloatingButton"
              onClick={clearTaskfields}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            </div>
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="alert noTaskAvailable" role="alert">
              {listName
                ? "No Tasks Available for " + listName
                : "No data Available"}
              ...
            </div>
            <div className="col-12">{
              listName ?  <button
              type="button"
              className="btn btn-primary addtaskButton"
              onClick={changeShowStateTask}
            >
              Add Task
            </button> : ""
            }
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
