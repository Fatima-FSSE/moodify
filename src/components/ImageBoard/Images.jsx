import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Images = ({image, onDelete, id}) => {
 const [isHovered, setHover] = useState(false);

 function handleClick(){
    onDelete(id);
 }

  return (
    <Draggable defaultPosition={{ x: image.x, y: image.y }}>
      <Resizable
        defaultSize={{
          width: image.width,
          height: image.height,
        }}
        size={{
          width: image.width,
          height: image.height,
        }}
        style={{
          background: `url(${image.url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          position: "absolute",
        }}
        lockAspectRatio={false}
        className="imageContainer"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
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