import express from "express"
import { commandsRouter } from "./routes/v1/commands.route";
import * as config from "./config";

const app = express();

app.use(express.json());
app.use(config.EXPRESS_ROUTE_BASE + config.EXPRESS_ROUTE_VERSION, commandsRouter);

app.listen(config.EXPRESS_PORT, () => {
    console.log('App listen on ' + config.EXPRESS_PORT);
});