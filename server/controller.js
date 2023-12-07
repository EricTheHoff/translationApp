import { UserDetail } from '../src/Database/models.js'

const handlerFunctions = {

    register: async (req, res) => {

        const { name, email, password, zipCode } = req.body

        console.log(name, email, password, zipCode)

        const alreadyExists = await UserDetail.findAll({
            where: {
                name,
                email
            }
        })

        if (alreadyExists[0]) {
            res.status(200).send('Username or email already exists')
        } else {
            const newUser = await UserDetail.create({
                name: name,
                email: email,
                password: password,
                zipCode: zipCode
            })

            req.session.user = newUser

            res.send({
                message: 'account created',
                user_id: newUser.user_id
            })
        }
    },


    deleteAccount: async (req, res) => {
        await UserDetail.destroy({
            where: {
                primaryKey
            }
        })
    },

    editAccount: async () => {},
}


export default handlerFunctions