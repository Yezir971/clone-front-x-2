import { useEffect, useState } from "react";
import { URL } from "../utils/constant/url";

const UserList = () => {
    const [users, setUsers] = useState([])
        useEffect(() => {
            const fetchUsers = async () => {
                console.log(URL.API_USERS_GET);
                const res = await fetch(URL.API_USERS_GET);
                if(!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await res.json();
                console.log('data: ', data);
                setUsers(data.user);
                return data;
            }
            fetchUsers();  
        }, []);
        console.log('users :', users);
    return (
        <>
        <h2>Vous connaissez peut-être :</h2>
        <ul>
            {users.map(user => (
                <li key={user._id}><a>{user.username}</a></li>
            ))}
        </ul>
        </>
    );
}

export default UserList;