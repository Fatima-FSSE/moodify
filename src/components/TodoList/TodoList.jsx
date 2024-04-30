import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faSquareMinus } from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import "./TodoList.css";

function TodoList() {
  const initialList = [
    {
      id: uuidv4(),
      todoItem: "buy lumber and screws",
    },
    {
      id: uuidv4(),
      todoItem: "Sand the cabinet",
    },
  ];

  const [list, setList] = useState(initialList);
  const [todoItem, setTodoItem] = useState("");
  const [isDialog, setDialog] = useState(false);

  function handleChange(event) {
    //track new item field state
    setTodoItem(event.target.value);
  }
  function handleAddItem() {
    const newList = list.concat({ id: uuidv4(), todoItem });
    if (newList.length >= 11) {
      setDialog(true);
    } else {
      setDialog(false);
      setList(newList);
      setTodoItem("");
    }
  }
  const handleClose = () => {
    setDialog(false);
  };

  function handleDeleteItem(id) {
    const newList = list.filter((obj) => obj.id !== id);
    setList(newList);
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
            {list.map((item, key) => (
              <div className="items" key={key}>
                <input
                  type="checkbox"
                  name="todo-item"
                  id="todo-item-id"
                  value="1"
                />
                <p className="item">{item.todoItem}</p>
                <button
                  className="del-button"
                  type="button"
                  onClick={() => {
                    handleDeleteItem(item.id);
                  }}
                >
                  <FontAwesomeIcon icon={faSquareMinus} size="2x" />
                </button>
              </div>
            ))}
          </div>
        </form>
        <form class="add-item" action="" method="post">
          <input
            type="text"
            value={todoItem}
            placeholder="new item"
            autocomplete="off"
            onChange={handleChange}
          />
          <button className="add-button" type="button" onClick={handleAddItem}>
            <FontAwesomeIcon icon={faSquarePlus} size="2x" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoList;
