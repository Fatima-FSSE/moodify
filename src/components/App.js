import React from 'react';
import './App.css';

import WeatherBar from './WeatherBar/WeatherBar.jsx';
import MoodBoard from './MoodBoard/MoodBoard.jsx';
import TodoList from './TodoList/TodoList.jsx'

function App() {
  return (
    <div className="App">
      <WeatherBar/>
      <div className='container middle-container'>
        <MoodBoard />
        <TodoList />
      </div>    
    </div>
  );
}

export default App;
