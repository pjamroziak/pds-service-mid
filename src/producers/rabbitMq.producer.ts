import amqplib, { Channel, Connection } from "amqplib";
import { PersonalDataModel } from "../models/personalData.model";

export class RabbitMqProducer {

    private connectionUrl: string;
    private queueName: string;

    private connection!: Connection;
    private channel!: Channel;
    private initied: boolean;

    constructor(connectionUrl: string, queueName: string) {
        this.connectionUrl = connectionUrl;
        this.queueName = queueName;
        this.initied = false;
    }

    isInitied():boolean { return this.initied };

    async init(): Promise<boolean> {
        try {
            this.connection = await this.startConnection();
            this.channel = await this.createChannel();
            await this.assertQueue();

            this.initied = true;
        }
        catch(err) {
            this.initied = false;
        }

        return this.initied;
    }

    addToQueue(model: PersonalDataModel): boolean {
        return this.channel.sendToQueue(this.queueName, Buffer.from(model.toJSON()), { persistent: true});
    }

    private async startConnection(): Promise<Connection> {
        return await amqplib.connect(this.connectionUrl);
    }

    private async createChannel(): Promise<Channel> {
        return await this.connection.createChannel();
    }

    private async assertQueue() {
        await this.channel.assertQueue(this.queueName, { durable: true });
    }
}