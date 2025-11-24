import data from "../../data/diagnoses";
import { Diagnose } from "../type";

const getDiagnoses = (): Diagnose[] => {
  return data;
}

export default {
  getDiagnoses
};