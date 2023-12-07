import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "../server/controller.js";


const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

app.get("/allSchools", handlerFunctions.getSavedSchools)
app.delete("/deleteSchools/:schoolId", handlerFunctions.deleteSavedSchools)

ViteExpress.listen(app, 2222, () =>
  console.log(`Server working on http://localhost:2222`)
);

