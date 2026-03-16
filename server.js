
import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRouter from './Routers/userRouter.js';
import passport from 'passport';
import passportConfig from './config/passport.js'

const server = express();


server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(cors());

server.use(passport.initialize());
passportConfig(passport);

server.use("/", userRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err)=> {
    if(err){
        throw new Error(err.message);
    }

    console.log("running the server at PORT:",PORT);
})