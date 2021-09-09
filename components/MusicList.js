import React from "react";
import Image from "next/image";
import moment from "moment";

export default function MusicList(props) {
  const [durations, setDurations] = React.useState('');
  const [inProgress, setInProgress] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    async function getDurations() {
      try {
        const res = await fetch('/api/get-durations?id='+props.music.id.videoId).then(response => response.json());
        setDurations(res.durations);

      } catch(error) {
        console.log(error);
      }
    }

    getDurations();
  }, []);
  
  const save = async () => {
    setInProgress(true);
    
    try {
      const data = {
        "id": {
          "videoId": props.music.id.videoId
        },
        "snippet": {
          "title": props.music.snippet.title,
          "channelId": props.music.snippet.channelId,
          "channelTitle": props.music.snippet.channelTitle,
          "thumbnails": {
            "default": {
              "url": props.music.snippet.thumbnails.default.url,
              "width": props.music.snippet.thumbnails.default.width,
              "height": props.music.snippet.thumbnails.default.height
            },
            "medium": {
              "url": props.music.snippet.thumbnails.medium.url,
              "width": props.music.snippet.thumbnails.medium.width,
              "height": props.music.snippet.thumbnails.medium.height
            },
            "high": {
              "url": props.music.snippet.thumbnails.high.url,
              "width": props.music.snippet.thumbnails.high.width,
              "height": props.music.snippet.thumbnails.high.height
            }
          },
          "publishedAt": props.music.snippet.publishedAt
        }
      }

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }

      const res = await fetch("https://6139752e1fcce10017e78afb.mockapi.io/api/v1/musics", requestOptions)
        .then(response => response.json());
      
      setInProgress(false);
      setIsSuccess(true);

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="relative">
      {inProgress && <div className="absolute bg-gray-100 bg-opacity-70 flex items-center w-full h-full rounded-xl z-10">
        <div className="w-full">
          <img className="mx-auto w-16" src="/img/loading.gif" />
        </div>
      </div>}
      <div className={
        props.action == 'stream'
        ? 'flex bg-gray-50 rounded-xl p-2 border border-gray-100 w-11/12'
        : 'flex bg-gray-50 rounded-xl p-2 border border-gray-100'
      }>
        <div className="relative flex-none w-16 h-16 overflow-hidden rounded-xl bg-gray-300 mr-3">
          <Image src={props.music.snippet.thumbnails.medium.url} layout="fill" objectFit="cover" />          
        </div>
        <audio id={'player'+props.music.id.videoId}>
          <source src={'/api/stream?id='+props.music.id.videoId} />
        </audio>
        <div className={props.action == 'stream' ? 'w-7/12' : 'w-8/12'}>
          <p className="font-bold text-sm">
            <span dangerouslySetInnerHTML={{__html: props.music.snippet.title}}></span>
          </p>
          <p className="text-sm text-orange-500">{props.music.snippet.channelTitle}</p>
          <p className="text-sm text-gray-500">{moment(props.music.snippet.publishedAt).format("DD MMM, YYYY")} • {durations}</p>
        </div>
      </div>
      <div className="absolute right-0 top-3">
        {props.action == 'stream' && <div className="flex w-16 h-14 items-center justify-center rounded-xl bg-orange-500">
          {(props.controlObj.id == props.music.id.videoId) && props.controlObj.isPlaying ? (
            <button
            onClick={props.playerHandler}
            data-videoid={props.music.id.videoId}
            className="highlight-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" className="flex-none h-12 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          ) : (
            <button
            onClick={props.playerHandler}
            data-videoid={props.music.id.videoId}
            className="highlight-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" className="flex-none h-12 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </div>}
        {props.action == 'save' && <div className="flex -m-1 mr-1">
          <button onClick={save} className={isSuccess ? 'hidden' : 'highlight-transparent'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 text-orange-100" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </button>
          <button className={isSuccess ? 'highlight-transparent' : 'hidden'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </button>
        </div>}
      </div>
    </div>
  );
}
