import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

import * as config from "../config"

export interface RunCmdModel {
    id: number
}

export interface RunCmdRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: number
    }
};

export const getRunCmdObjectSchema: Joi.ObjectSchema<RunCmdRequestSchema> = Joi.object({
        id: Joi.number().integer().min(config.JOI_VALID_ID_MIN).max(config.JOI_VALID_ID_MAX).required()
});
   