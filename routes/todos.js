const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (reg, res) => {
    const todos = await Todo.find({}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title
        })

        await todo.save()
    } catch (e) {
        console.error(e)
    } finally {
        res.redirect('/')
    }
})

router.post('/update', async (req, res) => {
    try {
        const todo = await Todo.findById(req.body._id)

        todo.completed = !!req.body.completed
        todo.title = req.body.title

        await todo.save()
    } catch (e) {
        console.error(e)
    } finally {
        res.redirect('/')
    }
})

router.post('/delete', async (req, res) => {
    try {
        const todo = await Todo.findById(req.body._id)

        todo.delete()
    } catch (e) {
        console.error(e)
    } finally {
        res.redirect('/')
    }
})


module.exports = router
