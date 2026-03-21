import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Chat() {

    const { chatId, rid } = useParams();

    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const [receiver, setReceiver] = useState(null);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(()=> {

        try {
             async function getReceiver() {
            
            const res = await fetch(`https://messaging-app-zb2w.onrender.com/reciever/${rid}`, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            
            const data = await res.json();

            
            setReceiver(data);
        }

        getReceiver();

        async function getAllMessages() {

            const res = await fetch(`https://messaging-app-zb2w.onrender.com/chat/${chatId}`,{
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            setMessages(data);
        }

        getAllMessages();
        }catch(error) {
            console.log(error);
        }
       
    }, [chatId, token, rid])

    async function handleMessage(e) {
        e.preventDefault();

        const res = await fetch(`https://messaging-app-zb2w.onrender.com/message/${chatId}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                text: text
            })
        });

        const data = await res.json();

        setMessages((prev) => [...prev, data]);

        setText("");
  
    }
    return (
        <div className="chat">
            <h1>{receiver? receiver.username : "Loading..."}</h1>
            <ul>
                {messages.map((message)=> {

                    const sentBy = message.userId != rid ? "sent" : "recieved";
                return (
                    <li key={message.id} className={sentBy}>
                        <h3>{message.text}</h3>
                        <p>sent By: {message.userId != rid ? "you" : receiver.username} at {new Date(message.sentAt).toLocaleTimeString()}</p>
                    </li>
                )
                })}
            </ul> <br />
            
            <form onSubmit={handleMessage}>
                <input type="text" name="text" value={text} onChange={(e)=> setText(e.target.value)}/>
                <button>SEND</button>
            </form> <br />

                <button onClick={()=> navigate("/home")}>BACK TO HOME</button>
        </div>
        
        
    )
}