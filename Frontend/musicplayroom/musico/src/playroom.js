import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import YouTube from 'react-youtube';
//import React, { useState, useEffect } from 'react';
import { kid } from './makeconst';
import {
  Link,
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export default function PlayingRoom(match,location) {
    //var songList = ["https://www.youtube.com/watch?v=B3kkddBq-pY","https://www.youtube.com/watch?v=qTTOWu4AqL8","https://www.youtube.com/watch?v=G4eFJsH-Lic"]
    //console.log("first song: ", songList[0])
    const [ytId,setytId] = useState("RrZHOh77F3Q")
    const [eventCon, setEvent] = useState()
    const [currentSong, setCurrent] = useState("")
    const [ currentChannel , setCurrentChannel ] = useState("")
    const [songQ, setsongQ]= useState({yId: "B3kkddBq-pY" , queue:1 },{yId: "qTTOWu4AqL8" , queue:2})
    const [checker , setchecker] = useState()
    const [songState, setsongState] = useState("")
    const [refresher, setrefresh]= useState(0)
    var roomId = "A4DE2"
    var [songQueue, setQueue] = useState(["https://www.youtube.com/watch?v=toZW65rksYY","https://www.youtube.com/watch?v=qTTOWu4AqL8","https://www.youtube.com/watch?v=G4eFJsH-Lic"])
    //const[nextSong, setNext] = useState("")

    //const {params:{keyroom}}= match;
    //console.log(keyroom)

   // console.log("room key: ", kid)
  const inputSong = (e)=> {
    setsongState(e.target.value)
  }
  const addQueue=()=>{
    //songList.push(songState)
    setQueue(prevQ =>  [...prevQ, songState])
    setsongState("")
  }
   // "RrZHOh77F3Q"
    var songList = ["https://www.youtube.com/watch?v=toZW65rksYY","https://www.youtube.com/watch?v=G4eFJsH-Lic","https://www.youtube.com/watch?v=qTTOWu4AqL8"]
    var songList2 = ["toZW65rksYY","qTTOWu4AqL8","G4eFJsH-Lic"]
    function ytReady(event) {
      console.log(songList)
      event.target.playVideo();
      event.target.seekTo(0);
      console.log("Now playing ",event.target.getVideoUrl())
      //event.target.playVideo();
      console.log("when ready target event: ",event.target)
      setEvent(event.target)
      setCurrent(event.target.getVideoData().title)
      setCurrentChannel(event.target.getVideoData().author)
      // const player = event.target
      // this.setState({
      // playerObj: player
      // })
  }
  function youtubeParse(fullurl){
    var rE = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = fullurl.match(rE)
    return (match&&match[7].length==11)? match[7] : false;
  }
  function playNow(){
    console.log(eventCon)
    //event.target.playVideo()
    eventCon.playVideo()
  }
  function pauseNow(){
    console.log(eventCon)
    //event.target.pauseVideo()
    eventCon.pauseVideo()
  }
  function togglePlay(){
    if (eventCon.getPlayerState() == 2 ){
      eventCon.playVideo()
    }else if(eventCon.getPlayerState() == 1){
      eventCon.pauseVideo()
    }
  }
  function muteNow(){
    if (eventCon.isMuted() == true ){
      eventCon.unMute()
    }else{
      eventCon.mute()
    }
  }
  function reStart(){
    //eventCon.playVideoAt(0)
    eventCon.seekTo(0)
  }
  function skipNow(){
    //eventCon.seekTo(end)
    //console.log(eventCon)
    console.log(eventCon.getVideoData())
  }
  // function unmuteNow(){
  //   eventCon.unMute()
  // }
    const opts = {
        height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }

     function showInfo(){
      // setCurrent(eventCon.getVideoData().title)
      // setCurrentChannel(eventCon.getVideoData().author)
      // setCurrent("f")
      // setCurrentChannel("a")
    }
    const useDidMountEffect = (func, deps) => {
      const didMount = useRef(false);
  
      useEffect(() => {
          if (didMount.current) func();
          else didMount.current = true;
      }, deps);
  }
  useDidMountEffect(() => {
    showInfo()
    setCurrent(eventCon.getVideoData().title)
  setCurrentChannel(eventCon.getVideoData().author)
    console.log("checking change")
},
 [refresher]
 
 );  

setTimeout(() => {
  setrefresh(refresher+1)
  }, 1000);
// function songChanger(){
//   console.log("changing song")
//   console.log("before: ",songList.length)
//   if (songList.length != 0) {
//      var next_song = songList[0]
//      var parsed_next = youtubeParse(next_song)
//     //var next_song2 = songList2[0]
//     //setytId(next_song2)
//     //setNext(parsed_next)
//     //console.log("when change song target event: ",event.target)
//     //setEvent(event.target)
//     setytId(parsed_next)
//     songList = songList.slice(1)
//     //songList2 = songList2.slice(1)
//     console.log(songList)
//     setCurrent(eventCon.getVideoData().title)
//     setCurrentChannel(eventCon.getVideoData().author)
//     eventCon.playVideo()
//     eventCon.seekTo(0)
//   }else{
//     console.log("queue is empty")
//   }
//   console.log("after: ",songList.length)

// }

function doubleChange(){
  // setCurrent(eventCon.getVideoData().title)
  // setCurrentChannel(eventCon.getVideoData().author)
  setrefresh(refresher+1)
}
function songChanger2(){
  console.log("changing song")
  console.log("before: ",songQueue.length)
  if (songQueue.length != 0) {
     var next_songQ = songQueue[0]
     var parsed_Q = youtubeParse(next_songQ)
    //var next_song2 = songList2[0]
    //setytId(next_song2)
    //setNext(parsed_next)
    //console.log("when change song target event: ",event.target)
    //setEvent(event.target)
    setytId(parsed_Q)
    setQueue(prevQ => (prevQ.filter((value, i) => i !== 0)))
    //setQueue(prevQ => [...prevQ , parsed_Q ])
    //songQ = songQ.slice(1)
    //songList2 = songList2.slice(1)
    console.log(songQ)
    setCurrent(eventCon.getVideoData().title)
    setCurrentChannel(eventCon.getVideoData().author)
    //doubleChange()
    eventCon.playVideo()
    eventCon.seekTo(0)
  }else{
    console.log("queue is empty")
  }
  console.log("after: ",songQ.length)

}
var paramst = new URLSearchParams(window.location.search);

var mykeyroom  = paramst.get('roomid')
// function getkey(){
//   var paramst = new URLSearchParams(window.location.search);

//   var mykeyroom  = paramst.get('roomid')
// }



    function inputChange(e){
      //https://www.youtube.com/watch?v=95ft31Ioyts
      var newId = youtubeParse(e.target.value)
      setytId(newId)
      //setCurrent(eventCon.getVideoData().title)
      console.log(eventCon)
      console.log(eventCon.getVideoData())
      
    }
    // useEffect(() => {
    //   //console.log("video changed")
      
    // },[ytId]);
    

    return <div className='playerroom'>
      <br></br>
      <p>Room ID: {mykeyroom} </p>
      <button><a href={"/"}>Terminate Room</a></button>
      <br></br>
        {/* <input onChange={inputChange}></input> */}
        <button onClick={()=>togglePlay()}>play/pause</button>
        <button onClick={()=>muteNow()}>mute/unmute</button>
        <button onClick={()=>reStart()}>restart</button>
        <button onClick={songChanger2}>skip</button>
        <br></br>
        <input onChange={inputSong} value={songState}></input>
        <button onClick={()=>addQueue()}>add to queue</button>
        <p>Now playing: {currentSong} By {currentChannel}</p>
        {/* <button onClick={doubleChange}>Refresh</button> */}
        {/* <button onClick={()=>unmuteNow()}>unmute</button> */}
        <YouTube videoId={ytId} opts={opts} onReady={ytReady} onEnd={songChanger2} />
        
    </div>;
  }




//export default YtMusico;

