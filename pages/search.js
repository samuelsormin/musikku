import React from "react";
import Head from 'next/head';
import FooterMenu from '../components/FooterMenu';
import Search from '../components/Search';
import MusicList from "../components/MusicList";
import AudioHandler from "../helpers/AudioHandler";

export default function SearchPage() {  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(null);
  const [playerHandler, controlObj, setControlObj] = AudioHandler();

  const handleSearch = async (e) => {
    e.preventDefault();
    setControlObj({
      id: '',
      prevId: '',
      isPlaying: false
    });

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
        <div className="mx-5 pt-6 pb-28 space-y-3">
          {searchResult && <p className="text-sm text-gray-500">Showing top 10 results for <strong className="text-black">"{searchQuery}"</strong></p>}
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
