import Joi from "joi";
import { Requester } from "./requester";
import fetch from "node-fetch"

export class HttpRequester implements Requester {

    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    async get<T>(id: number, validScheme: Joi.ObjectSchema<any>): Promise<T> {
        return fetch(this.url + id)
                .then(response => response.json())
                .then(json => validScheme.validateAsync(json.data))
                .then(validateResult => {
                    if(validateResult.error == undefined) {
                        return validateResult as T;
                    }
                    throw new Error(validateResult.error);
                })
                .catch((reason) => {
                    throw new Error(reason);
                });
    }
}