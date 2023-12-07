import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
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


import handlerFunctions from "../server/controller.js";

app.post('/register', handlerFunctions.register)

app.delete('/deleteAccount', handlerFunctions.deleteAccount)
app.put('/editAccount', handlerFunctions.editAccount)


ViteExpress.listen(app, 2222, () =>
  console.log(`Server working on http://localhost:2222`)
);
