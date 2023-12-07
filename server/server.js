import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import axios from "axios";
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

app.post("/register", handlerFunctions.register);
app.get("/allSchools", handlerFunctions.getSavedSchools);
app.delete("/deleteSchools/:schoolId", handlerFunctions.deleteSavedSchools);

app.post("/login", handlerFunctions.login);
app.post("/api/logout", handlerFunctions.logout);
app.get("/user", handlerFunctions.user);
app.get("/user-status", handlerFunctions.userStatus);

app.get("/api/places", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const apiKey = "AIzaSyCUNodj8rRhB6HcoDZC0Z6XN7NkVrvhIqc";

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=40233.6&type=school&keyword=language%20school&key=${apiKey}`
    );
    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

ViteExpress.listen(app, 2222, () =>
  console.log(`Server working on http://localhost:2222`)
);
