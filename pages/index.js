import Head from 'next/head';
import FooterMenu from '../components/FooterMenu';
import Search from '../components/Search';

export default function Home() {
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
          <div className="relative">
            <div className="flex bg-gray-50 rounded-xl p-2 border border-gray-100 w-11/12">
              <div className="w-16 h-16 rounded-xl bg-gray-300 mr-3"></div>
              <div className="flex-grow">
                <p className="font-bold">Losing My Religion</p>
                <p className="text-sm text-orange-500">R.E.M</p>
                <p className="text-sm text-gray-500">15 Mei 2009 • 5.02min</p>
              </div>
            </div>
            <div className="absolute right-0 top-3">
              <div className="flex w-16 h-14 items-center justify-center rounded-xl bg-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-none h-12 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="flex-none h-12 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> */}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex bg-gray-50 rounded-xl p-2 border border-gray-100 w-11/12">
              <div className="w-16 h-16 rounded-xl bg-gray-300 mr-3"></div>
              <div className="">
                <p className="font-bold">Losing My Religion</p>
                <p className="text-sm text-orange-500">R.E.M</p>
                <p className="text-sm text-gray-500">15 Mei 2009 • 5.02min</p>
              </div>
            </div>
            <div className="absolute right-0 top-3">
              <div className="flex w-16 h-14 items-center justify-center rounded-xl bg-orange-500">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="flex-none h-12 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-none h-12 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>      
      <FooterMenu activeMenu="home" />
    </>
  );
}
