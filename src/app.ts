import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('App listen on ' + process.env.EXPRESS_PORT);
})