import React from "react";
import Head from 'next/head';
import FooterMenu from '../components/FooterMenu';
import Search from '../components/Search';
import MusicList from "../components/MusicList";

export default function Home() {  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(null);

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
            <MusicList music={result} key={result.id.videoId+index} />
          )):
            ''
          }
        </div>
      </main>
      <FooterMenu activeMenu="search" />
    </>
  );
}
