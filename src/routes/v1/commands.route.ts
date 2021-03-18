import express, { Response } from "express";
import { createValidator, ValidatedRequest } from "express-joi-validation";

import { CommandsController } from "../../controllers/commands.controller";
import { PersonalDataModel } from "../../models/personalData.model";
import { getRunCmdObjectSchema, RunCmdModel, RunCmdRequestSchema } from "../../models/runCmdRequest.model";
import { TpaModel } from "../../models/tpaGorest.model";

export const commandsRouter = express.Router();

const validator = createValidator();
const commandController = new CommandsController();

commandsRouter.post(
    "/commands/run", 
    validator.body(getRunCmdObjectSchema),
    async (req: ValidatedRequest<RunCmdRequestSchema>, res: Response) => {
        const requestBody: RunCmdModel = req.body as RunCmdModel;
        try {
            const tpaModel: TpaModel = await commandController.fetchTpaModel(requestBody);
            const personalDataModel: PersonalDataModel = await commandController.convertTpaModel(tpaModel);
    
            const isTaskPublished: boolean = await commandController.publishTask(personalDataModel);
            
            const responseStatusCode: number = isTaskPublished ? 201 : 403;
            res.status(responseStatusCode).send();
        }
        catch(error) {
            res.status(500).send("Server Error");
        }
    }
)