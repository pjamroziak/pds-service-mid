import { PersonalDataModel } from "../models/personalData.model";
import { TpaModel } from "../models/tpaGorest.model";

const INDEX_NOT_FOUND: number = -1;

export const convertTpaModelToPersonalData = (tpaModel: TpaModel): PersonalDataModel | null => {
    const loginFromTpaModel: string = createLoginFromEmailAddress(tpaModel.email);
    if(loginFromTpaModel !== "") {
        return new PersonalDataModel(
            tpaModel.name,
            tpaModel.email,
            loginFromTpaModel,
            tpaModel.status
        );
    }
    else {
        return null;
    }
}

const createLoginFromEmailAddress = (email: string): string => {
    const indexOfAtSign: number = email.indexOf("@");
    if(indexOfAtSign != INDEX_NOT_FOUND) {
       return email.substring(0, indexOfAtSign); 
    }
    
    return "";
}

