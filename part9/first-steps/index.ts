import express from "express";
import { argumentsBmi, calculatorBmi } from "./bmiCalculator";
import { argumentsValue, calculateExercise } from "./calculateExercises";

const app = express()
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
})

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;

  if(!height || !weight) {
    res.status(401).send({error: "malformatted parameters"});
  }

  const {value1, value2} = argumentsBmi(['', '', String(weight), String(height)]);
  const respuBack = calculatorBmi(value1, value2);

  res.status(200).send({
    weight: weight,
    height: height,
    bmi: respuBack.classification
  })
})

app.post('/exercise', (req, res) => {
  const {daily_exercises, targetHour} = req.body

  if(daily_exercises === undefined || targetHour === undefined) {
    return res.status(401).send({error: "parameters missing"})
  }

  const {hours, target} = argumentsValue(daily_exercises, targetHour)
  const resp = calculateExercise(target, hours)

  return res.status(200).send({resp})
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})