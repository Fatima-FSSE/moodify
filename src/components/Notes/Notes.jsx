import React, { useState } from 'react';
import './Notes.css';

function Notes(){

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    }

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
               className={
                 toggleState === 1 ? "content active-content" : "content"
               }
             >
               <textarea
                 className="content-text-area"
                 placeholder="Add your Notes"
               />
             </div>
             <div
               className={
                 toggleState === 2 ? "content active-content" : "content"
               }
             >
               <textarea
                 className="content-text-area"
                 placeholder="Add your Shopping List"
               />
             </div>
             <div
               className={
                 toggleState === 3 ? "content active-content" : "content"
               }
             >
               <textarea
                 className="content-text-area"
                 placeholder="Add your products Links"
               />
             </div>
           </div>
         </div>
       </div>
     );
}

export default Notes;