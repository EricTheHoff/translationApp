import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "../server/controller.js";
import session from 'express-session'

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
}))

app.post('/register', handlerFunctions.register)
app.get("/allSchools", handlerFunctions.getSavedSchools)
app.delete("/deleteSchools/:schoolId", handlerFunctions.deleteSavedSchools)

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body
//     const user = await User.findOne({ where: {username: username} })

//     if(!user) {
//         res.json({ success: false })
//     } else if (user && password === user.password) {
//         req.session.userId = user.userId
//         res.json({ success: true })
//     } else {
//         res.json({ success: false })
//     }
// })
// app.get('/user', async (req, res) => {
//     let id = req.session.userId
//     const user = await User.fineOne({ where: { userId: id }})

//     res.send(user)
// })

ViteExpress.listen(app, 2222, () =>
  console.log(`Server working on http://localhost:2222`)
);
