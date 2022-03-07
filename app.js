const express = require("express");  
const path = require('path') //  consegue encontrar qual o caminho/diretorio em que pasta o arquivo está 
const methodOverride = require('method-override') // serve para usar o put e o delete
const checkListRouter = require("./src/routes/checklist")
const taskRouter = require('./src/routes/task')
const rootRouter = require('./src/routes/index')


require('./Config/database')

const app = express()
app.use(express.json())  
app.use(express.urlencoded({ extended:true }))
app.use(methodOverride('_method', {methods: ['POST', 'GET']})) // essa e a maneira de comos iniciamos ele 


app.use(express.static(path.join(__dirname, 'Public'))) // todos os aqrquivos estaticos estão em public 

                    // pasta em que estamos // pasta onde quero que a views estejam
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')


app.use('/', rootRouter)
app.use('/checklists', checkListRouter) // usando como se fosse um midlleware
// posso botar o /checklists aqui e deixar la vasio 
app.use('/checklists', taskRouter.checklistDependent)
app.use('/tasks',taskRouter.simple )

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!")
})

//task = tarefa





// use e o comando para usarr o midlleqare
// // esse e um dos principais midlleware usado, basicamente ele verifica se quando foi feita a chamada web se esxisste algum json la dentro e se ele deve deixar disponivel no req.body
// const log = (req,  res, next) =>{
//     console.log(req.body)
//     console.log(`Data ${new Date()}`)
//     next()
// }

// app.use(log)
// app.get('/',(req, res) => {
//     res.send("Olá mundo! :)")
// })

// app.get('/json', (req, res) => {
//     console.log(req.body)
//     res.json({title: 'Tarefaax', done:true})
// })
// 

// --save-dev e quando eu instalo uma lib em ambiente de desenvolvimento 
// --save vou usar no geral 
// o nodmon e uma lib 