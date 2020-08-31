const router = require('express').Router()
const { USER_SERVICE } = require('../../services')

router
    .route('')
    .get(USER_SERVICE.getAllUsersController())
    .post(USER_SERVICE.createUserController())

router
    .route('/:id')
    .get(USER_SERVICE.getUserByIdController())
    .put(USER_SERVICE.updateUserByIdController())
    .delete(USER_SERVICE.deleteUserByIdController())

module.exports = router