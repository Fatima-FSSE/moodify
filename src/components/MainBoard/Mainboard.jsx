import React from 'react';
import ImageBoard from '../ImageBoard/ImageBoard.jsx';
import TodoList from '../TodoList/TodoList.jsx';

import './Mainboard.css';

function Mainboard() {
    return (
      <div className="main-board-container">
        <div className="container main-board-div">
          <ImageBoard />
          <TodoList />
        </div>
      </div>
    );
}

export default Mainboard;