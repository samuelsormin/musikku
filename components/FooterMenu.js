import Link from 'next/link';

export default function FooterMenu({ activeMenu }) {
  return(    
    <footer className="fixed w-full left-0 bottom-5">
    <div className="flex justify-center">
      <div className="bg-orange-500 rounded-full px-5 py-3">
        <div className="flex space-x-5">
          <Link href="/">
            <div className={activeMenu == 'home' ? 'text-gray-100' : 'text-orange-900'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            </div>
          </Link>
          <Link href="/search">
            <div className={activeMenu == 'search' ? 'text-gray-100' : 'text-orange-900'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </footer>
  );
}
