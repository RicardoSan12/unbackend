const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const handleErrors = require('../middleware/handleErrors')

notesRouter.get('/', async (request, response) => { 
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    console.log(notes)
    response.json(notes)
})


notesRouter.post('/', async (request, response) => { 
  const {body} = request
  if (!body || !body.content){
    return response.status(400).json({
      error : "note.content is missing"
    })
  }

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  
  response.json(savedNote)
})


notesRouter.get('/:id', async (request, response, next) => {
    const {id} = request.params

    try{
        const note = await Note.findById(id).populate('user', { username: 1, name: 1 })
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

notesRouter.use(handleErrors)

module.exports = notesRouter