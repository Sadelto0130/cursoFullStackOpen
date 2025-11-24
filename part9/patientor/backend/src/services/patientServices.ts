import { v4 as uuidv4 } from 'uuid';
import patientData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatientEntry } from "../type";

const getPatients = (): NonSensitivePatient[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation, 
    entries
  }));
}

const getPatientById = (id: string): Patient | undefined => {
  const data = patientData.find(patient => patient.id === id);
  
  if (!data) return undefined;

  return {
    ...data,
    entries: data.entries || []
  }
}

const addPatient= (newPatient: NewPatientEntry): Patient => {
  const newPatientWithId = {
    id : uuidv4(),
    ...newPatient
  };
  patientData.push(newPatientWithId);
  return newPatientWithId;
}

export default {
  getPatients,
  getPatientById,
  addPatient
};