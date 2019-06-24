const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { first_name, last_name, email, image, password } = req.body

            let users = await db.getUserByEmail(email)
            let user = users[0]

            if (user) {
                return res.status(409).send('email already taken')
            }
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const response = await db.createUser({ image, first_name, last_name, email, hash })
            const newUser = response[0]

            delete newUser.password

            req.session.user = newUser
            res.send(req.session.user)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    login: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { email, password } = req.body

            let users = await db.getUserByEmail(email)
            let user = users[0]

            if(!user) {
                return res.status(401).send('email or password incorrect')
            }

            let isAuthenticated = bcrypt.compareSync(password, user.password)

            if(!isAuthenticated) {
                res.status(401).send('email or password is incorrect')
            }

            delete user.password
            req.session.user = user
            res.send(req.session.user)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.status(200)
    },

    currentUser: (req, res) => {
        res.send(req.session.user)
    }
}