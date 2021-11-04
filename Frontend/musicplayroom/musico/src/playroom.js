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
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars-2';
import QRCode from 'qrcode';
import Switcher from "react-switch";
var getYoutubeTitle = require('get-youtube-title')

// Hello World

export default function PlayingRoom(match,location) {
    //var songList = ["https://www.youtube.com/watch?v=B3kkddBq-pY","https://www.youtube.com/watch?v=qTTOWu4AqL8","https://www.youtube.com/watch?v=G4eFJsH-Lic"]
    //console.log("first song: ", songList[0])
    //const [ytId,setytId] = useState("RrZHOh77F3Q")
    const [ytId,setytId] = useState("")
    const [eventCon, setEvent] = useState()
    const [currentSong, setCurrent] = useState("")
    const [ currentChannel , setCurrentChannel ] = useState("")
    const [songQ, setsongQ]= useState({yId: "B3kkddBq-pY" , queue:1 },{yId: "qTTOWu4AqL8" , queue:2})
    const [checker , setchecker] = useState()
    const [songState, setsongState] = useState("")
    const [refresher, setrefresh]= useState(0)
    const [refresher_cmd, setrefresh_cmd]= useState(0)
    var roomId = "A4DE2"
    //var [songQueue, setQueue] = useState(["https://www.youtube.com/watch?v=toZW65rksYY","https://www.youtube.com/watch?v=qTTOWu4AqL8","https://www.youtube.com/watch?v=G4eFJsH-Lic"])
    var [songQueue, setQueue] = useState([])
    //const[nextSong, setNext] = useState("")
    const [pinID, setPINID] = useState({})
    const [allsong, set_allsong] = useState([])
    const [allcmd, set_allcmd] = useState([])
    const [cmd_index, set_cmd_index] = useState(0)
    const [isPlay, setPlayState] = useState(0)
    const [vdoDesc , setDesc] = useState("Please Add The First Song")
    //var cmd_index = 0
    const [qroom, setqroom] = useState("")
    const [addqStatus, setqStatus] = useState("")
    const [ auto_checked, set_autochecker] = useState(true)

    //const [queue_song, set_queue] = useState([])

    //const {params:{keyroom}}= match;
    //console.log(keyroom)
   // console.log("room key: ", kid)

   useEffect(()=>{
     //try{
    var theroom = "http://localhost:3000/joinedroom?roomid=" + mykeyroom;
     QRCode.toDataURL(theroom).then((setqroom));
    //  }catch(err){
    //    console.log("err making qr")
   //  }

   },[]);


   useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/pintotal")
      res.json().then(res => setPINID(res))
    }
    //try{
    fetchData()
    // }catch(err){
    //   console.log("err fetch data")
    // }

    // console.log(pinID)
  }, [])

  useEffect(() => {
    //try{
    async function fetchSong() {
      const res = await fetch("http://localhost:5000/songqueue")
      res.json().then(res => set_allsong(res))
    }
    
    fetchSong()
    var setsong_array = []
    var currentsong_array = Object.values(allsong)
    currentsong_array.map((val,index)=>{
      if(val.pin_a == mykeyroom){
        setsong_array.push([val.uid,val.pin_q])
      }
    }, this);

    setQueue(setsong_array)
  
    if (setsong_array.length > 0 && isPlay == 0){
      if(auto_checked == true){
        songChanger3()
      }
      
    }
  //}catch(err){
  //   console.log("err fetch song")
  // }
 

  }, [refresher])
  function getTitleAndDosomething(fromId, callback) {
    getYoutubeTitle(fromId, (err, title) => {
    callback(err, title)
    })
    }

    // getTitleAndDosomething('abc', (err, title) => {
    //   if (err) { // error handling here }
    //   }
    //   else {
    //   // do something with title here
    //   }
    //   })

    // getYoutubeTitle("RrZHOh77F3Q", function(err, title) {
      
    //       var hello = title
    //       console.log(hello)
    //   })

  function getTitle(fromid) {
  //   var idk = false
  //   var hello = ""
  //   getYoutubeTitle(fromid, function(err, title) {
      
  //     hello = title
  //     console.log(hello)
  // })
  // while (idk == false){
  //   if (hello != ""){
  //     idk = true
  //     return hello
  //   }
  // }
  return fromid
  
}
  
  


  // function getTitle(fromid) {
  //   return new Promise((resolve, reject) => {
  //   getYoutubeTitle( fromid, function(err, title) => {
  //   if (err) return reject(err);
  //   return resolve(title);
  //   })
  //   })
  //   }



  // function getTitle(fromid) {
  //   // return new Promise((resolve, reject) => {
  //   // getYoutubeTitle( fromid, (err, title) => {
  //   // if (err) return reject(err);
  //   // return resolve(title);
  //   // })
  //   // })
  //   // }
  //   // getTitle(123)
  //   // .then((title) => {
    
  //   if (fromid != null) {
  //     getYoutubeTitle(fromid, function(err, title) {
  //       if (err) {
  //         document.getElementById('songname').innerHTML = "Null"
  //       }
  //       if (title != null) {
  //         document.getElementById('songname').innerHTML = title
  //       }
  //     }) 
  //   }
  // }
  

  useEffect(() => {
    //try{
    async function fetchCmd() {
      const res = await fetch("http://localhost:5000/command")
      res.json().then(res => set_allcmd(res))
    }
    
    fetchCmd()
    var cmd_array = Object.values(allcmd)
    var allcmd_list = [];
    cmd_array.map((val, index) => {
      if (val.pin_a == mykeyroom) {
        allcmd_list.push(val.pin_c);
      }
    }, this);
    console.log("cmd length: ",allcmd_list.length)
    console.log("all cmd: ",allcmd_list)
    console.log("cmd_index: ",cmd_index)
    if(allcmd_list.length > cmd_index){
      if (allcmd_list[cmd_index] == "play"){
        //axios.delete(`http://localhost:5000/command/${mykeyroom}/${allcmd_list[0]}`).then(res => console.log("have act cmd"))
        togglePlay()
        set_cmd_index(cmd_index+1)
        
      }else if (allcmd_list[cmd_index] == "mute"){
        //axios.delete(`http://localhost:5000/command/${mykeyroom}/${allcmd_list[0]}`).then(res => console.log("have act cmd"))
        muteNow()
        set_cmd_index(cmd_index+1)
        
      }else if (allcmd_list[cmd_index] == "skip"){
        //axios.delete(`http://localhost:5000/command/${mykeyroom}/${allcmd_list[0]}`).then(res => console.log("have act cmd"))
        set_cmd_index(cmd_index+1)
        songChanger3()
        
        
      }else if (allcmd_list[cmd_index] == "restart"){
        //axios.delete(`http://localhost:5000/command/${mykeyroom}/${allcmd_list[0]}`).then(res => console.log("have act cmd"))
        reStart()
        set_cmd_index(cmd_index+1)

      }
    }
  //}catch(err){
  //   console.log("err fetch cmd")
  // }

  }, [refresher_cmd])

  const inputSong = (e)=> {
    setsongState(e.target.value)
  }
  const addQueue=()=>{
    //songList.push(songState)
    setQueue(prevQ =>  [...prevQ, songState])
    setsongState("")
  }
