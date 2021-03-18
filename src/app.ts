import express from "express"
import dotenv from "dotenv"
import { commandsRouter } from "./routes/v1/commands.route";

dotenv.config();

const app = express();
const appBaseUrl: string = process.env.EXPRESS_ROUTE_BASE  + "/" + process.env.EXPRESS_ROUTE_VERSION;

app.use(express.json());
app.use(appBaseUrl, commandsRouter);

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('App listen on ' + process.env.EXPRESS_PORT);
});