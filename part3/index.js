import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config' 
import './mongo.js'
import {Phonebook} from './models/persons.js';


const app = express()
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.get('/', (req, resp) => {
  resp.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, resp) => {
  Phonebook.find({}).then(persons => {
    resp.json(persons)
  })
})

app.get('/api/persons/:id', (req, resp, next) => {
  const id = req.params.id
  Phonebook.findById(id)
    .then(person => { 
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }})
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, resp, next) => {
  const id = req.params.id
  Phonebook.findByIdAndDelete(id)
    .then(() => {
      resp.status(204).end()
    })
    .catch(err => next(err))
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

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  if(!body.name || !body.number) {
    return res.json({message: "Data missed"})
  }
  const person = {
    name: body.name,
    number: body.number
  }

  Phonebook.findByIdAndUpdate(id, person, {new: true})
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})

app.use(express.json());

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
