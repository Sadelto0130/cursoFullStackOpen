import { Router } from "express";
import patientServices from "../services/patientServices";
import { toNewPatientEntry } from "../utils";

const router = Router()

router.get('/patients', (_req, res) => {
  res.send(patientServices.getPatients());
})

router.get('/patients/:id', (req, res) => {
  const patient = patientServices.getPatientById(req.params.id);

  if(patient){
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/patients', (req, res) => {
  const newPatient = toNewPatientEntry(req.body);
  const addedPatient = patientServices.addPatient(newPatient);
  res.json(addedPatient);
})

export default router;
