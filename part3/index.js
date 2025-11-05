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
        resp.json(person)
      } else {
        resp.status(404).end()
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
        resp.json(savePerson)
      })
    })

})

app.get('/info', (req, resp) => {
  const date = new Date()
  Phonebook.countDocuments({})
    .then(count => {resp.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>
    `)})
    .catch(err => {
      console.error('Error counting documents:', err)
      resp.status(500).json({ error: 'Error counting documents' })
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Phonebook.findByIdAndUpdate(
    id, 
    person, 
    {new: true, runValidators: true, context: 'query'}
  )
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
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
