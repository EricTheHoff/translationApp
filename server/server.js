import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import axios from "axios";
import session from "express-session";
import env from "dotenv";
import imgFunctions from "./imgController.js";
import schoolFunctions from "./schoolController.js";
import authFunctions from "./authController.js";
import translateFunctions from "./translateController.js";

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
env.config();

const {
  login,
  logout,
  user,
  register,
  editAccount,
  deleteAccount,
  userStatus,
} = authFunctions;
const {
  getSavedWords,
  getWordsById,
  deleteWords,
  getSavedPhrases,
  saveWord,
  translate,
  saveTranslation,
} = translateFunctions;
const {
  profileImg,
  bearImg,
  catImg,
  chickenImg,
  dogImg,
  koalaImg,
  meerkatImg,
  pandaImg,
  rabbitImg,
  sealionImg,
} = imgFunctions;
const { getSavedSchools, userSchools, saveSchool, deleteUserSchool } =
  schoolFunctions;

console.log(process.env.VITE_REACT_APP_GOOGLE_API_KEY);

const loginRequired = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

app.post("/register", register);
app.delete("/deleteAccount", loginRequired, deleteAccount);
app.put("/editAccount", loginRequired, editAccount);
app.get("/allSchools", getSavedSchools);
app.delete("/deleteSchools/:schoolId", deleteUserSchool);

app.post("/login", login);
app.post("/api/logout", logout);
app.get("/user", loginRequired, user);
app.get("/user-schools", userSchools);

app.get("/user-status", userStatus);

app.get("/allSavedWords", getSavedWords);
app.get("/savedWords/:wordId", getWordsById);
app.get("/savedPhrases", getSavedPhrases);
app.delete("/deleteWords/:wordId", deleteWords);

app.post("/saveWord", saveWord);
app.post("/translate", translate);
app.post("/save-translation", saveTranslation);
app.post("/save-tutor", saveSchool);

app.get("/bear", bearImg);
app.get("/cat", catImg);
app.get("/chicken", chickenImg);
app.get("/dog", dogImg);
app.get("/koala", koalaImg);
app.get("/meerkat", meerkatImg);
app.get("/panda", pandaImg);
app.get("/rabbit", rabbitImg);
app.get("/sealion", sealionImg);

app.get("/api/places", async (req, res) => {
  try {
    const { lat, lng, radius, language } = req.query;
    const types = ["tutor", "academy", "institute", "center"];
    console.log(radius);
    // console.log(language);
    const apiKey = process.env.VITE_REACT_APP_GOOGLE_API_KEY;

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
