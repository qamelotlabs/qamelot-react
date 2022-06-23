import React from 'react';
import { createGlobalStyle } from "styled-components";

const Stats = ({handleClose, collectionId}) => {
    const GlobalStyles = createGlobalStyle`
    h1{
        color: #000;
    }
    .wrapper {
      width: 30%;
      height: 100%;
      display: flex;
      position: absolute;
      right: 0;
      background-color: #ccc;
    }
    closeButton {
      height: 10%;
      width:10px;
    }
    `;
    console.log('collectionId' + collectionId);
  return (
      <div className='wrapper'>
        <div className='closeButton'>
          <button onClick={() => handleClose(true)} className='closeButton'>Close</button>
        </div>
        <GlobalStyles />
        <h1>stats</h1>
      </div>
  )
}

export default Stats