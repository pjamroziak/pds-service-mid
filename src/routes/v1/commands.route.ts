import express, { Response } from "express";
import { createValidator, ValidatedRequest } from "express-joi-validation";
import { getRunCmdObjectSchema, RunCmdRequestSchema } from "./schemas/runCmdRequestSchema.model";

export const commandsRouter = express.Router();

const validator = createValidator();

commandsRouter.post(
    "/commands/run", 
    validator.body(getRunCmdObjectSchema()),
    async (req: ValidatedRequest<RunCmdRequestSchema>, res: Response) => {

        res.status(201).send();
    }
)