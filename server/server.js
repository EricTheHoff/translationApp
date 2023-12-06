import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import axios from "axios";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

app.get("/api/places", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const apiKey = "AIzaSyCUNodj8rRhB6HcoDZC0Z6XN7NkVrvhIqc";

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=200000&type=school&keyword=language%20school&key=${apiKey}`
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
