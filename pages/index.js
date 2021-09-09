import React from "react";
import Head from "next/head";
import FooterMenu from "../components/FooterMenu";
import Search from "../components/Search";
import MusicList from "../components/MusicList";
import AudioHandler from "../helpers/AudioHandler";

export async function getServerSideProps(context) {  
  const res = await fetch("https://6139752e1fcce10017e78afb.mockapi.io/api/v1/musics")
  .then(response => response.json());
  const musics = res;

  return {
    props: { musics }
  }
}

export default function Home({musics}) {
  const [playerHandler, controlObj, setControlObj] = AudioHandler();
  
  return (
    <>
      <Head>
        <title>Musikku</title>
        <meta name="description" content="Musikku App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-md mx-auto min-h-screen">
        <div className="mx-5 pt-5">
          <h1 className="text-2xl font-bold">Downloaded musics</h1>
        </div>
        <div className="mx-5 pt-5">
          <Search placeholder="Search downloaded musics" />
        </div>
        <div className="mx-5 pt-8 space-y-3">          
          {musics ? musics.map((result, index) => (
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
      <FooterMenu activeMenu="home" />
    </>
  );
}
