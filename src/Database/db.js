import { Sequelize } from "sequelize";

async function myDataBaseConnection(uri) {
  const sequelize = new Sequelize(
    uri,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
      database: "translationApp",
      dialect: "postgres",
      define: {
        underscored: true,
        timestamps: false
      },
      dialectOptions: {
        charset: 'utf8',
        encoding: 'UTF8'
      }
    }
  );
  try {
    await sequelize.authenticate();
    console.log("Connected to translationApp successfully!");
  } catch (error) {
    console.error("Unable to connect to translationApp:", error);
  }

  return sequelize;
}
export default myDataBaseConnection;
