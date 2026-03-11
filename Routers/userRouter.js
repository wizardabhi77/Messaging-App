
import { Router } from 'express';
import userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get("/", (req,res) => res.send("ok"));

userRouter.post("/signUp", userController.postUser);
userRouter.post("/chat/:user2Id", userController.postChat);
userRouter.post("/message/:chatId", userController.postMessage);

userRouter.get("/Chat/:chatId", userController.getChat);




export default userRouter;