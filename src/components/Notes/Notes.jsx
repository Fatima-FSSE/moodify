import React, { useState, useEffect } from "react";
import linkifyStr from "linkify-string";
import "./Notes.css";

function Notes() {

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const txtarea = document.getElementById("textarea");
    txtarea.addEventListener("input", handleChange);
  }, []);

  const handleChange = (event) => {
    console.log("Clicked!");

    const containerEle = document.getElementById("container");
    const textarea = document.getElementById("textarea");

    const mirroredEle = document.createElement("div");
    mirroredEle.textContent = textarea.value;
    mirroredEle.classList.add("container__mirror");
    containerEle.appendChild(mirroredEle);

    const textareaStyles = window.getComputedStyle(textarea);
    [
      "border",
      "boxSizing",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "letterSpacing",
      "lineHeight",
      "padding",
      "textDecoration",
      "textIndent",
      "textTransform",
      "whiteSpace",
      "wordSpacing",
      "wordWrap",
    ].forEach((property) => {
      mirroredEle.style[property] = textareaStyles[property];
    });
    mirroredEle.style.borderColor = "transparent";

    const parseValue = (v) =>
      v.endsWith("px") ? parseInt(v.slice(0, -2), 10) : 0;
    const borderWidth = parseValue(textareaStyles.borderWidth);

    const ro = new ResizeObserver(() => {
      mirroredEle.style.width = `${textarea.clientWidth + 2 * borderWidth}px`;
      mirroredEle.style.height = `${textarea.clientHeight + 2 * borderWidth}px`;
    });
    ro.observe(textarea);

    textarea.addEventListener("scroll", () => {
      mirroredEle.scrollTop = textarea.scrollTop;
    });

    const findLinks = () => {
      mirroredEle.innerHTML = linkifyStr(textarea.value, {
        target: "_blank",
      });
    };

    textarea.addEventListener("input", () => {
      findLinks();
    });

    findLinks();
  };

  return (
    <div className="notes-container">
      <div className="container notes-div">
        <div className="bloc-tabs">
          <div
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Notes
          </div>
          <div
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Shopping List
          </div>
          <div
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Products Links
          </div>
        </div>

        <div className="content-tabs ">
          <div
            className={toggleState === 1 ? "content active-content" : "content"}
          >
            <textarea
              className="content-text-area"
              placeholder="Add your Notes"
            />
          </div>
          <div
            className={toggleState === 2 ? "content active-content" : "content"}
          >
            <textarea
              className="content-text-area"
              placeholder="Add your Shopping List"
            />
          </div>
          <div
            className={
              toggleState === 3
                ? "content container-div active-content"
                : "content container-div"
            }
            id="container"
          >
            <textarea
              className="content-text-area container__textarea"
              id="textarea"
              placeholder="Add you Products Links"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
