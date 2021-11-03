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
import axios from 'axios';

//import React, { useState, useEffect } from 'react';
//import React, { useState, useEffect } from 'react';

export default function Menu() {
  const [keyState, setkeyState] = useState("")
  const [refresher, setrefresh]= useState(0)
  const [joinstatus, set_joinstatus] = useState("")

  const [pinID, setPINID] = useState({})
  

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/pintotal")
      res.json().then(res => setPINID(res))
    }
    fetchData()

    // console.log(pinID)
  }, [refresher])

  // console.log(pinID)

  const inputHandler = (e)=> {
    setkeyState(e.target.value)
  }
  const resetInput=()=>{
    checker(keyState)
    setkeyState("")
  }
  function keyChecker(thiskey){
    console.log("checking this: ", thiskey)
    var pin_array = Object.values(pinID)
    var not_exist = true;
    console.log(pin_array)
    var i = 0
    while(i < pin_array.length){
      if (thiskey ==  pin_array[i]['pin_a']){
        not_exist = false
        break
      }
      i += 1
    }
    console.log(not_exist)
    return not_exist
  }



  function createRoom(){
    //e.preventDefault();
    set_joinstatus("Creating Room...")
    
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
    // var pin_text = '{"pin_a": "'+mykeyroom+'"}'
    // var pin_json = JSON.parse(pin_text)

    let pin_json = {
      "pin_a": mykeyroom,
    }
    
    // const reqeustOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json'},
    //   body: JSON.stringify(pin_json)
    // }

    // const res = await fetch('http://localhost:5000/pintotal', reqeustOptions)
    // const data = await res.json()
    //set_joinstatus("Entering Room...")
    axios.post('http://localhost:5000/pintotal', pin_json).then(res => console.log("added new pin id"))


    window.location.href = "/playerroom?" + paramst.toString();
    //return false;

  }

  function pasteJoin(){
    navigator.clipboard.readText()
    .then((text) => {
      //setsongState(text)
      console.log("paste was "+text)
      if (joinkeyChecker(text)){
        set_joinstatus("Found Room! Entering...")
        var paramst = new URLSearchParams();
        paramst.append('roomid', text )
        window.location.href = "/joinedroom?" + paramst.toString();
      }else{
        console.log("not joinable key")
        set_joinstatus("This room does not exist...")
        setkeyState("")
      }

    //setsongState("")


      console.log('Async readText successful, "' + text + '" written');
    })
    .catch((err) => console.log('Async readText failed with error: "' + err + '"'));

  }
 
  
  function joinkeyChecker(thiskey){
    var pin_array = Object.values(pinID)
    var joinable = false;


    // console.log("checking if this key joinable: ", thiskey)
    // console.log("1", thiskey)
    // console.log("2", pin_array[0]['pin_a'])
    // console.log(thiskey == pin_array[0]['pin_a'])
    var i = 0
    while(i < pin_array.length){
      console.log(thiskey, " compare ", pin_array[i]['pin_a'])
      if (thiskey == pin_array[i]['pin_a']){
        console.log(thiskey, " compare true", pin_array[i]['pin_a'])
        joinable = true;
        break
        
      }
      i += 1
    }
    
    console.log("Joinable is: ", joinable)
    return joinable

  }
  setTimeout(() => {
    setrefresh(refresher+1)
    }, 3000);

  function enterRoom(){
    if (joinkeyChecker(keyState)){
      set_joinstatus("Found Room! Entering...")
      var paramst = new URLSearchParams();
      paramst.append('roomid', keyState )
      window.location.href = "/joinedroom?" + paramst.toString();
    }else{
      console.log("not joinable key")
      set_joinstatus("This room does not exist...")
      setkeyState("")
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
        <p className="title">MUSIEGE</p>
        {/* <button onClick={()=>console.log("creating room")}>Create Room</button> */}
        {/* <button onClick={()=>generateKey()}>Create Room</button> */}
        <button onClick={()=>createRoom()} >Create Room</button>
        <br></br>
        <br></br>
        <input id='roomkey' onChange={inputHandler} value={keyState} ></input>
        {/* <button onClick={()=>resetInput()} >Join Room</button> */}
        <button onClick={()=>enterRoom()} >Join Room</button>
        <button onClick={()=>pasteJoin()} >Paste and Join</button>
        <br></br>
        <p>{joinstatus}</p>
        <br></br>
        {/* <button><a href={"/playerroom"} onClick={()=>createRoom()} >Create Dummy Room</a></button> */}
        {/* <button><a onClick={()=>createRoom()} href="/playerroom" >Create Dummy Room</a></button> */}
        {/* <button><Link to={{ pathname: '/playerroom', idkey: { roomkey: keyState } }}/>Create Dummy Room</button> */}
        {/* <button><Link onClick={()=>createRoom()} to={`/playerroom/${keyState}`}>Create Dummy Room</Link></button> */}
        {/* <button><Link   to={`/playerroom/${kid}`}>Create Dummy Room</Link></button> */}
        {/* <button onClick={()=>createRoom()} >Create Dummy Room</button> */}
        {/* <button onClick={()=>createRoom()}>Create Dummy Room</button> */}
        {/* <button><a href={"/joinedroom"}>Join Dummy Room</a></button> */}
        {/* <button onClick={()=>enterRoom()} >Join Dummy Room</button> */}
    </div>;
  }
