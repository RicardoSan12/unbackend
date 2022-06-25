const notesRouter = require('express').Router()
const Note = require('../models/Note')
const handleErrors = require('./middleware/handleErrors')

notesRouter.get('/', async (request, response) => { 
    const notes = await Note.find({})
    response.json(notes)
})


notesRouter.post('/', async (request, response) => { 
    const {body} = request
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
  
    const savedNote = await newNote.save()

    response.json(savedNote)
})


notesRouter.get('/:id', async (request, response, next) => {
    const {id} = request.params

    try{
        const note = Note.findById(id)
        if(!note) response.status(404).end()
        response.json(note)
    }catch(error){
        next(error)
        console.log(error)
    }
})

notesRouter.put('/:id', async (request, response) => {
  const {id} = request.params
  const {body} = request

  const newNoteInfo = {
    content: body.content,
    important: body.important
  }

  try{
    const updateNote = await Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
    response.json(updateNote)
  }catch(error){
    // next(error)
    console.log(error)
  }

})


notesRouter.delete('/:id', (request, response, next) => {
    const {id} = request.params

    Note.findByIdAndRemove(id)
    .then( () => response.status(204).end())
    .catch(error => next(error))

})

app.use(handleErrors)

module.exports = notesRouter