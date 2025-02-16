"use client";
import { useRouter } from "next/navigation";
import SideBar from "../components/sideBar";
import SearchBar from "../components/searchBar";

const Search = () => {
    return(
        <>
            <SideBar />
            <div className="m-4 flex-1 flex flex-col sm:ml-64">
                <SearchBar />
            </div>
        </>
    );
}

export default Search;