import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import YouTube from 'react-youtube';
import checker from './joincheck';
import PlayingRoom from './playroom';
//import React, { useState, useEffect } from 'react';
//import React, { useState, useEffect } from 'react';

export default function Menu() {
    const [keyState, setkeyState] = useState("")
  const inputHandler = (e)=> {
    setkeyState(e.target.value)
  }
  const resetInput=()=>{
    checker(keyState)
    setkeyState("")
  }

    return <div className='mainmenu'>
        <p>Musico</p>
        <button onClick={()=>console.log("creating room")}>Create Room</button>
        <br></br>
        <br></br>
        <input id='roomkey' onChange={inputHandler} value={keyState} ></input>
        <button onClick={()=>resetInput()} >Join Room</button>
        <br></br>
        <br></br>
        <button><a href={"/playerroom"}>Enter Dummy Room</a></button>
    </div>;
  }




//export default YtMusico;

