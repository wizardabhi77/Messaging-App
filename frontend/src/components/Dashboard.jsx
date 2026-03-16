import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard () {

    const [userData, setUserData] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        async function getUser () {

            const token = localStorage.getItem("token");
            
            const res = await fetch("http://localhost:5000/user/",{
                method: "GET",
                headers : {
                    "Content-Type": "application/json",
                    Authorization : token
                }
            });

            const user = await res.json();

            setUserData(user);
        }

       getUser();

       async function getFriendsList() {

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/users",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        });

        const data = await res.json();

        setFriendsList(data);
       }

       getFriendsList();

    }, [])

    async function handleChat(user2Id) {

        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5000/chat/${user2Id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })

        const chat = await res.json();

        navigate(`/chat/${chat.id}/${user2Id}`);
    }

    function handleLogOut(){

        localStorage.removeItem("token");
        navigate("/");
    }


    return (
        <div>
            { userData? 
            (<div>
                <h1>WELCOME DED DIMAAK {userData.username}</h1>
                <button onClick={()=> navigate("/profile")}>VIEW PROFILE</button>
                <ul>
                    {friendsList.filter((user)=> user.username != userData.username).map((friend)=>{
                        
                        return (
                            <li key={friend.id}>
                                <h2>{friend.username}</h2>
                                <button onClick={()=> handleChat(friend.id)}>CHAT</button>
                            </li>
                        )
                    })}
                </ul>

                <button onClick={handleLogOut}>LOGOUT</button>
             </div>
            ):
            (<p>Loading...</p>)
            }
        </div>
    )
}