import { Model, DataTypes } from "sequelize";
import myDataBaseConnection from "../Database/db.js";
import util from "util";

export const dbConnection = await myDataBaseConnection("translationApp");

export class schoolDetails extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
schoolDetails.init(
  {
    schoolId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
  },

  {
    sequelize: dbConnection,
    modelName: "schoolDetails",
  }
);
export class userDetails extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
userDetails.init(
  {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    schoolId: { type: DataTypes.INTEGER },
    wordId: { type: DataTypes.INTEGER },
  },

  {
    sequelize: dbConnection,
    modelName: "userDetails",
  }
);
export class savedWords extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
savedWords.init(
  {
    wordId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    word: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
  },

  {
    sequelize: dbConnection,
    modelName: "savedWords",
  }
);

schoolDetails.hasMany(userDetails);
userDetails.hasMany(schoolDetails);
// userDetails.belongsToMany(savedWords, { through: userId})
savedWords.belongsTo(userDetails);
savedWords.hasMany(userDetails);
