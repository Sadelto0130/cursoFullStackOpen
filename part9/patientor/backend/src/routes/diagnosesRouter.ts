import { Router } from "express";
import diagnosesServices from "../services/diagnosesServices";

const router = Router()

router.get('/diagnoses', (_req, res) => {
  res.send(diagnosesServices.getDiagnoses());
});

export default router;