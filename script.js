
import { prisma } from './lib/prisma.js';


async function createUser(username, password) {

    const user = await prisma.users.create({
        data:{
            username: username,
            password: password 
        }
    });

    return user;
}

async function createMessage(text, uid, chatId){

    const message = await prisma.messages.create({
        data: {
            text: text,
            userId: uid,
            chatId: Number(chatId)
        }
    });

    return message;
}

async function createChat(uid1, uid2){

    uid2 = Number(uid2);

    const user1 = Math.min(uid1, uid2);
    const user2 = Math.max(uid1, uid2);

    const chat = await prisma.chat.findUnique({
        where: {
            user1Id_user2Id: {
                user1Id : user1,
                user2Id : user2
            }
            
        }
    });

    if(chat){
        return chat;
    }

    const newChat = await prisma.chat.create({
        data: {
            user1Id: user1,
            user2Id: user2
        }
    });

    return newChat;
}

async function findUser(username) {

    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    });

    return user;
}

async function findAllUsers(){

    const users = await prisma.users.findMany();

    return users;
}

async function findUserById(userId){

    const user = await prisma.users.findUnique({
        where: {
            id: Number(userId)
        },
        include: {
            messages : true
        }
    });

    return user;
}

async function findChatMessages(chatId) {
    const messages = await prisma.messages.findMany({
        where: {
            chatId : Number(chatId),
        }
    });

    return messages;
}

async function updateUser(userId, username, password) {
    const user = await prisma.users.update({
        where : {
            id : userId
        },
        data: {
            username : username,
            password : password
        }
    });

    return user;
}

export default {
    createUser,
    createMessage,
    createChat,
    findChatMessages,
    findUser,
    findUserById,
    findAllUsers,
    updateUser
}
