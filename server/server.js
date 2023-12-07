import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "../server/controller.js";
import session from "express-session";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
  })
);



app.post('/register', handlerFunctions.register)

app.delete('/deleteAccount/:id', handlerFunctions.deleteAccount)
// app.put('/editAccount', handlerFunctions.editAccount)

app.get("/allSchools", handlerFunctions.getSavedSchools)
app.delete("/deleteSchools/:schoolId", handlerFunctions.deleteSavedSchools)

app.post("/register", handlerFunctions.register);
app.get("/allSchools", handlerFunctions.getSavedSchools);
app.delete("/deleteSchools/:schoolId", handlerFunctions.deleteSavedSchools);

app.post("/login", handlerFunctions.login);
app.post("/api/logout", handlerFunctions.logout);
app.get("/user", handlerFunctions.user);
app.get("/user-status", handlerFunctions.userStatus);




ViteExpress.listen(app, 2222, () =>
  console.log(`Server working on http://localhost:2222`)
);
