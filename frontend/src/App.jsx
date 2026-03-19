
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Dashboard from './components/Dashboard.jsx';
import Chat from './components/Chat.jsx';
import Profile from './components/Profile.jsx';

function App() {
 

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/> 
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/home" element={<Dashboard />}/>
        <Route path="/chat/:chatId/:rid" element={<Chat />}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
