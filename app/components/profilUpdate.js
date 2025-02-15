"use client"

import { FaFloppyDisk } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { URL } from "../utils/constant/url";

const UpdateProfileForm = () => {

    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchUsers = async () => {
            console.log(URL.API_USER_GET);
            const res = await fetch(URL.API_USER_GET);
            if(!res.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await res.json();
            setUser(data.user);
            return data;
        }
        fetchUsers();  
    }, []);

    const updateUser = async () => {
    try {
        const res = await fetch("/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "NouveauNom",
            }),
        });

        const data = await res.json();
        console.log("Utilisateur mis à jour:", data);
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
    }
};

// Exécution de la mise à jour
updateUser();


    return (
        <>
            <div className="max-w-2xl mx-auto p-4">
                <form className="bg-gray-800 shadow-lg rounded-2xl p-6">
                    {/* Header Section */}
                    <div className="relative h-40 bg-slate-700 rounded-t-2xl">
                        <img 
                            src={user.baniere}
                            alt="banner"
                            className="h-40 w-full rounded-t-2xl"
                        />
                        <div className="absolute -bottom-12 left-4 w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                            <img 
                            src={user.avatar}
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                    
                    {/* Profile Info */}
                    <div className="mt-14 px-4">
                        <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-[#16DB65] rounded-full">
                            <svg className="w- h-" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                            <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                            </svg>
                            <span className="sr-only">Icon description</span>
                        </span>
                        <div className="flex flex-col relative">
                            <label htmlFor="username" className="hidden">Modifier le nom d'utilisateur:</label>
                            <input type="text" name="username" id="username" placeholder={user.username} className="bg-gray-800 border-2 border-gray-700 w-96 rounded-md focus:outline-none focus:ring-2 focus:ring-[#16DB65] text-[#ececec] px-2"/>
                            <div className="absolute bottom-[5px] right-[184px] text-gray-500">
                                <FaPen />
                            </div>
                        </div>

                    <p className="text-[#9b9a9a]">@{user.username}</p>
                    <div className="flex flex-col relative">
                        <label htmlFor="username" className="hidden">Modifier la description:</label>
                        <input type="text" name="username" id="username" placeholder={user.description} className="bg-gray-800 border-2 border-gray-700 w-96 rounded-md focus:outline-none focus:ring-2 focus:ring-[#16DB65] text-[#ececec] px-2"/>
                        <div className="absolute bottom-[5px] right-[184px] text-gray-500">
                            <FaPen />
                        </div>
                    </div>
                    <div className="mt-3 flex space-x-4 text-[#acacac]">
                        <span><strong>500</strong> Following</span>
                        <span><strong>1.2K</strong> Followers</span>
                    </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="mt-4 flex justify-end">
                    <button className="bg-[#16DB65] text-gray-800 hover:bg-[#058C42] px-4 py-2 rounded-xl flex justify-center items-center gap-2 ">
                    <FaFloppyDisk />
                    Enregistrer
                    </button>
                    </div>
                </form>
            </div>
        </>
    );

}

export default UpdateProfileForm;