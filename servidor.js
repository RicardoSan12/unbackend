require('dotenv').config()
const express = require('express')
require('./mongo')
const app = express()

const cors = require('cors')
const notesRouter = require('./controllers/Notes')
const usersRouter = require('./controllers/Users')

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

app.get("/", (request, response) => response.send("<h1>Respuesta satisfactoria</h1>"))

app.use('/api/notes', notesRouter)

// app.use('/api/users', usersRouter)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Corriendo el servidor en el puerto ${PORT}`)
})


