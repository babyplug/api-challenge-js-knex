const db = require('../../config/db')
const { Base64Util } = require('../../utils')

const getAllUsersController = () => async (req, res, next) => {
    try {
        const _users = await db.column([
            "id", "username", "email", "first_name",
            "last_name", "display_name", "avatar", "age",
            "tel_number", "token_expired", "status",
            "created_time", "updated_time", "created_by", "updated_by",
            ])
            .select()
            .where('deleted', false)
            .from('users')
        return res.json({
            data: _users,
            query: req.query
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
        })
    }
}

const createUserController = () => async (req, res, next) => {
    const body = req.body
    try {
        await createUser(body)
        return res.status(201).send()
    } catch (error) {
        return res.status(500).json({
            status: 'error',
        })
    }
}

const getUserByIdController = () => async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await getUserById(id)
        if (!user) return res.status(404).json({message: "Can not find user by this id !"})
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'error',
        })
    }
}

const updateUserByIdController = () => async (req, res, next) => {
    const { id } = req.params
    let body = req.body
    try {
        if (body.image) {
            let _image = await Base64Util.convertB64toImage(body.fileName, body.image, 'profile')
            body.avatar = _image
            delete body.image 
            if (body.fileName) delete body.fileName
        }
        await updateUserById(id, body)
        return res.send()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'error',
        })
    }
}

const deleteUserByIdController = () => async (req, res, next) => {
    const { id } = req.params
    const body = { deleted: true }
    try {
        await updateUserById(id, body)
        return res.send()
    } catch (error) {
        return res.status(500).json({
            status: 'error',
        })
    }
}

const createUser = async (body) => {
    try {
        await db('users').insert(body)
    } catch (err) {
        throw err
    }
}

const getUserByUsernameAndDeleted = async (username) => {
    try {
        console.log('getUserByUsernameAndDeleted', username)
        const _users = await db.from('users').where({
            username: username,
            deleted: false,
        }).orderBy('created_time', 'desc')
        return _users
    } catch (err) {
        throw err
    }
}

const getUserById = async (userId) => {
    try {
        const _users = await db
            .from('users')
            .where({
                id: userId,
                deleted: false,
            })
        if (_users && _users.length > 0) {
            delete _users[0].password
            return _users[0]
        }
        return null
    } catch (err) {
        throw err
    }
}

const updateUserById = async (userId, updateBody) => {
    try {
        await db('users')
            .where({id: userId})
            .update(updateBody)
    } catch (err) {
        throw err
    }
}

module.exports = {
    getAllUsersController,
    createUserController,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController,
    getUserByUsernameAndDeleted,
    getUserById,
    createUser,
    updateUserById,
}