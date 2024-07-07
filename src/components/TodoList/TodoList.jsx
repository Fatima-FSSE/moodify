import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

import "./TodoList.css";

function TodoList() {
  const initialList = {
    _id: "01234",
    todoItems: [
      {
        _id: uuidv4(),
        todoItem: "buy lumber and screws",
        completed: false,
      },
      {
        _id: uuidv4(),
        todoItem: "Sand the cabinet",
        completed: false,
      },
    ],
  };

  const [list, setList] = useState(initialList);
  const [todoItem, setTodoItem] = useState("");
  const [isDialog, setDialog] = useState(false);

  useEffect(() => {
     axios.get("http://localhost:3001/moodify/todolist")
     .then((res) => {
      console.log("Getting the todolist data");
      console.log(res.data);
      if(res.data.length === 0 ){
        axios
        .post("http://localhost:3001/moodify/todolist/add", initialList)
        .then((res) => console.log(res.data[0]))
        .catch((err) => console.log(err));
      }
      else{
        setList(res.data[0]);
      }
     }) 
  },[]);

  function handleChange(event) {
    //track new item field state
    setTodoItem(event.target.value);
  }
  function handleAddItem() {
    const newTodoItem = {
      _id: uuidv4(),
      todoItem: todoItem,
      completed: false,
    };

    const updatedList = {
      ...list,
      todoItems: [...list.todoItems, newTodoItem],
    };

    if(updatedList.todoItems.length >= 11) {
      setDialog(true);
    } else {
      console.log(updatedList);
      setDialog(false);
      handleUpdate(updatedList);
      setTodoItem("");
    }
  }

  const handleClose = () => {
    setDialog(false);
  };

  function handleDeleteItem(id) {

    const updatedList = {
      ...list, todoItems: list.todoItems.filter(item => item._id !== id),
    }
    handleUpdate(updatedList);
  }

  function handleCheckboxChange(id) {
    const updatedList = {
      ...list,
      todoItems: list.todoItems.map(item => 
        item._id === id ? { ...item, completed: !item.completed } : item
      ),
    };
    handleUpdate(updatedList);
  }

  function handleUpdate(updatedList){
    setList(updatedList);
    axios
    .put("http://localhost:3001/moodify/todolist/update", updatedList)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  }

  return (
    <div className="todo-list-container">
      <div className="container">
        <div className="header todo-heading">Todo List</div>
        <form action="" method="post">
          <div className="list-items">
            {isDialog && (
              <Dialog onClose={handleClose} open={isDialog}>
                <DialogTitle> Reminder </DialogTitle>
                <h3 style={{ marginTop: "-10px", padding: "5px 10px" }}>
                  Don't Overwhelm yourself{" "}
                </h3>
                <br></br>
                <div className="cancel-div">
                  <button className="btn-cancel" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </Dialog>
            )}
            {list.todoItems.map((item, key) => (
              <div className="items" key={key}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(item._id)}
                  name="todo-item"
                  id="todo-item-id"
                  value="1"
                />
                <p className="item">{item.todoItem}</p>
                <button
                  className="del-button"
                  type="button"
                  onClick={() => {
                    handleDeleteItem(item._id);
                  }}
                >
                  <FontAwesomeIcon icon={faSquareMinus} size="2x" />
                </button>
              </div>
            ))}
          </div>
        </form>
        <form className="add-item" action="" method="post">
          <input
            type="text"
            value={todoItem}
            placeholder="new item"
            autoComplete="off"
            onChange={handleChange}
          />
          <button className="add-button" type="button" onClick={handleAddItem}>
            <FontAwesomeIcon className="plus-icon" icon={faSquarePlus} size="2x" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoList;
