const router = require('express').Router()
const { AUTH_SERVICE } = require('../services')

const authRouter = require('./auth')

router
    .route('')
    .get((req, res) => {
        res.send('Hello from API challenge - NODE.js')
    })

router
    .route('/register')
    .post(AUTH_SERVICE.register())

router
    .route('/login')
    .post(AUTH_SERVICE.login())

router.use('/auth', authRouter)

module.exports = router