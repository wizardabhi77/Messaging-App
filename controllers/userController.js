
import db from '../script.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function postLogin(req, res) {

    const {username, password } = req.body;

    const user = await db.findUser(username);

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        return res.status(404).json({message:"Wrong password"});
    }

    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.json({
        token: "Bearer " + token
    });
}

async function postUser(req, res) {

    console.log("BODY:", req.body);

    const {username, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.createUser(username, hashedPassword);

    res.json(user);
}

async function postChat(req, res) {

    const user1Id = req.user.id;
    const { user2Id } = req.params;

    const chat = await db.createChat(user1Id, user2Id);

    res.json(chat);
}

async function postMessage(req, res) {

    const userId = req.user.id;
    const { chatId } = req.params;
    const { text } = req.body;

    const message = await db.createMessage(text, userId, chatId);

     res.json(message);
}

async function getChat (req, res) {

    const chatId = req.params.chatId;

    const messages = await db.findChatMessages(chatId);

    res.json(messages);
}

async function getUser (req, res) {

    const userId = req.user.id;

    const user = await db.findUserById(userId);

    res.json(user);
}

async function getAllUsers(req, res) {
    
    const users = await db.findAllUsers();

    res.json(users);
}

async function getReciever (req, res) {
    
    const recieverId = req.params.rid;
    
    const reciever = await db.findUserById(recieverId);

    res.json(reciever);

}

async function updateUser (req, res) {

    const {username, password } = req.body;

   const hashedPassword = await bcrypt.hash(password, 10);

    const userId = req.user.id;

    const user = await db.updateUser(userId, username, hashedPassword);

    res.json(user);
}


export default {
    postUser,
    postLogin,
    postChat,
    postMessage,
    getChat,
    getUser,
    getAllUsers,
    getReciever,
    updateUser
}