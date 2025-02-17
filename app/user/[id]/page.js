"use client";
import SideBar from "@/app/components/sideBar";
import Profil from "@/app/components/user";

export default function User() {
    return(
        <>
            <SideBar />
            <div className="m-4 flex-1 flex flex-col sm:ml-64">
                <Profil />
            </div>
        </>
    );
}