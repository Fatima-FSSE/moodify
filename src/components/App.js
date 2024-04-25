import React from 'react';
import './App.css';

import WeatherBar from './WeatherBar/WeatherBar.jsx';
import Notes from './Notes/Notes.jsx';
import Mainboard from './MainBoard/Mainboard.jsx';

function App() {
  return (
    <div className="App container">
      <WeatherBar />
      <Mainboard />
      <Notes/>
    </div>
  );
}

export default App;
