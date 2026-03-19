import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login (){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message); // shows "Invalid credentials"
            return;
            }

        localStorage.setItem("token", data.token);

       

        navigate("/home");

    }

    return (
        <div>
            <h1>LOGIN TO THE SITE:</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/> <br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/><br />
                <button type="submit">LOGIN</button>
            </form>
            <p>Don't have an account?</p> <Link to="/signUp"> REGISTER HERE!</Link>
        </div>
    )
}