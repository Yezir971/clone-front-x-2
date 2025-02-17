import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { URL } from "../utils/constant/url";
import { useParams, useRouter } from "next/navigation";

const Profil = () => {

//    const [users, setUsers] = useState([]);
//    const [userId, setUserId] = useState(null);
//    useEffect(() => {
//         const fetchUser = async () => {
//             const [usersRes, userConnectedRes] = await Promise.all([
//                 fetch(URL.API_USERS_GET),
//                 fetch(URL.API_USER_GET)
//             ]);
//             if (!usersRes.ok || !userConnectedRes.ok) {
//                 throw new Error("Une erreur a été rencontrée lors de la récupération des données");
//             }
//             const usersData = await usersRes.json();
//             const userConnectedData = await userConnectedRes.json();
//             setUsers(usersData.user);
//             setUserId(userConnectedData.user._id);
//         }
//         fetchUser();
//    }, []);
//    console.log('users : ', users);
//    const usersSelected = users.filter((user) => user._id != userId);
//    console.log("selected : ",usersSelected)

    const [users, setUsers] = useState([]);
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(URL.API_USERS_GET);
            if(!res.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await res.json();
            console.log(data);
            setUsers(data.user);
            return data;
        }
        fetchUsers();
    }, []);
    console.log('users: ', users);
    console.log('id :', id);
    const thisUser = users.filter((user) => id === user._id);
    console.log("thisAll: ",thisUser[0]?._id);
    console.log("this: ",thisUser[0]?.username);
    return(
        <>
            <div className="bg-gray-800 shadow-lg rounded-2xl p-6">
                <div className="relative h-40 bg-slate-700 rounded-t-2xl">
                    <img 
                        src={thisUser[0]?.baniere}
                        alt="banner"
                        className="h-40 w-full rounded-t-2xl"
                    />
                    <div className="absolute -bottom-12 left-4 w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                        <img 
                        src={thisUser[0]?.avatar}
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>
                <div className="mt-14 px-4">
                <h1 className="text-2xl font-bold text-[#ececec]">{thisUser[0]?.username}
                    <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-[#16DB65] rounded-full">
                    <svg className="w- h-" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                    <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                    </svg>
                    <span className="sr-only">Icon description</span>
                    </span>
                </h1>
                <p className="text-[#9b9a9a]">@{thisUser[0]?.username}</p>
                <p className="mt-2 text-[#c9c8c8]">{thisUser[0]?.description}</p>
                <div className="mt-3 flex space-x-4 text-[#acacac]">
                    <span><strong>500</strong> Following</span>
                    <span><strong>1.2K</strong> Followers</span>
                </div>
                </div>
                <div className="mt-4 flex justify-end">
                <Link href={'/update-profil'} className="bg-[#16DB65] text-gray-800 hover:bg-[#058C42] px-4 py-2 rounded-xl flex justify-center items-center gap-2" >
                    <FaPen />
                    Modifier
                </Link>
                </div>
            </div>
        </>
    );

}

export default Profil;