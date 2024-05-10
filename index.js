import express from 'express';
import cors from 'cors';
import fs from 'fs';
import mongoose from "mongoose";
import path from 'path';
import dotenv from 'dotenv'
import morgan from 'morgan';
import authController from './Controllers/authController.js'
import empController from './Controllers/employeeController.js';
const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



const connection = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log(err);
    })
}

connection();

app.use('/auth', authController);
app.use('/emp', empController);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on Port ${port}`);
})