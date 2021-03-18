import * as config from "../config";

import { TpaToPersonalDataConverter } from "../convert/tpa.convert";
import { PersonalDataModel } from "../models/personalData.model";
import { TpaModel, TpaModelValidateScheme } from "../models/tpaGorest.model";
import { RunCmdModel } from "../models/runCmdRequest.model";
import { RabbitMqProducer } from "../producers/rabbitMq.producer";
import { HttpRequester } from "../requesters/http.requester";

export class CommandsController {

    private rabbitMqProducer: RabbitMqProducer;
    private httpRequester: HttpRequester;
    private tpaToPersonalDataConverter: TpaToPersonalDataConverter;

    constructor() {
        this.rabbitMqProducer = new RabbitMqProducer(
            config.RABBIT_MQ_CONNECTION_URL,
            config.RABBIT_MQ_QUEUE_NAME
        )
        this.httpRequester = new HttpRequester(config.TPA_USER_URL);
        this.tpaToPersonalDataConverter = new TpaToPersonalDataConverter();
        
        try { 
            this.rabbitMqProducer.init();
            console.log("RabbitMqProducer initied");
        }
        catch(err) {
            console.log("RabbitMqProducer not initied!");
            throw new Error("RabbitMqProducer isn't initied");
        }
    }

    async publishTask(personalDataModel: PersonalDataModel): Promise<boolean> {
        return this.rabbitMqProducer.addToQueue(personalDataModel);
    }

    async fetchTpaModel(runCmdModel: RunCmdModel): Promise<TpaModel> {
        return this.httpRequester.get(runCmdModel.id, TpaModelValidateScheme);
    }

    convertTpaModel(tpaModel: TpaModel): PersonalDataModel {
        return this.tpaToPersonalDataConverter.convert(tpaModel);
    }
}  
