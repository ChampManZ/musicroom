import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import YouTube from 'react-youtube';
import checker from './joincheck';
import {
  Link,
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
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
    var paramst = new URLSearchParams();
    paramst.append('roomid', mykeyroom )
    //setKeyRoom(mykeyroom)
    //setkeyState(mykeyroom)
    console.log(kid)
    //console.log(keyState)
    window.location.href = "/playerroom?" + paramst.toString();
    //return false;

  }
  function joinkeyChecker(thiskey){
    var joinable = false;
    console.log("checking if this key joinable: ", thiskey)
    if (thiskey == "A1B2C3"){
      joinable = true;
    }
    return joinable

  }

  function enterRoom(){
    if (joinkeyChecker(keyState)){
      var paramst = new URLSearchParams();
      paramst.append('roomid', keyState )
      window.location.href = "/joinedroom?" + paramst.toString();
    }else{
      console.log("not joinable key")
    }

    
  }

  function generateKey(){
    var keyroom = '';
    var keycomp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var getRandom;
    for(var i=0; i <6;i++){
      getRandom = Math.ceil(Math.random()*keycomp.length)
      keyroom += keycomp.charAt(getRandom);
    }
    //setKeyRoom(keyroom)
    //setkeyState(keyroom)
    //console.log(kid)
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
        {/* <button><a onClick={()=>createRoom()} href="/playerroom" >Create Dummy Room</a></button> */}
        {/* <button><Link to={{ pathname: '/playerroom', idkey: { roomkey: keyState } }}/>Create Dummy Room</button> */}
        {/* <button><Link onClick={()=>createRoom()} to={`/playerroom/${keyState}`}>Create Dummy Room</Link></button> */}
        {/* <button><Link   to={`/playerroom/${kid}`}>Create Dummy Room</Link></button> */}
        <button onClick={()=>createRoom()} >Create Dummy Room</button>
        {/* <button onClick={()=>createRoom()}>Create Dummy Room</button> */}
        {/* <button><a href={"/joinedroom"}>Join Dummy Room</a></button> */}
        <button onClick={()=>enterRoom()} >Join Dummy Room</button>
    </div>;
  }






