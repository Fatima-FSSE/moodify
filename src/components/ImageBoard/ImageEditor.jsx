import React, { useState } from "react";
import Images from "./Images.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./ImageEditor.css";

const ImageEditor = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const newImages = [...images];
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      newImages.push({
        url: e.target.result,
        width: 100, // default width
        height: 100, // default height
        x: 0,
        y: 0,
      });
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-editor">
      <div className="toolbar-div">
        <label htmlFor="image-upload" className="upload-button">
          Upload&nbsp;&nbsp;   
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
          <input id="image-upload" type="file" onChange={handleImageUpload} />
        </label>&nbsp;&nbsp;
        <label htmlFor="image-upload" className="delete-button">
          Delete&nbsp;&nbsp;   
          <FontAwesomeIcon icon={faTrashCan} />
          <input id="image-delete" type="button" onChange={handleImageUpload} />
        </label>
      </div>
      <div className="canvas-container">
        <div className="canvas">
          {images.map((image, index) => (
            <Images image={image} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
