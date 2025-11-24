import { NewPatientEntry } from "./type";
 
const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseGender = (gender: unknown): GenderType => {
  if (!gender || !isString(gender) || !Object.values(GenderType).includes(gender as GenderType)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender as GenderType;
};  

const parseOccupation = (occ: unknown): string => {
  if (!occ || !isString(occ)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occ;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (typeof object !== "object" || object === null) {
    throw new Error("Incorrect or missing data");
  }

  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){   
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
}

export enum GenderType {
  Male = "male",
  Female = "female",
  Other = "other"
} 
