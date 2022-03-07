const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('conectar seu banco de dados ', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Conectado ao MongoDb'))
    .catch((err) => console.log(err)) // Aqui ele aceita 2 parametros, 1- a url que ele vai e conectar e o segundo o que ele vai fazer ao se conectar 