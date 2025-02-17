import { useEffect, useState } from "react";
import { URL } from "../utils/constant/url";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUsersInfos = async () => {
            const [usersRes, userConnectedRes] = await Promise.all([
                fetch(URL.API_USERS_GET),
                fetch(URL.API_USER_GET)
            ]);
            if (!usersRes.ok || !userConnectedRes.ok) {
                throw new Error("Une erreur a été rencontrée lors de la récupération des données");
            }
            const usersData = await usersRes.json();
            const userConnectedData = await userConnectedRes.json();
            setUsers(usersData.user);
            setUserId(userConnectedData.user._id);
            console.log("users: ",users);
            console.log("userID: ",userId);
        }
        fetchUsersInfos();
    }, []);
    const otherUsers = users.filter((user) => user._id != userId);
    console.log("others: ",otherUsers);
    return (
        <>
            <h2>Vous connaissez peut-être :</h2>
            <ul>
                {otherUsers.map(otherUser => (
                    <li key={otherUser._id}><a href={`/user/${otherUser._id}`}>{otherUser.username}</a></li>
                ))}
            </ul>
        </>
    );
}

export default UserList;