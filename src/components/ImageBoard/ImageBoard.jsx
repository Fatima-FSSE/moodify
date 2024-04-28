import React from "react";
import ImageEditor from "./ImageEditor.jsx"
import "./ImageBoard.css";

function MoodBoard(){
    return (
      <div className="mood-board-container">
        <div className="container">
          <ImageEditor />
        </div>
      </div>
    );
}

export default MoodBoard;