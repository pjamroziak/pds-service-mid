import { v4 as uuidv4 } from "uuid"

export class PersonalDataModel {
    private _uuid   : string;
    private _name   : string;
    private _email  : string;
    private _login  : string;
    private _status : string;
    
    constructor(name: string, email: string, login: string, status: string) {
        this._uuid = uuidv4();
        this._name = name;
        this._email = email;
        this._login = login;
        this._status = status;
    }

    get uuid()  : string { return this._uuid; }
    get name()  : string { return this._name; }
    get email() : string { return this._email; }
    get login() : string { return this._login; }
    get status(): string { return this._status; }

    public toJSON(): string {
        return JSON.stringify({
            uuid:   this._uuid,
            name:   this._name,
            email:  this._email,
            login:  this._login,
            status: this._status
        });
    }

}