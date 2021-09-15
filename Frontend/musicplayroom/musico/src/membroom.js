import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import YouTube from 'react-youtube';

export default function JoinedRoom() {
  const[pun, addpun] = useState(0)
  function play_on_click(){
    console.log("click me")
    addpun(pun+1)
    console.log(pun)
  }

    return <div className='joinedroom'>
      <br></br>
      <p>Room ID: Welcome to Room 4 </p>
      <button onClick= {()=>play_on_click()}> play/pause </button>


        
    </div>;
  }





