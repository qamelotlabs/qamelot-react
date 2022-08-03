import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./style.css"

export const Modal = ({ setShowModal }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  //render the modal JSX in the portal div.
  return (
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>Metamask not installed. Please install it manually.</h2>
        <p>Download from this link: <a>https://metamask.io/download/</a></p>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>
    
  );
};
// document.getElementById("portal")