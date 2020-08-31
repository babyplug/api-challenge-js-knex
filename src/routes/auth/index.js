const router = require('express').Router()
const passportMiddleware = require('../../middleware/passport')

const usersRouter = require('../users')

router
    .route('')
    .get((req, res) => {
        res.send('Hello from auth route')
    })

router.use('/users', passportMiddleware.authen, usersRouter)

module.exports = router