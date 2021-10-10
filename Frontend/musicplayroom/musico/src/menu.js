import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import YouTube from 'react-youtube';
import checker from './joincheck';
import PlayingRoom from './playroom';
import JoinedRoom from './membroom';
import { setKeyRoom, kid } from './makeconst';
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
  function keyChecker(thiskey){
    console.log("checking this: ", thiskey)
    return true
  }

  function createRoom(){
    //e.preventDefault();
    var repeated = false;
    //var repeatchecker = false;
    var mykeyroom = '';
    while (!repeated){
      mykeyroom = generateKey()
      //check key with db
      if (keyChecker(mykeyroom)){
        repeated = true;
      }
    }
    console.log(repeated)
    setKeyRoom(mykeyroom)
    console.log(kid)
    //return false;

  }

  function generateKey(){
    var keyroom = '';
    var keycomp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var getRandom;
    for(var i=0; i <6;i++){
      getRandom = Math.ceil(Math.random()*keycomp.length)
      keyroom += keycomp.charAt(getRandom);
    }
    setKeyRoom(keyroom)
    setkeyState(keyroom)
    console.log(kid)
    return keyroom
  }

    return <div className='mainmenu'>
        <p>Musico</p>
        {/* <button onClick={()=>console.log("creating room")}>Create Room</button> */}
        <button onClick={()=>generateKey()}>Create Room</button>
        <br></br>
        <br></br>
        <input id='roomkey' onChange={inputHandler} value={keyState} ></input>
        <button onClick={()=>resetInput()} >Join Room</button>
        <br></br>
        <br></br>
        {/* <button><a href={"/playerroom"} onClick={()=>createRoom()} >Create Dummy Room</a></button> */}
        <button><a onClick={()=>createRoom()} href="/playerroom" >Create Dummy Room</a></button>
        {/* <button onClick={()=>createRoom()}>Create Dummy Room</button> */}
        <button><a href={"/joinedroom"}>Join Dummy Room</a></button>
    </div>;
  }






