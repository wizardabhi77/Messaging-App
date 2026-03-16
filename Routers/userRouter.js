
import { Router } from 'express';
import userController from '../controllers/userController.js';
import passport from 'passport';

const userRouter = Router();

const auth = passport.authenticate("jwt", {session : false});

userRouter.get("/", (req,res) => res.send("ok"));

userRouter.post("/signUp", userController.postUser);
userRouter.post("/chat/:user2Id", auth, userController.postChat);
userRouter.post("/message/:chatId", auth, userController.postMessage);
userRouter.post("/login", userController.postLogin);
userRouter.post("/edit/user",auth, userController.updateUser)

userRouter.get("/chat/:chatId", auth, userController.getChat);
userRouter.get("/user", auth, userController.getUser);
userRouter.get("/users", auth, userController.getAllUsers);
userRouter.get("/reciever/:rid", auth, userController.getReciever);



export default userRouter;