const { myQuery, query } = require('../database/config')
const { allLoggedUsers } = require('../helpers/allLoggedUsers')

const router = require('express').Router()

// open to everyone
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
    
        if (!username || !password) {
            return res.status(400).send({ err: true, msg: "missing username or password" })
        }
    
        const users = await myQuery( `SELECT * FROM users WHERE username="${username}" AND password="${password}"`)
        if (!users.length) {
            return res.status(401).send({ err: true, msg: "incorrect username or password" })
        }
    
        const user = users[0];

        req.session.user = { id: user.id, username: user.username, role: user.role, firstname: user.firstname, lastname: user.lastname }
        res.send({ msg: "you logged in successfully", id: user.id, username: user.username, role: user.role, firstname: user.firstname, lastname: user.lastname})
        
    } catch (err) {
        console.log(err)
        res.status(201).send(err)
    }

})

// open to everyone
router.post('/register', async (req, res) => {
    try {
        const {firstname, lastname,  username, password } = req.body
    
        if (!firstname || !lastname || !username || !password) {
            return res.status(400).send({ err: true, msg: "missing username or password" })
        }
    
        await myQuery( `insert into users (firstname, lastname, username, password)
        values ("${firstname}","${lastname}","${username}", "${password}")`)
           
        res.status(201).send({ msg: "user added successfully" })
        
    } catch (err) {
        console.log(err)
        res.status(201).send(err)
    }
})

// open to all registered users
router.delete('/logout', (req, res) => {
    req.session.destroy()
    res.send({ msg: "disconnected successfully" })
})

// open to all registered users
router.get('/profile', allLoggedUsers, async (req, res) => {
    try {
        res.send(await myQuery(`SELECT * FROM followers
        INNER JOIN vacations ON followers.vacationID = vacations.id WHERE userID = "${req.session.user.username}"`))
        
    } catch (err) {
        console.log(err)
    }
})

module.exports = router