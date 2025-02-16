const SearchBar = () => {
    return(
        <>
            <form className="max-w-md mx-auto">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <input type="search" id="default-search" className="block w-96 py-4 ps-4 text-sm text-[#ececec] border-2 border-[#16DB65] rounded-full bg-[#181818] focus:bg-[#1f1f1f] focus:ring-[#16DB65] focus:outline-none focus:ring-2" placeholder="Rechercher" required />
                    <button type="submit" className="text-[#ececec] absolute end-0 bottom-0.5 bg-[#16DB65] hover:bg-[#058C42] focus:ring-4 focus:outline-none font-medium px-6 py-4 rounded-full">
                        <svg className="w-5 h-5 text-[#ececec]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                </div>
            </form>
        </>
    );
}

export default SearchBar;