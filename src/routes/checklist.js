const express = require("express");

const Checklist = require('../models/checklist')

const router = express.Router()

router.get('/', async (req, res) => {

    try {
        let checklists = await Checklist.find({}) // para fazer uma busca no mongodb
        res.status(200).render('checklists/index', {
            checklists: checklists
        }) // estou passando uma variavel para a minha view, com a listagem de checklist
    } catch (err) {
        res.status(400).render('pages/error', {
            error: 'Erro ao exibir as Listas'
        })
    }

})

router.get('/new', async (rec, res) => {

    try {
        let checklist = new Checklist()
        res.status(200).render('checklists/new', {
            checklist: checklist
        })
    } catch (error) {
        res.status(500).render('pages/error', {
            error: 'Erro ao carregar o formulário '
        })
    }
})

router.get('/:id/edit', async (req, res) => { // rota de edição 
    let id = req.params.id

    try {
        let checklist = await Checklist.findById(id)
        res.status(200).render('checklists/edit', {
            checklist: checklist
        })
    } catch (error) {
        res.status(500).render('pages/error', {
            error: 'Erro ao exibir a edição de tarefas'
        })
    }
})

router.post('/', async (req, res) => {

    let {
        name
    } = req.body.checklist
    let checklist = new Checklist({ name })

    try {
        await checklist.save() // await bloqueia o fluxo do codigo 
        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('checklists/new', {checklist: {...checklist, error}})
    }

})

router.get('/:id', async (req, res) => {
    let id = req.params.id

    try {
        let checklistId = await Checklist.findById(id).populate('tasks') // procurar pelo id 
        res.status(200).render('checklists/show', { checklistId: checklistId  })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir listas de tarefas' })
    }

})

router.put('/:id', async (req, res) => { // atualizar 
    let id = req.params.id
    let { name } = req.body.checklist // os valores vem de checklist pq em form.js estamos passando o name 

    let checklist = await Checklist.findById(id)

    try {
        await checklist.update({ name  })
        res.status(200).redirect('/checklists') // encontramos antes para devolver
    } catch (error) {
        let errors = error.errors
        res.status(422).render('checklists/edit', {checklist: { ...checklist,  errors}})
    }

})

router.delete('/:id', async (req, res) => {
    let id = req.params.id

    try {
        await Checklist.findByIdAndDelete(id)
        res.status(200).redirect('/checklists')
    } catch (error) {
        res.status(500).render('pages/error', {
            error: 'Erro ao exibir listas de tarefas'
        })
    }

})
module.exports = router