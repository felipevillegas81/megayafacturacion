import { Router } from "express"
import usersDao from "../daos/dbManager/users.dao.js"
import { hashPassword } from "../utils.js"

const router = Router()

router.get('/start', async (req, res) => {
    const users = await usersDao.getAll()
})

router.get('/productid/:id', async (req, res) => {
    const user = await usersDao.findById(req.params.id)
    res.json(user)
})

router.post('/start', async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
    res.statusCode(400).json({ message: 'All fields are required'})
    return
    }

    try {
        const user = {
            username,
            email,
            password: hashPassword(password)
        }

        const newUser = await usersDao.create(user)
        res.json( {info: 'user Created', newUser})
    } catch (error) {
        res.statusCode(400).json({ message: error.message })
    }
})

    router.delete('/productid/:id', async (req, res) => {
        const user = await usersDao.findById(req.params.id)
        if(!user) {
            res.statusCode(404).json({ message: 'User not found'})
            return
        }

        await usersDao.delete(req.params.id)
        res.json( {message: 'User deleted'})
    })

export default router



