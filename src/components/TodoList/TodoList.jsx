import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';

import './TodoList.css';

function TodoList() {


  const initialList = [
    {
      id: '1', 
      todoItem: 'buy lumber and screws',
    },
    {
      id: '2',
      todoItem: 'Sand the cabinet',
    },
  ];

  const [list, setList] = useState(initialList);
  const [todoItem, setTodoItem] = useState("");

  function handleChange(event){
    //track new item field state
    setTodoItem(event.target.value);
  }
   function handleAddItem(){
    //add item
    const newList = initialList.concat({id: uuidv4(), todoItem});
    setList(newList);
    setTodoItem("");
   }
  

  return (
    <div className="todo-list-container">
      <div className="container">
        <div className="header todo-heading">Todo List</div>
        <form action="" method="post">
          <div className="list-items">
            {list.map((item) => (
              <div className="items">
                <input
                  type="checkbox"
                  name="todo-item"
                  id="todo-item-id"
                  value="1"
                />
                <p className="item">{item.todoItem}</p>
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
          <button className="add-button"
          type="button"
          onClick={handleAddItem}>
            <FontAwesomeIcon icon={faSquarePlus} size="2x" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoList;