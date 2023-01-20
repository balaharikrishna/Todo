import './List.scss';
import { useEffect, useState } from 'react';

const List = ({show,changeShowState,geteditListid,getListid,changeShowDelete,ListsUpdated}) => {
 const [activelist,setActiveList] = useState();
// const [savedItems,setSavedItems] = useState(JSON.parse(localStorage.getItem("tododata")))
 let localData = JSON.parse(localStorage.getItem("tododata"));
useEffect(()=>{
  // setSavedItems(JSON.parse(localStorage.getItem("tododata"))); 
  localData = JSON.parse(localStorage.getItem("tododata"))
  // console.log(savedItems,"saved items frm lists")
  // console.log(activelist,"active list before entering the if condition")
  if(activelist == undefined || !activelist >= 0){
    setActiveList(localData ? localData[0].id : "") ;
    getListid(localData ? localData[0].id : 0);
   }
   console.log("Selected list",activelist);
},[ListsUpdated])

 const deleteList = (listid) =>{
  changeShowDelete(listid);
  }

 const editlist = (listid) =>{
  changeShowState(!show);
  geteditListid(listid);
 }

 const displayTasks = (id) =>{
    getListid(id && id>0 ? id : 0);
  setActiveList(id);
 }

  return (
    <div className="ListMainDiv">
      {localData ? (
        <div>
          {localData.map((x) => {
            return (
              <div
                className="card listcard"
                style={{
                  backgroundColor: x.id == activelist ? "lightgreen" : "white",
                }}
                onClick={() => displayTasks(x.id)}
              >
                <div className="card-body listcardbody">
                  <div className="row">
                    <div className="col-8">
                      <p className="card-title">{x.listName}</p>
                    </div>
                    <div className="col-4">
                      <div className="row">
                        <div className="col-6">
                          <i
                            className="fa fa-pencil editoption"
                            onClick={() => editlist(x.id)}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-6">
                          <i
                            className="fa fa-trash deleteoption"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default List;