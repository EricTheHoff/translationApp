import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import axios from "axios";
import handlerFunctions from "../server/controller.js";
import session from "express-session";
import dotenv from "dotenv";

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
app.put('/editAccount', handlerFunctions.editAccount)

app.get("/allSchools", handlerFunctions.getSavedSchools)
app.delete("/deleteSchools/:schoolId", handlerFunctions.deleteSavedSchools)

app.post("/register", handlerFunctions.register);
app.get("/allSchools", handlerFunctions.getSavedSchools);
app.delete("/deleteSchools/:schoolId", handlerFunctions.deleteSavedSchools);

app.post("/login", handlerFunctions.login);
app.post("/api/logout", handlerFunctions.logout);
app.get("/user", handlerFunctions.user);
app.get("/user-status", handlerFunctions.userStatus);




app.get("/api/places", async (req, res) => {
  dotenv.config();
  try {
    const { lat, lng, radius, language } = req.query;
    const types = ["tutor", "academy", "institute", "center"];
    // console.log(radius);
    // console.log(language);
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${types}&keyword=${language}%20learning&key=${apiKey}`
    );
    // console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



ViteExpress.listen(app, 2222, () =>
  console.log(`Server working on http://localhost:2222`)
);
