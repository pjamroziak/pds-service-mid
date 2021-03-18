import { TpaToPersonalDataConverter } from "../src/convert/tpa.convert";
import { PersonalDataModel } from "../src/models/personalData.model";
import { TpaModel } from "../src/models/tpaGorest.model";
import { validate } from "uuid";

const tpaModel_Correct: TpaModel = {
    id:         2,
    name:       "Patricia",
    email:      "patricia1234@gmail.com",
    gender:     "Female",
    status:     "Active",
    created_at: "2020-11-12T03:50:03.796+05:30",
    updated_at: "2020-11-12T18:32:57.530+05:30"
}
const tpaModel_UncorrectEmail: TpaModel = {
    id:         2,
    name:       "Patricia",
    email:      "patricia123mail.com",
    gender:     "Female",
    status:     "Active",
    created_at: "2020-11-12T03:50:03.796+05:30",
    updated_at: "2020-11-12T18:32:57.530+05:30"
}

const personalDataModel_Correct: PersonalDataModel = new PersonalDataModel(
    "Patricia",
    "patricia1234@gmail.com",
    "patricia1234",
    "Active",
);

test("TpaToPersonalDataConverter create PersonalDataModel from correct TpaModel", () => {
    const tpaConverter: TpaToPersonalDataConverter = new TpaToPersonalDataConverter();
    const result: PersonalDataModel = tpaConverter.convert(tpaModel_Correct);
    
    expect(result).toBeDefined();
    expect(result.name).toEqual(personalDataModel_Correct.name);
    expect(result.email).toEqual(personalDataModel_Correct.email);
    expect(result.login).toEqual(personalDataModel_Correct.login);
    expect(result.status).toEqual(personalDataModel_Correct.status);
});

test("TpaToPersonalDataConverter don't create PersonalDataModel from uncorrect TpaModel", () => {
    const tpaConverter: TpaToPersonalDataConverter = new TpaToPersonalDataConverter();
    let personalData: PersonalDataModel | undefined = undefined;

    expect(() => {
        personalData = tpaConverter.convert(tpaModel_UncorrectEmail);
    }).toThrow(Error);

    expect(personalData).toBeUndefined();
});

test("check if UUID is creating properly", () => {
    expect(validate(personalDataModel_Correct.uuid)).toBe(true);
});