const handlerFunctions = {

    register: async (req, res) => {

        const { username, email, password, zipcode } = req.body

        console.log(username, email, password, zipcode)

        const alreadyExists = await User.findAll({
            where: {
                username,
                email
            }
        })

        if (alreadyExists[0]) {
            res.status(200).send('Username already exists')
        } else {
            const newUser = await User.create({
                username: username,
                email: email,
                password: password,
                zip: zipcode
            })

            req.session.user = newUser

            res.send({
                message: 'account created',
                user_id: newUser.user_id
            })
        }
    },

}


export default handlerFunctions