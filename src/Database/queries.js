import { dbConnection } from "./models.js";

await dbConnection.close();
