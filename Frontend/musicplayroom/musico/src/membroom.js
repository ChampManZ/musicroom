import React, { useState,useEffect,useRef,useLayoutEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars-2';
import QRCode from 'qrcode';
import Leaveroom from './img/leaveroom.png';


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
  const [qroom, setqroom] = useState("")
  const [addqStatus, setqStatus] = useState("")

  //const [room_song, set_roomsong] = useState([])

  useEffect(()=>{
    var theroom = "http://localhost:3000/joinedroom?roomid=" + mykeyroom;
     QRCode.toDataURL(theroom).then((setqroom));

   },[]);
   const copyID=()=>{
    var ourid = mykeyroom
    navigator.clipboard.writeText(ourid)
        .then(() => console.log('Async writeText successful, "' + ourid + '" written'))
        .catch(err => console.log('Async writeText failed with error: "' + err + '"'));
  }

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
    return (match&&match[7].length==11)? match[7] : false;
  }

  useEffect(() => {
    async function fetchSong() {
      const res = await fetch("http://localhost:5000/songqueue")
      res.json().then(res => set_allsong(res))
    }
    fetchSong()
    // var setsong_array = []
    // var currentsong_array = Object.values(allsong)
    // currentsong_array.map((val,index)=>{
    //   if(val.pin_a == mykeyroom){
    //     setsong_array.push([val.uid,val.pin_q])
    //   }
    // }, this);
    // set_roomsong(setsong_array)
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
    var pin_array = Object.values(allsong)
    var not_exist = true;
    console.log(pin_array)
    var i = 0
    while(i < pin_array.length){
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
    //return true
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
  

  setTimeout(() => {
    setrefresh(refresher+1)
    }, 3000);

    const addNewQueue=()=>{
      //songList.push(songState)
      //console.log("hello dude")
      //console.log("pasting "+ navigator.clipboard.readText())
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
        console.log("it is already first queue")
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
            <p className="jsongname">{val.pin_q}</p>
            <div className='jlistq'>
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

  function createRipple(event) {
    const button = event.currentTarget;
  
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
  }
  
  const buttons = document.getElementsByTagName("button");
  for (const button of buttons) {
    button.addEventListener("click", createRipple);
  }
  
    return <div className='joinedroom'>
      <br></br>
      <div className='roomid'>
        <p className='rmid'>Room ID: {mykeyroom}</p>
        <button className='copy' onClick={()=>copyID()}>Copy ID</button> 
        <img className='qr' style={{width: 125, height:125}} src={qroom} /> 
      </div>
      <button className='jterminate' onClick={()=>leaveRoom()}>Leave Room<img className='jleaveroom' src={Leaveroom} alt='leave'/></button>
      <br />
      <div className='jcontroller' data-toggle='buttons'>
        <button className='buttons' onClick= {()=>play_on_click()}> play/pause </button>
        <button className='buttons' onClick= {()=>mute_on_click()}> mute/unmute </button>
        <button className='buttons' onClick= {()=>restart()}> restart </button>
        <button className='buttons' onClick= {()=>skip_now()}> skip </button>
      </div>
      <br></br>
      <div className='jurls'>
        <input className='jurl' placeholder="enter youtube url here" onChange={inputSong} value={songState}></input>
        <button className='jbuttons' onClick= {()=>addNewQueue()}> add to queue </button>
        <button className='jbuttons' onClick={()=>pasteGo()}>add from clipboard</button>
        <p className='jqstatus'>{addqStatus}</p>
      </div>
      
      <Scrollbars className='jbox' style={{ width: 1300, height: 500 }}><ul>{List}</ul></Scrollbars>
      

        
    </div>;
  }




