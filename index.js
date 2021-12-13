// imports
const express = require('express')
const cors = require('cors')
const session = require('express-session')
require('./database/config')

// init
const app = express()

// middlewares
app.use(express.json()) // req.body
app.use(session({
    secret: `MDrs!d=sMPDu?VWK[e_%#J&[."}6y>`,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
})) // req.session

app.use('/follows', require('./routes/follows'))
app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))
app.use('/admin', require('./routes/admin'))
// Public files directory
app.use(express.static('build'))

// run
app.listen(80, () => console.log("J.A.R.V.I.S up and running on port 80 🎆"))