import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Images = ({ image, onDelete, id, onDragStop}) => {

  const [isHovered, setHover] = useState(false);
  const [border, setBorder] = useState("none");
  const [width, setWidth] = useState(image.width);
  const [height, setHeight] = useState(image.height);

  const styles = {
    background: `url(${image.url})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    border: border,
  };

  function handleClick() {
    onDelete(id);
  }

  function setImageStyleOnMouseOver() {
    setHover(true);
    setBorder("1px solid black");
  }

  function setImageStyleOnMouseLeave() {
    setHover(false);
    setBorder("none");
  }

  const handleStop = (x,y) => {
    console.log("onDragStop");

    console.log("position.x", x);
    console.log("position.y", y);
    onDragStop(id,x,y);
  };

  return (
    <Draggable defaultPosition={{ x: image.x, y: image.y }} 
    onStop={(e,data) =>{handleStop(data.x, data.y)}}>
      <Resizable
        defaultSize={{
          width: image.width,
          height: image.height,
        }}
        style={styles}
        lockAspectRatio={true}
        className="imageContainer"
        onMouseOver={setImageStyleOnMouseOver}
        onMouseLeave={setImageStyleOnMouseLeave}
        size={{ width, height }}
        onResizeStop={(e, direction, ref, d) => {
          setWidth(width + d.width);
          setHeight(height + d.height);
        }}
      >
        {isHovered && (
          <button className="del-button" onClick={handleClick}>
            <FontAwesomeIcon icon={faTrashCan} />{" "}
          </button>
        )}
      </Resizable>
    </Draggable>
  );
};

export default Images;
