import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter';
import patientRouter from './routes/patientRouter';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('pinged');
  res.send('pong') 
})

app.use('/api', diagnosesRouter)
app.use('/api', patientRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})