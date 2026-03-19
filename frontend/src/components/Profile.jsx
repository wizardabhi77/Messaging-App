import {useState, useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

export default function Profile () {

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [state, setState] = useState("view");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        async function getUserData() {

            const res = await fetch("https://messaging-app-zb2w.onrender.com/user", {
                method: "GET",
                headers: {
                     "Content-Type": "application/json",
                     Authorization : token
                }
               
            });

            const user = await res.json();

            console.log(user);
            setUser(user);
            setUsername(user.username);
            
        }

        getUserData();

    
    }, [token])

    

async function handleSubmit(e) {

        e.preventDefault();

        const res = await fetch("https://messaging-app-zb2w.onrender.com/edit/user",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization : token
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        setState("view");
    }

    if(!user) return <h1>LOADING...</h1>

    return (
        <div>

            {state == "view" ?
                (<div>
                    <h1>USERNAME: {user.username}</h1>
                <button onClick={()=> setState("edit")}>Edit</button> <br /> <br />
                </div>
                ) :
                (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/> <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
                    <button type='submit'>Submit</button>
                </form>
                )
             }
                
                
             <button onClick={()=> navigate("/home")}>BACK</button>
        </div>
    )
}