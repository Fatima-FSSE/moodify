import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Images = ({ image, onDelete, id }) => {
  const [isHovered, setHover] = useState(false);
  const [border, setBorder] = useState("none");

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

  return (
    <Draggable defaultPosition={{ x: image.x, y: image.y }}>
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
