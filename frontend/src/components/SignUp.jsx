import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp () {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

       await fetch("https://messaging-app-zb2w.onrender.com/signUp",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })       
        });

        navigate("/");
    }
    
    return (
        <div>
            <h1>SIGN UP FOR THE SITE:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/> <br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/><br />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/> <br />
                <button type="submit">SIGN UP</button>
            </form>
        </div>
    )
}