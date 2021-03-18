import { PersonalDataModel } from "../models/personalData.model";
import { TpaModel } from "../models/tpaGorest.model";
import { Converter } from "./converter";

export class TpaToPersonalDataConverter implements Converter<TpaModel, PersonalDataModel> {

    INDEX_NOT_FOUND: number = -1;

    convert(model: TpaModel): PersonalDataModel {
        const loginFromTpaModel: string = this.createLoginFromEmailAddress(model.email);
        if(loginFromTpaModel !== "") {
            return new PersonalDataModel(
                model.name,
                model.email,
                loginFromTpaModel,
                model.status
            );
        }
        else {
            throw new Error("can't extract login from email addreess");
        }
    }

    private createLoginFromEmailAddress(email: string): string {
        const indexOfAtSign: number = email.indexOf("@");
        if(indexOfAtSign != this.INDEX_NOT_FOUND) {
           return email.substring(0, indexOfAtSign); 
        }
        
        return "";
    }
}

