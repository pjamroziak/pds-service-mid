import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export interface RunCmdRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: number
    }
};

export const getRunCmdObjectSchema = (): Joi.ObjectSchema<RunCmdRequestSchema> => { 
    return Joi.object({
        id: Joi.number().integer().min(300).max(320).required()
    });
}
   