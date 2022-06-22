require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

const cors = require('cors')
// const { request } = require('express')
app.use(cors())

app.use(express.json())
// let notes = [
//     {
//       id: 1,
//       content: "Probando obtener solo un recurso ",
//       date: "2019-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2019-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2019-05-30T19:20:14.298Z",
//       important: true
//     },
//     {
//       id: 4,
//       content: "los animales modificados realmente selecionaron a los especifines diferentes y loos que necesitaban y los fueron cruzando para lograr una nueva raza",
//       date: "2019-03-30T18:39:34.091Z",
//       important: true
//     },
//     {
//       id: 5,
//       content: "Revisarndo nodemon si funciona, esta funcionando es facil de configurarlo y tambien probando rest client",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     }
//   ]

app.get("/", (request, response) => { 
  response.send("<h1>Respuesta satisfactoria</h1>")
})

app.get('/api/notes', (request, response) => { 
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  
  Note.findById(id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
    })
    .catch(error => {
    console.log(error)
    response.status(500).end()
    })
})

app.post('/api/notes', (request, response) => { 
  const body = request.body
  if (!body || !body.content){
    return response.status(400).json({
      error : "note.content is missing"
    })
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  newNote.save().then(savedNote => {
    response.status(201).json(savedNote)
})
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  
  Note.findByIdAndRemove(id).then( result => response.status(204).end())

})

app.put('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  const newNoteInfo = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, {new: true}).then(result => {
    response.json(result)
  })

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Corriendo el servidor en el puerto ${PORT}`)
})


