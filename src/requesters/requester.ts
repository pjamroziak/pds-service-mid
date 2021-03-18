import Joi from "joi";

export interface Requester {
    get<T>(id: number, validScheme: Joi.ObjectSchema<any>): Promise<T>;
}