import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars-2';


export default function JoinedRoom() {
  var paramst = new URLSearchParams(window.location.search);
  const [refresher, setrefresh]= useState(0)
  var mykeyroom  = paramst.get('roomid')
  const[pun, addpun] = useState(0)
  const [songState, setsongState] = useState("")
  var [songQueue, setQueue] = useState([""])
  // const[]
  const [pinID, setPINID] = useState({})
  const [allsong, set_allsong] = useState([])
  

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/pintotal")
      res.json().then(res => setPINID(res))
    }
    fetchData()


    still_exist()
    

    // console.log(pinID)
  }, [refresher])
  function youtubeParse(fullurl){
    var rE = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = fullurl.match(rE)
    return (match&&match[7].length==11)? match[7] : fullurl;
  }

  useEffect(() => {
    async function fetchSong() {
      const res = await fetch("http://localhost:5000/songqueue")
      res.json().then(res => set_allsong(res))
    }
    fetchSong()
  }, [refresher])

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
    // var pin_array = Object.values(allsong)
    // var not_exist = true;
    // console.log(pin_array)
    // var i = 0
    // while(i < pin_array.length){
    //   if (thiskey ==  pin_array[i]['uid']){
    //     not_exist = false
    //     return not_exist
    //   }
    //   if (i == pin_array.length-1){
    //     return not_exist
    //     }
    //   i += 1
    // }
    // console.log(not_exist)
    return true
  }
  function createSongID(){
    //e.preventDefault();
    
    var repeated = false;
    //var repeatchecker = false;
    var mysongid = '';
    while (!repeated){
      mysongid = generateSongId()
      //check key with db
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
  

  setTimeout(() => {
    setrefresh(refresher+1)
    }, 3000);

    const addNewQueue=()=>{
      //songList.push(songState)
      var newid = youtubeParse(songState)
      var newuid = createSongID()
      let newsong = {
        'uid': newuid,
        'pin_a':mykeyroom,
        'pin_q':newid
        
      }
      axios.post('http://localhost:5000/songqueue', newsong).then(res => console.log("added new song"))
      setsongState("")
    }

  function still_exist(){

    var pin_array = Object.values(pinID)
    var i = 0
    var exist = false
    var done = false
    while (i < pin_array.length){
      if (mykeyroom ==  pin_array[i]['pin_a']){
        exist = true;
      }
      if (i == pin_array.length-1){
        console.log("reach last: ", pin_array[i]['pin_a'])
        if (exist == false){
          console.log("host gone")
          leaveRoom()
          alert("host terminated the room")
        }
      }

      i += 1

    }
    
  }
  function deleteSong(songid){
    console.log("check delete song: "+songid)

    //var newid = youtubeParse(songid)
    //console.log(newid)
    // songqueue/:pin_a/:pin_q
    // axios.delete(`http://localhost:5000/songqueue/${mykeyroom}/${songid}`).then(res => console.log("deleted this song"))
    axios.delete(`http://localhost:5000/songqueue/${songid}`).then(res => console.log("deleted this song"))
    
  }


  function pushUp(songid){
    console.log("push up: ",songid)
  }
  function pullDown(songid){
    console.log("pull down: ",songid)
  }


  var List = [];
  allsong.map((val, index) => {
    if (val.pin_a == mykeyroom) {
      List.push(
        <li key={index} 
        // onClick={this.chooseProfile.bind(null, val.id)}
        >
          <div className="allsongname">
            <p className="songname">{val.pin_q}</p>
            <p className="up">
              <button 
              value={val.pin_q} 
              onClick=

              // event.target.value
              {(event) => pushUp(val.pin_q)}
              //{(event) => this.console.log(event.target)}
              
              >
                <span>Up</span>
              </button>
            </p>
            <p className="down">
              <button 
              value={val.pin_q} 
              onClick=

              // event.target.value
              {(event) => pullDown(val.pin_q)}
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
    



  function leaveRoom(){
    console.log("leave now")
    window.location.href = "/"
  }


  function play_on_click(){
    let newcmd = {
      'pin_a':mykeyroom,
      'pin_c':"play"
    }
    axios.post('http://localhost:5000/command', newcmd).then(res => console.log("pushed play/pause cmd"))
    // console.log("click me")
    // addpun(pun+1)
    // console.log(pun)
    // alert("room terminate")
  }
  function restart(){
    let newcmd = {
      'pin_a':mykeyroom,
      'pin_c':"restart"
    }
    axios.post('http://localhost:5000/command', newcmd).then(res => console.log("pushed restart cmd"))
  }
  function mute_on_click(){
    let newcmd = {
      'pin_a':mykeyroom,
      'pin_c':"mute"
    }
    axios.post('http://localhost:5000/command', newcmd).then(res => console.log("pushed mute cmd"))

  }
  function skip_now(){
    let newcmd = {
      'pin_a':mykeyroom,
      'pin_c':"skip"
    }
    axios.post('http://localhost:5000/command', newcmd).then(res => console.log("pushed skip cmd"))
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
      <button onClick={()=>leaveRoom()}>Leave Room</button>
      <br />
      <button onClick= {()=>play_on_click()}> play/pause </button>
      <button onClick= {()=>mute_on_click()}> mute/unmute </button>
      <button onClick= {()=>restart()}> restart </button>
      <button onClick= {()=>skip_now()}> skip </button>
      <br></br>
      <input onChange={inputSong} value={songState}></input>
      <button onClick= {()=>addNewQueue()}> add to queue </button>
      <Scrollbars style={{ width: 500, height: 300 }}><ul>{List}</ul></Scrollbars>
      

        
    </div>;
  }




