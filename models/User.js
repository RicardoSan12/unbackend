const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // the passwordHash should not be revealed
  }
})

const User = model('User', userSchema)

module.exports = User


// Hacer esto en proyectos de react
// Imports
// Variables
// Funciones
// Output o export