const copyID=()=>{
  var ourid = mykeyroom
  navigator.clipboard.writeText(ourid)
      .then(() => console.log('Async writeText successful, "' + ourid + '" written'))
      .catch(err => console.log('Async writeText failed with error: "' + err + '"'));
}
  
  const pasteGo=()=>{
    navigator.clipboard.readText()
      .then((text) => {
        //setsongState(text)

        var newid = youtubeParse(text)
        if(newid != false){
          var newuid = createSongID()
      let newsong = {
        'uid': newuid,
        'pin_a':mykeyroom,
        'pin_q':newid
        
      }
      axios.post('http://localhost:5000/songqueue', newsong).then(res => console.log("added new song"))
      setqStatus("")
        }else{
          setqStatus("invalid youtube url, please enter a proper url...")
        }
      
      //setsongState("")


        console.log('Async readText successful, "' + text + '" written');
      })
      .catch((err) => console.log('Async readText failed with error: "' + err + '"'));
  }
  const addNewQueue=()=>{
    //songList.push(songState)
    
    var newid = youtubeParse(songState)
    if (newid != false){
      var newuid = createSongID()
      let newsong = {
        'uid': newuid,
        'pin_a':mykeyroom,
        'pin_q':newid
        
      }
      axios.post('http://localhost:5000/songqueue', newsong).then(res => console.log("added new song"))
      setqStatus("")
    }else{
      setqStatus("invalid youtube url, please enter a proper url...")
    }
    
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
    // setCurrent(eventCon.getVideoData().title)
    // setCurrentChannel(eventCon.getVideoData().author)
    try{
      var currenttitle = eventCon.getVideoData().title
      var currentauthor = eventCon.getVideoData().author
      if (ytId != ""){
        console.log(currentSong)
        // setDesc("Now Playing "+currentSong.toString()+" By "+ currentChannel.toString())
        setDesc("Now Playing "+currenttitle.toString()+" By "+ currentauthor.toString())
      }
    } catch(err) {
      console.log("load mai tun")
    }
    
    
  
  
    console.log("checking change")
},
 [refresher]
 
 );  

 var pin_array = Object.values(allsong)
 console.log(pin_array['pin_a'])

