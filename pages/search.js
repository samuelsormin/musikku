import React from "react";
import Head from 'next/head';
import FooterMenu from '../components/FooterMenu';
import Search from '../components/Search';
import MusicList from "../components/MusicList";

const audioHandler = () => {
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

  return [playerHandler, controlObj];
}

export default function SearchPage() {  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(null);
  const [playerHandler, controlObj] = audioHandler();

  const handleSearch = async (e) => {
    e.preventDefault();
    if(searchQuery != '') {
      try {
        const res = await fetch('/api/search-youtube?q='+searchQuery).then(response => response.json());
        setSearchResult(res.results);
        
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Search - Musikku</title>
        <meta name="description" content="Musikku App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-md mx-auto min-h-screen">
        <div className="mx-5 pt-5">
          <h1 className="text-2xl font-bold">Discover your musics</h1>
        </div>
        <div className="mx-5 pt-5">
          <Search
            placeholder="Search & download musics"
            query={searchQuery}
            setQuery= {setSearchQuery}
            handleSearch={handleSearch}
          />
        </div>       
        <div className="mx-5 pt-8 pb-28 space-y-3">
          {searchResult ? searchResult.items.map((result, index) => (
            <MusicList
             key={result.id.videoId+index}
             music={result}
             action="stream"
             controlObj={controlObj}
             playerHandler={playerHandler}
            />
          )):
            ''
          }
        </div>
      </main>
      <FooterMenu activeMenu="search" />
    </>
  );
}
