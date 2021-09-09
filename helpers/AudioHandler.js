import React from "react";

export default function AudioHandler () {
  const [controlObj, setControlObj] = React.useState({
    id: '',
    prevId: '',
    isPlaying: false
  });

  const playerHandler = (e) => {
    let videoid = e.currentTarget.dataset.videoid;

    if(videoid == controlObj.id) {
      setControlObj({
        id: videoid,
        prevId: videoid,
        isPlaying: !controlObj.isPlaying
      });
    }

    if(videoid != controlObj.id) {
      setControlObj({
        id: videoid,
        prevId: controlObj.id,
        isPlaying: true
      });
    }
  }

  React.useEffect(() => {
    let audioPlayer = null;
    
    if(controlObj.prevId) {
      if(controlObj.prevId != controlObj.id) {
        audioPlayer = document.getElementById('player'+controlObj.prevId);
        audioPlayer.pause();
      }
    }

    if(controlObj.id) {
      audioPlayer = document.getElementById('player'+controlObj.id);
      controlObj.isPlaying ? audioPlayer.play() : audioPlayer.pause();
    }
  }, [controlObj]);

  return [playerHandler, controlObj, setControlObj];
}
