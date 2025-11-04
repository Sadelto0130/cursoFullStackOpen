import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config' 
import './mongo.js'
import {Phonebook} from './models/persons.js';


const app = express()
app.use(express.json());
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));

app.get('/', (req, resp) => {
  resp.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, resp) => {
  Phonebook.find({}).then(persons => {
    resp.json(persons)
  })
})

app.get('/api/persons/:id', (req, resp) => {
  const id = req.params.id
  Phonebook.findById(id)
    .then(person => { resp.json(person)})
    .catch(err => console.log("Error:", err))
})

app.delete('/api/persons/:id', (req, resp) => {
  const id = req.params.id
  Phonebook.findByIdAndDelete(id)
    .then(() => {
      resp.status(204).end()
    })
    .catch(err => {
      console.error('Error deleting person:', err.message)
      resp.status(400).json({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (req, resp) => {
  const {name, number} = req.body

  if (!name || !number) {
    return resp.status(400).json({ 
      error: 'data missing' 
    })
  }

  Phonebook.findOne({name})
    .then(existName => {
      if(existName) {
        return resp.status(400).json({
          error: 'name must be unique'
        })
      }

      const person = new Phonebook({
        name: name,
        number: number
      })
    
      person.save().then(savePerson => {
        resp.json(person)
      })
    })

})

app.get('/info', (req, resp) => {
  const infoPhone = persons.length
  const date = new Date()
  
  resp.send(`
    <p>Phonebook has info for ${infoPhone} people</p>
    <p>${date}</p>
  `)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
