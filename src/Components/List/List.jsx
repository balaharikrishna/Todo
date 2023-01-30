import './List.scss';
import { useEffect, useState } from 'react';

const List = ({show,changeShowState,getEditListId,getListId,changeShowDelete,listsUpdated,clearAllFields}) => {
 const [activeList,setActiveList] = useState();
 let localData = JSON.parse(localStorage.getItem("tododata"));
useEffect(() => {
  localData = JSON.parse(localStorage.getItem("tododata"));

  if (activeList == undefined || !activeList >= 0) {
    setActiveList(localData ? localData[0].id : "");
    getListId(localData ? localData[0].id : 0);
  }
}, [listsUpdated]);

 const deleteList = (id) =>{
  changeShowDelete(id);
  }

 const editList = (id) =>{
  changeShowState(!show);
  getEditListId(id);
 }

 const displayTasks = (id) =>{
    getListId(id && id>0 ? id : 0);
  setActiveList(id);
 }

  return (
    <div className="listMainDiv">
      {localData ? (
        <div>
          {localData.map((x) => {
            return (
              <div
                className="card listCard"
                style={{
                  backgroundColor: x.id == activeList ? "lightgreen" : "white",
                }}
                onClick={() => displayTasks(x.id)}
              >
                <div className="card-body listCardBody">
                  <div className="row">
                    <div className="col-8">
                      <p className="card-title">{x.listName}</p>
                    </div>
                    <div className="col-4">
                      <div className="row">
                        <div className="col-6">
                          <i
                            className="fa fa-pencil editOption"
                            onClick={() => editList(x.id)}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-6">
                          <i
                            className="fa fa-trash deleteOption"
                            aria-hidden="true"
                            onClick={() => deleteList(x.id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="col-12">
              <div className="col-12 alert noListsAvailable" role="alert">
                No Lists Available....
              </div>
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary addListButtonWithNoLists"
                onClick={clearAllFields}
              >
                <i className="fa fa-plus" aria-hidden="true">
                  &nbsp;Add List
                </i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;