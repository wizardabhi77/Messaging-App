
import db from '../script.js';
import bcrypt from 'bcryptjs';

async function postUser(req, res) {

    const {username, password} = req.body;

    const hashedPassword = await bcrypt(password, 10);

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

export default {
    postUser,
    postChat,
    postMessage,
    getChat
}