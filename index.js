const express = require('express')//function that creates express object 
const app = express()//express=application
app.use(express.json())
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
//routes for the application 
//1.event handler function for HTTP GET has 2 parameters
//1.1 request- info for HTTP request; 1.2 response - how to respond to request
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')//send method string is send to the browser
})
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
//2. event handler for HTTP GET request to api/notes.returns JSON string notes array
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})