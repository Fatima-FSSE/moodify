import React, { useState } from "react";
import Images from "./Images.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import "./ImageEditor.css";

const ImageEditor = () => {

  const imagePath = "images/image-board/";

  const initialImageList = [
    {
        url: `${imagePath}wallpaper.jpg`,
        width: 300, // default width
        height: 350, // default height
        x: 500,
        y: 20,
        id: uuidv4(),
    },
    {
      url: `${imagePath}daybed.png`,
        width: 350, // default width
        height: 250, // default height
        x: 470,
        y: 250,
        id: uuidv4(),
    },
    {
      url: `${imagePath}rug2.jpg`,
        width: 250, // default width
        height: 200, // default height
        x: 130,
        y: 200,
        id: uuidv4(),
    },
    {
      url: `${imagePath}Chandelier.png`,
        width: 250, // default width
        height: 200, // default height
        x: 950,
        y: 130,
        id: uuidv4(),
    },
    {
      url: `${imagePath}Sconce.png`,
        width: 150, // default width
        height: 100, // default height
        x: 200,
        y: 50,
        id: uuidv4(),
    }
  ];
  const [images, setImages] = useState(initialImageList);

  const handleImageUpload = (event) => {
    const newImages = [...images];
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      newImages.push({
        url: e.target.result,
        width: 200, // default width
        height: 200, // default height
        x: 0,
        y: 0,
        id: uuidv4(),
      });
      
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  function deleteImage(id){
    console.log(id);
    const newImageList = images.filter((obj) => obj.id !== id);
    setImages(newImageList);
  }

  return (
    <div className="image-editor">
      <div className="toolbar-div">
        <label htmlFor="image-upload" className="upload-button">
          Upload&nbsp;&nbsp;   
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
          <input id="image-upload" type="file" onChange={handleImageUpload} />
        </label>&nbsp;&nbsp;
      </div>
      <div className="canvas-container">
        <div className="canvas">
          {images.map((image) => (
            <Images className="image-section" image={image} onDelete={deleteImage} id={image.id} key={image.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
