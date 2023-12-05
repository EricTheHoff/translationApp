import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

ViteExpress.listen(app, 2222, () =>
  console.log(`Server working on http://localhost:2222`)
);

// Registration:

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    const alreadyExists = await User.findAll({
        where: {
            username
        }
    })
    if (alreadyExists[0]) {
        res.status(200).send('Username already exists')
    } else {

        const newUser = await User.create({
            username: username,
            password: password
        })

        req.session.user = newUser

        res.send({
            message: 'account created',
            user_id: newUser.user_id
        })
    }
},
)