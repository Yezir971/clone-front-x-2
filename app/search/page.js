"use client";
import { useRouter } from "next/navigation";
import SideBar from "../components/sideBar";
import SearchBar from "../components/searchBar";
import UserList from "../components/userList";

const Search = () => {
    return(
        <>
            <SideBar />
            <div className="m-4 flex-1 flex flex-col sm:ml-64">
                <SearchBar />
                <UserList />
            </div>
        </>
    );
}

export default Search;