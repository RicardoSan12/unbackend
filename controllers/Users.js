const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
  const {body} = request

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)

})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes')
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const {id} = request.params

    try{
        const user = await User.findById(id).populate('notes')
        if(!user) response.status(404).end()
        response.json(user)
    }catch(error){
        console.log(error)
    }
})

module.exports = usersRouter