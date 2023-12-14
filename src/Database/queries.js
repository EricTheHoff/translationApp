import { UserDetail, SchoolDetail, dbConnection } from "./models.js";

console.log(await UserDetail.findByPk(1, { include: { model: SchoolDetail } }));

await dbConnection.close();