setTimeout(() => {
  setrefresh_cmd(refresher_cmd+1)
  if (refresher_cmd % 1 == 0){
    setrefresh(refresher+1)
  }
  }, 1000);

  function generateSongId(){
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
  function keyChecker(thiskey){
    console.log("checking this: ", thiskey)
    var pin_array = Object.values(allsong)
    var not_exist = true;
    console.log(pin_array)
    var i = 0
    while(i < pin_array.length) {
      if (thiskey ==  pin_array[i]['uid']){
        not_exist = false
        return not_exist
      }
      if (i == pin_array.length-1){
        return not_exist
        }
      i += 1
    }
    console.log(not_exist)
    console.log(i)
  }
  function createSongID(){
    //e.preventDefault();
    
    var repeated = false;
    //var repeatchecker = false;
    var mysongid = '';
    while (!repeated){
      mysongid = generateSongId()
      //check key with db
      var pin_array = Object.values(allsong)
      if (pin_array.length == 0) {
        repeated = true;
        return mysongid
      }
      if (keyChecker(mysongid)){
        repeated = true;
        return mysongid
      }
    }

    // let pin_json = {
    //   "pin_a": mykeyroom,
    // }
    // axios.post('http://localhost:5000/songqueue', pin_json).then(res => console.log("added new pin id"))

  }

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

function terminator() {
  // axios
  //   .delete(`http://localhost:5000/pintotal/${mykeyroom}`)
  //   .then((res) => console.log("deleted my room"));
  //   var allsong_list = [];
  //   var song_array = Object.values(allsong);
  //   allsong.map((val, index) => {
  //     if (val.pin_a == mykeyroom) {
  //       allsong_list.push(val.uid);
  //     }
  //   }, this);
  //   console.log(allsong_list)
  //   var i = 0
  //   while(i < allsong_list.length){
  //     // axios.delete(`http://localhost:5000/songqueue/${mykeyroom}/${allsong_list[i]}`).then(res => console.log("deleted this song"))
  //     axios.delete(`http://localhost:5000/songqueue/${allsong_list[i]}`).then(res => console.log("deleted this song"))
  //     i += 1
  //   }
  axios.delete(`http://localhost:5000/pintotal/${mykeyroom}`)
  axios.delete(`http://localhost:5000/allsong/${mykeyroom}`).then(res => console.log("deleted all song"))


    var cmd_list = [];
    //var cmd_all = Object.values(allcmd);
    allcmd.map((val, index) => {
      if (val.pin_a == mykeyroom) {
        cmd_list.push(val.pin_c);
      }
    }, this);
    //console.log(allsong_list)
    var j = 0
    while(j < cmd_list.length){
      axios.delete(`http://localhost:5000/command/${mykeyroom}/${cmd_list[j]}`).then(res => console.log("deleting all cmd"))
      j += 1
    }

  window.location.href = "/";
}

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
function songChanger3(){
  if (songQueue.length >0){
    setDesc("Changing song...")
    var toPlay = songQueue[0]
    setytId(toPlay[1])
    axios.delete(`http://localhost:5000/songqueue/${toPlay[0]}`).then(res => console.log("deleted this song"))
    setPlayState(1)
  }else{
    //setqStatus("The queue is empty now...")
    setPlayState(0)
  }

}
var paramst = new URLSearchParams(window.location.search);

var mykeyroom  = paramst.get('roomid')

function swapUp(nowabove_id, nextabove_id,nowabove_song,nextabove_song){
  // axios.delete(`http://localhost:5000/allsong/${keyroom}`).then(res => console.log("deleted all song"))
  // var index_run = 0
  // while(index_run < song_list.length){
  //   let each_song = {
  //     'uid': song_list[index_run][0],
  //     'pin_a':mykeyroom,
  //     'pin_q':song_list[index_run][1]
      
  //   }

  //   index_run += 1
  // }
  const nextabove_song_obj = {
    "pin_q": nextabove_song
   }
  const nowabove_song_obj = {
    "pin_q": nowabove_song
  }


  axios.put(`http://localhost:5000/songqueue/${mykeyroom}/${nowabove_id}`, nextabove_song_obj).then(res => console.log("Move up to down"))
  axios.put(`http://localhost:5000/songqueue/${mykeyroom}/${nextabove_id}`, nowabove_song_obj).then(res => console.log("Move down to up"))
}

function swapDown(nowabove_id, nextabove_id,nowabove_song,nextabove_song){
  const nextabove_song_obj = {
    "pin_q": nextabove_song
   }
  const nowabove_song_obj = {
    "pin_q": nowabove_song
  }
  axios.put(`http://localhost:5000/songqueue/${mykeyroom}/${nowabove_id}`, nextabove_song_obj).then(res => console.log("Move up to down"))
  axios.put(`http://localhost:5000/songqueue/${mykeyroom}/${nextabove_id}`, nowabove_song_obj).then(res => console.log("Move down to up"))
}


function pushUp(songid){
  console.log("push up: ",songid)
  console.log(songList)
  if (songList.length > 1){
    if (songList[0][0] != songid){
      var index_runner = 0
      while(index_runner < songList.length-1){
        if (songList[index_runner+1][0] == songid ){
          var nowabove_id= songList[index_runner][0]
          var nextabove_id = songList[index_runner+1][0]
          var nowabove_song= songList[index_runner][1]
          var nextabove_song = songList[index_runner+1][1]
          console.log("from "+"id: "+ nowabove_id+" song: " +nowabove_song+" and id: "+nextabove_id+" song: "+ nextabove_song+ " to "+" id: "+ nowabove_id+" song: " +nextabove_song+" and id: "+ nextabove_id+" song: "+ nowabove_song)
          swapUp(nowabove_id, nextabove_id,nowabove_song,nextabove_song)
          break
        }
        index_runner += 1
      }
    }else{
      console.log("it is already the first queue")
      setqStatus("Sorry.. that is already the first queue")
    }
  }else{
    console.log("there is no place to swap ")
    setqStatus("Oops.. there is only one song in a queue")
  }
}
function pullDown(songid){
  console.log("pull down: ",songid)
  console.log(songList)
  if (songList.length > 1){
    if (songList[songList.length-1][0] != songid){
      var index_runner = 0
      while(index_runner < songList.length-1){
        if (songList[index_runner][0] == songid ){
          var nowabove_id= songList[index_runner][0]
          var nextabove_id = songList[index_runner+1][0]
          var nowabove_song= songList[index_runner][1]
          var nextabove_song = songList[index_runner+1][1]
          console.log("from "+"id: "+ nowabove_id+" song: " +nowabove_song+" and id: " + nextabove_id+" song: "+ nextabove_song+ " to "+"id: "+ nowabove_id+" song: " +nextabove_song+" and id: " + nextabove_id+" song: "+ nowabove_song)
          swapDown(nowabove_id, nextabove_id,nowabove_song,nextabove_song)
          break
        }
        index_runner += 1
      }
    }else{
      console.log("it is already last queue")
      setqStatus("Sorry.. that is already the last queue")
    }
  }else{
    console.log("there is no place to swap ")
    setqStatus("Oops.. there is only one song in a queue")
  }
}

function vdoEnd(){
  if(auto_checked == true){
    songChanger3()
  }else{
    console.log("video ended")
    setPlayState(0)
  }
}
function toggleAuto(){
  if (auto_checked == true){
    set_autochecker(false)
  }else{
    set_autochecker(true)
    
  }
}


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

    function deleteSong(songid){
      console.log(songid)
      //var newid = youtubeParse(songid)
      //console.log(newid)
      // songqueue/:pin_a/:pin_q
      axios.delete(`http://localhost:5000/songqueue/${songid}`).then(res => console.log("deleted this song"))
      
    }

    function checkthistitle(fromid){
      var titlenow = getTitleAndDosomething(fromid, (err, title) => {
        if (err) { // error handling here }
          console.log("its error idk why")
        }
        else {
          console.log("i got title here "+ title)
          return title
        // do something with title here
        }
        
        })
        console.log("i got title here222 "+ titlenow)
        return fromid
    }

    // const n = [1,2]
    // const listitems = allson.map((num) => 
    // num
    // )
    // console.log(listitems)

    var List = [];
    var songList = []
    allsong.map((val, index) => {
      if (val.pin_a == mykeyroom) {
        songList.push([val.uid, val.pin_q])
        List.push(
          <li key={index} 
          // onClick={this.chooseProfile.bind(null, val.id)}
          >
            <div className="allsongname">
              <p className="songname" id="songname"> {checkthistitle(val.pin_q)}
              </p>
              <p className="up">
                <button 
                value={val.uid} 
                onClick=

                // event.target.value
                {(event) => pushUp(val.uid)}
                //{(event) => this.console.log(event.target)}
                
                >
                  <span>Up</span>
                </button>
              </p>
              <p className="down">
                <button 
                value={val.uid} 
                onClick=

                // event.target.value
                {(event) => pullDown(val.uid)}
                //{(event) => this.console.log(event.target)}
                
                >
                  <span>Down</span>
                </button>
              </p>
              
              <p className="remove">
                <button 
                value={val.uid} 
                onClick=

                // event.target.value
                {(event) => deleteSong(val.uid)}
                //{(event) => this.console.log(event.target)}
                
                >
                  <span>Remove</span>
                </button>
              </p>
            </div>
          </li>
        ); 
      }
    }, this);

    return <div className='playerroom'>
      <br></br>
      <p>Room ID: {mykeyroom} <button onClick={()=>copyID()}>Copy ID</button> <img style={{width: 50, height:50}} src={qroom} /></p>
      
      
      
      
      <button onClick={()=>terminator()}>Terminate Room</button>
      <br></br>
        {/* <input onChange={inputChange}></input> */}
        <button onClick={()=>togglePlay()}>play/pause</button>
        <button onClick={()=>muteNow()}>mute/unmute</button>
        <button onClick={()=>reStart()}>restart</button>
        <button onClick={songChanger3}>skip</button>
        <label>
        <span>Auto Change</span>
        <Switcher onChange={toggleAuto} checked={auto_checked} />
      </label>
        <br></br>
        <input onChange={inputSong} value={songState}></input>
        {/* <button onClick={()=>addQueue()}>add to old queue</button> */}
        <button onClick={()=>addNewQueue()}>add to queue</button>
        <button onClick={()=>pasteGo()}>add from clipboard</button>
        <p>{addqStatus}</p>
        {/* <p>Now playing: {currentSong} By {currentChannel}</p> */}
        <p>{vdoDesc}</p>
        {/* <button onClick={doubleChange}>Refresh</button> */}
        {/* <button onClick={()=>unmuteNow()}>unmute</button> */}
        <YouTube videoId={ytId} opts={opts} onReady={ytReady} onEnd={vdoEnd} />
        <Scrollbars style={{ width: 500, height: 300 }}><ul>{List}</ul></Scrollbars>
    </div>;
  }

//export default YtMusico;
