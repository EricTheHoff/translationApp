import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
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
  getSavedTranslations,
  getSeedTranslations,
} = translateFunctions;
const {
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
const {
  getSavedSchools,
  userSchools,
  saveSchool,
  deleteUserSchool,
  placeSearch,
} = schoolFunctions;

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
app.get("/allSchools", loginRequired, getSavedSchools);
app.delete("/deleteSchools/:schoolId", loginRequired, deleteUserSchool);

app.post("/login", login);
app.post("/logout", loginRequired, logout);
app.get("/user", loginRequired, user);
app.get("/user-schools", loginRequired, userSchools);

app.get("/user-status", loginRequired, userStatus);

app.get("/allSavedWords", loginRequired, getSavedWords);
app.get("/savedWords/:wordId", loginRequired, getWordsById);
app.get("/savedPhrases", loginRequired, getSavedPhrases);
app.delete("/deleteWords/:wordId", loginRequired, deleteWords);

app.post("/saveWord", loginRequired, saveWord);
app.post("/translate", loginRequired, translate);
app.post("/save-translation", loginRequired, saveTranslation);
app.post("/save-school", loginRequired, saveSchool);
app.get("/api/places", loginRequired, placeSearch);
app.get("/saved-translations", loginRequired, getSavedTranslations);
app.post("/seed-translations", loginRequired, getSeedTranslations);

app.get("/bear", bearImg);
app.get("/cat", catImg);
app.get("/chicken", chickenImg);
app.get("/dog", dogImg);
app.get("/koala", koalaImg);
app.get("/meerkat", meerkatImg);
app.get("/panda", pandaImg);
app.get("/rabbit", rabbitImg);
app.get("/sealion", sealionImg);

ViteExpress.listen(app, 2222, () =>
  console.log(`Server working on http://localhost:2222`)
);
