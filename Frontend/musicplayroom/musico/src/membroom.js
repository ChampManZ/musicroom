import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import YouTube from 'react-youtube';

export default function JoinedRoom() {
  var paramst = new URLSearchParams(window.location.search);
  var mykeyroom  = paramst.get('roomid')
  const[pun, addpun] = useState(0)
  const [songState, setsongState] = useState("")
  var [songQueue, setQueue] = useState([""])
  // const[]
  function play_on_click(){
    console.log("click me")
    addpun(pun+1)
    console.log(pun)
  }
  function restart(){
    console.log()
  }
  function mute_on_click(){

  }
  function skip_now(){

  } 
  const inputSong = (e)=> {
    setsongState(e.target.value)
  }
  const addQueue=()=>{
    setQueue(prevQ =>  [prevQ, songState])
    setsongState("")
  }
    return <div className='joinedroom'>
      <br></br>
      <p>Room ID: {mykeyroom} </p>
      <button onClick= {()=>play_on_click()}> play/pause </button>
      <button onClick= {()=>restart()}> restart </button>
      <button onClick= {()=>mute_on_click()}> mute/unmute </button>
      <button onClick= {()=>skip_now()}> skip </button>
      <br></br>
      <input onChange={inputSong} value={songState}></input>
      <button onClick= {()=>addQueue()}> add to queue </button>

        
    </div>;
  }




