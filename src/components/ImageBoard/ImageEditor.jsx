import React, { useState, useEffect, useRef } from "react";
import Images from "./Images.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import "./ImageEditor.css";
import axios from "axios";

const ImageEditor = () => {
  const imagePath = "images/image-board/";
  const userId = "01234";

  const initialImageList = {
    _id: userId,
    imagelist: [
      {
        _id: uuidv4(),
        url: `${imagePath}wallpaper.jpg`,
        width: 300, // default width
        height: 350, // default height
        x: 500,
        y: 20,
      },
      {
        _id: uuidv4(),
        url: `${imagePath}daybed.png`,
        width: 350, // default width
        height: 250, // default height
        x: 470,
        y: 250,
      },
      {
        _id: uuidv4(),
        url: `${imagePath}rug2.jpg`,
        width: 250, // default width
        height: 200, // default height
        x: 130,
        y: 200,
      },
      {
        _id: uuidv4(),
        url: `${imagePath}Chandelier.png`,
        width: 250, // default width
        height: 200, // default height
        x: 950,
        y: 130,
      },
      {
        _id: uuidv4(),
        url: `${imagePath}Sconce.png`,
        width: 150, // default width
        height: 100, // default height
        x: 200,
        y: 50,
      },
    ],
  };

  const [image, setImage] = useState();
  const [images, setImages] = useState(initialImageList);
  const formRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3001/moodify/images").then((res) => {
      console.log("Getting the Images");
      console.log(res.data);
      if (res.data.length === 0) {
        axios
          .post("http://localhost:3001/moodify/images/add", initialImageList)
          .then((res) => console.log(res.data[0]))
          .catch((err) => console.log(err));
      } else {
        setImages(res.data[0]);
      }
    });
  }, []);

  function deleteImage(id) {
    console.log(id);
    const newImageList = images.imagelist.filter((obj) => obj._id !== id);
    setImages((prevState) => ({ ...prevState, imagelist: newImageList }));

    const updatedImageList = {
      _id: "01234",
      imagelist: newImageList,
    };

    axios
      .post(
        "http://localhost:3001/moodify/images/delete-image",
        updatedImageList
      )
      .then((res) => console.log("Update after delete :" + res.data[0]))
      .catch((err) => console.log(err));
  }

  const onInputChange = (e) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const newImage = {
          _id: uuidv4(),
          url: e.target.result,
          width: 200, // default width
          height: 200, // default height
          x: 0,
          y: 0,
        };
        const newImageList = [...images.imagelist, newImage];
        setImages((prevState) => ({ ...prevState, imagelist: newImageList }));
      };
      reader.readAsDataURL(file);

      setImage(file);
    } catch (e) {
      console.log(e);
    };

    // Automatically submit the form after file is selected
    setTimeout(() => {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }, 500); // Small delay to ensure state updates before submitting
  };

  const submitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("http://localhost:3001/moodify/images/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  async function updateImagePosition(id, x, y) {
    console.log("The values of x and y in UpdateImagePosistion are:"+id+" "+x+" "+y);
    try {
      const response = await axios.patch(
        `http://localhost:3001/moodify/update-image-position/${userId}/${id}`,
        {
            newX: x,
            newY: y
        });

      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error updating document:', error);
    }
    
  };

  return (
    <div className="image-editor">
      <div className="toolbar-div">
        <form ref={formRef} onSubmit={submitImage}>
          <label htmlFor="image-upload" className="upload-button">
            Add Image&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={onInputChange}
            />
          </label>
        </form>
      </div>
      <div className="canvas-container">
        <div className="canvas">
          {images.imagelist.map((image) => (
            <Images
              className="image-section"
              image={image}
              onDelete={deleteImage}
              id={image._id}
              onDragStop={updateImagePosition}
              key={image._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
