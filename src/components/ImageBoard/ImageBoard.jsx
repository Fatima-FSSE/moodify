import React from "react";
import ImageEditor from "./ImageEditor.jsx"
import "./ImageBoard.css";

function MoodBoard(){
    return (
      <div className="mood-board-container">
          <ImageEditor />
      </div>
    );
}

export default MoodBoard;