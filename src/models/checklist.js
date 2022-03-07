const mongoose = require('mongoose')

const cheklistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks:[{ type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})


module.exports = mongoose.model('Checklist', cheklistSchema)
// estamos chamando o model do mongoose/ mas o que é esse model? estamos dizendo que estamos criando esse model e estamos dando o nome pra ele, o nome e Checklist e esse modelo de Checklist tem o modelo de checklistSchema 