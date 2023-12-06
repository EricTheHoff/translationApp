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

import handlerFunctions from "../server/controller.js";


app.post('/register', handlerFunctions.register)