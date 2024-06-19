import React, { useState, useEffect } from "react";
import linkifyStr from "linkify-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import "./Notes.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

function Notes() {

  const [toggleState, setToggleState] = useState(1);
  const [isDialog, setDialog] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
   
    axios.get("http://localhost:3001/moodify/notes")
     .then((res) => {
      console.log("Getting the Notes data");
      console.log(res.data);
      if(res.data.length !== 0){
        const notesEle = document.getElementById("notesTab");
        const shoppingListEle = document.getElementById("shoppingListTab");
        const productLinkEle = document.getElementById("textarea");

        notesEle.value = res.data[0].note[0].note_content
        shoppingListEle.value = res.data[0].note[1].note_content
        productLinkEle.value = res.data[0].note[2].note_content
        handleChange();
      }
     }); 

    const txtarea = document.getElementById("textarea");
    txtarea.addEventListener("input", handleChange);
 
  }, []);

  const handleChange = (event) => {
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

  const saveTab = () => {
    const notesVal = document.getElementById("notesTab").value;
    const shoppingListVal = document.getElementById("shoppingListTab").value;
    const productLinksTabVal = document.getElementById("textarea").value;

    const updatedValue = {
      _id:"01234",
      note: [
        {
          note_type: "Note",
          note_content: notesVal,
        },
        {
          note_type: "Shopping Links",
          note_content: shoppingListVal,
        },
        {
          note_type: "Product Links",
          note_content: productLinksTabVal,
        },
      ]
    };
    axios
      .put("http://localhost:3001/moodify/notes/update", updatedValue)
      .then((res) => {
        console.log(res.data);
        setDialog(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setDialog(false);
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
          </div>{" "}
          &nbsp;&nbsp;&nbsp;
          <button
            className="save-button"
            onClick={() => saveTab()}
          >
            Save Tabs Data&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
          </button>
          {isDialog && (
              <Dialog onClose={handleClose} open={isDialog}>
                <DialogTitle> Save Message </DialogTitle>
                <h3 style={{ marginTop: "-10px", padding: "5px 10px" }}>
                  Data saved successfully
                </h3>
                <br></br>
                <div className="cancel-div">
                  <button className="btn-cancel" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </Dialog>
            )}
        </div>

        <div className="content-tabs ">
          <div
            className={toggleState === 1 ? "content active-content" : "content"}
          >
            <textarea
              className="content-text-area notes"
              placeholder="Add your Notes"
              id="notesTab"
            />
          </div>
          <div
            className={toggleState === 2 ? "content active-content" : "content"}
          >
            <textarea
              className="content-text-area shopping-list"
              placeholder="Add your Shopping List"
              id="shoppingListTab"
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
              className="content-text-area container__textarea products-links"
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
