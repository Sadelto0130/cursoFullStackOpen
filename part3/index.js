import express from 'express';
import morgan from 'morgan';
import cors from 'cors'

morgan.token('body', (req) => JSON.stringify(req.body));

const app = express()
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms :body'));
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

app.get('/', (req, resp) => {
  resp.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, resp) => {
  resp.json(persons)
})

app.get('/api/persons/:id', (req, resp) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    resp.json(person)
  } else {
    resp.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, resp) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  resp.status(204).end()
})

app.post('/api/persons', (req, resp) => {
  const body = req.body

  if (!body.name || !body.number) {
    return resp.status(400).json({ 
      error: 'data missing' 
    })
  }

  const existName = persons.find(person => person.name === body.name)
  if(existName) {
    return resp.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  resp.json(person)
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
