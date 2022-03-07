const express = require('express')

const Task = require('../models/task')
const Checklist = require('../models/checklist')

const simpleRouter = express.Router()
const checklistDependentRoute = express.Router()

checklistDependentRoute.get('/:id/tasks/new', async(req, res) => {
    let id = req.params.id
    try {
        let task = Task()
        res.status(200).render('tasks/new', {checklistId: id, task: task })
    } catch (error) {
        res.status(422).render('pages/error', {error: 'Erro ao carregar o formulário :/'})
    }
})


simpleRouter.delete('/:id',  async(req, res) => {
      let id = req.params.id

      try {
        let task =  await Task.findByIdAndDelete(id)
        let checklist = await Checklist.findById(task.checklist)
        let taskToRemove = checklist.tasks.indexOf(task._id)
        checklist.tasks.splice(taskToRemove,1)
        checklist.save()
        res.redirect(`/checklists/${checklist._id}`)
          
      } catch (error) {
        res.status(422).render('pages/error', {error: 'Erro ao remover uma tarefa  :/'})
      }
})

checklistDependentRoute.post('/:id/tasks', async(req, res) => {
    let id = req.params.id
    let {name} = req.body.task
    let task = new Task({name, checklist: id})
    try {
      await task.save()
      let checklist = await Checklist.findById(id)
      checklist.tasks.push(task)
      await checklist.save()
      res.redirect(`/checklists/${id}`)

       
    }catch (error) {
        let errors = error.errors
        res.status(422).render('tasks/new', {task: {...task, errors}, checklistId: id})
    }
})

simpleRouter.put('/:id', async(req, res) => {
    let task = await Task.findById(req.params.id)
    try {
        task.set(req.body.task)
        await task.save()
        res.status(200).json({task})
    } catch (error) {
        console.log(error)
        let errors = error.errors
        res.status(422).json({task: {...errors}})
    }
})
module.exports = {checklistDependent: checklistDependentRoute,
                  
                  simple: simpleRouter}