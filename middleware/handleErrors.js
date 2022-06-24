module.exports = (error, request, response, next) => {
    console.log(error)
  
    if(error.name === 'CastError') response.status(404).send({error: 'No hay nada'})
    else response.status(500).end()
  }