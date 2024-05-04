import React, { useState } from "react";
import { SketchPicker } from "react-color";
import "../styles/modal.css";

export default function Modal({ isOpen, close, children }) {
  const [showColorPicker, setShowColorPicker] = useState(true); // Set to true by default

  return (
    <article className={isOpen ? "modal is-open" : "modal"}>
      <button
        className="modal-close"
        onClick={() => {
          close();
        }}
      >
        X
      </button>
      <div>hello</div>
      <div className="modal-container">
        {showColorPicker && (
          <SketchPicker
            onChange={(color) => console.log(color)}
            color="#fff"
          />
        )}
        {children}
      </div>
    </article>
  );
}
