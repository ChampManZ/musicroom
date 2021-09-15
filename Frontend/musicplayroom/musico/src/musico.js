import React from 'react';
import YouTube from 'react-youtube';

class YtMusico extends React.Component {
    ytReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        //event.target.mute();
        console.log("Now playing ",event.target.getVideoUrl())
        //event.target.playVideo();
        console.log(event.target)
        // const player = event.target
        // this.setState({
        // playerObj: player
        // })
    }
    muteYt(event){
      event.target.mute();
    }
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const {vdoId} = this.props

    return <YouTube videoId={vdoId} opts={opts} onReady={this.ytReady} />;
  }


}

export default YtMusico;

