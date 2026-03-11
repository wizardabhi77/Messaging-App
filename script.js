
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
            chatId: chatId
        }
    });

    return message;
}

async function createChat(uid1, uid2){

    const chat = await prisma.chat.create({
        data: {
            user1Id: uid1,
            user2Id: uid2
        }
    });

    return chat;
}

async function findChatMessages(chatId) {
    const messages = await prisma.messages.findMany({
        where: {
            chatId : chatId,
        }
    });

    return messages;
}

export default {
    createUser,
    createMessage,
    createChat,
    findChatMessages,
}
