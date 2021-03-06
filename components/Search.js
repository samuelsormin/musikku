export default function Search({ placeholder, query, setQuery, handleSearch }) {
  return(    
    <div className="relative">
      <div className="absolute left-2 top-2.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <form onSubmit={handleSearch}>
        <input type="text"
          placeholder={placeholder}
          className="w-full border outline-none pl-10 pr-3 py-2 rounded-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}
