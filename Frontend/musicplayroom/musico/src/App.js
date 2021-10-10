import logo from './logo.svg';
import './App.css';
import YtMusico from './musico';
import {
  Link,
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// import checker from './joincheck';
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import PlayingRoom from './playroom';
import JoinedRoom from './membroom';
import Menu from './menu';
//import checker from './joincheck';

//https://www.youtube.com/watch?v=w5f4ME8Dq3E





function App() {

  // const [keyState, setkeyState] = useState("")
  // const inputHandler = (e)=> {
  //   setkeyState(e.target.value)
  // }
  // const resetInput=()=>{
  //   checker(keyState)
  //   setkeyState("")
  // }

  //  render(){
    return(
      <div className='App'>
        {/* <YtMusico vdoId='KdvIAuynHnU'/> */}
        
        <Route exact path="/"><Menu/></Route>
        <Route path="/playerroom"><PlayingRoom/></Route>
        {/* <Route path="/playerroom/:keyroom"><PlayingRoom/></Route> */}
        <Route path="/joinedroom"><JoinedRoom/></Route>
        
      </div>
    )
  // }

  // return (
  //   <div className="App">
  //     {/* <header className="App-header"> */}
  //       <yt vdoId="w5f4ME8Dq3E"/>
  //       {/* <img src={logo} className="App-logo" alt="logo" /> */}
  //       {/* <p>
  //         Welcome To Musico
  //       </p> */}
  //       {/* <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a> */}
  //     {/* </header> */}
  //   </div>
  // );
}



export default App;
