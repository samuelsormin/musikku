import React from "react";
import Image from "next/image";
import moment from "moment";

export default function MusicList(props) {
  const [durations, setDurations] = React.useState('');

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
  
  return (
    <div className="relative">
      <div className="flex bg-gray-50 rounded-xl p-2 border border-gray-100 w-11/12">
        <div className="relative flex-none w-16 h-16 overflow-hidden rounded-xl bg-gray-300 mr-3">
          <Image src={props.music.snippet.thumbnails.medium.url} layout="fill" objectFit="cover" />          
        </div>
        <audio id={'player'+props.music.id.videoId}>
          <source src={'/api/stream?id='+props.music.id.videoId} />
        </audio>
        <div className="w-7/12">
          <p className="font-bold text-sm">{props.music.snippet.title}</p>
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
        {props.action == 'save' && <div className="flex w-16 h-14 items-center justify-center rounded-xl bg-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>}
      </div>
    </div>
  );
}
