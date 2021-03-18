import Joi from "joi";

export interface TpaModel {
    id          : number;
    name        : string;
    email       : string;
    gender      : string;
    status      : string;
    created_at  : string;
    updated_at  : string;
}

export const TpaModelValidateScheme = Joi.object({
    id:         Joi.number().required(),
    name:       Joi.string().required(),
    email:      Joi.string().required(),
    gender:     Joi.string().required(),
    status:     Joi.string().required(),
    created_at: Joi.string().required(),
    updated_at: Joi.string().required()
});