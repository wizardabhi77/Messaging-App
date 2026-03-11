
import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRouter from './Routers/userRouter.js';

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use("/", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err)=> {
    if(err){
        throw new Error(err.message)
    }

    console.log("running the server at PORT:",PORT);
})